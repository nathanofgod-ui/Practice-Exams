(() => {

  const DATA = [
    {
      topic:"Process Automation and Logic",
      select:2,
      prompt:"A logistics company, Nova Freight, assigns incoming shipment requests to specialized regional teams depending on the origin country. However, shipments coming from Japan require additional customs documentation before processing. The Administrator must both automate assignment and enforce required data for specific regions. Which two solutions should be implemented? Choose 2 answers",
      options:[
        {k:"A", t:"Configure duplicate rules to detect shipment origin inconsistencies"},
        {k:"B", t:"Use Lead Routing Automation to direct records to the correct team"},
        {k:"C", t:"Apply Validation Rules to ensure required regional fields are completed"},
        {k:"D", t:"Implement Escalation Rules to assign ownership"}
      ],
      correct:["B","C"],
      explanation:
`**Why B is right.** Assignment rules are Salesforce's purpose-built engine for automated, criteria-based record routing: each rule entry evaluates field values on the incoming record — here, shipment origin country — against a set of conditions and, on a match, hands the record to the right owner or queue with no manual triage. That's exactly "automate assignment" for a rule like "if origin country = Japan (or any other region), assign to the matching regional team queue."

**Why C is right.** Validation rules fire on save and block the record until its formula evaluates to false, which is the standard way to enforce conditionally-required data. A rule such as \`AND(Origin_Country__c = "Japan", ISBLANK(Customs_Documentation__c))\` stops a Japan-origin shipment from saving until the customs paperwork field is filled in, while leaving shipments from other regions unaffected — precisely "enforce required data for specific regions."

**Why A is wrong.** Duplicate rules compare incoming records against existing ones to catch duplicates (matching on things like name, account, or email) — they have no mechanism for routing a record to a team or for requiring a field to be filled in. They solve a data-quality problem, not this one.

**Why D is wrong.** Escalation rules are a Case-specific, time-based mechanism: they watch how long a Case has sat in a given state and reassign or notify once an age threshold is crossed. They don't evaluate a field like origin country at creation time, and they have no role in enforcing required fields — they only change ownership after a delay.`,
      sources:[
        {l:"Set Up Assignment Rules — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.customize_assignrules.htm&type=5"},
        {l:"Define Field Validation Rules — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fields_defining_field_validation.htm&type=5"},
        {l:"Set Up Escalation Rules — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.customize_escrules.htm&type=5"}
      ]
    },
    {
      topic:"Lightning App Builder and Page Customization",
      select:1,
      prompt:"A real estate company wants to dynamically display action buttons (e.g., \"Schedule Inspection\") only when a property is marked as \"Available\". Where should the admin configure this behavior?",
      options:[
        {k:"A", t:"Activity Timeline"},
        {k:"B", t:"Record Header (Highlights Panel)"},
        {k:"C", t:"Related Records Section"},
        {k:"D", t:"Field Detail Component"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Dynamic Actions is the feature that attaches visibility filters to individual quick actions/buttons, and it's configured on the Highlights Panel — the record header component — in Lightning App Builder. Selecting the Highlights Panel and opening its Actions list lets the admin add a filter to each action, such as Status equals "Available," so that action only renders on the page when the current record meets the condition. That's precisely "show this button only when the property is Available."

**Why A is wrong.** The Activity Timeline component surfaces a record's tasks and events (logged calls, upcoming meetings, emails) — it has no concept of quick actions or field-based visibility filters.

**Why C is wrong.** The Related Records section (or a related list component) displays child/related records for the current record. It's a data-display component, not a place to attach or filter action buttons.

**Why D is wrong.** A Field Detail component renders the value of a single field on the page. It has no actions to configure at all, filtered or otherwise.`,
      sources:[
        {l:"Create Dynamic Actions in Lightning App Builder — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=platform.lightning_app_builder_create_dynamic_action.htm&type=5"},
        {l:"Salesforce Dynamic Actions — Overview & Deep Dive Tutorial — Salesforce Ben", u:"https://www.salesforceben.com/salesforce-dynamic-actions-overview/"}
      ]
    },
    {
      topic:"Process Automation and Logic",
      select:1,
      prompt:"An admin created multiple record-triggered flows that run before saving on the same object. What must be considered regarding execution order?",
      options:[
        {k:"A", t:"Execution order is determined by flow API version"},
        {k:"B", t:"Execution follows creation timestamp"},
        {k:"C", t:"Execution sequence cannot be guaranteed"},
        {k:"D", t:"Execution follows flow label sorting"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Salesforce only guarantees run order between multiple record-triggered flows on the same object and trigger context when the admin explicitly sets a Trigger Order value on each flow (a number from 1–2,000). Leave that field blank on any of them, and Salesforce's own documentation says those flows just run "next, in the order of their activation dates" — not something an admin declared or can rely on. Worse, Salesforce explicitly warns that "activating, deactivating, or changing the order for one flow can cause the order for other flows to automatically update," so even that fallback ordering can silently shift over time. Without deliberately assigning Trigger Order to every flow that matters, the sequence is effectively out of the admin's control — which is exactly why the standard guidance is to either consolidate logic into a single flow per object/trigger-context or explicitly set Trigger Order wherever more than one flow must run in a specific sequence.

**Why A is wrong.** A flow's API version affects which runtime features and behaviors are available to it — it has no bearing on the sequence in which multiple flows fire on the same object.

**Why B is wrong.** It's tempting, but the actual fallback Salesforce documents is activation date, not creation date — and even that only applies until an admin sets an explicit Trigger Order, so "creation timestamp" isn't the mechanism at play here either way.

**Why D is wrong.** Flow labels are just a display name for admins; Salesforce's execution engine doesn't sort or evaluate them alphabetically (or otherwise) to decide run order.`,
      sources:[
        {l:"Define the Run Order of Record-Triggered Flows for an Object — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=platform.flow_task_trigger_run_order.htm&language=en_US&type=5"},
        {l:"Set Trigger Order on Flows — Apex Hours", u:"https://www.apexhours.com/set-trigger-order-on-flows/"}
      ]
    },
    {
      topic:"Lightning App Builder and Page Customization",
      select:1,
      prompt:"A company notices that its Lightning record pages load slowly due to many components. What should the admin use to analyze performance?",
      options:[
        {k:"A", t:"Apex Execution Logs"},
        {k:"B", t:"Lightning App Builder Analyze Tool"},
        {k:"C", t:"Developer Console Queries"},
        {k:"D", t:"SOQL Performance Inspector"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Lightning App Builder has a built-in Analyze button (top-right corner while editing a record page) built for exactly this: it inspects the page's fields, Related Lists component instances, and other metadata, then returns a predicted desktop load time and a mobile page-performance index, broken down by org-specific metrics, desktop, and phone — plus concrete suggestions like "remove this Related List component" or "reduce the number of fields." It's declarative, requires no code, and it's the tool built directly into the page-editing surface the admin is already working in.

**Why A is wrong.** Apex Execution Logs (debug logs) capture what happens during Apex code execution — governor-limit usage, DML, callouts — which is useful for diagnosing slow triggers or classes, not for measuring how long a declaratively-built Lightning record page with standard components takes to render.

**Why C is wrong.** The Developer Console's Query Editor runs ad hoc SOQL/SOSL against the database. It has no visibility into how many components a Lightning page loads or how that affects render time — it's a data tool, not a page-performance tool.

**Why D is wrong.** There's no such tool as a "SOQL Performance Inspector" in Salesforce. SOQL optimization (selectivity, indexes) is a separate concern from record-page rendering performance, which is exactly what makes this option a plausible-sounding distractor.`,
      sources:[
        {l:"Lightning Page Performance — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=platform.lightning_page_performance.htm&language=en_US&type=5"},
        {l:"The Analyze Button: Improve Your Salesforce Lightning Page Load Speed — Salesforce Ben", u:"https://www.salesforceben.com/the-analyze-button-improve-your-salesforce-lightning-page-load-speed/"}
      ]
    },
    {
      topic:"Process Automation and Logic",
      select:1,
      prompt:"A screen flow used for onboarding resets to the first screen after completion, confusing users. What is the best fix?",
      options:[
        {k:"A", t:"Configure the launch action to redirect after completion"},
        {k:"B", t:"Add a second flow to handle navigation"},
        {k:"C", t:"Use Apex to redirect users"},
        {k:"D", t:"Add a decision element at the end"}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** What users are seeing is normal behavior for a flow that finishes with no navigation instruction attached: the interview ends, but if nothing tells the browser to go anywhere else, the same component or URL just reinitializes and a new interview starts from screen one — it looks like a "reset." The fix lives on whatever launches the flow, not inside the flow's screens. For a URL-launched flow (a custom button, link, or Lightning page reference), Salesforce supports a \`retURL\` parameter on that launch URL — e.g. \`/flow/Onboarding_Flow?retURL={!Contact.Id}\` — that sends the user to a specific record or page once the flow finishes, instead of leaving them sitting on the same reinitializing component. That's exactly "configure the launch action to redirect after completion," and it's a pure configuration change with no new flow logic or code required.

**Why B is wrong.** A second flow adds an entire extra interview to maintain for a problem that isn't about flow logic at all — it's about what the browser does once the existing flow's interview has already ended. It doesn't address the root cause and adds unnecessary complexity.

**Why C is wrong.** Apex can force a redirect, but it's unnecessary here: Salesforce ships a declarative mechanism (the launch URL's retURL parameter, or an equivalent finish-behavior setting) for exactly this scenario. Reaching for code when a supported clicks-not-code option exists goes against standard admin best practice.

**Why D is wrong.** A Decision element evaluates conditions to branch the flow's own internal path *while it's running* — it has no effect on what happens to the user's browser after the interview has already finished, so it can't stop the "reset to screen one" behavior at all.`,
      sources:[
        {l:"Customize a Flow URL to Control Finish Behavior — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=platform.flow_distribute_internal_url_retURL.htm&language=en_US&type=5"},
        {l:"Flow: How To Redirect Your Users When Flows Finish (retURL) — Flowsome", u:"https://salesforce-flowsome.com/how-to-redirect-users-returl/"}
      ]
    },
    {
      topic:"Process Automation and Logic",
      select:1,
      prompt:"A SaaS company wants renewal subscriptions to be created automatically once a contract is marked as completed. What is the best approach?",
      options:[
        {k:"A", t:"Send reminder emails to account managers"},
        {k:"B", t:"Create a validation rule blocking completion"},
        {k:"C", t:"Use a record-triggered flow to generate renewals"},
        {k:"D", t:"Add a dashboard alert"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** A record-triggered flow watches the Contract (or equivalent) object and fires the instant the Status field changes to "Completed," running a Create Records element to generate the renewal subscription automatically — no human has to notice the status change or remember to act on it. That's precisely "created automatically once a contract is marked as completed": the trigger condition is the record change itself, and the outcome is a new record, both of which are exactly what record-triggered flows are built for.

**Why A is wrong.** A reminder email still depends on an account manager noticing it and manually creating the renewal — that's a notification, not automation. The requirement is for the renewal to be created automatically, and a human-in-the-loop step can't guarantee that.

**Why B is wrong.** A validation rule can only block a save when its condition is met — it has no ability to create a new record. Blocking contract completion also directly contradicts the goal, which assumes contracts *do* get marked completed and something should happen as a result, not that completion should be prevented.

**Why D is wrong.** A dashboard alert is a reporting/visibility feature — it surfaces information to someone looking at a dashboard, but it doesn't create records or run any logic on its own. It suffers from the same "still needs a human to act" gap as option A.`,
      sources:[
        {l:"Triggered Flows — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.flow_concepts_trigger.htm&type=5"},
        {l:"What Is a Record-Triggered Flow? — Salesforce Admins Blog", u:"https://admin.salesforce.com/blog/2023/what-is-a-record-triggered-flow"}
      ]
    },
    {
      topic:"Security and Access",
      select:1,
      prompt:"A healthcare company must ensure that sensitive patient fields are never exposed in outbound emails. What should the admin do?",
      options:[
        {k:"A", t:"Encrypt patient fields"},
        {k:"B", t:"Use approval workflows before sending emails"},
        {k:"C", t:"Remove sensitive fields from email templates"},
        {k:"D", t:"Restrict user profiles"}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Encrypted custom fields carry a hard guarantee that the other options don't: Salesforce's own documentation states that an encrypted field's merge field can be dropped into an email template, but "the displayed value is always masked." That masking is enforced by the platform at merge time, regardless of who edits the template later, which profile sends the email, or whether an approval step happened first — the real patient data physically never reaches the outbound email body. For a "must ensure ... never exposed" requirement, that's the only option here backed by an actual technical control rather than a process someone has to keep following correctly.

**Why B is wrong.** Salesforce approval processes govern whether a record's status can advance (e.g., a discount or a contract) — they have no mechanism for intercepting or gating an email before it's sent. Even where a workflow triggers an email as a side effect of approval, the approval step doesn't inspect or scrub email content, so it does nothing to stop sensitive data merging into the message.

**Why C is wrong.** Manually removing sensitive merge fields from today's templates fixes what currently exists, but it's a one-time housekeeping task, not an enforced rule — nothing stops the next admin or user from adding that merge field back into this template or a new one. "Never exposed" needs a control that holds even when someone makes a mistake later, and this doesn't provide one.

**Why D is wrong.** Profile restrictions control what a user can see and do inside Salesforce's own UI. They don't touch what happens to data once it's merged into outbound email content — a user with send-email permission and template access can still trigger an email containing an unencrypted sensitive field, no matter how tightly their profile is otherwise locked down.`,
      sources:[
        {l:"Classic Encryption for Custom Fields — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.fields_about_encrypted_fields.htm&type=5"},
        {l:"Salesforce Classic Encryption for Custom Fields Explained", u:"https://sfdclesson.com/2023/12/07/salesforce-classic-encryption-for-custom-fields-explained/"}
      ]
    },
    {
      topic:"Change Management",
      select:1,
      prompt:"A Company deploys metadata in two packages: one with objects, and another with automation and permissions. What must be considered?",
      options:[
        {k:"A", t:"Permissions automatically include field security"},
        {k:"B", t:"Automation must be deployed first"},
        {k:"C", t:"Field security must be manually verified post-deployment"},
        {k:"D", t:"Both packages must be deployed together"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Splitting the deployment this way means the profile/permission-set metadata in the second package is only as good as what actually lands in the target org — field-level security entries for a custom field don't magically populate just because the field and the permission metadata each deployed "successfully" on their own. Salesforce's own guidance on permission sets and profiles in change sets even calls out that field permissions can be carried into the target org independent of whether that field's own metadata was part of the same deployment — which means it's entirely possible for FLS to end up incomplete, stale, or silently not applied the way the admin intended, especially across two separately-managed packages. The safe practice is to open the deployed profiles/permission sets in the target org afterward and confirm the sensitive or newly-added fields actually carry the visibility and edit access that was intended — verification, not assumption.

**Why A is wrong.** Field-level security isn't a side effect of "permissions" in general — it's its own explicit set of \`fieldPermissions\` entries inside a profile or permission set. A permission set that grants object access doesn't automatically grant field access; each field has to be explicitly readable/editable in that metadata, so nothing here is automatic.

**Why B is wrong.** This has the dependency backwards. Automation (flows, validation rules, Apex) and permission metadata that reference an object's fields need those fields to already exist in the target org — so the objects package has to land first, not the automation/permissions package.

**Why D is wrong.** Nothing about Salesforce's deployment tooling requires two packages to be deployed in the same transaction. What matters is dependency order — objects and fields before the metadata that references them — not simultaneity. Two sequential deployments in the right order work fine; the risk this question is pointing at is what happens *after* both have landed, not whether they happened at the same moment.`,
      sources:[
        {l:"Permission Sets and Profile Settings in Change Sets — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=platform.changesets_perm_sets_profiles.htm&language=en_US&type=5"},
        {l:"Change Sets Best Practices — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=platform.changesets_best_practices.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Sandboxes and Environment Management",
      select:1,
      prompt:"A Company wants to anonymize sensitive financial data in Sandbox environments used for testing. What should be implemented?",
      options:[
        {k:"A", t:"Delete sensitive records manually"},
        {k:"B", t:"Restrict access via roles"},
        {k:"C", t:"Apply data masking techniques"},
        {k:"D", t:"Refresh Sandbox frequently"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Data masking is the purpose-built answer for "keep the data usable for testing, but anonymize the sensitive parts." Salesforce's own Data Mask tool runs against a sandbox and irreversibly scrambles or replaces sensitive field values — names, financial figures, SSNs, and the like — while preserving the record structure, volume, and relationships testers need. Everyone working in that sandbox still has realistic-looking data to test against, but the real financial values from production are gone, not just hidden behind a permission.

**Why A is wrong.** Manually deleting sensitive records removes the very data testers need to exercise the application realistically, doesn't scale across every object and record that might carry sensitive fields, and is easy to get wrong or leave incomplete — it solves "the data is gone" at the cost of "the data is useful," and doesn't even guarantee full coverage.

**Why B is wrong.** Restricting access via roles controls who can *see* the data inside Salesforce, but the real, unmasked financial data is still sitting in the sandbox database. That doesn't satisfy "anonymize" at all — it's an access control, not a data-transformation control, and it does nothing about exports, integrations, or anyone with broader access.

**Why D is wrong.** Refreshing a sandbox just pulls a fresh copy from production — it doesn't strip or obscure anything. If anything, frequent refreshes without masking mean the real sensitive data keeps getting reintroduced into the test environment on every refresh.`,
      sources:[
        {l:"Secure Your Sandbox Data with Salesforce Data Mask — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=platform.data_mask_overview.htm&language=en_US&type=5"},
        {l:"Salesforce Data Mask — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/salesforce-data-mask"}
      ]
    },
    {
      topic:"Process Automation and Logic",
      select:2,
      prompt:"A company wants to schedule tasks on whichever of two date fields is later. Which combination should be used? Choose 2 answers",
      options:[
        {k:"A", t:"Create a formula to determine the later date"},
        {k:"B", t:"Use automation to generate the task"},
        {k:"C", t:"Use approval processes to calculate dates"},
        {k:"D", t:"Use reports to trigger actions"}
      ],
      correct:["A","B"],
      explanation:
`**Why A and B are right.** Neither piece alone gets the job done. A formula field — something like \`IF(Date_1__c > Date_2__c, Date_1__c, Date_2__c)\`, or the equivalent \`MAX()\`-style comparison — is what actually determines which of the two dates is later; that's plain declarative logic Salesforce formulas are built for. On its own, though, a formula field just sits there holding a computed value — it doesn't create anything. That's where automation comes in: a record-triggered flow (or equivalent automation) reads that formula's value and uses a Create Records element to generate the Task, setting its due date/ActivityDate to the later date the formula worked out. Determine the value, then act on it — that's the combination the requirement actually needs.

**Why C is wrong.** Approval processes exist to route a record for sign-off and change its approval status; they have no date-comparison or date-calculation capability, and they're not a mechanism for creating unrelated Task records as a byproduct of comparing two fields.

**Why D is wrong.** Reports summarize and display existing data — they can be scheduled to run and even emailed, but they have no native ability to trigger record creation. A report can show you which records need a task; it can't generate the task itself.`,
      sources:[
        {l:"Sample Date Formulas — Salesforce Developers", u:"https://developer.salesforce.com/docs/atlas.en-us.usefulFormulaFields.meta/usefulFormulaFields/formula_examples_dates.htm"},
        {l:"Triggered Flows — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.flow_concepts_trigger.htm&type=5"}
      ]
    },
    {
      topic:"Security and Access",
      select:1,
      prompt:"At Apex Retail Group, two analysts belong to the same role and share identical permissions. However, only one of them can access a specific customer record owned by a regional manager. What is the most likely reason for this discrepancy?",
      options:[
        {k:"A", t:"A Sharing Rule grants access based on Territory"},
        {k:"B", t:"A manual Share was applied to one specific User"},
        {k:"C", t:"The Role Hierarchy restricts access for one User"},
        {k:"D", t:"A Validation Rule blocks visibility"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Every access mechanism that isn't manual sharing operates at the level of a role, profile, permission set, or a criteria-based group (like a territory or public group) — and since both analysts sit in the identical role with identical permissions, any of those would apply to both of them equally, not just one. The one mechanism built specifically to grant a single, individual user access to a single record — independent of their role, profile, or any group membership — is manual sharing: someone (the record owner, or anyone with "Full Access"/sharing rights) used the Sharing button on that customer record to add one named user with Read or Read/Write access. That's the only lever in Salesforce's sharing model that can produce "same role, same permissions, but different access to this one record."

**Why A is wrong.** A sharing rule based on Territory grants access to every user who's a member of the qualifying territory (or role/group), not to one hand-picked individual. If both analysts share a role — and nothing in the scenario suggests they're in different territories — a territory-based rule would extend access to both of them identically, not create a split.

**Why C is wrong.** Role hierarchy access flows from where a role sits relative to the record owner's role. Since both analysts are in the *same* role, the hierarchy treats them identically — it has no way to grant the record to one occupant of a role while withholding it from another occupant of that same role.

**Why D is wrong.** Validation rules only run at save time to block or allow a record from being committed with certain field values — they have no concept of visibility or record access, and can't hide or reveal a record to a viewing user at all.`,
      sources:[
        {l:"Grant Access to Records with Manual Sharing in Lightning Experience — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=platform.granting_access_to_records_lex.htm&language=en_US&type=5"},
        {l:"Sharing and Record Access Features — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=platform.managing_the_sharing_model.htm&type=5"}
      ]
    },
    {
      topic:"Process Automation and Logic",
      select:1,
      prompt:"A User encounters an error when executing a flow, while others with identical roles and permissions do not experience any issue. What is the best way to troubleshoot?",
      options:[
        {k:"A", t:"Grant the User full Administrative Access"},
        {k:"B", t:"Modify the flow to bypass sharing rules"},
        {k:"C", t:"Run the flow debugger simulating that specific user"},
        {k:"D", t:"Reassign the user to a different role"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Flow Builder's debugger has a "Run this flow as another user" option built for exactly this situation: it lets the admin re-execute the failing interview in that specific user's actual security context — their record access, field-level security, and object permissions — and watch each element's inputs and outputs as it runs. That surfaces the real cause (a missing field permission, a record the user can't see, a different data value on their account, etc.) directly, instead of guessing. It's the diagnostic step, not a fix, which is exactly what "best way to troubleshoot" is asking for.

**Why A is wrong.** Granting full admin access would very likely make the error disappear, but it doesn't tell you *why* it was happening — it papers over the symptom with a massive, inappropriate permission grant instead of identifying the actual gap, and violates least-privilege for no diagnostic benefit.

**Why B is wrong.** Making the flow run in system context (bypassing sharing) is a configuration change made blind, before the root cause is even known. If the real issue is something else entirely — a formula error, a missing field permission unrelated to sharing — this change doesn't fix it and quietly widens what the flow can touch for every user, not just the one having trouble.

**Why D is wrong.** The scenario already states other users with the identical role have no problem, so there's no evidence the role itself is the cause — reassigning it is a guess, not a diagnosis, and doesn't reveal what's actually different about this one user's context.`,
      sources:[
        {l:"Debug a Flow as Another User — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=platform.ls_debug_a_flow_as_another_user.htm&language=en_US&type=5"},
        {l:"Test or Troubleshoot Flows with the Flow Builder Debugger — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=platform.flow_test_debug.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Process Automation and Logic",
      select:2,
      prompt:"A System Admin receives alerts indicating that scheduled automation jobs are exceeding system limits related to delayed execution. Which two areas should be reviewed? Choose 2 answers",
      options:[
        {k:"A", t:"Scheduled workflow processes"},
        {k:"B", t:"Apex batch jobs"},
        {k:"C", t:"System Debug logs"},
        {k:"D", t:"Scheduled report subscriptions"}
      ],
      correct:["A","B"],
      explanation:
`**Why A and B are right.** Both are genuine asynchronous automation mechanisms that sit in a shared, limited queue and are documented sources of exactly this symptom. Time-dependent workflow actions (time-based workflow) are placed in an internal time-based workflow queue for later execution, and Salesforce's own support documentation acknowledges that those pending actions can sit in that queue past their scheduled time when volume is high — precisely "delayed execution." Batch Apex has its own hard governor limits (a capped number of batch jobs that can be queued or active at once, and a per-24-hour cap on batch/scheduled/future job executions); once an org is running close to those ceilings, new batch or scheduled jobs get pushed back or fail to start on schedule. Both are squarely "scheduled automation" and both are documented as capacity-limited, so they're exactly where a queueing/delay alert points.

**Why C is wrong.** Debug logs are a diagnostic record of what already happened during execution — they consume their own separate storage/retention limits, but they are not themselves a scheduled or automated job, and reviewing them doesn't address a queue of pending automation running late.

**Why D is wrong.** Scheduled report subscriptions run under the reporting/analytics scheduler and its own org limit on total scheduled reports — a different system from the Apex/workflow automation queue. They're not typically what's meant by "automation jobs," and delays there stem from a different capacity ceiling than the one being alerted on here.`,
      sources:[
        {l:"Workflow Actions Remain in the Time-Based Workflow Queue Past Their Scheduled Time — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=000387169&language=en_US&type=1"},
        {l:"Execution Governors and Limits — Apex Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_gov_limits.htm"}
      ]
    },
    {
      topic:"Security and Access",
      select:1,
      prompt:"A financial organization wants to restrict large-scale data exports especially for records containing confidential information. Which feature should be configured?",
      options:[
        {k:"A", t:"Encryption policies"},
        {k:"B", t:"Export data filters and permissions"},
        {k:"C", t:"Field-Level Security"},
        {k:"D", t:"API Access restrictions"}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** Large-scale, bulk extraction of records — the scenario this question is actually worried about — happens through the API (Data Loader, Bulk API, integrations, custom scripts), not through someone clicking through the UI one record at a time. "API Enabled" is what lets a user's credentials be used that way at all, and it's a documented risk multiplier: object permissions, field-level security, and sharing still bound *what* a token can see, but API Enabled removes the human pace that would otherwise limit *how fast* it's extracted — an API-enabled account with broad access can pull everything it can see, in bulk, in minutes. Restricting API access — removing "API Enabled" from broad profiles, granting it only through narrow permission sets for dedicated integration users, and layering on IP ranges/login-hour restrictions — is the control that specifically targets that bulk-extraction channel.

**Why A is wrong.** Encryption protects the confidentiality of data at rest and in transit, but it doesn't limit who can pull how much of it. A user or integration with legitimate decrypt/view rights can still export the same encrypted-at-rest records in bulk — encryption doesn't touch export volume or throughput at all.

**Why B is wrong.** There's no dedicated Salesforce feature called "export data filters and permissions" that governs bulk export scale — it's a plausible-sounding but generic distractor, not a concrete configurable control the way API access restrictions are.

**Why C is wrong.** Field-level security hides specific fields from users who shouldn't see them, which is valuable, but it doesn't address scale. A user who does have legitimate access to a confidential field can still export every record containing it in one large API pull — FLS decides *what's visible*, not *how much can be extracted at once*.`,
      sources:[
        {l:"API Enabled Permission in Salesforce: Risks & Controls — Flosum", u:"https://www.flosum.com/blog/unlocking-the-power-of-api-enabled-permission-salesforce"},
        {l:"Secure API Access with the New Least-Privilege User Profile — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=release-notes.rn_api_new_user_profile.htm&language=en_US&release=248&type=5"}
      ]
    },
    {
      topic:"Auditing and Monitoring",
      select:1,
      prompt:"A company wants a quick overview of security risks, including publicly accessible data across objects. Which tool should be used?",
      options:[
        {k:"A", t:"Setup Change Log"},
        {k:"B", t:"Security Health Dashboard"},
        {k:"C", t:"Login History"},
        {k:"D", t:"Object Schema Viewer"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Salesforce's Security Health Check (found under Setup → Security) is built for exactly this — a single screen that scores the org against a security baseline and lists specific at-risk settings, grouped by risk level, including overly permissive sharing and access settings that leave data more broadly visible than intended. It's the one tool here designed to answer "where are we exposed right now" across the org's settings in one glance, rather than requiring the admin to dig through individual objects one at a time.

**Why A is wrong.** Setup Audit Trail (the setup change log) records *who changed what configuration and when* — it's a historical log of admin actions, useful for tracing when a risky setting was introduced, but it doesn't score or summarize current risk exposure at all.

**Why C is wrong.** Login History records individual login attempts (user, time, IP, status) for auditing access patterns — it says nothing about sharing settings, object/field exposure, or org-wide security posture.

**Why D is wrong.** There's no "Object Schema Viewer" that surfaces security risk — Schema Builder (the closest real tool by that description) visualizes objects, fields, and relationships for data-model design, not sharing settings or exposure risk.`,
      sources:[
        {l:"Security Health Check — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=xcloud.security_health_check.htm&type=5"},
        {l:"How Is the Health Check Score Calculated? — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.security_health_check_score.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Security and Access",
      select:2,
      prompt:"An organization is implementing multi-factor (MFA). Which components are required? Choose 2 answers",
      options:[
        {k:"A", t:"A password credential"},
        {k:"B", t:"A Mobile Authentication App"},
        {k:"C", t:"A Session Timeout Policy"},
        {k:"D", t:"A Data Encryption certificate"}
      ],
      correct:["A","B"],
      explanation:
`**Why A and B are right.** MFA means proving identity with two different *kinds* of factor, not two of the same kind. A username and password is the first factor — something the user knows — and it's the baseline login credential MFA layers on top of, not something MFA replaces. The second, different factor has to be something the user *has*, and Salesforce's supported verification methods for that are built around exactly this: a mobile authenticator app (Salesforce Authenticator, Google Authenticator, or a similar TOTP app) generating a one-time code or push approval, or a physical security key. Between the two options offered here, the password plus a mobile authenticator app is precisely the "something you know" + "something you have" pairing that makes authentication multi-factor.

**Why C is wrong.** A session timeout policy controls how long an already-authenticated session stays active before it's forced to log in again — it's a session-management setting, not a factor used to verify identity at login. An org can have long or short session timeouts with or without MFA in place; the two aren't the same control.

**Why D is wrong.** A data encryption certificate protects data at rest or in transit — it has nothing to do with proving who's logging in. Confusing encryption with authentication is a common trap: one protects stored/transmitted data, the other verifies identity, and MFA is squarely about the latter.`,
      sources:[
        {l:"Verification Methods for Multi-Factor Authentication — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.mfa_supported_verification_methods.htm&type=5"},
        {l:"Salesforce Multi-Factor Authentication", u:"https://security.salesforce.com/mfa"}
      ]
    },
    {
      topic:"Process Automation and Logic",
      select:1,
      prompt:"A Company wants to send an immediate alert when a deal is approved and also send a reminder one week before the expected closing date. What is the best solution?",
      options:[
        {k:"A", t:"Scheduled Flow running daily"},
        {k:"B", t:"Record-triggered Flow with scheduled paths"},
        {k:"C", t:"Workflow rule with time triggers"},
        {k:"D", t:"Apex Scheduled job"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** A single record-triggered flow on the deal object can do both halves declaratively: its immediate (default) path fires the instant the record is saved as approved and sends the alert right away, while a scheduled path attached to the same flow is set to run "1 week before" the Closing Date field and sends the reminder at exactly the right moment for each record — no separate automation needed. This is precisely what Scheduled Paths were built to replace: one trigger, an immediate action, and a time-based branch relative to a date field on the record, all declarative.

**Why A is wrong.** A scheduled flow that runs once a day has to query every day for "deals closing in exactly a week" and has no natural way to also fire "immediately upon approval" — that part still needs a separate trigger, so this option only really covers half the requirement (and imprecisely, since it checks on a daily schedule rather than reacting to the record change).

**Why C is wrong.** Workflow Rules with time-dependent actions could technically approximate this, but Salesforce retired the ability to create new Workflow Rules — it's a legacy mechanism being phased out in favor of Flow, so it's not "the best solution" for a company building new automation today.

**Why D is wrong.** An Apex scheduled job means writing and maintaining code to do something a record-triggered flow already does natively and declaratively — unnecessary complexity and ongoing maintenance burden for a requirement Flow Builder covers out of the box.`,
      sources:[
        {l:"Run Part of a Record-Triggered Flow After the Triggering Event — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=release-notes.rn_forcecom_flow_fbuilder_scheduled_paths.htm&language=en_US&release=230&type=5"},
        {l:"Add a Scheduled Task to Your Flow — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/record-triggered-flows/add-a-scheduled-task-to-your-flow"}
      ]
    },
    {
      topic:"Data and Analytics Management",
      select:1,
      prompt:"A company must store audit logs related to customers, ensuring data is retained independently and secured separately from the main customer record. Which relationship type should be used?",
      options:[
        {k:"A", t:"Master-detail"},
        {k:"B", t:"Lookup"},
        {k:"C", t:"Hierarchical"},
        {k:"D", t:"External relationship"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** A lookup relationship is the one relationship type where the child record's lifecycle and security are genuinely independent of its parent. Deleting the customer record doesn't cascade and delete its related audit log records (unless an admin explicitly turns on cascade-delete for that specific lookup, which isn't the default), so the logs are "retained independently." And because a lookup child keeps its own organization-wide default, sharing rules, and role-based access — rather than inheriting the parent's — the audit log object can be secured with its own, tighter access model, completely separate from whoever can see the customer record. That's exactly "retained independently and secured separately."

**Why A is wrong.** Master-detail is built for the opposite behavior: the detail record's security is inherited from the master (no independent OWD/sharing on the detail side), and deleting the master record deletes every detail record with it. That fails both stated requirements — the logs wouldn't be retained independently, and they couldn't be secured on their own terms.

**Why C is wrong.** Hierarchical relationships are a special-purpose lookup variant available only on the User object (used for manager chains) — they don't apply to a custom Audit Log-to-Customer relationship at all.

**Why D is wrong.** An external lookup relationship links a Salesforce object to data sitting in an external system via Salesforce Connect. There's nothing in this scenario suggesting the audit logs live outside Salesforce, so this relationship type doesn't fit the requirement.`,
      sources:[
        {l:"Considerations for Object Relationships — Salesforce Help", u:"https://help.salesforce.com/HTViewHelpDoc?id=relationships_considerations.htm"},
        {l:"Cascade Delete Does Not Work on Custom Lookup Fields by Default — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=000349100&language=en_US&type=1"}
      ]
    },
    {
      topic:"Security and Access",
      select:2,
      prompt:"A Sales rep wants to add members to a deal team but lacks permission. Which two conditions must be met? Choose 2 answers",
      options:[
        {k:"A", t:"The user must own the deal"},
        {k:"B", t:"The user must have edit access to the deal"},
        {k:"C", t:"The user must be higher in the role hierarchy"},
        {k:"D", t:"The user must own the related account"}
      ],
      correct:["A","B"],
      explanation:
`**Why A and B are right.** Adding members to an Opportunity Team ("deal team") is, by default, a privilege tied to the record owner: Salesforce's standard behavior is that the person who owns the opportunity is the one who sees the "Add" action on the Opportunity Team related list, and using it requires that they also have Edit access on that opportunity (which an owner has by default, but which can be affected by field-level restrictions or a more locked-down sharing model). Both conditions together — being the owner, and holding edit rights on the record — are what the standard opportunity team feature checks before letting someone manage the team; without a specific admin-configured exception, a rep who's neither can't add team members even with view access to the deal.

**Why C is wrong.** Sitting higher in the role hierarchy can grant a manager visibility and edit access to a subordinate's opportunities through hierarchy-based sharing, but that's a *consequence* that can produce edit access — it isn't itself a stated requirement for managing team members. Plenty of users with edit access via other means (a sharing rule, a manual share) hold no special role-hierarchy position at all.

**Why D is wrong.** Owning the related Account doesn't carry any special rights over the Opportunity's team membership. Account ownership and Opportunity ownership are tracked independently, and Salesforce's opportunity team feature checks access on the Opportunity record itself, not on whatever Account it's related to.`,
      sources:[
        {l:"Who Can Add Opportunity Team Members in Salesforce — Bardeen", u:"https://www.bardeen.ai/answers/who-can-add-opportunity-team-members-in-salesforce"},
        {l:"Maintain Your Users' Opportunity Teams — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.opportunity_team_members_adding.htm&language=en_US"}
      ]
    },
    {
      topic:"Auditing and Monitoring",
      select:1,
      prompt:"An admin wants to track who changed a field's configuration (e.g., data type change). Which tool should be used?",
      options:[
        {k:"A", t:"Field tracking"},
        {k:"B", t:"Debug logs"},
        {k:"C", t:"Setup audit trail"},
        {k:"D", t:"Object usage metrics"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Setup Audit Trail logs administrative/metadata changes made in Setup — who created, deleted, or modified a field definition (including its data type), who changed a profile or permission set, who edited a validation rule, and so on — each entry captures the user, the date/time, and a description of what setup change was made. Changing a field's data type is exactly a configuration/metadata change, which is precisely what this tool is built to record.

**Why A is wrong.** Field (History) Tracking logs changes to a field's *data* on individual records — e.g., that Status went from "Open" to "Closed" on a specific record — not changes to the field's own definition or schema. It's a common mix-up: "tracking a field" sounds similar, but it operates on record values, not on the field's configuration.

**Why B is wrong.** Debug logs capture what happens during code/flow execution (Apex, triggers, workflow) for a given transaction — they have nothing to do with who reconfigured a field's metadata in Setup.

**Why D is wrong.** There's no Salesforce feature called "Object usage metrics" for this purpose — adoption/usage-style dashboards show how records or features are being used, not who changed an object's or field's configuration.`,
      sources:[
        {l:"Monitor Setup Changes with Setup Audit Trail — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.admin_monitorsetup.htm&language=en_US&type=5"},
        {l:"Field History Tracking vs. Setup Audit Trail — Salesforce Ben", u:"https://www.salesforceben.com/field-history-tracking-vs-setup-audit-trail-monitoring-changes-in-salesforce/"}
      ]
    },
    {
      topic:"Security and Access",
      select:1,
      prompt:"At Vertex Engineering, project members come from multiple departments and need to receive notifications when a project status changes to \"Approved\". What is the most scalable way to ensure all relevant users receive the notification?",
      options:[
        {k:"A", t:"Assign all users to a queue and notify the queue"},
        {k:"B", t:"Create a public group and use it in the notification configuration"},
        {k:"C", t:"Place all users under a single role and notify that role"},
        {k:"D", t:"Use sharing rules to grant access and trigger emails"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** A public group is Salesforce's purpose-built way to bundle an arbitrary mix of users, roles, roles-and-subordinates, and even other groups — regardless of which department, role, or profile they belong to — into one reusable membership list. Email alerts (used by flows, approval processes, and workflow rules) explicitly support "Public Groups" as a recipient type, so the group can be referenced directly in the notification configuration for the "Approved" status change. Because membership is maintained in one place, adding or removing a project member later is a single edit to the group — every automation that references it stays correct automatically, which is exactly what "most scalable" is asking for.

**Why A is wrong.** Queues exist to hold unassigned records for a team to pick up and work from (cases, leads, etc.) — they're a record-routing mechanism, not a general-purpose distribution list for arbitrary cross-department notifications. Stretching a queue to do this job misuses the feature and doesn't fit teams who don't actually own or work the record together.

**Why C is wrong.** The role hierarchy exists to model reporting structure and drive record-level sharing — it's a data-access mechanism, not a notification list. Forcing unrelated users from different departments into a single artificial role just to enable a notification would distort the org's sharing model for everyone in that role, and is a heavy, disruptive way to solve a much simpler problem.

**Why D is wrong.** Sharing rules grant record access to a group of users based on criteria or ownership — they have no built-in capability to "trigger emails." Access and notification are two separate concerns, and sharing rules only address the first.`,
      sources:[
        {l:"Add Email Alerts to the Approval Process — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=platform.ls_add_email_alerts.htm&language=en_US&type=5"},
        {l:"How to Send Email to a Public Group in Salesforce — MicroPyramid", u:"https://micropyramid.com/blog/how-to-send-email-to-a-public-group-in-salesforce/"}
      ]
    },
    {
      topic:"Data and Analytics Management",
      select:1,
      prompt:"A company wants to ensure customers receive the correct level of support based on their subscription agreements. What feature should be implemented?",
      options:[
        {k:"A", t:"Case Assignment Rules"},
        {k:"B", t:"Custom Support Object"},
        {k:"C", t:"Entitlement management"},
        {k:"D", t:"Workflow Alerts"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Entitlement Management is Salesforce's purpose-built framework for exactly this: an Entitlement (optionally backed by a Service Contract representing the customer's subscription/warranty terms) defines what level of support a customer is owed — which support processes apply, what SLA response/resolution times are attached, and which entitled products or service accounts are covered. Entitlement Processes and Milestones then track and enforce those service-level commitments against Cases automatically, tying the support experience directly back to what the customer actually purchased.

**Why A is wrong.** Case Assignment Rules route an already-created case to the right queue or agent based on criteria like case origin or type — they don't define or enforce what level of service a customer is contractually owed, they just decide who picks up the case.

**Why B is wrong.** There's no standard Salesforce feature called a "Custom Support Object" — building an ad hoc custom object to track subscription-based support levels would mean reinventing, from scratch, functionality (SLA timers, milestone tracking, entitlement verification on case creation) that Entitlement Management already provides natively.

**Why D is wrong.** Workflow Alerts just send emails when criteria are met — they have no concept of subscription tiers, SLA timers, or verifying what support level a case is entitled to; they're a notification mechanism, not a service-level framework.`,
      sources:[
        {l:"Set Up Service-Level Agreements — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=support_service_level_agreements.htm&type=0"},
        {l:"Get Started with Entitlements — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/entitlement-management-for-lightning-experience/get-started-with-entitlements"}
      ]
    },
    {
      topic:"Lightning App Builder and Page Customization",
      select:1,
      prompt:"A global company wants to highlight accounts from a specific country due to temporary operational issues. What is the best approach?",
      options:[
        {k:"A", t:"Create a new record type for those accounts"},
        {k:"B", t:"Add conditional visibility to a component on the page"},
        {k:"C", t:"Modify the page Layout to reorganize fields"},
        {k:"D", t:"Use in-app guidance popups"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Visibility Rules (dynamic/component visibility) in Lightning App Builder let an admin show a component — a banner, a rich text alert, a highlighted panel — only when a field on the record meets a condition, such as Billing Country equals the affected country. It's declarative, takes minutes to add, surfaces the alert directly on the record page exactly where users are already looking, and — critically for a *temporary* situation — it's just as fast to remove or adjust once the operational issue is resolved, with zero lasting structural change to the org.

**Why A is wrong.** A record type changes which picklist values, page layout, and business process apply to a whole category of records — it's meant for permanent differences in business process, not a temporary visual highlight. Creating and later retiring a record type just to flag a short-term issue is a heavyweight, hard-to-reverse solution for something that should be trivial to turn on and off.

**Why C is wrong.** Reorganizing fields on a page layout changes the layout for everyone who has that layout assigned, all the time — it doesn't visually flag or call out anything, and it isn't scoped to only the accounts from the affected country; every account using that layout looks the same regardless of country.

**Why D is wrong.** In-app guidance is a walkthrough/prompt feature tied to where a user navigates in the app (a tab, an object home) — it's not built to key off a specific field's value on an individual record, so it can't selectively highlight only the accounts from one country.`,
      sources:[
        {l:"Visibility Rules on Lightning Pages — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=platform.lightning_page_components_visibility.htm&language=en_US&type=5"},
        {l:"Add Visibility Rules for Dynamic Pages — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/lightning_app_builder/add-visibility-rules-for-dynamic-pages-lab"}
      ]
    },
    {
      topic:"Auditing and Monitoring",
      select:2,
      prompt:"An admin cannot find login verification history for a user who has not logged in recently. Which two reasons explain this? Choose 2 answers",
      options:[
        {k:"A", t:"Data is stored only for a limited number of records"},
        {k:"B", t:"Data is retained indefinitely"},
        {k:"C", t:"History is only stored for a limited time period"},
        {k:"D", t:"Data is filtered based on user role"}
      ],
      correct:["A","C"],
      explanation:
`**Why A and C are right.** Salesforce documents both a time cap and a row-count cap on login history in the same breath: the Login History page "shows up to 20,000 records of user logins for the past 6 months." That's two separate limits working together. The 6-month window (C) means a user who genuinely hasn't logged in recently can simply have aged out — anything older than 6 months is gone, downloadable or not. The 20,000-record cap (A) means that even within that 6-month window, an org with heavy login volume can push older entries out of what's viewable on the page before the 6 months are even up. Either limit, alone or together, is a completely mundane explanation for "I can't find this user's login record" — no wrongdoing or misconfiguration required.

**Why B is wrong.** This is the opposite of how Login History actually behaves — Salesforce explicitly caps retention at 6 months, it isn't kept forever, so "retained indefinitely" can't be the explanation for missing data (if anything, the limited retention is exactly why it's missing).

**Why D is wrong.** Login History isn't scoped or filtered by the *viewing* user's role — it's an org-wide log of authentication events. Whether a specific admin can see it is governed by permissions like "View Setup and Configuration" or "Manage Users," not by where their role sits in the hierarchy, and that's a permissions question, not a data-retention one.`,
      sources:[
        {l:"Monitor Login History — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.users_login_history.htm&type=5"},
        {l:"How to Download Login History in Salesforce — Merfantz", u:"https://www.merfantz.com/blog/how-to-download-login-history-in-salesforce/"}
      ]
    },
    {
      topic:"Security and Access",
      select:1,
      prompt:"A large enterprise wants department managers to create and manage users only within their own department. What should be configured?",
      options:[
        {k:"A", t:"Permission Set Groups"},
        {k:"B", t:"Delegated Administration"},
        {k:"C", t:"Custom Profiles"},
        {k:"D", t:"Territory hierarchy"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Delegated Administration is built specifically to hand a slice of admin capability to non-admin users without giving them the System Administrator profile. A Delegated Administration group defines which roles (and their subordinates) a delegate can create, edit, freeze, or reset passwords for, and which profiles they're allowed to assign — so a department manager can be scoped to manage only the users in their own department's role branch, and nothing outside it. That's exactly "create and manage users only within their own department."

**Why A is wrong.** Permission Set Groups bundle multiple permission sets into one assignable unit to simplify granting *feature/object access* to users — they have no concept of scoping who is allowed to create or manage other user records.

**Why C is wrong.** A custom profile controls what a given user can see and do once granted, but "Manage Users" is an org-wide permission on a profile — a profile has no built-in mechanism to restrict a manager to only the users in their own department. Giving a profile "Manage Users" grants it org-wide, not department-scoped.

**Why D is wrong.** Territory hierarchy is a sales feature for structuring account/opportunity assignment and forecasting across territories — it has nothing to do with granting or scoping user-administration rights.`,
      sources:[
        {l:"Define Delegate Administrators — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.delegating_user_administration.htm&language=en_US&type=5"},
        {l:"How to Set Up a Delegate Administrator in Salesforce — Salesforce Ben", u:"https://www.salesforceben.com/how-to-set-up-a-delegate-administrator-in-salesforce/"}
      ]
    },
    {
      topic:"Auditing and Monitoring",
      select:1,
      prompt:"Users report missing automated email notifications due to system limits. What should the admin review?",
      options:[
        {k:"A", t:"Email Delivery Logs"},
        {k:"B", t:"Notification Builder Settings"},
        {k:"C", t:"Workflow queue"},
        {k:"D", t:"External messaging Logs"}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Salesforce's email logs record every outbound email attempt from the org — sender, recipient, timestamp, and a status/error code for each message, including entries that show a send failed because the org exceeded its daily (or per-org) email allocation. When users report notifications simply not arriving and a system limit is suspected, the email log is the direct diagnostic record of what was actually sent, what bounced, and what was blocked and why — exactly the evidence needed to confirm (or rule out) a limit as the cause.

**Why B is wrong.** There's no standard Salesforce feature called "Notification Builder Settings." Custom Notification Types configure in-app/mobile push notifications, which is a different delivery channel entirely from the automated emails described here.

**Why C is wrong.** A workflow queue view can show pending time-based actions waiting to fire, but it doesn't tell you why an email that *did* attempt to send failed to reach anyone — that detail (bounce, limit exceeded, invalid address) lives in the email log, not in the automation's queue state.

**Why D is wrong.** "External messaging logs" isn't a Salesforce feature — Salesforce's own automated emails are tracked in its own email logs, not in some separate external system's log, since the emails originate from Salesforce itself.`,
      sources:[
        {l:"Use Email Logs to Monitor Emails Sent from Salesforce — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.emailadmin_monitor_emails_sent_from_salesforce.htm&type=5"},
        {l:"Email Log Reference — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.email_logs_format.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Security and Access",
      select:2,
      prompt:"A company wants to grant users additional access to a Product Catalog without modifying existing profiles. Which two options can be used? Choose 2 answers",
      options:[
        {k:"A", t:"Assign a Permission Set with required access"},
        {k:"B", t:"Clone the profile and update Permissions"},
        {k:"C", t:"Modify standard Profile Permissions"},
        {k:"D", t:"Use Sharing Rules to grant access"}
      ],
      correct:["A","B"],
      explanation:
`**Why A and B are right.** "Additional access to a Product Catalog" is fundamentally an object/field-permission question — can the user read (and maybe edit) the catalog object and its fields at all — and both of these options grant exactly that kind of access while leaving every *existing* profile record completely untouched. A permission set is the modern, purely additive way to do it: it layers extra object, field, and user permissions onto whichever profile a user already has, with zero edits to that profile. Cloning the profile and updating the clone's permissions is the older alternative that satisfies the same constraint just as literally — the original profile is never touched, only a brand-new profile record is edited, and the affected users are then reassigned to that clone. Either way, nothing about any pre-existing profile changes.

**Why C is wrong.** This directly contradicts the requirement — modifying standard profile permissions is exactly the "modifying existing profiles" the company wants to avoid, and it would affect every single user already on that profile, not just the ones who need the extra catalog access.

**Why D is wrong.** Sharing rules only extend *record-level* visibility among users who already have base object permission — they don't grant the underlying ability to access the object at all. If the real gap is that users currently have no access to the Product Catalog object, a sharing rule does nothing on its own: there's no object-level permission for it to widen visibility within. It solves a different problem (which records within an object a user can see) than the one described here (whether the user can access the catalog object in the first place).`,
      sources:[
        {l:"Permission Sets and Permission Set Groups — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=platform.perm_sets_overview.htm&language=en_US&type=5"},
        {l:"Considerations for Using Profiles — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.users_profiles_considerations.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Data and Analytics Management",
      select:1,
      prompt:"A manager wants to report how many unique clients each sales rep has worked with. What is the best solution?",
      options:[
        {k:"A", t:"Create a summary formula counting distinct clients"},
        {k:"B", t:"Add a filter for unique client names"},
        {k:"C", t:"Use bucket fields for grouping"},
        {k:"D", t:"Create a checkbox and summarize"}
      ],
      correct:["A"],
      explanation:
`**Why A is right (with one important clarification).** A true report Summary Formula field (the kind that uses functions like SUM, AVG, PARENTGROUPVAL) actually can't do a distinct count on its own — Salesforce summary formulas have no COUNTD-style operator. The feature that genuinely solves this requirement is a close cousin built directly into report columns: Salesforce's "Unique Count" column summary, added from a column's menu (Show Unique Count), which displays exactly "the number of unique column values in report results" as both a subtotal per group and a grand total — duplicates aren't counted. Grouped by Sales Rep with Unique Count turned on for the Client/Account column, each rep's subtotal is precisely the number of distinct clients they've worked with. Among the four options here, that's the one describing "add a summary that counts distinct clients directly on the report" — the real mechanism just goes by a slightly different name than "formula."

**Why B is wrong.** A filter only includes or excludes rows based on criteria — it has no ability to deduplicate values or produce a count of how many distinct values remain. Filtering "for unique client names" isn't something a report filter can even express.

**Why C is wrong.** Bucket fields let an admin group a field's values into custom named categories (useful for consolidating messy or inconsistent naming) — they don't produce a distinct-value count on their own, and nothing in this scenario suggests the client names need re-categorizing rather than simply being counted.

**Why D is wrong.** This describes an old manual workaround (flag only the first occurrence of each rep/client pairing via a formula or flow, then sum the checkbox) that predates Salesforce's native Unique Count feature — it requires extra automation to maintain and is far more fragile and roundabout than using the built-in column summary built for exactly this purpose.`,
      sources:[
        {l:"Count Unique Values in Report Results — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.reports_count_unique_values.htm&language=en_US&type=5"},
        {l:"Getting Distinct Count When COUNTD Is Not Available — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=001467017&type=1"}
      ]
    },
    {
      topic:"Change Management",
      select:3,
      prompt:"Which three considerations apply when deploying metadata using change sets? Choose 3 answers",
      options:[
        {k:"A", t:"Validation can be performed before deployment"},
        {k:"B", t:"Dependencies must be manually included"},
        {k:"C", t:"Connections between orgs must be configured"},
        {k:"D", t:"Deployment order does not matter"},
        {k:"E", t:"Apex tests are optional in production"}
      ],
      correct:["A","B","C"],
      explanation:
`**Why A, B, and C are right.** Each is a documented, real-world step in the change set workflow. Validation (A) is a built-in option on an inbound change set — clicking "Validate" runs the deployment (including any required Apex tests) without actually committing it, so an admin can confirm it will succeed before pulling the trigger for real, and a successful validation even unlocks Quick Deploy later. Dependencies (B) are surfaced for you via "View/Add Dependencies," but Salesforce's own help is explicit that you still have to "add dependent components to a change set, unless the dependent components exist in every org where this change set is deployed" — the system identifies them, the admin still has to select and add them. And connections (C) are a hard prerequisite: two orgs can't exchange a change set at all until a deployment connection is established between them in Deployment Settings on both sides.

**Why D is wrong.** Order matters a great deal — a component that references another (a field used on a page layout, a flow that calls an Apex class) generally needs its dependency already present or included in the same change set; deploying in the wrong order, or leaving a dependency out entirely, is one of the most common ways a change set deployment fails.

**Why E is wrong.** Apex tests aren't optional the moment Apex code is part of what's being deployed to production — Salesforce enforces its standard code-coverage requirements (75% overall, every trigger with some coverage) on any production deployment containing Apex, change set or otherwise. Tests only become a non-issue when there's no Apex in the change set at all — "optional in production" as a blanket statement isn't accurate.`,
      sources:[
        {l:"View and Add Dependent Components to a Change Set — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=platform.changesets_outbound_dependencies.htm&language=en_US&type=5"},
        {l:"Change Sets Best Practices — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=platform.changesets_best_practices.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Security and Access",
      select:1,
      prompt:"A company stores employee review data in a custom object. Even with private access, managers can still see records. What should be done?",
      options:[
        {k:"A", t:"Remove object access from managers"},
        {k:"B", t:"Disable hierarchy-based access"},
        {k:"C", t:"Reassign ownership of records"},
        {k:"D", t:"Modify sharing rules"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** For custom objects, the sharing settings page has a "Grant Access Using Hierarchies" checkbox, and it's checked by default. When it's on, the role hierarchy opens up access vertically — anyone in a role above a record's owner can see that record, automatically, on top of whatever the org-wide default says. That's exactly what's happening here: OWD is Private, but managers still see their reports' review records because the role hierarchy is still granting them that access behind the scenes. Unchecking that box for the custom object turns that vertical grant off, so Private actually behaves like Private — nobody sees a review record except its owner (or anyone given access some other explicit way). This checkbox only exists for custom objects; standard objects always honor the hierarchy and can't have it disabled, which is precisely why sensitive custom data like performance reviews needs this extra step that most standard-object private data doesn't.

**Why A is wrong.** Removing managers' object-level access (via profile or permission set) would block them from the object entirely, not just from records they shouldn't see — they'd lose the ability to view or manage review records they legitimately do own or are explicitly shared into, which is broader than the problem calls for.

**Why C is wrong.** Reassigning ownership doesn't fix the underlying leak — whoever the new owner is, their manager (and their manager's manager) would still inherit access up the role hierarchy the same way, since the hierarchy grant isn't tied to any particular owner, it's tied to the object's setting.

**Why D is wrong.** Sharing rules only ever open up access further — they can grant additional users or groups access to records that OWD would otherwise hide. There's no such thing as a sharing rule that revokes access; it can't be used to claw back the visibility that hierarchy access is already granting.`,
      sources:[
        {l:"Controlling Access Using the Role Hierarchy — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=platform.security_controlling_access_using_hierarchies.htm&type=5"},
        {l:"Grant Access Using Hierarchies — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.security_owd_hierarchy_checkbox.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Security and Access",
      select:1,
      prompt:"At Helios Manufacturing, the HR department maintains a custom object called Job_Position__c that includes a picklist field for Salary_Band__c. The values of this picklist need to be updated frequently by HR coordinators, but the System Administrator wants to avoid granting them full administrative access. Which feature should the Administrator configure to allow HR coordinators to manage the picklist values?",
      options:[
        {k:"A", t:"Grant \"Modify All Data\" permission through a permission set"},
        {k:"B", t:"Assign delegated administration rights for the Job_Position__c object"},
        {k:"C", t:"Create a Screen Flow that updates picklist values dynamically"},
        {k:"D", t:"Set Field-Level Security to editable for the Salary_Band__c field"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Delegated administration exists precisely for this kind of hand-off. Beyond letting a group manage users in specified roles, an admin can name specific custom objects the delegated group is allowed to administer — and for those objects, the group can maintain configuration like picklist values, record types, and page layouts, without ever touching "Customize Application" or "Modify All Data." Scoping delegated rights to just Job_Position__c means HR coordinators can add, edit, or deactivate Salary_Band__c values whenever pay bands change, while every other object and every setup area in the org stays completely off-limits to them — the narrowest possible grant that still solves the actual problem.

**Why A is wrong.** "Modify All Data" is one of the most powerful permissions in Salesforce — it grants full read/write/delete access to every record in every object, plus the ability to bypass sharing rules org-wide. Handing that out just so someone can edit a picklist's value list is wildly disproportionate and is exactly the kind of "full administrative access" the System Administrator explicitly wants to avoid.

**Why C is wrong.** A Screen Flow can update the *values stored in records* — it has no ability to modify the picklist's underlying value set (the list of options users choose from). Changing what options exist in Salary_Band__c is a metadata change, not a data change, and flows can't touch metadata that way.

**Why D is wrong.** Field-Level Security only controls whether a user can see or edit the field's value on a record — it doesn't grant any ability to add, remove, or reorder the picklist's actual value list. An HR coordinator with FLS edit access could pick from existing salary bands on a record, but couldn't create a new band or retire an old one.`,
      sources:[
        {l:"Delegate Administrative Duties Not Related to Users — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.delegate_admin_custom_object_overview.htm&language=en_US&type=5"},
        {l:"Add or Edit Picklist Values — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=platform.updating_picklists.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Process Automation and Logic",
      select:1,
      prompt:"At BlueWave Consulting, employees submit leave requests through a custom Approval Process that routes requests to their direct manager. Recently, an employee reported that their request could not be submitted for approval, while others are able to submit successfully. What should the Administrator verify first to troubleshoot the issue?",
      options:[
        {k:"A", t:"Confirm the employee has an active manager assigned on their user record"},
        {k:"B", t:"Check if a Workflow Rule is preventing submission"},
        {k:"C", t:"Review Debug Logs for System Errors"},
        {k:"D", t:"Ensure the Approval Process includes email notifications"}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** The scenario's biggest clue is that this is happening to one employee while everyone else submits fine — that points straight at something specific to that one user's record, not a process-wide misconfiguration. An approval step that routes to "the submitter's manager" pulls that approver directly from the Manager field on the user record. If that field is blank, or points to a manager whose user record has been deactivated, Salesforce has no valid approver to assign the step to and the submission fails right out of the gate. Since it's a five-second check with no side effects, and it's the single most common cause of "works for everyone else, fails for this one person" in a manager-routed approval process, it's the obvious first thing to verify before digging into anything more involved.

**Why B is wrong.** A workflow rule can update fields, send emails, or create tasks — it doesn't intercept or block the "Submit for Approval" button. If a workflow rule were somehow interfering, it would typically do so consistently for every user who meets its criteria, not for one specific employee while identical requests from others sail through.

**Why C is wrong.** Debug logs are for chasing down unhandled exceptions, Apex errors, or governor-limit failures — they're a fine second step if the simple checks turn up nothing, but jumping straight to logs before ruling out an obvious, user-specific data issue like a missing manager is working harder than the problem requires.

**Why D is wrong.** Email notification settings only affect whether the approver is *notified* that something is waiting for them — they have nothing to do with whether the submitter's request is accepted into the approval process in the first place. A missing notification would show up as "my manager doesn't know it's waiting," not as "the request can't be submitted."`,
      sources:[
        {l:"Troubleshoot Approval Processes — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.approvals_troubleshooting.htm&language=en_US&type=5"},
        {l:"Set the Approval Process Initial Submitters and Actions — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.customize_approval_dynamic_approvers.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Process Automation and Logic",
      select:1,
      prompt:"At NextGen Support, Email-to-Case is configured to automatically create support tickets. A new Record Type was recently introduced for premium customers, but incoming emails are still creating cases with the default Record Type. What is the most likely cause?",
      options:[
        {k:"A", t:"The Case Assignment Rule is overriding the Record Type"},
        {k:"B", t:"The Automated Processing User lacks access to the new Record Type"},
        {k:"C", t:"A Validation Rule is forcing a fallback Record Type"},
        {k:"D", t:"The Case Owner Profile does not include the Record Type"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** This is a documented Salesforce behavior, not just a guess: every case Email-to-Case creates runs under the org's Automated Case User (the service account behind on-demand Email-to-Case), and that record is assigned a record type the exact same way any user is — through its profile's assigned record types. If that profile was never given access to the new premium record type, Salesforce can't apply it, and silently falls back to whatever record type is marked default on that profile instead. Since the new record type is brand new, it's very easy for an admin to create it and update page layouts and processes without remembering to also add it to the Automated Case User's profile — which is exactly why this is "the most likely cause" rather than a rare edge case.

**Why A is wrong.** A case assignment rule changes *ownership* — routing the case to a specific user or queue — and only overrides record type if its own "override existing record type" option is explicitly checked, using the record type tied to that rule's assigned user or queue. There's no indication an assignment rule exists here, and even if one did, it would be an unusual and easily-noticed configuration choice rather than the default, silent failure mode this scenario describes.

**Why C is wrong.** Validation rules can only block a save by throwing an error — they have no mechanism to reassign or "fall back" a record's record type on their own. If a validation rule were involved, the email-to-case creation would fail outright (and likely bounce or queue an error), not quietly succeed with the wrong record type.

**Why D is wrong.** The Case Owner's profile matters for the owner's own default record type when *they* later edit or view the case, but Email-to-Case doesn't create the case as the eventual owner — it creates it as the Automated Case User, then hands it off (often via assignment rules) afterward. The owner's profile access is irrelevant to what record type gets stamped on the case at the moment of creation.`,
      sources:[
        {l:"Email-to-Case Does Not Assign the Record Type Selected in the Email-to-Case Settings — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=000387390&language=en_US&type=1"},
        {l:"Cases with no Record Type Are Assigned the Default Record Type of the User Who Edits Them — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=000275342&language=en_US&type=1"}
      ]
    },
    {
      topic:"Data and Analytics Management",
      select:2,
      prompt:"At FinCore Systems, an Administrator created a Master-Detail relationship between Account and a custom object Invoice__c. The finance team wants to display total invoice amounts and the number of invoices directly on the Account record. Which two considerations should the Administrator keep in mind when using Roll-Up Summary fields? Choose 2 answers",
      options:[
        {k:"A", t:"Roll-Up Summaries can calculate SUM, COUNT, MIN, and MAX values"},
        {k:"B", t:"Roll-Up Summaries must be created on the parent object"},
        {k:"C", t:"Roll-Up Summaries are evaluated only when reports are run"},
        {k:"D", t:"Roll-Up Summaries can be used in Lookup relationships"}
      ],
      correct:["A","B"],
      explanation:
`**Why A is right.** A Roll-Up Summary field's calculation type is limited to exactly four options: COUNT (how many child records exist), SUM (a total of a numeric/currency/percent field across the children), MIN, and MAX. There's no Average option built into this field type — that's a genuinely common mix-up, since "Average" is a summary function you'll find on reports, but it was never carried over into the declarative Roll-Up Summary field. For this scenario, COUNT gives the finance team "number of invoices" and SUM against the invoice amount field gives them "total invoice amounts" — both squarely inside what the field type actually supports.

**Why B is right.** A roll-up summary field is only ever defined on the object sitting on the master side of the relationship — here, Account — because it's pulling and aggregating values up from the many child Invoice__c records into a single number on the one parent record. There's no equivalent field type you place on the detail/child object; the aggregation direction is strictly child-to-parent.

**Why C is wrong.** Roll-up summary values are stored fields that Salesforce recalculates automatically and immediately whenever a related child record is created, updated, deleted, or undeleted — not something computed on the fly when someone happens to run a report. The Account's invoice total is already sitting there, current, the moment you open the record.

**Why D is wrong.** The declarative Roll-Up Summary field type is only available across a master-detail relationship — it isn't an option Salesforce exposes for lookup relationships at all. Rolling up values across a lookup requires a workaround instead, such as a record-triggered Flow, an Apex trigger, or a third-party tool like Declarative Lookup Rollup Summaries (DLRS); none of that is the native point-and-click Roll-Up Summary field this question is about.`,
      sources:[
        {l:"Roll-Up Summary Fields — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=platform.fields_about_roll_up_summary_fields.htm&language=en_US&type=5"},
        {l:"Optimize Roll-Up Summary Fields — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/point_click_business_logic/roll_up_summary_fields"}
      ]
    },
    {
      topic:"Security and Access",
      select:1,
      prompt:"At Skyline Realty, a Sales Agent created a duplicate deal record but cannot delete it. What should the Administrator check to resolve the issue?",
      options:[
        {k:"A", t:"Verify if duplicate management rules are enabled"},
        {k:"B", t:"Confirm the user has Delete Permission on the Object"},
        {k:"C", t:"Ask the User to mark the record as inactive"},
        {k:"D", t:"Assign System Administrator Profile temporarily"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Create, Read, Edit, and Delete are four completely separate object permissions in Salesforce — a profile or permission set can grant a user the ability to create and edit records on an object while leaving Delete unchecked. That's an extremely common, deliberate configuration for sales-type profiles, precisely so agents can't casually remove deals from the pipeline. If this sales agent can create records but can't delete the one they just created, the very first thing to check is whether their profile (or an assigned permission set) actually grants Delete on that object — no amount of record ownership or sharing access substitutes for that missing object-level permission.

**Why A is wrong.** Duplicate management rules (duplicate rules and matching rules) only run at the point a record is being *created or edited*, either flagging or blocking likely duplicates before they're saved. They have no bearing on whether an existing record — duplicate or not — can subsequently be deleted.

**Why C is wrong.** Marking a record inactive is a data workaround, not a fix for a permissions problem, and most custom deal objects don't even have a built-in "active" concept unless one was custom-built. It also doesn't solve what's actually being asked: how to let the agent delete the record they created.

**Why D is wrong.** Temporarily assigning the System Administrator profile would technically work, but handing out full admin rights just to clear one permission gap is a serious over-grant — it exposes every setting and every object in the org to that user in the meantime. The correct move is the minimal, targeted fix: grant Delete on the specific object, ideally via a permission set rather than touching the profile at all.`,
      sources:[
        {l:"Manage Salesforce Object Access — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/data_security/data_security_objects"},
        {l:"Enable Object Permissions in Permission Sets — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.perm_sets_objects_and_fields.htm&type=5"}
      ]
    },
    {
      topic:"Process Automation and Logic",
      select:1,
      prompt:"At Oceanic Logistics, an Admin must update three fields on a Shipment record in a precise sequence due to dependencies in existing automations. What is the best way to ensure the updates occur in the correct order?",
      options:[
        {k:"A", t:"Create multiple Workflow Rules, each handling one field"},
        {k:"B", t:"Use a Process Builder with multiple criteria nodes"},
        {k:"C", t:"Configure a single Workflow Rule with ordered field updates"},
        {k:"D", t:"Use multiple Flows triggered sequentially"}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** It's true — and worth being precise about — that flow execution order is *not* guaranteed by default: if you never touch the setting, Salesforce falls back to running flows in the order they were created, which isn't something you designed or should rely on. But "multiple Flows triggered sequentially" describes deliberately configuring that order, not hoping for the best. Record-triggered Flows expose an explicit, admin-set "Trigger Order" field (1–2,000) in the flow's version properties, and once you assign values there, Salesforce documents and enforces that ascending sequence for every flow sharing the same object and the same trigger moment (before-save or after-save). That's the one option here backed by an actual, current, admin-controlled ordering mechanism — the caveat is just that it only governs flows against other flows in that same trigger context; it doesn't reach across into Apex triggers or reorder before-save relative to after-save. It's also the only option built on Flow, Salesforce's current automation tool, rather than the two retired ones below.

**Why A is wrong.** Salesforce doesn't guarantee the relative execution order of separate Workflow Rules firing off the same object and event — there's no admin-facing setting that lets you pin down "this rule runs before that one." Splitting the three field updates across three different rules is exactly the setup where order becomes unpredictable, which is the opposite of what this scenario needs.

**Why B is wrong.** Process Builder's criteria nodes do execute top-to-bottom within a single process, so ordering isn't impossible here — but Process Builder has been retired by Salesforce (no new processes should be built with it; Flow is the direct replacement), and relying on it for new dependency-sensitive automation runs against current best practice, not just style preference.

**Why C is wrong.** A single Workflow Rule can carry multiple immediate field updates, but Salesforce doesn't expose any way to sequence them — they're applied together as part of the same save, with no "run this one first" control. There's no such feature as "ordered field updates" inside one workflow rule, which makes this option describe a capability that doesn't actually exist.`,
      sources:[
        {l:"Define the Trigger Order of Record-Triggered Flows — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=release-notes.rn_automate_flow_builder_trigger_order.htm&language=en_US&type=5"},
        {l:"Considerations for Migrating Workflow Rules and Process Builder to Flow — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.flow_considerations_migrate.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Data and Analytics Management",
      select:2,
      prompt:"At GlobalTech Solutions, clients fill out a detailed onboarding form multiple times during a project lifecycle. Each submission must be stored separately and allow tracking of changes between submissions. Which two solutions should the Administrator implement? Choose 2 answers",
      options:[
        {k:"A", t:"Store each submission as an attachment"},
        {k:"B", t:"Add all fields directly to the Account object"},
        {k:"C", t:"Create a custom object to store submissions"},
        {k:"D", t:"Enable Field History Tracking on the Submission object"}
      ],
      correct:["C","D"],
      explanation:
`**Why C is right.** "Each submission must be stored separately" is a direct description of records, not files or overwritten fields — a purpose-built custom object (something like Submission__c, related back to the Account or project via a lookup or master-detail) gives every single onboarding form its own row, with real fields you can report on, filter, and relate to other data. That's the only option here that actually produces one distinct, queryable record per submission the way the requirement demands.

**Why D is right.** Once submissions live as records on that custom object, Field History Tracking is the built-in mechanism for the second half of the requirement — seeing what changed and when. Turn it on for the fields that matter (up to 20 tracked fields per object) and Salesforce automatically logs the old value, new value, who made the edit, and the timestamp, right on the record's History related list, whenever a submission gets corrected or updated after the fact. That's exactly "tracking of changes" without building any custom logging yourself.

**Why A is wrong.** An attachment is an opaque file blob — Salesforce has no visibility into its internal structure, can't report on individual answers inside it, and definitely can't track field-level changes between one attachment and another. It fails the "track changes" half of the requirement outright and makes the "separately stored" data far less usable even for the storage half.

**Why B is wrong.** Adding all the form's fields directly onto Account means every new submission overwrites the same set of fields on the same single Account record — there's no way to have multiple submissions coexist "separately" when they're all fighting for the same field slots on one record. You'd lose every submission except the most recent the moment a client filled the form out again.`,
      sources:[
        {l:"Custom Objects — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.dev_objectcreate.htm&language=en_US&type=5"},
        {l:"Track Field History for Custom Objects — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.tracking_field_history_for_custom_objects.htm&type=5"}
      ]
    },
    {
      topic:"Security and Access",
      select:1,
      prompt:"At SecureBank Corp, the finance team wants a report showing all customers missing a credit card number. The credit card field is encrypted. What is the best approach?",
      options:[
        {k:"A", t:"Grant permission to view encrypted fields and filter directly"},
        {k:"B", t:"Convert the encrypted field to plain text"},
        {k:"C", t:"Create a helper checkbox field updated manually"},
        {k:"D", t:"Use a report with cross-filter logic to identify missing values"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Classic encrypted custom fields carry a documented, hard platform restriction: they can't be used in filters at all — not in list views, not in report filters, not in rollup summaries, not in rule filters. That restriction has nothing to do with who can see the decrypted value; it's baked into how the field type works, so there's no permission or setting that unlocks it. Salesforce's own recommended pattern for exactly this situation is to keep a separate, ordinary (unencrypted) field alongside the encrypted one that simply flags whether it's populated — a plain checkbox is fully reportable and filterable like any other field, giving finance a clean "missing credit card" report without ever exposing or weakening the encryption on the real data. Keeping it a manually-maintained flag (checked off by whoever handles the intake, e.g., "Card on File") also sidesteps a separate documented catch: formula fields that reference encrypted data only evaluate correctly in Salesforce Classic, not in Lightning Experience or via SOQL — so a report or Lightning page can't lean on a live formula to do this for you either.

**Why A is wrong.** "View Encrypted Data" is a visibility permission — it lets an authorized user see the plain-text value instead of asterisks when looking at a record. It does nothing to the field's underlying filter restriction; an encrypted field stays completely unusable in report and list view filters no matter who's logged in or what permissions they hold.

**Why B is wrong.** Converting the field to plain text would technically make it filterable again, but it throws away the entire reason the field was encrypted in the first place. For something as sensitive as a stored credit card number, stripping encryption to make a report easier to build is a serious, likely non-compliant security regression (PCI DSS expects cardholder data to be protected at rest) — the fix has to work around the encryption, not remove it.

**Why D is wrong.** Cross-filters compare a record against the presence or absence of *related* records on another object (like "Accounts without Opportunities") — they're the wrong tool for asking whether a single field on the same record is blank. And even switching filter styles doesn't get around the core problem: encrypted fields aren't usable in report filter logic of any kind, cross-filter or otherwise.`,
      sources:[
        {l:"Classic Encryption for Custom Fields — Salesforce Help", u:"https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/fields_about_encrypted_fields.htm"},
        {l:"Salesforce Encrypted Fields: Your Comprehensive Guide — GRAX", u:"https://www.grax.com/blog/salesforce-encrypted-fields/"}
      ]
    },
    {
      topic:"Process Automation and Logic",
      select:1,
      prompt:"At BrightSales Inc., management requires Sales Reps to enter a business justification before moving deals to the \"Qualified\" stage. Reports show that many records still lack this information. What should the Administrator implement?",
      options:[
        {k:"A", t:"Auto-populate the field using automation"},
        {k:"B", t:"Create a Validation Rule and add guidance in Path"},
        {k:"C", t:"Make the field required on page layout"},
        {k:"D", t:"Add a Quick Action for entering the field"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** The requirement is conditional — a justification is only mandatory the moment a deal is being moved *into* "Qualified," not at every other point in the sales cycle — and a validation rule is the tool built for exactly that kind of stage-aware enforcement. A rule using ISPICKVAL to check that the Stage is changing to Qualified AND the justification field is blank will hard-block the save with an error until the rep fills it in, which is the only option here that actually stops incomplete records from reaching that stage. Pairing it with Path guidance closes the loop on user experience: Path's key fields and guidance text can flag the justification field as soon as a rep selects Qualified, so they see it coming and fill it in proactively instead of getting surprised by a validation error after the fact. Path alone doesn't enforce anything — it's a visual checklist, not a save-blocking mechanism — which is exactly why it's paired with the validation rule rather than used by itself.

**Why A is wrong.** Auto-populating the field defeats the entire point of the requirement. Management wants a rep to actually think through and articulate a real business justification — a field silently filled in by automation (with a placeholder, a default, or some derived text) would make every "Qualified" record technically non-blank while providing zero actual justification, which is worse than the current gap because it would look complete in reports while still being meaningless.

**Why C is wrong.** Making the field required on the page layout makes it mandatory on *every* save, for every stage, from the moment the record is created — long before the business actually needs it. That's broader than the ask, forces reps to fill in a justification before they even know if the deal will progress, and page-layout requiredness only applies to that layout in the UI anyway (it doesn't stop the field being blank via the API, mass update tools, or a different layout) — a validation rule enforces the rule everywhere, all the time, regardless of entry point.

**Why D is wrong.** A Quick Action just gives reps a convenient shortcut for entering the field — it's a UI convenience, not an enforcement mechanism. Nothing stops a rep from ignoring the quick action entirely and still moving the deal to Qualified with the justification left blank, so it does nothing to close the data-quality gap the reports are showing.`,
      sources:[
        {l:"Considerations and Guidelines for Creating Paths — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sales.path_considerations.htm&type=5"},
        {l:"Your Complete Guide to Validation Rules in Salesforce — Salesforce Ben", u:"https://www.salesforceben.com/validation-rules-in-salesforce/"}
      ]
    },
    {
      topic:"Data and Analytics Management",
      select:1,
      prompt:"At KnowledgeHub Services, the Support Team wants to organize a large volume of documentation and ensure users only see relevant content based on region and product. What should the Administrator configure?",
      options:[
        {k:"A", t:"Enable Case Feed"},
        {k:"B", t:"Define multiple Article layouts"},
        {k:"C", t:"Configure Data Categories with visibility rules"},
        {k:"D", t:"Use Custom Objects for documentation"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Data Categories are Salesforce Knowledge's purpose-built tool for exactly this pair of needs: organizing a large article library and controlling who sees what. An admin sets up Category Groups — Region and Product are textbook examples — each with a hierarchy of values, then tags every article with the categories it applies to. Visibility is then layered on top through profiles, roles, permission sets, or permission set groups (Salesforce takes the most permissive of whatever applies to a user — a logical OR — so any one path granting access is enough), letting you say "APAC support reps only see APAC-tagged articles" or "only see documentation tagged for the products they support." An article tagged across multiple category groups requires the user to have visibility into at least one category in *each* group it's tagged with, which is exactly the "region AND product" filtering this scenario calls for.

**Why A is wrong.** Case Feed changes how agents work a Case record — a chronological, collaborative feed of emails, notes, and updates on that one case — it has nothing to do with organizing a knowledge base or scoping who can see which articles.

**Why B is wrong.** Article layouts (aka article types) control what *fields and formatting* appear when an article is created or displayed — think a "How-To" template versus an "FAQ" template. That's a presentation/structure choice, not an organization-and-visibility mechanism; it does nothing to segment content by region or product or to hide irrelevant articles from a given user.

**Why D is wrong.** Building documentation as records on a custom object would mean reinventing everything Salesforce Knowledge already provides natively — versioning, publication states, article types, a dedicated search experience, and Data Categories themselves — with none of that tooling and a lot of unnecessary custom work. It solves nothing that Knowledge doesn't already solve better, out of the box.`,
      sources:[
        {l:"Data Category Visibility — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.category_visibility_whatis.htm&language=en_US&type=5"},
        {l:"Salesforce Knowledge Data Categories Best Practices — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=000338764&mode=1&type=1"}
      ]
    },
    {
      topic:"Auditing and Monitoring",
      select:1,
      prompt:"At Delta Systems, the System Administrator suspects that some advanced users may be directly modifying configuration settings in the production environment without following proper governance procedures. The Admin needs to identify which users made changes, what changes were made, and when those changes occurred. Which tool should the Administrator use to retrieve this information?",
      options:[
        {k:"A", t:"Login History"},
        {k:"B", t:"Setup Audit Trail"},
        {k:"C", t:"Field History Tracking"},
        {k:"D", t:"Sharing Settings"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** The Setup Audit Trail is Salesforce's built-in log of exactly this kind of activity: it records who changed a setup/configuration item, what the change was (a plain-language description like "Created custom field" or "Changed sharing rule"), and the date and time it happened, for the org's last 180 days (with longer retention available via Field Audit Trail add-on or data export). That's a direct, complete match for all three things the admin needs to identify — user, change, and timestamp — for configuration changes specifically, which is precisely what "advanced users modifying config settings without going through governance" describes.

**Why A is wrong.** Login History tracks login events — who logged in, from where, at what time, and by what method — not what a user did once they were in the org. It would show that a suspect user was logged in during the relevant window, but nothing about which setup pages they touched or what they changed.

**Why C is wrong.** Field History Tracking logs changes to *data* — the old and new values of specific fields on records like Accounts or Opportunities — not changes to org configuration/metadata like profiles, permission sets, page layouts, or automation. It's the right tool for "did someone edit this record's field," not "did someone reconfigure Setup."

**Why D is wrong.** Sharing Settings is a configuration screen for defining org-wide defaults, sharing rules, and record access — it's something you view and edit, not a log of who changed what and when. It has no audit or history component of its own.`,
      sources:[
        {l:"Monitor Setup Changes with Setup Audit Trail — Salesforce Developer Docs", u:"https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/admin_monitorsetup.htm"},
        {l:"Setup Audit Trail: Keep Track of Metadata Changes in Salesforce — Salesforce Ben", u:"https://www.salesforceben.com/setup-audit-trail-keep-track-of-metadata-changes-in-salesforce/"}
      ]
    },
    {
      topic:"Data and Analytics Management",
      select:2,
      prompt:"At Vertex Electronics, a new accessory product has been created and activated. However, Sales representatives report that they cannot add this product to opportunities during deal creation. The Administrator confirms that the product exists and is active. Which two checks should the Administrator perform to resolve this issue? Choose 2 answers",
      options:[
        {k:"A", t:"Verify the product is linked to an active Price Book"},
        {k:"B", t:"Ensure the correct Price Book is selected on the Opportunity"},
        {k:"C", t:"Confirm the Product has an assigned category"},
        {k:"D", t:"Check that the Product has a default discount configured"}
      ],
      correct:["A","B"],
      explanation:
`**Why A is right.** Being "active" as a Product2 record isn't enough on its own — a product only becomes something reps can actually add to a deal once it has a Price Book Entry giving it a price in a price book (every product needs an entry in the Standard Price Book before it can be added to any custom price book at all). A brand-new product that was activated but never added to a price book with a price simply won't show up in the product picker, no matter how active the underlying record is.

**Why B is right.** An Opportunity can only have one price book attached to it at a time, and only the products that have entries in *that specific* price book are available to add as line items. If the new accessory was added to a different custom price book than the one already selected on these opportunities (or if no price book was ever explicitly chosen), reps adding products will only see what's in whatever price book is actually attached — not the full catalog.

**Why C is wrong.** Product category/family is an organizational and reporting field — useful for grouping "Accessories" versus "Hardware" in list views and reports — but it has no bearing on whether a product is selectable when adding it to an opportunity. A miscategorized (or uncategorized) product with a valid price book entry can still be added without issue.

**Why D is wrong.** A default discount is an optional convenience that pre-fills a discount percentage on the line item once the product is added — it plays no role in determining whether the product is available to add in the first place. Its absence has zero effect on the product showing up in the picker.`,
      sources:[
        {l:"Set Up and Maintain Sales Tools: Products and Price Books — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.products_pricebooks_overview.htm&language=en_US&type=5"},
        {l:"Add Products to an Opportunity — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.opportunity_products_adding.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Data and Analytics Management",
      select:1,
      prompt:"UrbanFit Gear is expanding into wholesale sales and wants to track those deals separately from direct-to-consumer sales. They plan to use Opportunities for wholesale deals with different pricing structures. What should the Administrator implement to ensure pricing accuracy?",
      options:[
        {k:"A", t:"Duplicate Products for wholesale pricing"},
        {k:"B", t:"Add a custom Pricing field on Opportunities"},
        {k:"C", t:"Create a separate Price Book for wholesale deals"},
        {k:"D", t:"Modify order management settings"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** This is exactly what custom Price Books exist for: giving different segments of the business — a sales channel, a region, or here, a wholesale-versus-retail split — their own set of prices for the same underlying products, without touching the product catalog itself. An admin creates a "Wholesale" price book, adds price book entries for the relevant products at wholesale rates, and reps building a wholesale Opportunity select that price book instead of the standard one. Since an Opportunity can only ever be linked to a single price book, this also structurally prevents a rep from accidentally mixing wholesale and retail pricing on the same deal — the platform enforces the separation for you.

**Why A is wrong.** Duplicating the actual Product2 records would double-maintain the entire catalog — two records to keep in sync every time a name, description, or SKU changes — just to get a second price, when the whole point of Price Books is letting one product carry multiple prices without being duplicated at all.

**Why B is wrong.** A custom field on the Opportunity would just hold a number reps have to type in themselves; it has no connection to the actual product line items, doesn't drive what shows up when adding products, and provides no structural guarantee that wholesale deals are actually priced correctly. It's manual data entry standing in for a feature Salesforce already provides natively.

**Why D is wrong.** Order Management settings govern what happens *after* a deal is won — activating, fulfilling, and tracking Orders — not how Opportunities get priced while they're still being worked. It doesn't touch the pricing-structure problem this scenario is about at all.`,
      sources:[
        {l:"Set Up and Maintain Sales Tools: Products and Price Books — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.products_pricebooks_overview.htm&language=en_US&type=5"},
        {l:"Create Multiple Price Books — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pricebooks_multiple.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Lightning App Builder and Page Customization",
      select:1,
      prompt:"At OmniCorp Services, Contacts to Multiple Accounts has been enabled. Users are confused because they cannot easily distinguish between primary and secondary relationships on the Account page. What should the Administrator configure?",
      options:[
        {k:"A", t:"Add only the Contacts related list"},
        {k:"B", t:"Add the Related Contacts list, including the Direct Indicator"},
        {k:"C", t:"Display Related Accounts instead of Contacts"},
        {k:"D", t:"Add a custom checkbox to Contacts"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Turning on Contacts to Multiple Accounts creates a new underlying object, AccountContactRelation, that tracks every account a contact is tied to — and it carries an "IsDirect" field that's true for the contact's one primary account and false for every other, indirect/secondary tie. That flag is exactly what surfaces as a "Direct" column when the admin adds the Related Contacts related list to the Account page layout, so users looking at an Account can see at a glance which contacts are directly (primarily) associated with it versus which are only indirectly related through a secondary business relationship. That's a purpose-built, out-of-the-box answer to precisely the confusion described.

**Why A is wrong.** The standard Contacts related list only shows contacts whose primary Account Name field points to this account — it has no concept of secondary/indirect relationships at all, so it can't show a "Direct" distinction that doesn't apply to it. Sticking with just this list is actually the pre-multiple-accounts behavior and doesn't surface the additional relationships users are now confused about.

**Why C is wrong.** "Related Accounts" describes the reverse view from the Contact record (which accounts a contact is tied to), not what belongs on the Account page. Swapping in a list of accounts on an Account's own page layout doesn't address showing that Account's contacts at all, let alone distinguishing direct from indirect ones.

**Why D is wrong.** A manually-maintained custom checkbox on Contact would need to be kept in sync by a human every time a relationship is added, changed, or removed — it duplicates information Salesforce already tracks natively and automatically via IsDirect, and it's exactly the kind of fragile workaround you don't need when the platform ships the real indicator for free.`,
      sources:[
        {l:"Considerations for Enabling Contacts to Multiple Accounts — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.shared_contacts_considerations.htm&language=en_US&type=5"},
        {l:"Set Up Contacts to Multiple Accounts — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.shared_contacts_setting_up.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Security and Access",
      select:1,
      prompt:"At Prime Logistics, a junction object connects Clients and Contracts using two Master-Detail relationships. When Client ownership changes, new owners cannot see related junction records unless they also own the Contract. What should the Administrator do?",
      options:[
        {k:"A", t:"Add Sharing Rules on the Contract object"},
        {k:"B", t:"Convert one Master-Detail relationship to Lookup"},
        {k:"C", t:"Assign Read Access to all users"},
        {k:"D", t:"Modify Role Hierarchy"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** This is documented, built-in Salesforce behavior: when a custom object has two master-detail relationships, sharing access to that junction record is determined by the user's access to *both* associated master records — a strict intersection, not an either/or. That's exactly why a new Client owner is locked out the moment they don't also happen to own the linked Contract. The permanent fix is to convert the Contract side of the relationship from master-detail to a lookup. Once Contract is no longer a true master, it drops out of the visibility equation entirely, and the junction record's sharing follows only the remaining master-detail relationship — Client. From then on, every future Client ownership change automatically carries the right visibility with it, with nothing to re-patch.

**Why A is wrong.** A sharing rule shares records based on static criteria or the owner's role/public group on the object it's defined on — it has no way to express "share this Contract with whoever currently owns the related Client." That relationship is dynamic and changes over time, and a declarative sharing rule can't follow it; you'd be stuck manually rebuilding or adjusting the rule every time ownership shifts, which doesn't actually solve the recurring problem the scenario describes.

**Why C is wrong.** Handing out read access to every user on a junction connecting Clients and Contracts blows past the principle of least privilege for what's very likely commercially sensitive data — it "solves" the symptom by removing the security model rather than fixing the actual cause, and it isn't something a well-governed org should accept just to work around a data model quirk.

**Why D is wrong.** Role hierarchy grants access based on being above someone else in reporting structure — it has no mechanism for granting a new Client owner access to a Contract just because they now own a related Client record. Reorganizing the hierarchy doesn't touch the dual master-detail intersection rule causing the problem at all.`,
      sources:[
        {l:"Considerations for Object Relationships — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=relationships_considerations.htm&language=en_US&type=5"},
        {l:"Junction Object Access in Salesforce — Medium", u:"https://medium.com/@shashanksingla/junction-object-access-based-on-master-object-access-on-profiles-deab3d09cedd"}
      ]
    },
    {
      topic:"Data and Analytics Management",
      select:1,
      prompt:"At SolarEdge Solutions, Sales Reps provide multiple configurations of a system to customers before closing deals. Management wants accurate forecasting while keeping all options visible. What should reps do?",
      options:[
        {k:"A", t:"Update one quote repeatedly"},
        {k:"B", t:"Create separate quotes and sync the final one"},
        {k:"C", t:"Create multiple Opportunities"},
        {k:"D", t:"Add multiple Product Lists to one Opportunity"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** This is exactly what Salesforce's Quote object is built for: a single Opportunity can hold multiple Quote records, so a rep can create one quote per configuration — different panel counts, financing terms, whatever the customer is comparing — and every version stays visible and comparable side by side. But an Opportunity can only sync with *one* quote at a time, and syncing is what pushes a quote's products and amounts back onto the Opportunity. So once the customer settles on a configuration, the rep syncs that specific quote, and the Opportunity's amount and line items update to reflect it — giving forecasting a single, accurate source of truth without deleting or losing any of the alternative configurations that were explored along the way.

**Why A is wrong.** Continually overwriting one quote destroys the earlier configurations the moment they're replaced — there's no way to show the customer (or anyone reviewing the deal later) what the other options looked like, since only the current version would still exist. That fails the "keeping all options visible" half of the requirement entirely.

**Why C is wrong.** Splitting one deal into multiple Opportunities fragments the pipeline — management would see what looks like several separate deals instead of one prospect evaluating several configurations, which inflates and distorts forecast totals rather than making them more accurate.

**Why D is wrong.** There's no such thing as attaching "multiple Product Lists" to a single Opportunity — an Opportunity has one set of Opportunity Product line items at a time. Layering configurations directly onto the Opportunity's own line items, rather than using separate Quotes, would mean every configuration change overwrites the same shared data, with the same loss-of-history problem as option A.`,
      sources:[
        {l:"How Quote Syncing Works — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=quotes_synch_overview.htm&language=en_US&type=0"},
        {l:"Generate Quotes and Sync Them Easily — Trailhead", u:"https://trailhead.salesforce.com/content/learn/projects/manage-products-prices-quotes-orders/create-multiple-quotes"}
      ]
    },
    {
      topic:"Change Management",
      select:1,
      prompt:"At Marathon Tracker, a master-detail relationship exists between Event and Participant. The Administrator wants to remove the relationship but keep participant data. What must be done first?",
      options:[
        {k:"A", t:"Delete all participant records"},
        {k:"B", t:"Convert the relationship to lookup"},
        {k:"C", t:"Remove Validation Rules"},
        {k:"D", t:"Disable Sharing Rules"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Participant records in a master-detail relationship don't have their own Owner field or independent sharing — they inherit everything from Event, and they're tied to it in a way that's fundamentally different from a lookup. Salesforce's documented, required path for detaching that relationship while keeping the child data intact is to first convert the master-detail field to a lookup (after clearing any prerequisites like roll-up summary fields on Event, and making the field optional). That conversion process is what assigns Participant records their own independent existence — an owner, their own sharing model — for the first time, decoupling them from Event's fate. Only once that conversion is done is it safe to further modify or remove the relationship without the platform trying to cascade-delete or otherwise tie participant data to the event record.

**Why A is wrong.** Deleting all participant records is the exact opposite of the goal — the whole point of the scenario is to change the relationship structure while *keeping* participant data intact, not to sacrifice the data to make the relationship change easier.

**Why C is wrong.** Validation rules enforce data-entry logic; they have no bearing on how a relationship's type (master-detail vs. lookup) is defined or on whether records survive a change to that relationship. Removing them doesn't unlock anything relevant to this conversion.

**Why D is wrong.** Sharing rules extend record visibility beyond the org-wide default — but master-detail child records don't use their own sharing rules at all in the first place, since they inherit access from the master. There's nothing to "disable" here that affects the relationship type, and doing so wouldn't touch the actual obstacle (the master-detail structure itself).`,
      sources:[
        {l:"Considerations for Object Relationships — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=relationships_considerations.htm&language=en_US&type=5"},
        {l:"Interview Questions on Master-Detail Relationship in Salesforce — Medium", u:"https://medium.com/@aleksej.gudkov/interview-questions-on-master-detail-relationship-in-salesforce-829b195eeb20"}
      ]
    },
    {
      topic:"Data and Analytics Management",
      select:1,
      prompt:"At RetailHub, Person Accounts are enabled. When converting consumer leads, incorrect account types appear. What should the administrator do?",
      options:[
        {k:"A", t:"Hide Record Type Selection"},
        {k:"B", t:"Ensure the Company field is blank for B2C Leads"},
        {k:"C", t:"Modify Contact Sharing Rules"},
        {k:"D", t:"Change the Account OWD"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** With Person Accounts enabled, Salesforce decides what a converted Lead turns into based directly on whether its Company field is populated: a blank Company field converts the Lead into a Person Account, while any value in Company converts it into a standard Business Account with a separate Contact. If consumer (B2C) leads are coming out of conversion as the wrong account type, the near-certain cause is that those leads have something sitting in Company — even a placeholder or a value pulled in by a web form or import — when they should have been left blank. The fix is data hygiene and process, not a permissions or sharing change: keep Company empty for B2C leads (a lead record type and page layout that hides or omits the Company field for consumer leads is the standard way to enforce this going forward).

**Why A is wrong.** Hiding Record Type selection affects which Lead or Account record type a user can pick, but it doesn't touch the actual mechanism driving person-vs-business conversion, which is the Company field's blank-or-populated state — hiding a picklist choice elsewhere in the UI doesn't fix what's actually causing the wrong outcome.

**Why C is wrong.** Contact Sharing Rules control who can see Contact records after they exist — they have no influence over whether a Lead conversion creates a Contact (Business Account path) or skips straight to a Person Account in the first place. This is a visibility mechanism, not a conversion-logic one.

**Why D is wrong.** Account org-wide default governs baseline record visibility across the org; it has nothing to do with which *type* of Account gets created during Lead conversion. Changing it wouldn't stop consumer leads from becoming Business Accounts.`,
      sources:[
        {l:"Considerations for Converting Leads with Person Accounts — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.account_person_converting_leads.htm&language=en_US&type=5"},
        {l:"What Happens to a Salesforce Converted Lead? — JanBask Training", u:"https://www.janbasktraining.com/community/salesforce/what-happens-to-a-salesforce-converted-lead"}
      ]
    },
    {
      topic:"Data and Analytics Management",
      select:1,
      prompt:"At NextSales Corp, a rep cannot sync a quote to an opportunity. What is the most likely cause?",
      options:[
        {k:"A", t:"The Quote is expired"},
        {k:"B", t:"Validation Rules block updates"},
        {k:"C", t:"Another Quote is already synced"},
        {k:"D", t:"The Opportunity is closed"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** An Opportunity can only ever be linked to one synced quote at a time — that's the core rule behind quote syncing. Normally, starting a sync on a different quote simply stops the old sync and starts the new one, but that hand-off can't happen if the currently-synced quote is locked, most commonly because it's sitting in an active approval process. Salesforce's own troubleshooting documentation calls this out directly: a quote can't be synced "because another quote that's being synced for this opportunity is locked due to a workflow approval process." That's the single most common, most quote-and-opportunity-specific reason a rep hits a wall trying to sync — and it's a real, documented condition rather than a hypothetical.

**Why A is wrong.** A Quote's Expiration Date is an informational field for the sales team's own reference — Salesforce doesn't check it before allowing a sync, and an expired date has no documented effect on the sync process at all.

**Why B is wrong.** Validation rules blocking the update is a generic possibility that could technically affect almost any save in Salesforce, not something specific to how quote syncing works. It's a plausible edge case in a heavily customized org, but it isn't the documented, built-in behavior the platform ships with — "another quote locked in approval" is the actual named cause in Salesforce's own troubleshooting guide.

**Why D is wrong.** Salesforce doesn't block quote syncing on a Closed opportunity out of the box — admins who want that behavior have to build it themselves (typically with a validation rule), which confirms that a closed stage isn't a native restriction on syncing at all.`,
      sources:[
        {l:"Troubleshooting Quote Syncing — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sales.quotes_sync_troubleshooting.htm&language=en_US&type=5"},
        {l:"Sync Quotes and Opportunities — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.quotes_synch.htm&language=en_US&type=5"}
      ]
    }
  ];

  const SELECT_WORD = {1:"Select one", 2:"Select two", 3:"Select three"};

  const STORAGE_KEY = "adminIIQuizState_v1";

  const arraysEqualAsSets = (a, b) => {
    if (a.length !== b.length) return false;
    const sa = [...a].sort();
    const sb = [...b].sort();
    return sa.every((v, i) => v === sb[i]);
  };

  // Fisher-Yates shuffle — never mutates the input array.
  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // A shuffled permutation of DATA's indices — the order tickets are displayed
  // in. Pass a subset of indices to shuffle just that subset (used to build a
  // single-section queue); omit it for the full deck.
  const buildOrder = (indices) => shuffleArray(indices || DATA.map((_, i) => i));

  // Section list is derived from whatever topics actually appear in DATA, in
  // the order each topic is first seen — no fixed exam blueprint is assumed,
  // so new topics just slot in as questions are added.
  const SECTION_ORDER = DATA.reduce((acc, q) => (acc.includes(q.topic) ? acc : [...acc, q.topic]), []);

  // Ticket indices whose topic matches a given section name, in DATA order.
  const sectionIndices = (name) => DATA.reduce((acc, q, i) => (q.topic === name ? [...acc, i] : acc), []);

  const freshState = () => ({
    index:0,
    finished:false,
    section:"",
    order: buildOrder(),
    answers:DATA.map(() => ({selected:new Set(), checked:false, correct:null}))
  });

  const loadState = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return freshState();
      const saved = JSON.parse(raw);
      if (!saved || !Array.isArray(saved.answers) || saved.answers.length !== DATA.length) {
        return freshState();
      }
      const answers = saved.answers.map((a) => ({
        selected: new Set(Array.isArray(a.selected) ? a.selected : []),
        checked: !!a.checked,
        correct: a.correct === true ? true : (a.correct === false ? false : null)
      }));

      // A saved section must be "" (all sections) or one of the known domains.
      const section = typeof saved.section === "string" && (saved.section === "" || SECTION_ORDER.includes(saved.section))
        ? saved.section
        : "";

      // Nothing attempted yet — deal a freshly shuffled deck on every reload.
      // Once at least one ticket is checked, the deck order freezes so a
      // reload resumes the exact same shuffle instead of scrambling it again.
      const anyTraversed = answers.some((a) => a.checked);
      if (!anyTraversed) {
        return { index:0, finished:false, section, order: buildOrder(section ? sectionIndices(section) : undefined), answers };
      }

      // A saved order can be the full deck, a single-section queue, OR a
      // shorter "review mode" queue (just the previously-wrong tickets) —
      // accept any length from 1 up to DATA.length, as long as every entry is
      // a distinct valid index, so a reload during a section or review round
      // resumes that same reduced queue instead of discarding it back to the
      // full shuffled deck.
      const validOrder = Array.isArray(saved.order)
        && saved.order.length >= 1
        && saved.order.length <= DATA.length
        && new Set(saved.order).size === saved.order.length
        && saved.order.every((v) => Number.isInteger(v) && v >= 0 && v < DATA.length);

      const order = validOrder ? saved.order : buildOrder();

      return {
        index: Math.max(0, Math.min(order.length - 1, Number(saved.index) || 0)),
        finished: !!saved.finished,
        section,
        order,
        answers
      };
    } catch (e) {
      return freshState();
    }
  };

  const state = loadState();

  const saveState = () => {
    try {
      const serializable = {
        index: state.index,
        finished: state.finished,
        section: state.section,
        order: state.order,
        answers: state.answers.map((a) => ({
          selected: [...a.selected],
          checked: a.checked,
          correct: a.correct
        }))
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
    } catch (e) {
      // Storage unavailable (private browsing, quota, etc.) — fail silently, quiz still works in-memory.
    }
  };

  // Deals a brand-new shuffled ticket order, back to the first position. Used
  // whenever the deck should reshuffle (finishing the whole set, or an
  // explicit full reset).
  const reshuffleDeck = () => {
    state.order = buildOrder();
    state.index = 0;
  };

  const els = {
    stats: document.getElementById("stats"),
    queue: document.getElementById("queue"),
    ticket: document.getElementById("ticket"),
    shift: document.getElementById("shift"),
    sectionSelect: document.getElementById("sectionSelect")
  };

  // Fills the "Practice section" dropdown once (the domain list and their
  // ticket counts are static) and reflects whatever section is active.
  const populateSectionPicker = () => {
    if (!els.sectionSelect) return;
    const allOption = `<option value="">All sections (${DATA.length})</option>`;
    const sectionOptions = SECTION_ORDER.map((name) => {
      const count = sectionIndices(name).length;
      return `<option value="${esc(name)}">${esc(name)} (${count})</option>`;
    }).join("");
    els.sectionSelect.innerHTML = allOption + sectionOptions;
    els.sectionSelect.value = state.section || "";
  };

  // Switches the active queue to a single section (or back to "All sections"
  // when name is ""). Existing answers are kept as-is — jumping between
  // sections never erases progress — only the order/position/finished flag
  // change, exactly like starting a review round.
  const selectSection = (name) => {
    const valid = name === "" || SECTION_ORDER.includes(name);
    state.section = valid ? name : "";
    state.order = buildOrder(state.section ? sectionIndices(state.section) : undefined);
    state.index = 0;
    state.finished = false;
    if (els.sectionSelect) els.sectionSelect.value = state.section;
    saveState();
    renderAll();
    document.getElementById("ticket")?.scrollIntoView({behavior:"smooth", block:"start"});
  };

  const esc = (s) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

  const mdToHtml = (md) => md.split(/\n\n+/).map((p) => {
    const withBold = esc(p).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    return `<p>${withBold}</p>`;
  }).join("");

  const toggleSelect = (qi, key) => {
    const a = state.answers[qi];
    if (a.checked) return;
    const q = DATA[qi];
    if (q.select === 1) {
      a.selected = new Set([key]);
    } else if (a.selected.has(key)) {
      a.selected.delete(key);
    } else {
      a.selected.add(key);
    }
    saveState();
    renderTicket();
  };

  const checkAnswer = (qi) => {
    const a = state.answers[qi];
    const q = DATA[qi];
    if (a.selected.size !== q.select) return;
    a.checked = true;
    a.correct = arraysEqualAsSets([...a.selected], q.correct);
    saveState();
    renderAll();
  };

  const resetOne = (qi) => {
    state.answers[qi] = {selected:new Set(), checked:false, correct:null};
    saveState();
    renderAll();
  };

  const goTo = (i) => {
    state.index = Math.max(0, Math.min(state.order.length - 1, i));
    state.finished = false;
    saveState();
    renderAll();
    document.getElementById("ticket")?.scrollIntoView({behavior:"smooth", block:"start"});
  };

  const finishQuiz = () => {
    state.finished = true;
    state.index = 0;
    saveState();
    renderAll();
    document.getElementById("shift")?.scrollIntoView({behavior:"smooth", block:"start"});
  };

  // Re-queues only the tickets that were answered incorrectly, clears their
  // prior selection so they can be attempted fresh, and drops back into the
  // ticket view starting at the first one. Correctly-answered tickets are
  // left untouched — once every missed ticket is checked again, "End of
  // shift" naturally reappears (it triggers off the queue that was just
  // finished — the full deck, a section, or a previous review round — not
  // always the full DATA set) with the updated score.
  const reviewErrors = (wrongOriginalIdx) => {
    if (!wrongOriginalIdx || !wrongOriginalIdx.length) return;
    wrongOriginalIdx.forEach((qi) => {
      state.answers[qi] = {selected:new Set(), checked:false, correct:null};
    });
    state.order = wrongOriginalIdx;
    state.index = 0;
    state.finished = false;
    saveState();
    renderAll();
    document.getElementById("ticket")?.scrollIntoView({behavior:"smooth", block:"start"});
  };

  const renderStats = () => {
    const total = DATA.length;
    let resolved = 0, correct = 0;
    for (const a of state.answers) {
      if (a.checked) {
        resolved++;
        if (a.correct) correct++;
      }
    }
    const acc = resolved ? `${Math.round((correct / resolved) * 100)}%` : "—";
    els.stats.innerHTML = `
      <div class="stat"><span class="num mono">${resolved} / ${total}</span><span class="lbl">Resolved</span></div>
      <div class="stat"><span class="num mono">${correct}</span><span class="lbl">Correct</span></div>
      <div class="stat"><span class="num mono">${acc}</span><span class="lbl">Accuracy</span></div>`;
  };

  const renderQueue = () => {
    els.queue.innerHTML = state.order.map((qi, pos) => {
      const a = state.answers[qi];
      const classes = ["chip"];
      if (pos === state.index) classes.push("current");
      if (a.checked) classes.push(a.correct ? "correct" : "wrong");
      return `<button class="${classes.join(" ")}" data-i="${pos}" aria-label="Ticket ${pos + 1}">${pos + 1}</button>`;
    }).join("");
    els.queue.querySelectorAll(".chip").forEach((btn) => {
      btn.addEventListener("click", () => goTo(parseInt(btn.dataset.i, 10)));
    });
  };

  const renderTicket = () => {
    const i = state.index;
    const qi = state.order[i];
    const q = DATA[qi];
    const a = state.answers[qi];
    const isLastTicket = i === state.order.length - 1;

    const badgeHtml = !a.checked
      ? `<span class="badge open">Open</span>`
      : a.correct
        ? `<span class="badge good">Resolved — Correct</span>`
        : `<span class="badge bad">Resolved — Review</span>`;

    const optionsHtml = q.options.map((opt) => {
      const picked = a.selected.has(opt.k);
      const classes = ["opt"];
      let flag = "";
      if (picked && !a.checked) classes.push("picked");
      if (a.checked) {
        const isCorrectOpt = q.correct.includes(opt.k);
        if (picked && isCorrectOpt) { classes.push("reveal-correct"); flag = `<span class="opt-flag">✓ correct</span>`; }
        else if (picked && !isCorrectOpt) { classes.push("reveal-wrong"); flag = `<span class="opt-flag">✕ incorrect</span>`; }
        else if (!picked && isCorrectOpt) { classes.push("reveal-missed"); flag = `<span class="opt-flag">✓ should be selected</span>`; }
      }
      const markClasses = ["mark", "mono", ...(q.select === 1 ? ["circle"] : [])].join(" ");
      const markContent = a.checked
        ? (q.correct.includes(opt.k) ? "✓" : (picked ? "✕" : opt.k))
        : opt.k;
      return `<button type="button" class="${classes.join(" ")}" data-k="${opt.k}" ${a.checked ? "disabled" : ""}><span class="${markClasses}">${markContent}</span><span class="opt-text">${esc(opt.t)}</span>${flag}</button>`;
    }).join("");

    const resultBanner = !a.checked
      ? ""
      : a.correct
        ? `<div class="result-banner good">Correct — matches Salesforce documentation.</div>`
        : `<div class="result-banner bad">Not quite — read the resolution notes below.</div>`;

    const resolutionHtml = !a.checked ? "" : (() => {
      const refsHtml = q.sources.map((s) => `<a class="ref" href="${s.u}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6"/></svg>${esc(s.l)}</a>`).join("");
      return `<div class="resolution"><h3>Resolution notes</h3>${mdToHtml(q.explanation)}<div class="refs"><span class="ref-label">Attached knowledge articles</span>${refsHtml}</div></div>`;
    })();

    const actionsHtml = !a.checked
      ? `<div class="actions"><button class="btn" id="checkBtn" ${a.selected.size === q.select ? "" : "disabled"}>Check answer</button><span class="count-hint mono">${a.selected.size} of ${q.select} selected</span></div>`
      : `<div class="actions"><button class="btn ghost" id="tryAgainBtn">Try again</button></div>`;

    els.ticket.innerHTML = `
      <div class="perf"></div>
      <div class="ticket-head">
        <div>
          <span class="ticket-id mono">TICKET #${String(i + 1).padStart(2, "0")} OF ${state.order.length}</span><br>
          <span class="ticket-topic">${esc(q.topic)}</span>
        </div>
        ${badgeHtml}
      </div>
      <p class="prompt">${esc(q.prompt)}</p>
      <span class="select-hint">${SELECT_WORD[q.select]}${q.select > 1 ? ` (${q.select})` : ""}</span>
      ${resultBanner}
      <div class="options">${optionsHtml}</div>
      ${actionsHtml}
      <div class="ticketnav">
        <button class="btn ghost" id="prevBtn" ${i === 0 ? "disabled" : ""}>‹ Previous</button>
        <span class="pos mono">${i + 1} / ${state.order.length}</span>
        <button class="btn ghost" id="nextBtn">${isLastTicket ? "Finish" : "Next ›"}</button>
      </div>
      ${resolutionHtml}`;

    els.ticket.querySelectorAll(".opt").forEach((btn) => {
      btn.addEventListener("click", () => toggleSelect(qi, btn.dataset.k));
    });
    document.getElementById("checkBtn")?.addEventListener("click", () => checkAnswer(qi));
    document.getElementById("tryAgainBtn")?.addEventListener("click", () => resetOne(qi));
    document.getElementById("prevBtn").addEventListener("click", () => goTo(i - 1));
    document.getElementById("nextBtn").addEventListener("click", () => {
      if (isLastTicket) { finishQuiz(); } else { goTo(i + 1); }
    });
  };

  const renderShift = () => {
    // Scoped to the CURRENT queue (state.order) rather than the full DATA
    // set, so this works the same whether that queue is the full deck, a
    // single section, or a review-errors round.
    const total = state.order.length;
    const resolved = state.order.filter((qi) => state.answers[qi].checked).length;
    // Show the summary once every ticket has been individually checked, OR
    // once the user has explicitly hit Finish — which can happen with some
    // tickets still skipped/unanswered. Either way, any ticket that was
    // never checked counts as incorrect below rather than blocking the
    // summary from appearing at all.
    if (resolved < total && !state.finished) { els.shift.innerHTML = ""; return; }

    const isCorrect = (qi) => state.answers[qi].checked && state.answers[qi].correct;
    const correct = state.order.filter(isCorrect).length;
    const wrongOriginalIdx = state.order.filter((qi) => !isCorrect(qi));
    const skippedCount = total - resolved;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const scopeLabel = state.section ? esc(state.section) : "all sections";

    // Score broken down by exam domain (topic), for whatever categories are
    // actually present in the current queue — the full deck touches every
    // topic seen so far, a section touches just 1, a review round touches
    // whichever categories its wrong tickets came from. Skipped entirely
    // when there's only one category present, since it would just repeat
    // the overall score line.
    const byCategory = {};
    state.order.forEach((qi) => {
      const topic = DATA[qi].topic;
      const bucket = byCategory[topic] || (byCategory[topic] = { correct: 0, total: 0 });
      bucket.total++;
      if (isCorrect(qi)) bucket.correct++;
    });
    const categoryNames = Object.keys(byCategory);
    const orderedCategoryNames = SECTION_ORDER.filter((name) => byCategory[name])
      .concat(categoryNames.filter((name) => !SECTION_ORDER.includes(name))); // safety net, shouldn't happen
    const categoryBreakdownHtml = orderedCategoryNames.length > 1
      ? `<div class="category-breakdown">
          <span class="ref-label" style="display:block;">By category</span>
          ${orderedCategoryNames.map((name) => {
            const b = byCategory[name];
            const catPct = Math.round((b.correct / b.total) * 100);
            const barColor = catPct >= 80 ? "var(--good)" : catPct < 50 ? "var(--bad)" : "var(--accent)";
            return `<div class="cat-row">
                <span class="cat-name">${esc(name)}</span>
                <div class="cat-bar"><div class="cat-bar-fill" style="width:${catPct}%; background:${barColor};"></div></div>
                <span class="cat-score mono">${b.correct}/${b.total} · ${catPct}%</span>
              </div>`;
          }).join("")}
        </div>`
      : "";

    const reviewHtml = wrongOriginalIdx.length
      ? `<div class="review-chips">${wrongOriginalIdx.map((qi) => {
          const pos = state.order.indexOf(qi);
          const skipped = !state.answers[qi].checked;
          return `<button class="chip mono" data-i="${pos}" style="width:auto;padding:0 10px;">Ticket ${pos + 1}${skipped ? " (skipped)" : ""}</button>`;
        }).join("")}</div>`
      : `<p style="margin:0;">Every ticket resolved correctly.</p>`;

    const reviewErrorsBtnHtml = wrongOriginalIdx.length
      ? `<button class="btn" id="reviewErrorsBtn" style="margin-top:14px;">Review errors (${wrongOriginalIdx.length})</button>`
      : "";

    els.shift.innerHTML = `
      <div class="shift">
        <h2>End of shift</h2>
        <p>${resolved === total ? `All ${total} tickets resolved` : `${resolved} of ${total} tickets answered — ${skippedCount} skipped ticket${skippedCount === 1 ? "" : "s"} counted as incorrect`} — ${scopeLabel}.</p>
        <div class="score-line">Score: ${correct}/${total} - ${pct}%</div>
        <div class="row">
          <div><div class="num">${correct} / ${total}</div><div class="lbl">Correct</div></div>
          <div><div class="num">${pct}%</div><div class="lbl">Accuracy</div></div>
        </div>
        ${categoryBreakdownHtml}
        ${wrongOriginalIdx.length ? `<span class="ref-label" style="margin-bottom:8px;display:block;margin-top:${categoryBreakdownHtml ? "16px" : "0"};">Tickets to review</span>` : ""}
        ${reviewHtml}
        ${reviewErrorsBtnHtml}
      </div>`;

    els.shift.querySelectorAll(".chip").forEach((btn) => {
      btn.addEventListener("click", () => goTo(parseInt(btn.dataset.i, 10)));
    });
    document.getElementById("reviewErrorsBtn")?.addEventListener("click", () => reviewErrors(wrongOriginalIdx));
  };

  const renderAll = () => {
    renderStats();
    renderQueue();
    renderTicket();
    renderShift();
    document.getElementById("ticketCount").textContent = `${DATA.length} tickets · compiled from session transcript`;

    els.stats.style.display = state.finished ? "none" : "";
    els.queue.style.display = state.finished ? "none" : "";
    els.ticket.style.display = state.finished ? "none" : "";
  };

  populateSectionPicker();
  els.sectionSelect?.addEventListener("change", (e) => selectSection(e.target.value));

  document.getElementById("resetAll").addEventListener("click", () => {
    state.finished = false;
    state.section = "";
    state.answers = DATA.map(() => ({selected:new Set(), checked:false, correct:null}));
    reshuffleDeck();
    saveState();
    if (els.sectionSelect) els.sectionSelect.value = "";
    renderAll();
  });

  // ---------- Export (Word doc / PDF) — original DATA order, questions +
  // suggested answers + correct answers only, no explanations or sources.

  const buildExportRowsHtml = () => DATA.map((q, idx) => {
    const optionsHtml = q.options.map((o) => `<div class="pq-opt">${esc(o.k)}. ${esc(o.t)}</div>`).join("");
    const correctLabel = q.correct.length > 1 ? "Correct answers" : "Correct answer";
    return `
      <div class="pq">
        <p class="pq-num">Question ${idx + 1}</p>
        <p class="pq-topic">${esc(q.topic)}</p>
        <p class="pq-prompt">${esc(q.prompt)}</p>
        <div class="pq-options">${optionsHtml}</div>
        <p class="pq-correct">${correctLabel}: ${esc(q.correct.join(", "))}</p>
      </div>`;
  }).join("");

  const buildExportBodyHtml = () => `
    <h1>Platform Administrator II</h1>
    <p class="print-meta">Practice questions — ${DATA.length} total.</p>
    ${buildExportRowsHtml()}`;

  const exportWord = () => {
    const doc = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"><title>Platform Administrator II — Practice Questions</title>
<style>
  body{ font-family: Calibri, Arial, sans-serif; font-size:12pt; color:#111; }
  h1{ font-size:18pt; margin:0 0 4px; }
  .print-meta{ font-size:10pt; color:#555; margin:0 0 24px; }
  .pq{ margin:0 0 20px; }
  .pq-num{ font-weight:700; margin:0 0 2px; }
  .pq-topic{ font-size:9pt; text-transform:uppercase; letter-spacing:0.05em; color:#666; margin:0 0 6px; }
  .pq-prompt{ font-weight:600; margin:0 0 8px; }
  .pq-options{ margin:0 0 8px 18px; }
  .pq-opt{ margin:2px 0; }
  .pq-correct{ margin:0; font-weight:700; }
</style></head>
<body>${buildExportBodyHtml()}</body></html>`;
    const blob = new Blob(["﻿", doc], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Platform-Administrator-II-Practice-Questions.doc";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const exportPdf = () => {
    const printArea = document.getElementById("printExport");
    printArea.innerHTML = buildExportBodyHtml();
    document.body.classList.add("printing-export");
    const cleanup = () => {
      document.body.classList.remove("printing-export");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.print();
  };

  const exportMenu = document.getElementById("exportMenu");
  const exportBtn = document.getElementById("exportBtn");
  const exportMenuList = document.getElementById("exportMenuList");

  const closeExportMenu = () => {
    if (!exportMenuList) return;
    exportMenuList.hidden = true;
    exportBtn?.setAttribute("aria-expanded", "false");
  };
  const openExportMenu = () => {
    if (!exportMenuList) return;
    exportMenuList.hidden = false;
    exportBtn?.setAttribute("aria-expanded", "true");
  };

  exportBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (exportMenuList?.hidden) openExportMenu();
    else closeExportMenu();
  });
  document.getElementById("exportPdfBtn")?.addEventListener("click", () => {
    closeExportMenu();
    exportPdf();
  });
  document.getElementById("exportWordBtn")?.addEventListener("click", () => {
    closeExportMenu();
    exportWord();
  });
  document.addEventListener("click", (e) => {
    if (exportMenu && !exportMenu.contains(e.target)) closeExportMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeExportMenu();
  });

  renderAll();
})();
