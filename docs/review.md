# Privacy publication evidence audit

Audited 20 October 2026 against the clean Boryn checkout at commit `f0c2bf4a2abe81b300bb8d7791d6c33a07f03a9d`. These are development references, not website build dependencies. This is a source audit, not a new device test or proof that an App Store build uses this exact commit.

## Evidence checklist

| Topic | Evidence and conclusion |
| --- | --- |
| Local storage | `Boryn/App/BorynSchema.swift`, `BorynApp.swift`: SwiftData models in app-local storage include financial records, evidence, automation memory, accounts, categories, settings and logs. |
| Transaction reset | `Transactions/Services/TransactionDataService.swift`, `App/ResetTransactionDataView.swift`: deletes transactions and balance reconciliations; evidence becomes unlinked. Accounts, mappings, statements, categories, preferences, imports, replay history, logs and backups survive. |
| Other deletion controls | `Accounts/Services/AccountService.swift`, `AccountMappingService.swift`, `Categories/Services/CategoryService.swift`: record-specific deletion with in-use restrictions. `Transactions/Views/TransactionSourceEvidenceViews.swift` and its service: Delete Source Evidence removes source details while retaining the transaction and replay protection. |
| Log retention | `Diagnostics/Services/DiagnosticLogService.swift`: transaction and technical records, app-triggered purge at configured 1/7/30-day retention. This is not a ledger or backup expiration period. |
| Backups | `Backup/PortableBackupService.swift`, `BackupRestoreView.swift`, `PortableBackupImporter.swift`: explicit creation of unencrypted portable JSON archives in Documents/Backups, sharing via system sheet, replacement restore, independent file deletion. The old local snapshot implementation is not the current portable-file help contract. |
| External workflow boundaries | `Automation/AddTransactionIntent.swift`, `GetPromptIntent.swift`, `GetCategoriesIntent.swift`, app README: user-configured Shortcuts supply Wallet fields or model-extracted Email data. Raw Email body is not retained; extracted source evidence is retained. No direct bank/Wallet/Mail/notification reader or in-app model execution is advertised. |
| Backend, tracking, sync | Search of app Swift sources found no URLSession, backend URLs, CloudKit or analytics SDK integrations. Project package references are CoreXLSX and ZIPFoundation. No app entitlement files were found. The privacy manifest declares no tracking domains or collected data; `App/ReleaseInformationViews.swift` independently describes no Boryn backend or telemetry. None of these facts imply that Apple or a user-selected service never processes data. |
| Support | `App/AppReleaseInfo.swift`: boryn_support@xefiro.io. Owner confirmed monitored mailbox, Xefiro attribution, purpose-based retention and deletion requests during publication planning. No mailbox provider or fixed deletion schedule is invented. |
| Apple/TestFlight | Apple's current disclosure distinguishes automatic crash/usage collection, submitted feedback, direct invitations and public-link name/email visibility. Policy explains Xefiro's use/retention and requests separately from Apple's copies. |
| Device removal | Apple storage documentation distinguishes Delete App from Offload App (which keeps documents/data). Policy tells users to check exported Files and device/iCloud copies separately; it does not promise deletion of cloud copies by uninstalling. |

## Corrections from local review version

- Replaced unresolved support-retention wording with the owner's confirmed purpose-based policy and deletion request route.
- Added the actual source-evidence deletion control and clarified that it preserves replay protection and the ledger transaction.
- Replaced the generic app-data removal paragraph with Delete App versus Offload App guidance, preserving external-copy distinctions.
- Clarified TestFlight public-link versus direct-invitation identity visibility, developer use and retention, and Apple-held copies.
- Replaced public-facing draft labels, descriptions and notices with final policy wording and a publication-date field. No aesthetic or feature expansion was made.

## External sources checked

- [Apple TestFlight & Privacy](https://www.apple.com/legal/privacy/data/en/test-flight/)
- [Apple App Review Guidelines 5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage): policy covers handling, sharing, retention/deletion and contact requests. This audit is not a guarantee of App Review acceptance.
- [Apple iPhone storage guidance](https://support.apple.com/en-au/108429)
- [Cloudflare Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)

## Publication gate and separate handoff

Developer review of the prepared final policy is pending. Do not push the policy to a public repository or deploy until that review is complete. Its prepared effective date is 20 October 2026; update it to the Singapore date of the actual first public publication if publication occurs later. GitHub and Cloudflare are awaiting account sign-in.

Mailbox inbound/outbound testing and Boryn/App Store Connect URL coordination remain separate handoff work; neither is represented as completed. No Boryn code or Notion content was modified.
