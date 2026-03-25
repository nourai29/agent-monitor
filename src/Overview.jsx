import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Bot, User, Info, LayoutGrid, Activity, ArrowRight, ChevronUp, ChevronDown } from 'lucide-react';

// ─── E& LOGO ──────────────────────────────────────────────────────────────────
const EandLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="28px" viewBox="0 0 654 654">
    <g>
      <path style={{ stroke:'none', fillRule:'nonzero', fill:'#FFFFFF', fillOpacity:1 }}
        d="M 191.621094 441.765625 C 229.566406 441.765625 258.28125 428.007812 278.144531 408.582031 C 298.394531 429.167969 328.757812 441.824219 365.914062 441.824219 C 411.730469 441.824219 448.933594 423.683594 477.554688 395.535156 L 514.296875 435.601562 L 591.980469 435.601562 L 512.3125 349.40625 C 530.53125 317.082031 541.90625 281.359375 545.726562 244.449219 L 488.476562 244.449219 C 487.21875 266.453125 482.714844 288.148438 475.117188 308.832031 C 468.355469 327.605469 458.34375 345.046875 445.542969 360.355469 C 426.941406 381.816406 403.105469 395.65625 375.890625 395.65625 C 343.773438 395.65625 321.730469 381.898438 313.363281 358.886719 L 252.152344 358.886719 C 242.136719 382.746094 218.773438 394.675781 189.199219 394.675781 C 156.742188 394.675781 123.339844 371.300781 119.546875 323.585938 L 311.011719 323.585938 C 315.90625 300.113281 334.484375 282.503906 364.507812 271.144531 C 364.507812 271.144531 392.277344 260.898438 419.855469 249.113281 C 458.019531 231.480469 486.636719 199.992188 486.636719 159.890625 C 486.636719 103.125 437.984375 83.589844 394.09375 83.589844 C 338.746094 83.589844 297.777344 112.683594 297.777344 158.96875 C 297.777344 186.148438 312.585938 211.90625 334.519531 237.667969 C 322.964844 241.738281 311.890625 247.0625 301.492188 253.546875 C 283.824219 204.8125 243.15625 173.226562 187.832031 173.226562 C 114.824219 173.226562 61.875 228.089844 61.875 305.308594 C 61.875 382.53125 109.109375 441.753906 191.632812 441.753906 Z M 394.496094 126.695312 C 415.472656 126.5 432.644531 138.417969 432.644531 161.804688 C 432.644531 183.265625 419.769531 204.265625 390.667969 217.152344 L 390.207031 216.65625 C 373.011719 198.511719 356.792969 177.550781 356.792969 157.515625 C 356.792969 137.484375 374.4375 126.695312 394.496094 126.695312 Z M 187.757812 217.671875 C 221.148438 217.5625 251.707031 241.917969 253.132812 281.996094 L 119.535156 281.996094 C 124.296875 233.441406 161.042969 217.671875 187.757812 217.671875 Z" />
    </g>
  </svg>
);

// ─── DATA ──────────────────────────────────────────────────────────────────────
const SMB_OVERVIEW_DATA = {
  costSavings: {
    title: "COST SAVINGS",
    baseline: "385", target: "576", actual: "610", actualDir: "up",
    chartData: [4.5, 3.0, 4.0, 2.5, 1.8, 5.0, 4.8, 4.5, 5.0, 3.5, 2.5, 4.5],
  },
  incrementalRevenue: {
    title: "INCREMENTAL REVENUE",
    baseline: "690", target: "1110", actual: "995", actualDir: "down",
    chartData: [3.5, 3.8, 4.5, 1.0, 1.5, 4.2, 3.4, 1.2, 0.8, 4.8, 4.9, 5.0],
  },
  nonFinancial: {
    title: "NON-FINANCIAL KPIs",
    onTrack: 12, atRisk: 8, lagging: 3,
    chartData: [[2,1,1],[2,2,1],[3,1,1],[2,2,1],[2,1,2],[2,2,0],[2,2,1],[2,1,1],[2,1,2],[2,1,2],[2,2,1],[2,1,0]],
  }
};

