# First public release — 20 October 2026

## Deployment contract

| Setting | Verified value |
| --- | --- |
| Production website | https://xefiro.io |
| Repository | https://github.com/xefiro-io/XefiroWeb — public |
| Default/production branch | `main` |
| Git transport | Existing local `github-xefiro` SSH host alias |
| Provider/project | Cloudflare Pages / `xefiroweb` |
| Pages hostname | https://xefiroweb.pages.dev |
| Build/output/root | `npm run build` / `dist` / repository root |
| Runtime observed | Node 22.16.0, npm 10.9.2 |
| Verified website source commit | `84299db0a122f9a9fea22931fc4a9c23a11bfe09` |
| Verified release deployment | `213c6704-d8a4-4509-a213-19c060d5b261` |
| Version URL | https://213c6704.xefiroweb.pages.dev |
| Initial deployment | `63df7634-94db-4fea-8248-5baa01e8a535`, source `4cf9b51` |
| Policy effective date | 20 October 2026 (Asia/Singapore first publication date) |

The source revision above is the last website-content change. This release-record documentation is committed afterward and can trigger an equivalent automatic deployment without changing generated assets. The current production Git revision is visible on the Pages Deployments screen.

## Acceptance evidence

- GitHub repository verified public on `main`; source contains only intended code, docs and tests. Generated `dist/`, dependencies and local artifacts are ignored. Initial source credential-pattern scan was clean.
- Both initial deployment and the subsequent source-fix push built automatically through the Git integration. The build log confirms static assets and no Functions directory.
- Apex domain served over valid HTTPS in the browser. All four public routes returned HTTP 200 on direct navigation and reload. Unknown paths returned the styled page with HTTP 404. `/boryn/privacy.html` redirected to the clean `/boryn/privacy` URL.
- Production sitemap and robots returned HTTP 200 with XML/text content types. Canonical metadata on all four routes targets https://xefiro.io. The support page contains the correct readable mailto link.
- Twelve production layout combinations (all four routes at 375, 768 and 1440 CSS pixels) had zero horizontal overflow, zero scripts and no review placeholders.
- Final browser network recording across the twelve combinations contained only https://xefiro.io requests and zero script requests. Support content and contact remained accessible with script execution disabled. Skip-link keyboard activation moved focus to main.
- Equivalent 200% reflow space (720 × 500 CSS pixels for a 1440 × 1000 window) passed all four pages. Native embedded-browser zoom was not reliably controllable; actual native 200% zoom, a full VoiceOver session and real-device checks are not claimed. Existing contrast/reduced-motion results remain valid; design CSS did not change.
- The local OS resolver briefly retained a negative DNS lookup after apex activation. Browser DNS succeeded; supplementary HTTPS checks used public DNS resolution with normal hostname/certificate validation, without disabling TLS verification.

## Cloudflare configuration fixes

The first apex-domain checks found a pre-existing zone Web Analytics automatic setup injecting a RUM beacon even though Pages-project Web Analytics was disabled. Zone RUM was set to Disable, and the persisted setting and final network behavior were verified. No analytics was added to source.

Default email obfuscation also injected decoding JavaScript on contact pages. The shared public support address now uses Cloudflare's documented `email_off` comment boundary. Final contact-page HTML has no obfuscated addresses or decoding scripts, without changing zone-wide security settings. See [email obfuscation documentation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/).

DNS baseline comparison confirmed that all five Google MX destinations/priorities, DKIM, SPF and Google verification records stayed intact. Only the proxied apex CNAME to `xefiroweb.pages.dev` was added (8 → 9 records). No www record or unrelated redirect was added. Cloudflare GitHub installation was explicitly approved and restricted to XefiroWeb.

## Maintenance and rollback

Push reviewed changes to `main` to trigger Pages builds. Keep `npm run build` → `dist`, static clean routes and top-level `404.html`; no Functions or SPA rewrite is needed. After every policy or hosting change, recheck the live privacy/support content and absence of injected tracking/scripts. Preserve the initial effective date unless policy changes require an updated date.

For a regression, use Pages' production rollback to the verified release deployment above or another known-good deployment, then revert the offending Git commit and push the correction so Git and production agree. Do not roll back to the initial pre-email-fix content without rechecking JavaScript-free contact behavior. Preserve email DNS during hosting changes.

## Separate Boryn release handoff

- Privacy URL: https://xefiro.io/boryn/privacy
- Support URL: https://xefiro.io/boryn/support
- Verify inbound/outbound mailbox delivery; mailto syntax is not an email-delivery test.
- Coordinate app links, App Store Connect/TestFlight metadata and privacy questionnaire in the Boryn workflow. These were not modified or marked complete here.
