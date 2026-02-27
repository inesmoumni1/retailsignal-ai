import { useState, useEffect } from "react";
import {
  Copy, Target, Lightbulb, BarChart2,
  CheckCircle2, Sparkles, ShieldAlert, Timer, TrendingUp, Zap, Shield,
  AlertCircle, CreditCard, ArrowUpRight, DollarSign
} from "lucide-react";
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart
} from "recharts";

const SCENARIOS = {
  zeroPlastic: {
    id: "zeroPlastic",
    icon: TrendingUp,
    title: "Zero-Plastic Skincare",
    tag: "Eco-Conscious",
    metric: "+24%",
    metricSub: "YoY Search Growth",
    accent: "#34A853",
    accentLight: "#E6F4EA",
    chartData: [
      { w: "W1", val: 40 }, { w: "W2", val: 42 }, { w: "W3", val: 45 },
      { w: "W4", val: 52 }, { w: "W5", val: 58 }, { w: "W6", val: 65 }, { w: "W7", val: 72 }
    ],
    signal: "Forte accélération des requêtes 'sans plastique'.",
    interpretation: "Les consommateurs passent de la 'clean beauty' générique à des décisions basées sur le packaging — une opportunité non-brand scalable.",
    pitch: "Claire, nous observons une hausse de 24% des recherches sur le zéro-plastique. En activant Performance Max avec des assets dédiés, on capte cette demande avant vos concurrents.",
    budget: ["+20% Budget Non-Brand", "Assets PMax dédiés (éco-positioning)", "Test contrôlé 4 semaines"],
    impact: ["Revenu Non-Brand:+12%", "LTV Client:+18%", "ROI estimé:2.6×"],
    risk: "Surveiller l'évolution des CPC sur les mots-clés génériques hebdomadairement.",
    battlecard: {
      objections: [
        "ROAS incertain sur un segment encore niché",
        "Coût de création d'assets vidéo élevé",
        "Difficulté à mesurer l'impact brand long-terme"
      ],
      arguments: [
        "LTV 18% supérieure = CAC acceptable plus haut",
        "Performance Max capte l'intention cross-canal automatiquement",
        "Vidéo YouTube : +40% de mémorisation vs display classique"
      ],
      budgetTiers: [
        { label: "Test (2 sem.)", amount: "€600–900", note: "Assets vidéo + Shopping", color: "#F8F9FA", border: "#E8EAED", text: "#3C4043" },
        { label: "Scale (1 mois)", amount: "€3 500–5 500", note: "Peak d'intérêt détecté", color: "#E6F4EA", border: "#A8D5B5", text: "#137333" },
        { label: "Full Funnel", amount: "€9 000+", note: "ROI estimé ×2.6 (LTV)", color: "#E8F0FE", border: "#AECBFA", text: "#1A73E8" },
      ]
    }
  },
  sunscreen: {
    id: "sunscreen",
    icon: Zap,
    title: "Early Mineral SPF",
    tag: "Seasonal Surge",
    metric: "+42%",
    metricSub: "April Search Spike",
    accent: "#F29900",
    accentLight: "#FEF7E0",
    chartData: [
      { w: "W1", val: 10 }, { w: "W2", val: 12 }, { w: "W3", val: 18 },
      { w: "W4", val: 35 }, { w: "W5", val: 48 }, { w: "W6", val: 55 }, { w: "W7", val: 68 }
    ],
    signal: "Pic de demande 4 à 6 semaines plus tôt que l'année dernière.",
    interpretation: "Anticipation saisonnière précoce détectée dès avril. La courbe est en accélération mais loin du plafond estival (pic absolu en juillet) — le potentiel de croissance reste entier.",
    pitch: "Claire, la demande pour le solaire minéral explose déjà. Activons Demand Gen maintenant pour verrouiller l'intention à moindre coût avant le pic de juin.",
    budget: ["Test 2 semaines: 1 200€", "Phase Scale: 5 000€", "Géo-targeting Sud France"],
    impact: ["Blended CAC:-15%", "Impression Share:Top", "ROI estimé:2.1×"],
    risk: "Ajuster les enchères dès que la concurrence s'intensifie, à surveiller hebdomadairement.",
    battlecard: {
      objections: [
        "Budget engagé trop tôt avant la saison",
        "Incertitude météo sur l'intent d'achat",
        "ROI difficile à justifier hors-période"
      ],
      arguments: [
        "CPC 30% inférieur = budget identique → volume ×1.4",
        "Demand Gen prépare l'audience avant la concurrence",
        "Géo-targeting Sud concentre le budget sur l'intent chaud"
      ],
      budgetTiers: [
        { label: "Anticipation (Avril)", amount: "€800–1 200", note: "CPC bas, volume croissant", color: "#F8F9FA", border: "#E8EAED", text: "#3C4043" },
        { label: "Peak (Mai–Juin)", amount: "€4 000–6 000", note: "Saisonnalité solaire plein", color: "#FEF7E0", border: "#FBCB6B", text: "#B06000" },
        { label: "Full Season", amount: "€10 000+", note: "ROI estimé ×2.1 saisonnier", color: "#E6F4EA", border: "#A8D5B5", text: "#137333" },
      ]
    }
  },
  cleanBeauty: {
    id: "cleanBeauty",
    icon: Shield,
    title: "Clean Beauty Conquest",
    tag: "Competitive Shift",
    metric: "+28%",
    metricSub: "Competitor Incursion",
    accent: "#1A73E8",
    accentLight: "#E8F0FE",
    chartData: [
      { w: "W1", val: 60 }, { w: "W2", val: 65 }, { w: "W3", val: 70 },
      { w: "W4", val: 75 }, { w: "W5", val: 82 }, { w: "W6", val: 88 }, { w: "W7", val: 94 }
    ],
    signal: "Un acteur US gagne du terrain sur vos requêtes de marque.",
    interpretation: "Pression concurrentielle détectée via hausse des CPC et baisse de l'Impression Share sur requêtes de marque — corrélée à une montée aux enchères sur Auction Insights. Urgence défensive.",
    pitch: "Claire, un concurrent US gagne 28% sur vos mots-clés. Sécurisons votre Share of Voice avec Exact Match pour protéger vos marges avant qu'ils ne s'installent.",
    budget: ["Brand Defense (Urgent)", "Exact Match + Extensions", "Budget: 1 000€ – 1 500€/sem"],
    impact: ["SoV Protection:+12%", "Defense ROI:×4.2", "Brand Safety:High"],
    risk: "Chaque semaine sans action = -1.5pt de SoV supplémentaire.",
    battlecard: {
      objections: [
        "Budget Brand perçu comme non-incrémental",
        "Difficulté à mesurer l'impact de la défense",
        "CPC Brand en hausse à cause de la concurrence"
      ],
      arguments: [
        "Brand Defense protège un CPC 5× inférieur au Search générique",
        "Exact Match capte les utilisateurs à fort intent d'achat",
        "SoV maintenu = barrière à l'entrée pour le concurrent US"
      ],
      budgetTiers: [
        { label: "Brand Defense (urgent)", amount: "€1 000–1 500", note: "Stop à l'hémorragie de SoV", color: "#F8F9FA", border: "#E8EAED", text: "#3C4043" },
        { label: "Conquête (1 mois)", amount: "€4 500–7 000", note: "Exact Match + Extensions", color: "#E8F0FE", border: "#AECBFA", text: "#1A73E8" },
        { label: "Dominance marché", amount: "€12 000+", note: "ROI estimé ×4.2 (LTV brand)", color: "#E6F4EA", border: "#A8D5B5", text: "#137333" },
      ]
    }
  }
};

