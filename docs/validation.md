# Validation record — 20 October 2026

## Initial local-review milestone

- `npm test`: 3 suites passed after the final privacy copy update. Covers all four pages, unique metadata, canonical/OG tags, heading order, unique IDs, internal targets and anchors, email URI, sitemap, direct HTTP loads and reloads, HEAD, URL redirects, asset MIME types, unsupported methods, malformed URLs, private-source isolation, and styled HTTP 404s.
- Browser layout checks: `/`, `/boryn`, `/boryn/privacy`, `/boryn/support` at 375, 768, and 1440 CSS pixels. All 12 combinations had document scroll width equal to viewport width; no horizontal overflow.
- Additional 720 × 500 CSS-pixel checks on all four pages cover the reflow space of a 1440 × 1000 viewport at 200% zoom. Native browser zoom could not be reliably controlled in the embedded browser, so this is an equivalent viewport reflow check, not a claim of a native 200% zoom pass.
- Visually inspected desktop/mobile home, mobile privacy, and narrow support layouts. Browser accessibility tree exposes headings, links, main content, and labeled navigation in document order.
- Keyboard: Tab reveals the skip link with an outline; Enter moves focus to main; subsequent Tab proceeds to the first in-content navigation link.
- Privacy page remained accessible with script execution disabled. Recorded reload requests were only the local HTML and stylesheet. Every generated page contains zero scripts and uses the same local CSS. Temporary script/media/viewport test overrides were restored.
- Static reduced-motion rule disables animation, transitions, and smooth scrolling; no motion is implemented by default.
- Contrast calculated from actual CSS colors: main text 15.47:1 on background / 13.85:1 on surface; secondary text 8.87:1 / 7.94:1; accent 10.20:1 / 9.13:1. All text combinations exceed WCAG AA normal-text contrast.
- Copy reviewed against the Boryn sources listed in `review.md`; privacy reset wording explicitly includes retained evidence and other surviving records.
- Independent local Git repository initialized. No remote, commit, or deployment was created.

## Limits and handoff

This is desktop-browser emulation, not real iPhone testing. Accessibility-tree inspection is not a full VoiceOver session. Native browser 200% zoom and real-device checks remain useful before launch. Mailto syntax is verified; no email was sent and mailbox delivery has not been tested. No public HTTPS, DNS, Cloudflare, or App Store Connect verification occurred.

At the initial milestone, the privacy policy was an unpublished draft without an effective date. The publication preparation below supersedes that state.

Local preview: http://127.0.0.1:4173. Rebuild and restart it with the README commands if the session has ended.


## Publication preparation

- Source audit completed against Boryn commit `f0c2bf4a2abe81b300bb8d7791d6c33a07f03a9d`; evidence and corrections recorded in `review.md`.
- Final candidate policy and privacy labels prepared locally. Date is staged for 20 October 2026 and must be checked again before first public publication. Developer review is pending; preparation is not publication approval.
- Release tests now reject draft/review placeholders on every public route and require a valid effective date plus deletion, backup, support-retention and TestFlight disclosures. All three test groups passed.
- Browser repeated all four routes at 375, 768 and 1440 CSS pixels; all 12 combinations had zero horizontal overflow and no script tags.
- Existing palette, styling, layout, reduced-motion rules and app feature claims are unchanged. Initial contrast calculations and accessibility limits above remain applicable.
- Basic source scan found no private-key blocks or common credential patterns. Only the intended source/docs/tests are candidates for Git; generated `dist/`, dependencies and macOS artifacts are ignored.
- GitHub and Cloudflare sign-in are required before repository creation/deployment. No public deployment, DNS edit or mailbox transmission has occurred.
