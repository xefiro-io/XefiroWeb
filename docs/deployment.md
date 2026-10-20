# First publication handoff

## Current status

Release candidate prepared locally. Public policy approval and GitHub/Cloudflare account sign-in are pending. No public repository or deployment is claimed by this document.

## Intended deployment contract

| Setting | Value |
| --- | --- |
| Repository | `https://github.com/xefiro-io/XefiroWeb` (intended, not yet created/verified) |
| Visibility | Public, confirmed by owner |
| Default/production branch | `main` |
| Git transport | `git@github-xefiro:xefiro-io/XefiroWeb.git` using existing local SSH host configuration |
| Provider | Cloudflare Pages with GitHub integration |
| Root | Repository root |
| Build | `npm run build` |
| Output | `dist` |
| Runtime | Supported Node >=20; record the actual successful Pages runtime on deployment |
| Canonical origin | `https://xefiro.io` |
| Pages URL, production commit | Not yet available; record actual values after successful deployment |

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
