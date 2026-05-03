import { useState } from "react";

// ─── QUESTION BANK ────────────────────────────────────────────────────────────
const QUESTIONS = [
  { id: "strategic_alignment", section: "Strategic Fit", label: "Does this opportunity align with Convergint's strategic priorities, target markets, and sector focus?", type: "choice", options: ["Yes", "Partially", "No"] },
  { id: "strategic_value", section: "Strategic Fit", label: "Does winning this customer create strategic value for Convergint?", type: "choice", options: ["High", "Medium", "Low"] },
  { id: "followon_potential", section: "Strategic Fit", label: "Is there potential for follow-on work, service revenue, or broader account growth beyond this opportunity?", type: "choice", options: ["High", "Medium", "Low"] },
  { id: "vertical_strengthening", section: "Strategic Fit", label: "Does this opportunity strengthen Convergint's position in a priority vertical, geography, or named account?", type: "choice", options: ["Yes", "No"] },
  { id: "customer_relationship", section: "Customer & Commercial Position", label: "What is Convergint's current relationship with the customer?", type: "choice", options: ["Strong", "Established", "Limited", "None"] },
  { id: "direct_contract", section: "Customer & Commercial Position", label: "Is the contract direct with the end user?", type: "choice", options: ["Yes", "No"] },
  { id: "delivery_model", section: "Customer & Commercial Position", label: "If not direct, is the delivery model via builder, head contractor, consultant, or other intermediary acceptable to Convergint?", type: "choice", options: ["Yes", "No", "Needs Review", "N/A – Direct"] },
  { id: "commercial_fit", section: "Customer & Commercial Position", label: "Is the customer / principal considered a good commercial fit for Convergint?", type: "choice", options: ["Yes", "No", "Needs Review"] },
  { id: "funding_status", section: "Customer & Commercial Position", label: "Does the customer have credible and confirmed funding for the project?", type: "choice", options: ["Confirmed", "Likely", "Unclear", "Unfunded"] },
  { id: "procurement_credibility", section: "Customer & Commercial Position", label: "Is the customer's procurement approach fair, credible, and likely to result in a genuine award?", type: "choice", options: ["Yes", "Likely", "Uncertain", "No"] },
  { id: "win_likelihood", section: "Win Probability", label: "What is the assessed likelihood of success if Convergint pursues this bid?", type: "choice", options: ["High", "Medium", "Low"] },
  { id: "competitive_advantage", section: "Win Probability", label: "Does Convergint have a clear competitive advantage or differentiator for this opportunity?", type: "choice", options: ["Strong", "Moderate", "Weak", "None"] },
  { id: "customer_understanding", section: "Win Probability", label: "Do we understand the customer's drivers, decision criteria, and buying process well enough to compete effectively?", type: "choice", options: ["Yes", "Partially", "No"] },
  { id: "competitive_position", section: "Win Probability", label: "Are we incumbent, preferred, shortlisted, or one of many?", type: "choice", options: ["Incumbent", "Favoured", "Competitive", "Open Market", "Unknown"] },
  { id: "capability_alignment", section: "Solution Fit & Delivery", label: "Does the opportunity align with Convergint's core capability, technical skill set, and delivery model?", type: "choice", options: ["Yes", "Partially", "No"] },
  { id: "solution_compatibility", section: "Solution Fit & Delivery", label: "Is the proposed solution compatible with the customer's requirements and project environment?", type: "choice", options: ["Exceeds", "Meets", "Partially Meets", "Does Not Meet"] },
  { id: "technical_risk", section: "Solution Fit & Delivery", label: "What is the overall technical risk of the proposed solution?", type: "choice", options: ["Low", "Moderate", "High"] },
  { id: "certifications", section: "Solution Fit & Delivery", label: "Does Convergint have the required certifications, licences, vendor relationships, and specialist capability to deliver?", type: "choice", options: ["Yes", "Partially", "No"] },
  { id: "programme_delivery", section: "Solution Fit & Delivery", label: "Can Convergint deliver the works within the required programme, staging, and site constraints?", type: "choice", options: ["Yes", "Possibly", "No"] },
  { id: "margin_expectation", section: "Commercial & Contract Risk", label: "Is the opportunity expected to deliver acceptable gross margin and overall profitability?", type: "choice", options: ["High", "Acceptable", "Low", "Unknown"] },
  { id: "contract_terms", section: "Commercial & Contract Risk", label: "Are the proposed contract terms and conditions acceptable to Convergint?", type: "choice", options: ["Yes", "No", "Subject to Review"] },
  { id: "legal_risk", section: "Commercial & Contract Risk", label: "Does the contract contain any material legal, commercial, or liability risk outside Convergint's normal tolerance?", type: "choice", options: ["Low", "Moderate", "High"] },
  { id: "uncapped_liability", section: "Commercial & Contract Risk", label: "Are there any uninsurable, uncapped, or disproportionate liabilities apparent in the tender documents?", type: "choice", options: ["Yes", "No", "Unknown"] },
  { id: "payment_terms", section: "Commercial & Contract Risk", label: "Are the payment terms, security requirements, retention, liquidated damages, and warranty obligations acceptable?", type: "choice", options: ["Yes", "No", "Needs Review"] },
  { id: "bid_resources", section: "Resourcing & Capacity", label: "Do we have the right bid resources available to prepare a quality submission in the required timeframe?", type: "choice", options: ["Yes", "No"] },
  { id: "delivery_resources", section: "Resourcing & Capacity", label: "Do we have the right operational resources available to deliver the project if awarded?", type: "choice", options: ["Yes", "No", "Unclear"] },
  { id: "stakeholder_alignment", section: "Resourcing & Capacity", label: "Are key internal stakeholders aligned to support this pursuit — sales, operations, finance, legal, procurement, and leadership?", type: "choice", options: ["Yes", "Partially", "No"] },
  { id: "disruption_risk", section: "Resourcing & Capacity", label: "Can Convergint respond without material disruption to higher-priority bids or live projects?", type: "choice", options: ["Yes", "No", "Needs Review"] },
  { id: "effort_proportionate", section: "Bid Effort & Submission", label: "Is the required submission proportionate to the opportunity value and win likelihood?", type: "choice", options: ["Yes", "No"] },
  { id: "effort_level", section: "Bid Effort & Submission", label: "What is the expected proposal effort level?", type: "choice", options: ["Light", "Moderate", "High"] },
  { id: "submission_type", section: "Bid Effort & Submission", label: "Is the bid expected to be short-form / compliance-led or detailed / resource-intensive?", type: "choice", options: ["Short", "Medium", "Long"] },
  { id: "timetable_achievable", section: "Bid Effort & Submission", label: "Are the submission timetable, format, and mandatory requirements realistic and achievable?", type: "choice", options: ["Yes", "No", "At Risk"] },
  { id: "project_context", section: "Bid Effort & Submission", label: "Project name, client, and any additional context for the evaluator", type: "textarea", placeholder: "e.g. ABC Hospital – Security & Access Control Upgrade, $2.4M, submission due 15 June...", required: false },
];

