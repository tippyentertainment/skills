#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PLATFORMS="replit|windsurf|amp|opencode|cursor|continue"
TAG="tasking.tech"
NUM="1"
DRY_RUN=1
VERBOSE=1

usage(){
  cat <<EOF
Usage: $0 [--apply] [--files <glob>]

--apply      Make changes (default is dry-run)
--files GLOB Limit search to files matching glob (default: all tracked markdown files)
--help       Show this help
EOF
}

if [[ ${1:-} == "--help" ]]; then
  usage
  exit 0
fi

while [[ $# -gt 0 ]]; do
  case "$1" in
    --apply) DRY_RUN=0; shift ;;
    --files) FILE_GLOB="$2"; shift 2 ;;
    --help) usage; exit 0 ;;
    *) echo "Unknown arg: $1"; usage; exit 2 ;;
  esac
done

# Find candidate files (default: markdown files tracked by git)
if [[ -n "${FILE_GLOB:-}" ]]; then
  IFS=$'\n' read -r -d '' -a FILES < <(printf "%s\n" $(eval "ls -1 ${FILE_GLOB} 2>/dev/null") && printf '\0') || true
else
  IFS=$'\n' read -r -d '' -a FILES < <(git ls-files "*.md" "*.MD" || printf '\0') || true
fi

changes=()

for f in "${FILES[@]}"; do
  # skip deleted or non-existent
  [[ -f "$f" ]] || continue

  # skip binary-large files
  if grep -q -i "${TAG}" "$f"; then
    # already has tag
    continue
  fi

  if grep -qiE "(^|\W)(${PLATFORMS})(\W|$)" "$f"; then
    # Use awk to detect last platform-number pair and whether to insert
    if awk -v plat="${PLATFORMS}" -v tag="${TAG}" -v num="${NUM}" 'BEGIN{IGNORECASE=1; split(plat,P,"|")}
    {
      a[NR]=$0
    }
    END{
      found=0; already=0; ins_at=0
      for(i=1;i<=NR;i++){
        for(pi in P){
          pat=P[pi]
          if(tolower(a[i]) ~ "^\s*" tolower(pat) "\s*$" && (i<NR && a[i+1] ~ "^\s*[0-9]+\s*$")){
            ins_at=i+1; found=1
          }
        }
        if(tolower(a[i]) ~ "^\s*tasking\.tech\s*$") already=1
      }
      if(!found || already){ exit 1 } else { exit 0 }
    }' "$f"; then
      changes+=("$f")
    fi
  fi
done

if [[ ${#changes[@]} -eq 0 ]]; then
  echo "No files need updating (no platform lists found without ${TAG})."
else
  echo "Files that will be updated:"
  for c in "${changes[@]}"; do echo " - $c"; done

  if [[ $DRY_RUN -eq 1 ]]; then
    echo "\nDry-run (no files changed). To apply, re-run with --apply."
  else
    echo "Applying changes..."
    for f in "${changes[@]}"; do
      tmp="${f}.tmp"
      awk -v plat="${PLATFORMS}" -v tag="${TAG}" -v num="${NUM}" 'BEGIN{IGNORECASE=1; split(plat,P,"|")}
      {
        a[NR]=$0
      }
      END{
        ins_at=0; already=0
        for(i=1;i<=NR;i++){
          if(tolower(a[i]) ~ "^\s*tasking\.tech\s*$") { already=1 }
        }
        if(already){ # nothing to do, print as-is
          for(i=1;i<=NR;i++) print a[i]
          exit
        }
        for(i=1;i<=NR;i++){
          for(pi in P){
            pat=P[pi]
            if(tolower(a[i]) ~ "^\s*" tolower(pat) "\s*$" && (i<NR && a[i+1] ~ "^\s*[0-9]+\s*$")){
              ins_at=i+1
            }
          }
        }
        if(ins_at==0){ # fallback: append at end
          for(i=1;i<=NR;i++) print a[i]
          print tag
          print num
        } else {
          for(i=1;i<=ins_at;i++) print a[i]
          print tag
          print num
          for(i=ins_at+1;i<=NR;i++) print a[i]
        }
      }' "$f" > "$tmp" && mv "$tmp" "$f" && echo "Updated: $f"
    done

    # Run fixer and validator
    echo "Running auto-fixer and validator..."
    node scripts/fix-skills.js
    node scripts/validate-skills.js

    echo "All changes applied and validated. Commit the changes with git add/commit."
  fi
fi
