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