// Convergint Brand Guide 2026 — exact hex values
const C = {
  black: "#000000",
  deepBlue: "#054163",
  blue: "#0099D8",
  lightBlue: "#E2EFF8",
  silver: "#EDEDED",
  white: "#FFFFFF",
  bg: "#F2F5F7",
  surface: "#FFFFFF",
  surfaceAlt: "#F0F4F7",
  border: "#D5DFE8",
  textPrimary: "#0A0F14",
  textSecondary: "#2E3E4E",
  textMuted: "#6B7D8E",
  warning: "#D4880A",
};

const OPTION_SENTIMENT = {
  Yes: "pos", High: "pos", Strong: "pos", Confirmed: "pos", Incumbent: "pos",
  Favoured: "pos", Exceeds: "pos", Acceptable: "pos", Light: "pos", Short: "pos",
  "N/A – Direct": "pos", Established: "neu",
  Partially: "neu", Medium: "neu", Moderate: "neu", Likely: "neu", Competitive: "neu",
  Meets: "neu", "Subject to Review": "neu", "Needs Review": "neu", Unclear: "neu",
  "At Risk": "neu", "Partially Meets": "neu", "Open Market": "neu", Unknown: "neu",
  Possibly: "neu", Low: "neu",
  No: "neg", None: "neg", Limited: "neg", Unfunded: "neg", "Does Not Meet": "neg",
};