// redirectTo  = where the LayoutGrid (box) icon sends the user
// graphTo     = where the Activity (graph) icon sends the user — always '/graph'
const COLUMNS = [
  {
    title: "SMB SALES", aiCount: 40, humanCount: 5, redirectTo: "/graph",
    agents: [
      { name: "ACQUISITION & ONBOARDING AGENT", runs: 112, queue: 30, exceptions: 12,
        metrics: [{ label: "Lead Conversion Rate", value: "9%", trend: "up" }, { label: "No. of Leads", value: "74,521", trend: "up" }],
        models: ["Gemini 1.5 Pro", "Claude 3.5"] },
      { name: "PRODUCT AND OFFER AGENT", runs: 150, queue: 15, exceptions: 18,
        metrics: [{ label: "Bespoke Turnaround Time", value: "5 Days", trend: "down" }, { label: "B2B portal Reindexing Time", value: "16 Hrs", trend: "down" }],
        models: ["Gemini 1.5 Pro"] },
      { name: "ORDER PROCESSING AGENT", runs: 80, queue: 65, exceptions: 20,
        metrics: [{ label: "Order Fallout Rate", value: "21%", trend: "down" }, { label: "Order Automation Rate", value: "26%", trend: "up" }],
        models: ["Claude 3.5"] },
      { name: "CUSTOMER MANAGEMENT AGENT", runs: 112, queue: 90, exceptions: 12,
        metrics: [{ label: "Churn Rate", value: "5%", trend: "down" }, { label: "Upsell Rate", value: "8%", trend: "up" }],
        models: ["Gemini 1.5 Pro", "GPT 4-o"] },
      { name: "SALES PERFORMANCE AGENT", runs: 212, queue: 86, exceptions: 12,
        metrics: [{ label: "Reporting Cycle Time", value: "30 Hrs", trend: "down" }, { label: "Pipeline Leakage Rate", value: "10%", trend: "down" }],
        models: ["Gemini 1.5 Pro"] },
      { name: "COMMISSIONING & INCENTIVE AGENT", runs: 150, queue: 80, exceptions: 9,
        metrics: [{ label: "Comm. Cost as % of Rev.", value: "17%", trend: "up" }, { label: "Comm. Processing Time", value: "36 Days", trend: "down" }],
        models: ["Gemini 1.5 Pro", "Claude 3.5"] },
    ]
  },
  {
    title: "CHURN", aiCount: 11, humanCount: 2, redirectTo: "/graph",
    agents: [
      { name: "CUSTOMER MANAGEMENT AGENT", runs: 95, queue: 15, exceptions: 10,
        metrics: [{ label: "Churn rate - Mobile", value: "5%", trend: "down" }, { label: "Churn rate - Fixed", value: "6%", trend: "down" }],
        models: ["Gemini 1.5 Pro"] },
      { name: "SALES PERFORMANCE AGENT", runs: 47, queue: 11, exceptions: 12,
        metrics: [{ label: "Number of Mobile accounts saved", value: "5,235", trend: "up" }, { label: "Number of Fixed accounts saved", value: "2,890", trend: "down" }],
        models: ["Gemini 1.5 Pro"] },
    ]
  },
  {
    title: "SMB BACK OFFICE", aiCount: 19, humanCount: 4, redirectTo: "/graph",  // box icon → /graph
    agents: [
      { name: "PROFILING AGENT", runs: 112, queue: 12, exceptions: 12,
        metrics: [{ label: "Mean time to process", value: "20 Hrs", trend: "down" }, { label: "Manual Intervention Rate", value: "10%", trend: "up" }],
        models: ["Gemini 1.5 Pro", "Claude 3.5"] },
      { name: "VERIFIER AGENT", runs: 90, queue: 28, exceptions: 9,
        metrics: [{ label: "Verification TAT", value: "25 Min", trend: "up" }, { label: "Manual Intervention Rate", value: "5%", trend: "up" }],
        models: ["GPT 4-o"] },
      { name: "PROCESSING AGENT", runs: 112, queue: 43, exceptions: 12,
        metrics: [{ label: "Order Processing Time", value: "25 Min", trend: "up" }, { label: "Manual Intervention Rate", value: "15%", trend: "up" }],
        models: ["Gemini 1.5 Pro"] },
    ]
  },
  {
    title: "BUSINESS CARE", aiCount: 41, humanCount: 4, redirectTo: "/graph",
    agents: [
      { name: "INBOUND AUTONOMOUS AGENT", runs: 89, queue: 65, exceptions: 6,
        metrics: [{ label: "Service Levels", value: "99%", trend: "up" }, { label: "% Autonomous FCR", value: "71%", trend: "down" }],
        models: ["Gemini 1.5 Pro", "GPT 4-o"] },
      { name: "CUST. HANDLING COMPANION AGENT", runs: 103, queue: 37, exceptions: 12,
        metrics: [{ label: "AHT", value: "198s", trend: "down" }, { label: "MTTR", value: "0.9 days", trend: "up" }],
        models: ["Gemini 1.5 Pro", "Claude 3.5"] },
      { name: "PROACTIVE PREV. & REV PROT. AGENT", runs: 35, queue: 45, exceptions: 18,
        metrics: [{ label: "% Bills Validated with NO Discrepancies", value: "99%", trend: "up" }, { label: "# of Billing Disputes", value: "155", trend: "down" }],
        models: ["Gemini 1.5 Pro", "GPT 4-o"] },
      { name: "BC BACK-OFFICE SUPPORT AGENT", runs: 56, queue: 72, exceptions: 11,
        metrics: [{ label: "# of Threats / Escalations Managed", value: "173", trend: "up" }],
        models: ["Gemini 1.5 Pro"] },
      { name: "CARE EXCELLENCE AGENT", runs: 35, queue: 55, exceptions: 4,
        metrics: [{ label: "Agent Quality Score", value: "99%", trend: "up" }, { label: "SOP Adherence Rate", value: "100%", trend: "up" }],
        models: ["GPT 4-o", "Gemini 1.5 Pro"] },
    ]
  },
  {
    title: "CREDIT & COLLECTIONS", aiCount: 43, humanCount: 7, redirectTo: "/?screen=cc",
    agents: [
      { name: "CREDIT PROFILING AGENT", runs: 250, queue: 25, exceptions: 32,
        metrics: [{ label: "% Accuracy - Credit Limit Exposure", value: "99%", trend: "neutral" }],
        models: ["Gemini 1.5 Pro", "Claude 3.5"] },
      { name: "FOLLOW-UP AGENT", runs: 420, queue: 45, exceptions: 56,
        metrics: [{ label: "Bad Debt %", value: "0.9%", trend: "down" }, { label: "CPI", value: "98%", trend: "up" }],
        models: ["Claude 3.5"] },
      { name: "MONITORING AGENT", runs: 350, queue: 25, exceptions: 45,
        metrics: [{ label: "Purchase / Usage Behaviour Anomalies", value: "27K", trend: "up" }, { label: "Outbound Cases (DCA)", value: "11K", trend: "up" }],
        models: ["Gemini 1.5 Pro", "Claude 3.5"] },
      { name: "DUNNING AGENT", runs: 280, queue: 54, exceptions: 21,
        metrics: [{ label: "Dunning Cycle Adherence", value: "97%", trend: "down" }, { label: "TDRA Compliance", value: "99%", trend: "up" }],
        models: ["Gemini 1.5 Pro", "GPT 4-o"] },
      { name: "LEGAL CASE MGMT. AGENT", runs: 85, queue: 38, exceptions: 25,
        metrics: [{ label: "Legal Cases Escalated", value: "65", trend: "neutral" }],
        models: ["Gemini 1.5 Pro", "Claude 3.5"] },
      { name: "WOFF & WBACK AGENT", runs: 100, queue: 46, exceptions: 12,
        metrics: [{ label: "Amount Written-Off", value: "AED 10M", trend: "down" }, { label: "Amount Written-Back", value: "AED 3M", trend: "up" }],
        models: ["Gemini 1.5 Pro"] },
      { name: "C&C GOVERNANCE AGENT", runs: 280, queue: 25, exceptions: 42,
        metrics: [{ label: "Access Mgmt. Effort", value: "3 Hrs", trend: "down" }, { label: "Vendor Payment Effort", value: "1 Hr", trend: "down" }],
        models: ["Claude 3.5", "GPT 4-o"] },
    ]
  },
  {
    title: "CONTROL TOWER", aiCount: 29, humanCount: 3, redirectTo: "/graph",
    agents: [
      { name: "POLICY ASSURANCE AGENT", runs: 132, queue: 53, exceptions: 12,
        metrics: [{ label: "Policy Understanding AHT Violations", value: "25 Hrs", trend: "down" }, { label: "Regularization AHT", value: "20 Hrs", trend: "down" }],
        models: ["Gemini 1.5 Pro", "Claude 3.5"] },
      { name: "PERFORMANCE MONITORING AGENT", runs: 112, queue: 27, exceptions: 12,
        metrics: [{ label: "Query Creation Time", value: "15 Min", trend: "down" }, { label: "Dashboard Creation Time", value: "5 Hrs", trend: "down" }],
        models: ["Gemini 1.5 Pro", "Claude 3.5"] },
      { name: "SUSPICION HANDLER", runs: 150, queue: 52, exceptions: 12,
        metrics: [{ label: "ML Model Design Time", value: "5 Hrs", trend: "down" }, { label: "Suspicious Handling AHT", value: "9 Hrs", trend: "down" }],
        models: ["Gemini 1.5 Pro", "Claude 2.5"] },
      { name: "ACCESS MANAGER AGENT", runs: 112, queue: 65, exceptions: 12,
        metrics: [{ label: "Access Log Monitoring Coverage", value: "70%", trend: "up" }, { label: "Access Compliance Rate", value: "80%", trend: "up" }],
        models: ["Gemini 1.5 Pro"] },
      { name: "FRAUD RISK MANAGER AGENT", runs: 212, queue: 25, exceptions: 12,
        metrics: [{ label: "Policy Gap Identification Accuracy", value: "90%", trend: "down" }, { label: "Policy Update Cycle Time", value: "23 Hrs", trend: "down" }],
        models: ["Gemini 1.5 Pro"] },
      { name: "ENTERPRISE CONTROL TOWER AGENT", runs: 112, queue: 16, exceptions: 12,
        metrics: [{ label: "Audit Activities AHT", value: "50 Hrs", trend: "down" }, { label: "Reporting Activities AHT", value: "15 Hrs", trend: "up" }],
        models: ["Gemini 1.5 Pro"] },
      { name: "SMB CONTROL TOWER AGENT", runs: 200, queue: 50, exceptions: 20,
        metrics: [{ label: "Report Creation Time", value: "14 Hrs", trend: "down" }, { label: "Audit/ Log Monitoring AHT", value: "3 Hrs", trend: "down" }],
        models: ["Gemini 1.5 Pro"] },
    ]
  },
  {
    title: "STRATEGY FINANCE", aiCount: 25, humanCount: 5, redirectTo: "/graph",
    agents: [
      { name: "FINANCIAL PLANNING AGENT", runs: 130, queue: 50, exceptions: 10,
        metrics: [{ label: "Market Research Duration", value: "20 Days", trend: "down" }, { label: "Market Research Spend", value: "10Mn", trend: "up" }],
        models: ["Claude 3.5"] },
      { name: "INCENTIVE AGENT", runs: 150, queue: 38, exceptions: 12,
        metrics: [{ label: "Sales Underperformance", value: "66%", trend: "down" }, { label: "Clawback Recovery %", value: "10%", trend: "up" }],
        models: ["Gemini 1.5 Pro", "Claude 3.5"] },
      { name: "COMMERCIAL STRUCTURING AGENT", runs: 90, queue: 72, exceptions: 10,
        metrics: [{ label: "Disc. Leakage Reduction", value: "6.5%", trend: "down" }, { label: "Knowledge Reuse Ratio", value: "26%", trend: "up" }],
        models: ["Gemini 1.5 Pro"] },
      { name: "FINANCIAL PERFORMANCE AGENT", runs: 200, queue: 16, exceptions: 18,
        metrics: [{ label: "Month-end Close Duration", value: "10 Days", trend: "down" }, { label: "Variance Analysis SLA", value: "5 Days", trend: "up" }],
        models: ["Gemini 1.5 Pro"] },
    ]
  },
];

