---
name: amazon-connect
description: Design, deploy, integrate, and operate Amazon Connect contact center solutions, including contact flows, routing, telephony, integrations, analytics, and compliance.
---

# Provided by TippyEntertainment
# https://github.com/tippyentertainment/skills.git

# Amazon Connect — Contact Center

This skill covers building and operating Amazon Connect instances: contact flow design, telephony configuration, agent handling, integrations (CRM, Lambda), analytics (Contact Lens), and security/compliance (PCI, PII handling).

## Files & Formats

Required files and typical formats for Amazon Connect projects:

- `SKILL.md` — skill metadata (YAML frontmatter: `name`, `description`)
- `README.md` — short overview and runbooks (optional)
- IaC & templates: CloudFormation/Terraform (`.yaml`, `.tf`)
- Contact flows and prompt exports: JSON (`.json`) exports
- Lambda functions: `.js`, `.py`, deployment packages
- Lex/Polly configs: intent/slot JSON, voice assets
- Analytics & exports: Kinesis/S3 exports, Contact Lens configs (`.json`)
- Docs & runbooks: `.md` (runbooks, escalation guides)

## Core Responsibilities

1. **Contact flow & routing** — Design IVR flows, queues, routing profiles, and agent experience.
2. **Telephony & connectivity** — Configure phone numbers, PSTN settings, and CCP behavior.
3. **Integrations** — Hook into Lambda/CRM/databases for context, authentication, and routing decisions.
4. **Analytics & quality** — Enable Contact Lens, store call recordings, and build dashboards for KPIs.
5. **Security & compliance** — Support PCI/PII controls, redaction, encryption, and least-privilege IAM policies.
6. **Scaling & availability** — Architect multi-region or high-availability patterns where needed.

## Output style

- Provide stepwise runbooks and minimal, copyable CloudFormation/Terraform/Lambda snippets.
- Reference file names and configuration paths when suggesting edits.
- Prefer small, testable changes that can be validated by quick playbacks or test calls.