const getRiskId = (qId) => ["technical_risk", "legal_risk", "effort_level"].includes(qId);

const getOptColor = (opt, qId, active) => {
  if (!active) return null;
  let s = OPTION_SENTIMENT[opt];
  if (opt === "High" && getRiskId(qId)) s = "neg";
  if (s === "pos") return C.blue;
  if (s === "neg") return C.deepBlue;
  return C.warning;
};

const SECTIONS = [...new Set(QUESTIONS.map((q) => q.section))];

const ChoiceInput = ({ question, value, onChange }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "12px" }}>
    {question.options.map((opt) => {
      const active = value === opt;
      const col = getOptColor(opt, question.id, active);
      return (
        <button key={opt} onClick={() => onChange(opt)} style={{
          padding: "7px 15px",
          background: active ? col : C.surfaceAlt,
          color: active ? C.white : C.textSecondary,
          border: `1.5px solid ${active ? col : C.border}`,
          borderRadius: "3px", cursor: "pointer",
          fontSize: "13px", fontFamily: "'Outfit', sans-serif",
          fontWeight: active ? "500" : "300",
          transition: "all 0.15s ease", whiteSpace: "nowrap",
        }}>{opt}</button>
      );
    })}
  </div>
);

const ProgressStrip = ({ currentSection, sections, answers }) => (
  <div style={{ display: "flex", gap: "2px" }}>
    {sections.map((s) => {
      const qs = QUESTIONS.filter((q) => q.section === s && q.type !== "textarea");
      const done = qs.every((q) => answers[q.id]);
      const isActive = s === currentSection;
      return (
        <div key={s} title={s} style={{
          flex: 1, height: "3px", borderRadius: "1px",
          background: isActive ? C.blue : done ? C.deepBlue : C.border,
          transition: "background 0.25s",
        }} />
      );
    })}
  </div>
);

const renderReport = (text) =>
  text.split("\n").map((line, i) => {
    if (/^\*\*.*\*\*$/.test(line.trim())) return (
      <div key={i} style={{ fontSize: "10px", fontWeight: "600", color: C.blue, textTransform: "uppercase", letterSpacing: "0.12em", marginTop: "22px", marginBottom: "8px", paddingBottom: "7px", borderBottom: `1px solid ${C.border}` }}>
        {line.replace(/\*\*/g, "")}
      </div>
    );
    if (/\*\*/.test(line)) return (
      <div key={i} style={{ fontWeight: "500", color: C.textPrimary, marginTop: "8px", marginBottom: "4px", fontSize: "14px" }}>
        {line.replace(/\*\*/g, "")}
      </div>
    );
    if (line.startsWith("- ")) return (
      <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "7px" }}>
        <span style={{ color: C.blue, fontWeight: "600", flexShrink: 0 }}>–</span>
        <span style={{ color: C.textSecondary, lineHeight: "1.65", fontSize: "14px", fontWeight: "300" }}>{line.slice(2)}</span>
      </div>
    );
    if (!line.trim()) return <div key={i} style={{ height: "8px" }} />;
    return <p key={i} style={{ color: C.textSecondary, lineHeight: "1.7", fontSize: "14px", fontWeight: "300", marginBottom: "4px" }}>{line}</p>;
  });