// ─── SMB OVERVIEW HORIZONTAL BANNER ───────────────────────────────────────────
const ChartPanel = ({ title, chartData, baseline, target, actual, actualDir, onTrack, atRisk, lagging }) => {
  const isNF = !baseline;
  const maxVal = 6;
  return (
    <div className="flex flex-col h-full">
      <div className="text-xs font-black text-white uppercase tracking-widest mb-4">{title}</div>

      {/* Chart bars */}
      <div className="relative" style={{ height: 200 }}>
        {[0,1,2,3].map(i => (
          <div key={i} className="absolute w-full border-t border-white/10" style={{ bottom: `${(i/3)*100}%` }} />
        ))}
        <div className="flex items-end gap-[3px] absolute inset-0">
          {chartData.map((v, i) => {
            if (Array.isArray(v)) return (
              <div key={i} className="flex-1 flex flex-col-reverse h-full">
                <div className="bg-white w-full rounded-sm" style={{ height: `${(v[0]/maxVal)*100}%` }} />
                <div className="bg-[#555] w-full" style={{ height: `${(v[1]/maxVal)*100}%` }} />
                <div className="bg-white/20 w-full" style={{ height: `${(v[2]/maxVal)*100}%` }} />
              </div>
            );
            return (
              <div key={i} className="flex-1 flex flex-col justify-end h-full">
                <div className="bg-[#C00000] w-full rounded-sm" style={{ height: `${(v/maxVal)*100}%` }} />
              </div>
            );
          })}
        </div>
        {!isNF && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              points={chartData.map((v,i) => `${((i+0.5)/chartData.length)*100},${(1-v/maxVal)*100}`).join(' ')}
              fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}
      </div>

      {/* Month labels */}
      <div className="flex mt-2 mb-5">
        {chartData.map((_, i) => (
          <div key={i} className="flex-1 text-center text-[8px] text-[#767679] font-bold">
            {`M${i+1}`}
          </div>
        ))}
      </div>

      {/* Stats */}
      {!isNF ? (
        <div className="space-y-3 border-t border-white/10 pt-4">
          {[['BASELINE', baseline, null], ['TARGET', target, null], ['ACTUAL', actual, actualDir]].map(([l, v, dir]) => (
            <div key={l} className="flex justify-between items-center">
              <span className="text-[10px] text-[#767679] uppercase font-bold tracking-wider">{l}</span>
              <div className="flex items-center gap-1.5">
                {dir === 'up' && <TrendingUp size={13} className="text-green-400" />}
                {dir === 'down' && <TrendingDown size={13} className="text-[#C00000]" />}
                <span className="text-[13px] font-black text-white">{v}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3 border-t border-white/10 pt-4">
          {[['KPIS ON TRACK', onTrack, 'bg-white'], ['KPIS AT RISK', atRisk, 'bg-[#555]'], ['KPIS LAGGING', lagging, 'bg-white/20 border border-white/30']].map(([l, v, c]) => (
            <div key={l} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-sm ${c} flex-shrink-0`} />
                <span className="text-[10px] text-[#767679] uppercase font-bold tracking-wider">{l}</span>
              </div>
              <span className="text-[13px] font-black text-white">{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SmbOverviewBanner = ({ navigate }) => {
  const [expanded, setExpanded] = useState(true);
  const d = SMB_OVERVIEW_DATA;
  return (
    <div
      className="mb-3 rounded-lg overflow-hidden border border-[#C00000]/40 opacity-0"
      style={{ animation: 'fadeUp 0.4s ease-out forwards' }}
    >
      {/* Header strip */}
      <div className="bg-[#C00000] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h2 className="text-[9px] font-black text-white uppercase tracking-widest">SMB OVERVIEW</h2>
          <div className="flex gap-4">
            {[[Bot, 36, 'AI Agents'], [User, 9, 'Humans']].map(([Icon, count, label]) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon size={12} className="text-white/70" />
                <div>
                  <div className="text-[14px] font-black text-white leading-none">{count}</div>
                  <div className="text-[6px] text-white/60 uppercase font-bold">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Expand / collapse toggle */}
        <button
          onClick={() => setExpanded(e => !e)}
          title={expanded ? 'Collapse' : 'Expand'}
          className="w-7 h-7 flex items-center justify-center bg-black/25 rounded hover:bg-black/50 transition-colors group"
        >
          {expanded
            ? <ChevronUp size={14} className="text-white/70 group-hover:text-white transition-colors" />
            : <ChevronDown size={14} className="text-white/70 group-hover:text-white transition-colors" />}
        </button>
      </div>
      {/* 3 chart panels — hidden when collapsed */}
      {expanded && (
        <div className="bg-[#0d0d0d] grid grid-cols-3 divide-x divide-white/10 border-t border-white/5">
          <div className="px-8 py-6"><ChartPanel title={d.costSavings.title} chartData={d.costSavings.chartData} baseline={d.costSavings.baseline} target={d.costSavings.target} actual={d.costSavings.actual} actualDir={d.costSavings.actualDir} /></div>
          <div className="px-8 py-6"><ChartPanel title={d.incrementalRevenue.title} chartData={d.incrementalRevenue.chartData} baseline={d.incrementalRevenue.baseline} target={d.incrementalRevenue.target} actual={d.incrementalRevenue.actual} actualDir={d.incrementalRevenue.actualDir} /></div>
          <div className="px-8 py-6"><ChartPanel title={d.nonFinancial.title} chartData={d.nonFinancial.chartData} onTrack={d.nonFinancial.onTrack} atRisk={d.nonFinancial.atRisk} lagging={d.nonFinancial.lagging} /></div>
        </div>
      )}
    </div>
  );
};

// ─── AGENT CARD ────────────────────────────────────────────────────────────────
const AgentCard = ({ agent }) => (
  <div className="bg-[#111] border border-white/10 rounded p-2 mb-1.5 group hover:border-[#C00000]/50 hover:bg-[#1a1a1a] transition-all duration-200">
    <div className="flex justify-between items-start mb-1.5">
      <h4 className="text-[8px] font-black text-white uppercase leading-tight pr-2 group-hover:text-[#C00000] transition-colors">{agent.name}</h4>
      <Info size={9} className="text-white/30 flex-shrink-0 group-hover:text-[#C00000]/60 transition-colors" />
    </div>
    <div className="grid grid-cols-3 gap-0.5 mb-1.5 border-b border-white/10 pb-1.5">
      {[['RUNS', agent.runs], ['QUEUE', agent.queue], ['EXCEPTION COUNT', agent.exceptions]].map(([label, val]) => (
        <div key={label} className="text-center">
          <div className="text-[5px] text-[#767679] uppercase font-bold leading-none mb-0.5">{label}</div>
          <div className="text-[10px] font-black text-white leading-none">{val}</div>
        </div>
      ))}
    </div>
    <div className="space-y-0.5 mb-1.5">
      {agent.metrics.map((m, i) => (
        <div key={i} className="flex justify-between items-center gap-1">
          <span className="text-[6px] text-[#767679] leading-tight flex-1 min-w-0">{m.label}</span>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <span className="text-[7px] font-black text-white whitespace-nowrap">{m.value}</span>
            {m.trend === 'up' && <TrendingUp size={7} className="text-green-400" />}
            {m.trend === 'down' && <TrendingDown size={7} className="text-[#C00000]" />}
          </div>
        </div>
      ))}
    </div>
    <div className="flex flex-wrap gap-0.5 pt-1 border-t border-white/10">
      {agent.models.map((model, i) => (
        <span key={i} className={`text-[5px] font-bold px-1 py-0.5 rounded-sm ${
          model.includes('Gemini') ? 'text-[#C00000]' :
          model.includes('Claude') ? 'text-white' : 'text-[#767679]'
        }`}>{model}</span>
      ))}
    </div>
  </div>
);

// ─── DEPARTMENT COLUMN ─────────────────────────────────────────────────────────
const DeptColumn = ({ dept, index, navigate }) => {
  const isCC = dept.title === "CREDIT & COLLECTIONS";

  return (
    <div
      className="w-full opacity-0"
      style={{ animation: `fadeUp 0.45s ease-out ${100 + index * 70}ms forwards` }}
    >
      {/* Column header */}
      <div className="flex gap-1 mb-2 min-w-0" style={{ height: 62 }}>
        {/* Main label card */}
        <div className="flex-1 min-w-0 bg-[#C00000] border border-[#C00000] rounded p-1.5 flex flex-col justify-center
          hover:bg-[#a00000] transition-colors duration-200 cursor-pointer group">
          <h3 className="text-center font-black text-white text-[8px] mb-1 leading-tight tracking-wide">{dept.title}</h3>
          <div className="flex justify-center gap-3">
            {[[Bot, dept.aiCount, 'AI Agents'], [User, dept.humanCount, 'Humans']].map(([Icon, count, label]) => (
              <div key={label} className="flex items-center gap-0.5 group-hover:scale-105 transition-transform duration-200">
                <Icon size={11} className="text-white/70 group-hover:text-white transition-colors" />
                <div>
                  <div className="text-[12px] font-black text-white leading-none">{count}</div>
                  <div className="text-[5px] text-white/60 uppercase font-bold">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Icon button 1 — LayoutGrid → redirect for C&C and SMB Back Office */}
        <div className="relative group/box">
          <button
            onClick={isCC ? () => navigate(dept.redirectTo) : undefined}
            title={isCC ? "View agent monitor" : undefined}
            className="w-7 h-full bg-[#111] border border-white/10 rounded flex items-center justify-center
              hover:bg-[#C00000] hover:border-[#C00000] transition-all duration-200 group"
          >
            <LayoutGrid size={11} className="text-white/40 group-hover:text-white transition-colors" />
          </button>
          {isCC && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-[#C00000] text-white text-[6px] font-black rounded whitespace-nowrap
              opacity-0 group/box:hover:opacity-100 transition-opacity pointer-events-none z-50">
              Click here to see Impact
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#C00000]" />
            </div>
          )}
        </div>

        {/* Icon button 2 — Activity → /graph for SMB Back Office */}
        <button
          onClick={dept.title === "SMB BACK OFFICE" ? () => navigate('/graph') : undefined}
          title={dept.title === "SMB BACK OFFICE" ? "View graph" : undefined}
          className="w-7 h-full bg-[#111] border border-white/10 rounded flex items-center justify-center
            hover:bg-[#C00000] hover:border-[#C00000] transition-all duration-200 group"
        >
          <Activity size={11} className="text-white/40 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Agent cards */}
      <div>
        {dept.agents.map((agent, i) => <AgentCard key={i} agent={agent} />)}
      </div>
    </div>
  );
};

// ─── MAIN ──────────────────────────────────────────────────────────────────────
export default function Overview() {
  const [timeframe, setTimeframe] = useState("MONTHLY");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-auto">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-white/10 sticky top-0 bg-black z-40">
        <EandLogo />
        <div className="flex gap-6">
          {['MONTHLY', 'WEEKLY', 'DAILY'].map(v => (
            <button key={v} onClick={() => setTimeframe(v)}
              className={`text-[9px] font-black tracking-widest transition-all duration-150 hover:text-[#C00000] pb-0.5 ${
                timeframe === v ? 'text-white border-b border-[#C00000]' : 'text-[#767679]'
              }`}>
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 min-w-[1400px]">
        {/* SMB Overview — full-width horizontal banner */}
        <SmbOverviewBanner navigate={navigate} />

        {/* 7 department columns */}
        <div className="grid grid-cols-7 gap-2">
          {COLUMNS.map((dept, i) => (
            <DeptColumn key={i} dept={dept} index={i} navigate={navigate} />
          ))}
        </div>
      </div>
    </div>
  );
}
