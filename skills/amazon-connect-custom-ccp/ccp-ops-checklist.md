# CCP Ops Checklist — VDI / HDX & Reconnect Guidance

This checklist contains concrete steps and settings to validate CCP deployments in Citrix/VDI (HDX) environments and to ensure agent session persistence and reconnection behavior.

## Supported Client & Browser Matrix

- Preferred: Google Chrome (stable) on Windows 10/11 or latest Chromium-based browsers.
- Test on local endpoint (non-VDI) and inside target VDI image to compare behavior.
- Minimum test items:
  - Browser version
  - Citrix Workspace client version
  - HDX audio/USB driver versions

## Citrix / HDX Configuration (recommended)

- Enable HDX audio redirection for the client session (not only server-side audio). Verify microphone and speaker are mapped to the VDI session.
- Enable USB redirection if agents use headsets with USB dongles; limit to trusted device classes.
- Use optimized HDX policies for real-time audio/video (e.g., `Audio: Real-time` / `Optimize for Voice` where available).
- Ensure the Citrix policy allows the required browser features (WebRTC, microphone/camera access) and that client browsers are launched with the correct flags if needed.

## Network & QoS

- Verify network bandwidth and latency from VDI worker to the media endpoint. Target:
  - <150ms round-trip for acceptable UX (lower is better).
  - Stable bandwidth per agent: 64–128 Kbps for audio; higher for video if used.
- Ensure QoS prioritization for audio (DSCP markings) where possible on enterprise edge.

## Media Strategy & Fallbacks

- Preferred first-line: In-browser WebRTC (if VDI performance acceptable).
- If VDI introduces unacceptable latency or audio glitches:
  - Use a local media bridge / framed softphone approach (media proxy on endpoint), or
  - Provide a native softphone/SIP client installed on the agent endpoint outside the VDI.
- Document fallback steps for agents (how to switch to SIP client, restart agent session, or report to ops).

## Reconnection & Session Persistence

- Persist agent session state server-side (e.g., Redis/session store): agent ID, routing profile, active contact IDs, timers, and short-lived tokens.
- Implement heartbeat (every ~10–30s) and a reconnection window (e.g., 60–300s) for automatic session reattach.
- On client reconnect:
  - Rehydrate UI state from server (active contacts, selected routing profile, timers).
  - Attempt media reattachment; if that fails, show explicit action to the agent to rejoin media (relogin, re-initiate softphone, or use fallback client).

## Validation Steps (manual QA)

1. Start a CCP session in VDI and on a local client.
2. Run a microphone/speaker loop test (simple prerecorded voice or echo test). Verify latency and clarity.
3. Simulate network glitch (disconnect/limit bandwidth) and confirm reconnect within configured window and proper UI rehydration.
4. Test supervisor features (monitor/whisper/barge‑in) end-to-end and verify audit logging.
5. Test USB headset redirection (plug/unplug) and confirm the browser/CCP gracefully handles device changes.

## Monitoring & Alerts

- Add health checks for agent session reconnections: failure rates and average time-to-reconnect.
- Monitor media quality metrics (packet loss, jitter) per VDI worker pool and alert when thresholds are exceeded.

## Ops Runbook Snippets

- Quick fix: If an agent reports audio problems in VDI:
  1. Ask agent to open a local browser (outside VDI) and confirm audio quality.
  2. If local is OK and VDI is bad, check Citrix policy and HDX session logs for audio redirection issues.
  3. Temporarily switch agent to fallback native softphone and record incident.

- Reconnect troubleshooting:
  - Check session store (Redis) for agent session keys.
  - Inspect CCP logs for reconnection errors and token expiration.

## Links & References

- Citrix audio redirection docs: https://docs.citrix.com (search "HDX audio").
- Amazon Connect Streams docs: https://github.com/aws/amazon-connect-streams

---

Keep this checklist short and add organization-specific details (browser policy entries, SIP config examples, or local softphone installers) as needed.