const getVerdict = (text) => {
  if (!text) return null;
  const u = text.toUpperCase();
  if (u.includes("NO BID")) return { label: "NO BID", bg: C.deepBlue };
  if (u.includes("CONDITIONAL BID")) return { label: "CONDITIONAL BID", bg: C.warning };
  if (u.includes("BID")) return { label: "BID", bg: C.blue };
  return null;
};

const buildPrompt = (answers) => {
  const lines = QUESTIONS.map((q) => {
    const v = answers[q.id];
    if (!v) return null;
    return `**${q.section} | ${q.label}**\n${v}`;
  }).filter(Boolean).join("\n\n");

  return `You are a senior bid strategist advising Convergint Technologies — a global systems integrator specialising in electronic security, fire & life safety, building automation, and healthcare technologies.

Review the following Bid Qualification responses and provide a structured evaluation.

QUALIFICATION RESPONSES:
${lines}

---

Provide the following:

1. **BID / NO BID VERDICT** — State clearly: BID, CONDITIONAL BID, or NO BID. Include a confidence qualifier (e.g. "Strong Bid", "Marginal Bid", "Strong No Bid").

2. **OVERALL SCORE** — Score out of 100, broken down as:
   - Strategic Fit (out of 15)
   - Customer & Commercial Position (out of 20)
   - Win Probability (out of 20)
   - Solution Fit & Delivery Confidence (out of 20)
   - Commercial & Contract Risk (out of 15)
   - Resourcing & Capacity (out of 10)

3. **KEY STRENGTHS** — 3–5 bullets on what makes this a strong or pursuable opportunity.

4. **RED FLAGS & CONCERNS** — 3–5 bullets on the most significant risks, gaps, or warning signs.

5. **CONDITIONS / ACTIONS REQUIRED** — If recommending a Conditional Bid, list 2–4 specific conditions that must be met before proceeding. If No Bid, state what would need to change to reconsider.

6. **WIN STRATEGY SUMMARY** — 2–3 sentences on how Convergint should position and differentiate if pursuing this bid.

Be direct and commercially frank. This is a high-stakes decision.`;
};

const Logo = ({ light }) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: "0px" }}>
    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: "300", fontSize: "18px", letterSpacing: "-0.02em", color: light ? C.white : C.deepBlue }}>converg</span>
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", margin: "0 0.5px", position: "relative", top: "1px" }}>
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#C2090E", display: "block", marginBottom: "2px" }} />
      <span style={{ width: "3px", height: "9px", background: "#C2090E", borderRadius: "1px", display: "block" }} />
    </span>
    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: "300", fontSize: "18px", letterSpacing: "-0.02em", color: light ? C.white : C.deepBlue }}>nt</span>
    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: "300", fontSize: "10px", color: light ? "rgba(255,255,255,0.5)" : C.textMuted, marginLeft: "1px", position: "relative", top: "-5px" }}>®</span>
  </div>
);

