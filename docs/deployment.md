# First publication handoff

## Current status

Policy approved and source published on 20 October 2026. Public GitHub repository and `main` verified. Cloudflare Pages first deployment succeeded; xefiro.io serves the site over HTTPS. Production checks found inherited zone-level analytics and email-obfuscation injection; these are being corrected before final acceptance.

## Intended deployment contract

| Setting | Value |
| --- | --- |
| Repository | `https://github.com/xefiro-io/XefiroWeb` (created and verified public) |
| Visibility | Public, confirmed by owner |
| Default/production branch | `main` |
| Git transport | `git@github-xefiro:xefiro-io/XefiroWeb.git` using existing local SSH host configuration |
| Provider | Cloudflare Pages with GitHub integration |
| Root | Repository root |
| Build | `npm run build` |
| Output | `dist` |
| Runtime | Node 22.16.0, npm 10.9.2 observed in successful Pages build |
| Canonical origin | `https://xefiro.io` |
| Pages URL | `https://xefiroweb.pages.dev` (HTTPS routes verified) |
| Initial source commit | `4cf9b51384a60a455e151f4fd6e97f3fe65bc990` |
| Initial successful deployment | `63df7634-94db-4fea-8248-5baa01e8a535` |

## Resume sequence

1. Complete developer review of the local policy at `/boryn/privacy`; record approval in review notes. Do not publish the candidate policy before review.
2. Check Singapore date immediately before the first public source push or deployment. Update `privacyEffectiveDate` to that date if publication is no longer 20 October 2026. The displayed date derives from this field. Run `npm test` after changes.
3. Create an empty public GitHub repository under `xefiro-io`, without a generated README/license/gitignore. Add it as `origin`, push `main`, and verify the published file list. Source must exclude `dist/`, local secrets and browser artifacts.
4. Connect Cloudflare Pages to this repository and configure the documented branch/build/output. Run the first deployment and inspect its actual Pages URL before adding the custom domain.
5. Inspect existing Cloudflare DNS records before domain changes. Preserve MX, SPF, DKIM, DMARC, email-routing records, and unrelated records. Attach `xefiro.io` using Pages' custom-domain flow; investigate any conflicting apex web record before replacing it.
6. Verify apex HTTPS and all four clean routes by direct load/reload, metadata/canonical origin, static CSS, robots/sitemap, email URI, and unknown-path HTTP 404. Check no new fonts, scripts, analytics, Functions or unrelated redirects appeared.
7. Record actual repository/default branch, production commit, Pages URL/project name, effective date, runtime, production checks and any limits here. Update README status only to verified facts.

GitHub or Cloudflare authentication/security grants requiring user action should be handed off at that specific step. Never put credentials into source, command arguments or handoff notes.

## Rollback

After the first successful deployment, retain its commit and deployment identifier. For a later regression, use Cloudflare Pages' production rollback to the last known good deployment, then revert the offending Git commit and push the fix to keep Git and production aligned. Do not change the initial policy effective date during an unrelated rollback. For a failed first deployment, fix/redeploy the candidate and leave domain/email settings intact; do not claim a previous deployment exists.

## Separate release tasks

Verify inbound/outbound support mailbox delivery without treating mailto validation as a delivery test. Coordinate the final privacy/support URLs and App Store privacy questionnaire through the Boryn release workflow. Neither task is marked completed here.


## Production configuration findings

The first apex-domain checks found Cloudflare's pre-existing zone Web Analytics automatic setup injecting a RUM beacon even though Pages-project Web Analytics was disabled. The zone RUM setting was changed to Disable as required by this site's no-tracking contract. The original RUM setting was enabled outside the EU; no analytics was added to the source.

Cloudflare's default email obfuscation also injected decoding JavaScript on contact pages. The shared public support link now uses Cloudflare's documented `email_off` HTML comment boundary, preserving readable mailto contact without changing zone-wide security settings. Recheck rendered production HTML/network after the next deployment. See [email obfuscation documentation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/).

DNS comparison: the five Google MX destinations, their displayed priorities, DKIM, SPF and Google verification records remain unchanged. Only the proxied apex CNAME to `xefiroweb.pages.dev` was added (8 → 9 records). No www record or unrelated redirect was added.