export default function App() {
  const [active, setActive] = useState("zeroPlastic");
  const [copied, setCopied] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const s = SCENARIOS[active];

  const switchScenario = (id) => {
    setActive(id);
    setAnimKey(k => k + 1);
  };

  const copyPitch = () => {
    navigator.clipboard.writeText(s.pitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#F8F9FA", minHeight: "100vh", color: "#202124" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .fade-in { animation: fadeUp 0.35s cubic-bezier(0.34,1.1,0.64,1) both; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

        .card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #E8EAED;
        }

        .card-shadow {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 1px 2px rgba(60,64,67,0.06), 0 4px 16px rgba(60,64,67,0.08);
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 20px;
          border-radius: 100px;
          font-size: 13.5px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.18s;
          font-family: inherit;
        }

        .copy-btn {
          width: 100%;
          padding: 13px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          font-family: inherit;
          letter-spacing: 0.01em;
        }
        .copy-btn:hover { filter: brightness(1.07); transform: translateY(-1px); }
        .copy-btn:active { transform: translateY(0); }

        .section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #80868B;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 14px;
        }

        .impact-pill {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          border-radius: 10px;
          background: #F8F9FA;
          font-size: 13px;
        }

        .budget-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 0;
          font-size: 13.5px;
          color: #3C4043;
          border-bottom: 1px solid #F1F3F4;
          font-weight: 500;
        }
        .budget-row:last-child { border-bottom: none; }

        .g-dots { display: flex; gap: 3px; align-items: center; }
        .g-dot { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>

      {/* Navigation */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #E8EAED", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#1A73E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BarChart2 size={18} color="#fff" />
          </div>
          <span style={{ fontWeight: 800, fontSize: "16px", letterSpacing: "-0.01em" }}>
            Retail<span style={{ color: "#1A73E8" }}>Signal</span>
          </span>
          <div style={{ marginLeft: "4px", display: "flex", alignItems: "center", gap: "8px", borderLeft: "1px solid #E8EAED", paddingLeft: "14px" }}>
            <span style={{ padding: "3px 10px", borderRadius: "100px", background: "#F1F3F4", color: "#5F6368", fontSize: "11px", fontWeight: 700 }}>Q2 2026</span>
            <div style={{
              display: "flex", alignItems: "center", gap: "7px",
              padding: "5px 12px 5px 10px",
              borderRadius: "100px",
              border: "1px solid #DADCE0",
              background: "#F1F3F4",
              title: "API Google Trends — Not Connected"
            }}>
              {/* Wifi icon with diagonal strikethrough */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M5 12.55a11 11 0 0 1 14.08 0" stroke="#BBBFC4" strokeWidth="2" strokeLinecap="round"/>
                <path d="M1.42 9a16 16 0 0 1 21.16 0" stroke="#BBBFC4" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke="#BBBFC4" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="20" r="1.5" fill="#BBBFC4"/>
                {/* Red diagonal cross line */}
                <line x1="3" y1="3" x2="21" y2="21" stroke="#EA4335" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#9AA0A6", whiteSpace: "nowrap" }}>
                API Google Trends
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", background: "#F1F3F4", padding: "4px", borderRadius: "100px", gap: "4px" }}>
          {Object.values(SCENARIOS).map((scen) => {
            const Icon = scen.icon;
            const isActive = active === scen.id;
            return (
              <button
                key={scen.id}
                className="tab-btn"
                onClick={() => switchScenario(scen.id)}
                style={{
                  background: isActive ? "#fff" : "transparent",
                  color: isActive ? scen.accent : "#5F6368",
                  boxShadow: isActive ? "0 1px 4px rgba(60,64,67,0.12)" : "none",
                }}
              >
                <Icon size={13} />
                {scen.title}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: "1160px", margin: "0 auto", padding: "28px 32px", display: "grid", gridTemplateColumns: "1fr 360px", gap: "20px" }}>

        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

          {/* Chart */}
          <div className="card-shadow" style={{ padding: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "22px" }}>
              <div key={`title-${animKey}`} className="fade-in">
                <span style={{ padding: "4px 12px", borderRadius: "100px", background: s.accentLight, color: s.accent, fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>
                  {s.tag}
                </span>
                <h2 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em", marginTop: "8px", color: "#202124" }}>
                  {s.title}
                </h2>
                <p style={{ fontSize: "12px", color: "#9AA0A6", marginTop: "2px", fontWeight: 500 }}>
                  Index d'intérêt Google Trends (Temps réel)
                </p>
              </div>
              <div key={`metric-${animKey}`} className="fade-in" style={{ textAlign: "right" }}>
                <div style={{ fontSize: "52px", fontWeight: 800, color: s.accent, lineHeight: 1, letterSpacing: "-0.03em" }}>
                  {s.metric}
                </div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#9AA0A6", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "4px" }}>
                  {s.metricSub}
                </div>
              </div>
            </div>
            <div style={{ height: "220px" }}>
              <ResponsiveContainer>
                <AreaChart data={s.chartData} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id={`g-${s.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={s.accent} stopOpacity={0.15} />
                      <stop offset="100%" stopColor={s.accent} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F4" />
                  <XAxis dataKey="w" axisLine={false} tickLine={false} tick={{ fill: "#9AA0A6", fontSize: 12, fontFamily: "inherit", fontWeight: 500 }} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(60,64,67,0.15)", fontSize: "13px", fontFamily: "inherit" }}
                    itemStyle={{ color: s.accent, fontWeight: 700 }}
                    labelStyle={{ color: "#5F6368", fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="val" stroke={s.accent} strokeWidth={2.5} fill={`url(#g-${s.id})`} dot={false} activeDot={{ r: 5, fill: s.accent, stroke: "#fff", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>

            <div className="card" style={{ padding: "22px" }}>
              <div className="section-label">
                <Lightbulb size={13} color={s.accent} /> Market Analysis
              </div>
              <p key={`interp-${animKey}`} className="fade-in" style={{ fontSize: "14px", lineHeight: 1.65, color: "#3C4043", fontWeight: 500 }}>
                {s.interpretation}
              </p>
            </div>

            <div className="card" style={{ padding: "22px" }}>
              <div className="section-label">
                <Target size={13} color={s.accent} /> Strategy & Budget
              </div>
              <div>
                {s.budget.map((item, i) => (
                  <div key={`${animKey}-b${i}`} className={`budget-row fade-in`} style={{ animationDelay: `${i * 0.06}s` }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: s.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <CheckCircle2 size={12} color={s.accent} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

          {/* Pitch */}
          <div className="card-shadow" style={{ padding: "24px", background: `linear-gradient(150deg, ${s.accentLight} 0%, #fff 55%)`, borderRadius: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: s.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={16} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 800, color: s.accent, letterSpacing: "0.07em", textTransform: "uppercase" }}>Sales Battlecard</div>
                <div style={{ fontSize: "11px", color: "#80868B", fontWeight: 500 }}>30-second narrative</div>
              </div>
            </div>

            <p key={`pitch-${animKey}`} className="fade-in" style={{ fontSize: "14px", lineHeight: 1.72, color: "#3C4043", fontStyle: "italic", marginBottom: "20px", fontWeight: 500 }}>
              "{s.pitch}"
            </p>

            <button
              className="copy-btn"
              onClick={copyPitch}
              style={{
                background: copied ? "#34A853" : s.accent,
                color: "#fff",
                boxShadow: `0 2px 10px ${copied ? "#34A85344" : s.accent + "44"}`,
              }}
            >
              {copied
                ? <><CheckCircle2 size={16} /> Pitch copié !</>
                : <><Copy size={16} /> Copier le Pitch</>
              }
            </button>
          </div>

          {/* Impact */}
          <div className="card" style={{ padding: "22px" }}>
            <div className="section-label">
              <BarChart2 size={13} color={s.accent} /> Simulated Impact
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {s.impact.map((imp, i) => {
                const [label, val] = imp.split(":");
                return (
                  <div key={`${animKey}-imp${i}`} className={`impact-pill fade-in`} style={{ animationDelay: `${i * 0.07}s` }}>
                    <span style={{ color: "#3C4043", fontWeight: 600 }}>{label}</span>
                    <span style={{ color: s.accent, fontWeight: 800 }}>{val || "✓"}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid #F1F3F4" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "7px" }}>
                <ShieldAlert size={13} color="#EA4335" />
                <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#EA4335" }}>Risk Control</span>
              </div>
              <p style={{ fontSize: "12px", color: "#80868B", lineHeight: 1.6, fontStyle: "italic", fontWeight: 500 }}>
                {s.risk}
              </p>
            </div>
          </div>

          {/* Efficiency Gain */}
          <div style={{ background: "#fff", border: "1px dashed #34A853", borderRadius: "14px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "10px" }}>
            <Timer size={16} color="#34A853" />
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#34A853" }}>AM Prep Time: −35% (Efficiency Gain)</span>
          </div>
        </div>
      </main>

      {/* ── SALES BATTLECARD (collapsible) ── */}
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px 40px" }}>
        <BattlecardCollapse battlecard={s.battlecard} accent={s.accent} accentLight={s.accentLight} animKey={animKey} />
      </div>
    </div>
  );
}

// ─── BATTLECARD COLLAPSE COMPONENT ───────────────────────────────────────────
function BattlecardCollapse({ battlecard, accent, accentLight, animKey }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 1px 2px rgba(60,64,67,0.06), 0 4px 16px rgba(60,64,67,0.08)", overflow: "hidden" }}>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "15px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: open ? accent : "#fff",
          color: open ? "#fff" : accent,
          fontWeight: 700,
          fontSize: "13px",
          border: "none",
          borderTop: `1px solid ${open ? "transparent" : "#E8EAED"}`,
          cursor: "pointer",
          fontFamily: "inherit",
          letterSpacing: "0.02em",
          transition: "all 0.2s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <CreditCard size={15} color={open ? "#fff" : accent} />
          Sales Battlecard — Objections · Arguments · Budget
          <span style={{
            padding: "2px 9px", borderRadius: "100px",
            background: open ? "rgba(255,255,255,0.2)" : accentLight,
            color: open ? "#fff" : accent,
            fontSize: "10px", fontWeight: 800, letterSpacing: "0.05em"
          }}>
            <Sparkles size={9} style={{ display: "inline", marginRight: "3px" }} />
            Généré par IA
          </span>
        </div>
        <div style={{
          width: "22px", height: "22px", borderRadius: "50%",
          background: open ? "rgba(255,255,255,0.2)" : accentLight,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.25s",
          transform: open ? "rotate(180deg)" : "rotate(0deg)"
        }}>
          <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
            <path d="M1 1L5.5 5.5L10 1" stroke={open ? "#fff" : accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {/* Collapsible content */}
      {open && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid #E8EAED" }}>

          {/* Pain Points */}
          <div style={{ padding: "22px 24px", borderRight: "1px solid #F1F3F4" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "16px" }}>
              <AlertCircle size={14} color="#EA4335" />
              <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5F6368" }}>Pain Points Clients</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {battlecard.objections.map((obj, i) => (
                <div key={`${animKey}-obj${i}`} className="fade-in" style={{ animationDelay: `${i * 0.06}s`, display: "flex", alignItems: "flex-start", gap: "9px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#EA4335", flexShrink: 0, marginTop: "5px" }} />
                  <span style={{ fontSize: "13px", color: "#5F6368", lineHeight: 1.5, fontWeight: 500 }}>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Arguments */}
          <div style={{ padding: "22px 24px", borderRight: "1px solid #F1F3F4" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "16px" }}>
              <Target size={14} color={accent} />
              <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5F6368" }}>Argumentaire Google Ads</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {battlecard.arguments.map((arg, i) => (
                <div key={`${animKey}-arg${i}`} className="fade-in" style={{ animationDelay: `${i * 0.06}s`, display: "flex", alignItems: "flex-start", gap: "9px" }}>
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                    <CheckCircle2 size={11} color={accent} />
                  </div>
                  <span style={{ fontSize: "13px", color: "#3C4043", lineHeight: 1.5, fontWeight: 500 }}>{arg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Tiers */}
          <div style={{ padding: "22px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "16px" }}>
              <DollarSign size={14} color="#F29900" />
              <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5F6368" }}>Suggestion de Budget</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {battlecard.budgetTiers.map((tier, i) => (
                <div key={`${animKey}-tier${i}`} className="fade-in" style={{ animationDelay: `${i * 0.06}s`, padding: "11px 14px", borderRadius: "10px", background: tier.color, border: `1px solid ${tier.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#3C4043" }}>{tier.label}</span>
                    <span style={{ fontSize: "13px", fontWeight: 800, color: tier.text }}>{tier.amount}</span>
                  </div>
                  <p style={{ fontSize: "11px", color: "#9AA0A6", fontWeight: 500 }}>{tier.note}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