export default function App() {
  const [answers, setAnswers] = useState({});
  const [sectionIdx, setSectionIdx] = useState(0);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentSection = SECTIONS[sectionIdx];
  const sectionQs = QUESTIONS.filter((q) => q.section === currentSection);
  const requiredQs = sectionQs.filter((q) => q.required !== false && q.type !== "textarea");
  const sectionComplete = requiredQs.every((q) => answers[q.id]);
  const isLast = sectionIdx === SECTIONS.length - 1;
  const setAnswer = (id, val) => setAnswers((p) => ({ ...p, [id]: val }));
  const totalQs = QUESTIONS.filter((q) => q.type !== "textarea").length;
  const answeredQs = QUESTIONS.filter((q) => q.type !== "textarea" && answers[q.id]).length;
  const pct = Math.round((answeredQs / totalQs) * 100);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      // Calls our Vercel serverless function — no CORS issues
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: buildPrompt(answers) }],
        }),
      });
      const data = await res.json();
      setReport(data.content?.map((b) => b.text || "").join("\n") || "");
    } catch {
      setError("Unable to reach the evaluation engine. Please check your API key in Vercel and try again.");
    }
    setLoading(false);
  };

  const reset = () => { setAnswers({}); setSectionIdx(0); setReport(null); setError(null); };
  const verdict = getVerdict(report);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: C.bg, minHeight: "100vh", color: C.textPrimary }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea { outline: none; font-family: 'Outfit', sans-serif; }
        textarea:focus { border-color: ${C.blue} !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${C.silver}; }
        ::-webkit-scrollbar-thumb { background: ${C.blue}; border-radius: 3px; }
        button:hover { opacity: 0.88; }
      `}</style>

      {/* Header */}
      <div style={{
        background: `linear-gradient(100deg, ${C.black} 0%, ${C.deepBlue} 45%, ${C.blue} 100%)`,
        padding: "0 32px", height: "58px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <Logo light />
          <div style={{ width: "1px", height: "22px", background: "rgba(255,255,255,0.2)" }} />
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: "300", letterSpacing: "0.02em" }}>
            Bid Qualification Tool
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {!report && answeredQs > 0 && (
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: "300" }}>
              <span style={{ color: C.white, fontWeight: "500" }}>{pct}%</span> complete
            </span>
          )}
          {(report || sectionIdx > 0) && (
            <button onClick={reset} style={{
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
              color: C.white, padding: "6px 14px", borderRadius: "3px",
              fontSize: "12px", fontFamily: "'Outfit', sans-serif", fontWeight: "300", cursor: "pointer",
            }}>↺ New Evaluation</button>
          )}
        </div>
      </div>

      {/* Section nav tabs */}
      {!report && !loading && (
        <div style={{ background: C.deepBlue, padding: "0 28px", display: "flex", overflowX: "auto" }}>
          {SECTIONS.map((s, i) => {
            const active = s === currentSection;
            const qs = QUESTIONS.filter((q) => q.section === s && q.type !== "textarea");
            const done = qs.every((q) => answers[q.id]);
            return (
              <div key={s} onClick={() => setSectionIdx(i)} style={{
                padding: "9px 14px", fontSize: "11px", whiteSpace: "nowrap", cursor: "pointer",
                fontWeight: active ? "500" : "300",
                color: active ? C.white : done ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.35)",
                borderBottom: active ? `2px solid ${C.blue}` : "2px solid transparent",
                transition: "all 0.2s",
              }}>
                {done && !active ? "✓ " : `${i + 1}. `}{s}
              </div>
            );
          })}
        </div>
      )}

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "28px 20px 60px" }}>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ width: "40px", height: "40px", margin: "0 auto 18px", border: `3px solid ${C.lightBlue}`, borderTop: `3px solid ${C.blue}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ fontSize: "15px", fontWeight: "400", color: C.textSecondary }}>Generating your evaluation…</div>
            <div style={{ fontSize: "12px", fontWeight: "300", color: C.textMuted, marginTop: "5px" }}>This will take a moment</div>
          </div>
        )}

        {/* Report */}
        {report && !loading && (
          <div>
            {verdict && (
              <div style={{ background: verdict.bg, borderRadius: "4px", padding: "24px 28px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "10px", fontWeight: "500", color: "rgba(255,255,255,0.7)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "5px" }}>
                    Bid Qualification — Recommendation
                  </div>
                  <div style={{ fontSize: "40px", fontWeight: "600", color: C.white, letterSpacing: "-0.01em", lineHeight: 1 }}>
                    {verdict.label}
                  </div>
                </div>
                <Logo light />
              </div>
            )}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: "4px", padding: "26px 28px" }}>
              <div style={{ fontSize: "10px", fontWeight: "600", color: C.blue, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "18px", paddingBottom: "12px", borderBottom: `1px solid ${C.border}` }}>
                Full Evaluation Report
              </div>
              {renderReport(report)}
            </div>
            <div style={{ marginTop: "18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", color: C.textMuted, fontWeight: "300" }}>Convergint · Bid Qualification Tool · Internal Use Only</span>
              <button onClick={reset} style={{ background: C.blue, color: C.white, border: "none", padding: "10px 22px", borderRadius: "3px", cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: "500" }}>
                Start New Evaluation
              </button>
            </div>
          </div>
        )}

        {/* Questionnaire */}
        {!report && !loading && (
          <>
            <div style={{ marginBottom: "6px" }}>
              <ProgressStrip currentSection={currentSection} sections={SECTIONS} answers={answers} />
            </div>
            <div style={{ marginTop: "20px", marginBottom: "22px" }}>
              <div style={{ fontSize: "11px", fontWeight: "500", color: C.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "5px" }}>
                Section {sectionIdx + 1} of {SECTIONS.length}
              </div>
              <h1 style={{ fontSize: "30px", fontWeight: "500", color: C.textPrimary, lineHeight: 1.15, marginBottom: "10px" }}>
                {currentSection}
              </h1>
              <div style={{ width: "28px", height: "2px", background: C.blue, borderRadius: "1px" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {sectionQs.map((q) => (
                <div key={q.id} style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${answers[q.id] ? C.blue : C.border}`, borderRadius: "3px", padding: "16px 18px", transition: "border-left-color 0.2s" }}>
                  <div style={{ fontSize: "14px", fontWeight: "400", color: C.textPrimary, lineHeight: "1.5" }}>
                    {q.label}
                    {q.required !== false && q.type !== "textarea" && <span style={{ color: C.blue, marginLeft: "3px" }}>*</span>}
                  </div>
                  {q.type === "choice" && (
                    <ChoiceInput question={q} value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} />
                  )}
                  {q.type === "textarea" && (
                    <textarea value={answers[q.id] || ""} onChange={(e) => setAnswer(q.id, e.target.value)}
                      placeholder={q.placeholder} rows={3}
                      style={{ width: "100%", marginTop: "10px", background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: "3px", padding: "9px 12px", color: C.textPrimary, fontSize: "14px", fontWeight: "300", resize: "vertical", lineHeight: "1.6" }}
                    />
                  )}
                </div>
              ))}
            </div>

            {error && (
              <div style={{ marginTop: "12px", padding: "11px 14px", background: C.lightBlue, border: `1px solid ${C.blue}`, borderRadius: "3px", color: C.deepBlue, fontSize: "13px", fontWeight: "300" }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "22px", alignItems: "center" }}>
              <button onClick={() => setSectionIdx((i) => i - 1)} disabled={sectionIdx === 0}
                style={{ background: "transparent", border: `1px solid ${C.border}`, color: sectionIdx === 0 ? C.border : C.textMuted, padding: "9px 18px", borderRadius: "3px", cursor: sectionIdx === 0 ? "default" : "pointer", fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: "300" }}>
                ← Back
              </button>
              {!isLast ? (
                <button onClick={() => setSectionIdx((i) => i + 1)} disabled={!sectionComplete}
                  style={{ background: sectionComplete ? C.blue : C.silver, color: sectionComplete ? C.white : C.textMuted, border: "none", padding: "9px 22px", borderRadius: "3px", cursor: sectionComplete ? "pointer" : "default", fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: "500", transition: "background 0.2s" }}>
                  Next: {SECTIONS[sectionIdx + 1]} →
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={!sectionComplete}
                  style={{ background: sectionComplete ? C.deepBlue : C.silver, color: sectionComplete ? C.white : C.textMuted, border: "none", padding: "11px 26px", borderRadius: "3px", cursor: sectionComplete ? "pointer" : "default", fontFamily: "'Outfit', sans-serif", fontSize: "14px", fontWeight: "500", transition: "background 0.2s" }}>
                  Generate Evaluation Report →
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${C.border}`, background: C.white, padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Logo />
        <span style={{ fontSize: "11px", color: C.textMuted, fontWeight: "300" }}>Bid Qualification Tool · Internal Use Only</span>
      </div>
    </div>
  );
}
