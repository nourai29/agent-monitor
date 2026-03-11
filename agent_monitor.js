import React, { useState, useMemo, useRef, useLayoutEffect, useEffect } from 'react';
import { 
  ChevronDown, 
  ArrowRight, 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  ExternalLink,
  Code,
  Database,
  Mail,
  Table
} from 'lucide-react';

// --- Mock Data ---

previewjs.start 
const DEPARTMENTS = ["BACK OFFICE", "SALES", "COLLECTIONS", "STRATEGY", "CARE", "CONTROL TOWER"];

const SALES_DATA = {
  costSavings: {
    title: "COST SAVINGS",
    description: "MEASURES SAVINGS REALISED FROM BACK-OFFICE EFFICIENCY INITIATIVES.",
    actual: "AED 60.2 M",
    target: "AED 65.3 M",
    variance: "AED 5.1 M",
    varianceDir: "down",
    chartData: [4.8, 3.2, 4.1, 2.5, 1.8, 5.2, 5.0, 4.9, 5.1, 3.8, 2.6, 4.5],
    kpis: [
      { name: "SALES PERSONNEL", unit: "#", actual: "320", target: "288", variance: "32", varianceDir: "down", sparkline: [5, 6, 4, 7, 5, 6, 8] },
      { name: "COMMISSION COST AS A % OF REVENUE", unit: "%", actual: "17%", target: "15%", variance: "2%", varianceDir: "down", sparkline: [4, 5, 5, 6, 4, 5, 6] }
    ]
  },
  incrementalRevenue: {
    title: "INCREMENTAL REVENUE",
    description: "MEASURES REVENUE UPLIFT FROM COMMERCIAL AND OPERATIONAL ACTIONS",
    actual: "AED 20.3 M",
    target: "AED 15.2 M",
    variance: "AED 5.1 M",
    varianceDir: "up",
    chartData: [3.5, 3.8, 4.5, 1.0, 1.5, 4.2, 3.4, 1.2, 0.8, 4.8, 4.9, 5.0],
    kpis: [
      { name: "% SALES LIMITED DUE TO CREDIT WORTHINESS CHECKS", unit: "%", actual: "10%", target: "5%", variance: "5%", varianceDir: "down", sparkline: [4, 5, 4, 6, 5, 4, 3] },
      { name: "LEAD TO WIN CONVERSION RATE", unit: "%", actual: "9%", target: "14%", variance: "5%", varianceDir: "down", sparkline: [7, 6, 5, 6, 7, 6, 5] },
      { name: "ORDER FALLOUT RATE", unit: "%", actual: "21%", target: "19%", variance: "2%", varianceDir: "down", sparkline: [4, 5, 4, 5, 6, 5, 6] },
      { name: "UPSELL RATE", unit: "%", actual: "20%", target: "15%", variance: "5%", varianceDir: "up", sparkline: [3, 4, 5, 6, 5, 7, 8] },
      { name: "CHURN RATE", unit: "%", actual: "7%", target: "2%", variance: "5%", varianceDir: "down", sparkline: [8, 7, 6, 7, 8, 7, 6] }
    ]
  },
  nonFinancial: {
    title: "NON- FINANCIAL BENEFITS",
    description: "TRACKS ADOPTION, QUALITY, AND SERVICE PERFORMANCE OUTCOMES.",
    onTrack: 1,
    atRisk: 1,
    lagging: 3,
    chartData: [[1, 1, 1], [1, 2, 1], [2, 1, 2], [1, 1, 1], [1, 1, 3], [1, 2, 0], [1, 1, 1], [1, 1, 1], [1, 1, 3], [1, 1, 3], [1, 1, 1], [1, 1, 0]],
    kpis: [
      { name: "DIGITAL LEAD SHARE", unit: "%", actual: "48%", target: "58%", variance: "10%", varianceDir: "down", sparkline: [4, 5, 4, 6, 5, 6, 7] },
      { name: "AUTOMATED KYC APPROVALS RATE", unit: "%", actual: "85%", target: "70%", variance: "15%", varianceDir: "up", sparkline: [6, 5, 7, 6, 8, 7, 9] },
      { name: "ATL ADOPTION RATE", unit: "%", actual: "32%", target: "45%", variance: "13%", varianceDir: "down", sparkline: [4, 3, 4, 5, 4, 3, 2] },
      { name: "BESPOKE TURNAROUND TIME", unit: "DAY", actual: "1", target: "2", variance: "1", varianceDir: "up", sparkline: [5, 6, 5, 7, 6, 8, 7] },
      { name: "ORDER PROCESSING TIME", unit: "DAY", actual: "27", target: "21", variance: "6", varianceDir: "down", sparkline: [7, 8, 9, 8, 7, 6, 7] },
      { name: "ACTIVATION SUCCESS RATE", unit: "%", actual: "26%", target: "39%", variance: "13%", varianceDir: "down", sparkline: [5, 4, 3, 4, 5, 4, 3] }
    ]
  }
};

const COLLECTIONS_DATA = {
  costSavings: {
    title: "COST SAVINGS",
    description: "MEASURES SAVINGS REALISED FROM CREDIT AND COLLECTION EFFICIENCY INITIATIVES.",
    actual: "AED 60.2 M",
    target: "AED 65.3 M",
    variance: "AED 5.1 M",
    varianceDir: "down",
    chartData: [4.8, 3.2, 4.1, 2.5, 1.8, 5.2, 5.0, 4.9, 5.1, 3.8, 2.6, 4.5],
    kpis: [
      { name: "CORE COLLECTION OPS HEAD COUNT", unit: "#", actual: "43", target: "15", variance: "28", varianceDir: "down", sparkline: [8, 9, 8, 9, 8, 9, 8, 9, 8, 7, 6, 5] },
      { name: "BILLING MANAGER HEAD COUNT", unit: "#", actual: "5", target: "5", variance: "0", varianceDir: "neutral", sparkline: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9] },
      { name: "BAD DEBT %", unit: "%", actual: "1.4%", target: "0.7%", variance: "0.7%", varianceDir: "down", sparkline: [8, 9, 8, 9, 8, 9, 8, 9, 8, 7, 6, 5] }
    ]
  },
  incrementalRevenue: {
    title: "INCREMENTAL REVENUE",
    description: "MEASURES REVENUE UPLIFT FROM COMMERCIAL AND OPERATIONAL ACTIONS",
    actual: "AED 20.3 M",
    target: "AED 15.2 M",
    variance: "AED 5.1 M",
    varianceDir: "up",
    chartData: [3.5, 3.8, 4.5, 1.0, 1.5, 4.2, 3.4, 1.2, 0.8, 4.8, 4.9, 5.0],
    kpis: [
      { name: "% SALES LIMITED DUE TO CREDIT WORTHINESS CHECKS", unit: "%", actual: "10%", target: "5%", variance: "5%", varianceDir: "down", sparkline: [4, 5, 4, 6, 5, 4, 3] }
    ]
  }, 
  nonFinancial: {
    title: "NON- FINANCIAL BENEFITS",
    description: "TRACKS ADOPTION, QUALITY, AND SERVICE PERFORMANCE OUTCOMES.",
    onTrack: 1,
    atRisk: 1,
    lagging: 3,
    chartData: [[1, 2, 2], [2, 2, 1], [1, 1, 1], [2, 2, 2], [1, 2, 1], [1, 1, 1], [1, 2, 1], [1, 2, 2], [1, 1, 2], [2, 2, 1], [2, 2, 1], [1, 1, 1]],
    kpis: [
      { name: "OUTBOUND CASES", unit: "#", actual: "52K", target: "33K", variance: "19K", varianceDir: "down", sparkline: [8, 7, 9, 8, 9, 8, 7] },
      { name: "DUNNING CYCLE ADHERENCE", unit: "%", actual: "35%", target: "95%", variance: "60%", varianceDir: "down", sparkline: [9, 8, 9, 8, 9, 8, 9] },
      { name: "DUNNING NOTIFICATION & COMPLIANCE", unit: "%", actual: "95%", target: "99%", variance: "4%", varianceDir: "down", sparkline: [9, 8, 9, 8, 9, 8, 9] },
      { name: "TDRA COMPLIANCE", unit: "%", actual: "99.1%", target: "99%", variance: "0.1%", varianceDir: "up", sparkline: [8, 9, 8, 9, 8, 9, 8] }
    ]
  }
};

const AGENTS = {
  root: "CREDIT & COLLECTIONS AGENT",
  children: [
    { id: "followup", name: "FOLLOW-UP SUPER AGENT", description: "EXECUTES RECEIVABLES FOLLOW-UP" },
    { id: "monitoring", name: "MONITORING SUPER AGENT", description: "CONTINUOUSLY MONITORS PAYMENT BEHAVIOR & PORTFOLIO RISK" },
    { id: "dunning", name: "DUNNING SUPER AGENT", description: "MANAGES DELINQUENCY BY ELIGIBILITY CHECKS AND ESCALATION" },
    { id: "legal", name: "LEGAL CASE MANAGEMENT SUPER AGENT", description: "COORDINATES LEGAL ESCALATION", disabled: true },
    { id: "writeoff", name: "WRITE OFF & WRITE BACK SUPER AGENT", description: "MONITORS WRITE-OFF AND WRITE-BACK ACTIVITIES", disabled: true },
    { id: "support", name: "C&C SUPPORT SUPER AGENT", description: "COORDINATES CROSS-CUTTING C&C PROCESSES SUCH AS COMPLIANCE, SUPPORT SERVICES ETC." }
  ]
};

const SUB_AGENTS = [
  { name: "SOA/ SOTI GENERATION AGENT", icons: [<Code size={16} />] },
  { name: "REMINDER/ FOLLOW-UP COMMS AGENT", icons: [<Code size={16} />, <Table size={16} />, <Database size={16} />] },
  { name: "PAYMENT ALLOCATION & RECONCILIATION AGENT", icons: [<Code size={16} />, <Table size={16} />, <Database size={16} />] },
  { name: "CASE HEALTH SCORING AGENT", icons: [<Code size={16} />, <Table size={16} />, <Database size={16} />] },
  { name: "ESCALATION MANAGEMENT AGENT", icons: [<Code size={16} />, <Table size={16} />, <Database size={16} />] },
  { name: "INBOUND COLLECTIONS & RESPONSE AGENT", icons: [<Mail size={16} />] }
];

const CUSTOMER_STATUS = [
  { id: "12ABC5", time: "10 MINS", status: "COMPLETE" },
  { id: "56GTR2", time: "8 MINS", status: "COMPLETE" },
  { id: "CF345T", time: "", status: "IN PROGRESS" },
  { id: "3F6HT2", time: "", status: "PENDING" },
  { id: "G4RT52", time: "", status: "PENDING" },
  { id: "1WFTY6", time: "", status: "PENDING" },
  { id: "B3GH9U", time: "", status: "PENDING" },
];

// --- Components ---

const Sparkline = ({ data }) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-[2px] h-8">
      {data.map((v, i) => (
        <div 
          key={i} 
          className="w-[3px] bg-black" 
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  );
};

const BarChart = ({ data, height = "h-16" }) => {
  return (
    <div className={`flex items-end gap-1 ${height} w-full`}>
      {data.map((v, i) => {
        if (Array.isArray(v)) {
          return (
            <div key={i} className="flex-1 flex flex-col-reverse h-full">
              <div className="bg-gray-400 w-full" style={{ height: `${(v[2] / 6) * 100}%` }} />
              <div className="bg-gray-600 w-full" style={{ height: `${(v[1] / 6) * 100}%` }} />
              <div className="bg-black w-full" style={{ height: `${(v[0] / 6) * 100}%` }} />
              <span className="text-[8px] text-center mt-1 uppercase font-bold">M{i+1}</span>
            </div>
          );
        }
        return (
          <div key={i} className="flex-1 flex flex-col justify-end h-full">
            <div className="bg-black w-full" style={{ height: `${(v / 6) * 100}%` }} />
            <span className="text-[8px] text-center mt-1 uppercase font-bold">M{i+1}</span>
          </div>
        );
      })}
    </div>
  );
};

const CardHeader = ({ title, description }) => (
  <div className="mb-4">
    <h3 className="text-xl font-bold tracking-tight uppercase">{title}</h3>
    <p className="text-sm text-gray-600 leading-tight mt-1 uppercase">{description}</p>
  </div>
);

const SummaryCard = ({ data, onClick, type }) => {
  const isBenefit = type === 'nonFinancial';
  
  return (
    <div className="bg-[#ebe4d8] rounded-2xl p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader title={data.title} description={data.description} />
      
      <div className="mt-4 mb-8">
        <BarChart data={data.chartData} />
      </div>

      <div className="flex-grow space-y-4">
        {!isBenefit ? (
          <>
            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
              <span className="text-sm uppercase tracking-wider text-gray-700 font-bold">ACTUAL VALUE</span>
              <span className="font-medium uppercase">{data.actual}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
              <span className="text-sm uppercase tracking-wider text-gray-700 font-bold">TARGET VALUE</span>
              <span className="font-medium uppercase">{data.target}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm uppercase tracking-wider text-gray-700 font-bold">VARIANCE</span>
              <div className="flex items-center gap-2">
                {data.varianceDir === 'down' ? 
                  <TrendingDown className="text-red-300 fill-red-300" size={20} /> : 
                  data.varianceDir === 'up' ?
                  <TrendingUp className="text-green-300 fill-green-300" size={20} /> :
                  <div className="w-5" />
                }
                <span className="font-medium uppercase">{data.variance}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2">
                KPIS ON TRACK <div className="w-4 h-4 bg-black" />
              </span>
              <span className="font-medium uppercase">{data.onTrack}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2">
                KPIS AT RISK <div className="w-4 h-4 bg-gray-500" />
              </span>
              <span className="font-medium uppercase">{data.atRisk}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2">
                KPIS LAGGING <div className="w-4 h-4 bg-black/20" />
              </span>
              <span className="font-medium uppercase">{data.lagging}</span>
            </div>
          </>
        )}
      </div>

      <button 
        onClick={onClick}
        className="mt-8 bg-black text-white rounded-lg py-2 px-4 flex items-center justify-between group hover:bg-gray-800 transition-colors self-start min-w-[140px]"
      >
        <span className="text-sm uppercase font-bold tracking-tight">CLICK FOR DETAILS</span>
        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default function App() {
  const [dept, setDept] = useState("COLLECTIONS");
  const [view, setView] = useState("DASHBOARD");
  const [subView, setSubView] = useState(null);
  const [agentLevel, setAgentLevel] = useState(0);

  // Connection Path Points
  const [points, setPoints] = useState([]);
  const parentRef = useRef(null);
  const childRefs = useRef([]);
  const svgRef = useRef(null);

  const reset = () => {
    setView("DASHBOARD");
    setSubView(null);
    setAgentLevel(0);
  };

  const handleNavClick = (d) => {
    if (d === "COLLECTIONS") {
      setDept(d);
      reset();
    }
  };

  const currentData = useMemo(() => {
    if (dept === "COLLECTIONS") return COLLECTIONS_DATA;
    if (dept === "SALES") return SALES_DATA;
    return {};
  }, [dept]);

  // Logic to calculate line points so they touch cards perfectly
  useLayoutEffect(() => {
    if (view === "HIERARCHY" && agentLevel === 0 && parentRef.current && svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const parentRect = parentRef.current.getBoundingClientRect();
      
      const startX = (parentRect.left + parentRect.width / 2) - svgRect.left;
      const startY = (parentRect.bottom) - svgRect.top;

      const newPoints = childRefs.current.map((child) => {
        if (!child) return null;
        const childRect = child.getBoundingClientRect();
        const endX = (childRect.left + childRect.width / 2) - svgRect.left;
        const endY = (childRect.top) - svgRect.top;
        return { startX, startY, endX, endY };
      }).filter(p => p !== null);

      setPoints(newPoints);
    }
  }, [view, agentLevel, subView, dept]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      // Triggering layout effect
      setPoints([...points]);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [points]);

  return (
    <div className="min-h-screen bg-[#f2ece4] text-[#1a1a1a] font-sans overflow-x-hidden flex flex-col">
      {/* Navigation */}
      <header className="px-12 py-6 flex items-center justify-between border-b border-gray-200 bg-[#f2ece4]/80 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="220px" 
              height="60px" 
              viewBox="0 0 654 654" 
              className="h-14 w-auto"
            >
              <g id="surface1">
                <path 
                  style={{ 
                    stroke: 'none', 
                    fillRule: 'nonzero', 
                    fill: 'rgb(94.901961%, 1.960784%, 9.803922%)', 
                    fillOpacity: 1 
                  }} 
                  d="M 191.621094 441.765625 C 229.566406 441.765625 258.28125 428.007812 278.144531 408.582031 C 298.394531 429.167969 328.757812 441.824219 365.914062 441.824219 C 411.730469 441.824219 448.933594 423.683594 477.554688 395.535156 L 514.296875 435.601562 L 591.980469 435.601562 L 512.3125 349.40625 C 530.53125 317.082031 541.90625 281.359375 545.726562 244.449219 L 488.476562 244.449219 C 487.21875 266.453125 482.714844 288.148438 475.117188 308.832031 C 468.355469 327.605469 458.34375 345.046875 445.542969 360.355469 C 426.941406 381.816406 403.105469 395.65625 375.890625 395.65625 C 343.773438 395.65625 321.730469 381.898438 313.363281 358.886719 L 252.152344 358.886719 C 242.136719 382.746094 218.773438 394.675781 189.199219 394.675781 C 156.742188 394.675781 123.339844 371.300781 119.546875 323.585938 L 311.011719 323.585938 C 315.90625 300.113281 334.484375 282.503906 364.507812 271.144531 C 364.507812 271.144531 392.277344 260.898438 419.855469 249.113281 C 458.019531 231.480469 486.636719 199.992188 486.636719 159.890625 C 486.636719 103.125 437.984375 83.589844 394.09375 83.589844 C 338.746094 83.589844 297.777344 112.683594 297.777344 158.96875 C 297.777344 186.148438 312.585938 211.90625 334.519531 237.667969 C 322.964844 241.738281 311.890625 247.0625 301.492188 253.546875 C 283.824219 204.8125 243.15625 173.226562 187.832031 173.226562 C 114.824219 173.226562 61.875 228.089844 61.875 305.308594 C 61.875 382.53125 109.109375 441.753906 191.632812 441.753906 L 191.621094 441.753906 Z M 394.496094 126.695312 L 394.496094 126.5 C 415.472656 126.5 432.644531 138.417969 432.644531 161.804688 C 432.644531 183.265625 419.769531 204.265625 390.667969 217.152344 L 390.207031 216.65625 C 373.011719 198.511719 356.792969 177.550781 356.792969 157.515625 C 356.792969 137.484375 374.4375 126.695312 394.496094 126.695312 Z M 187.757812 217.671875 L 187.757812 217.5625 C 221.148438 217.5625 251.707031 241.917969 253.132812 281.996094 L 119.535156 281.996094 C 124.296875 233.441406 161.042969 217.671875 187.757812 217.671875 Z M 89.222656 518.671875 C 73.394531 518.671875 61.910156 530.492188 61.910156 547.421875 C 61.910156 563.398438 72.242188 577.082031 90.132812 577.082031 C 101.703125 577.589844 112.128906 570.128906 115.382812 559.011719 L 103.285156 559.011719 C 101.105469 564.207031 96.027344 566.8125 89.621094 566.8125 C 82.597656 566.8125 75.34375 561.726562 74.507812 551.335938 L 115.925781 551.335938 C 116.96875 532.574219 106.164062 518.660156 89.234375 518.660156 Z M 74.554688 542.324219 C 74.785156 534.351562 81.394531 528.058594 89.367188 528.214844 C 97.15625 528.214844 103.476562 534.523438 103.476562 542.324219 Z M 137.617188 505.179688 L 125.289062 505.179688 L 125.289062 519.90625 L 117.015625 519.90625 L 117.015625 528.855469 L 125.289062 528.855469 L 125.289062 561.109375 C 125.289062 572.503906 127.6875 575.726562 139.59375 575.726562 L 148.710938 575.726562 L 148.710938 566.304688 L 144.253906 566.304688 C 138.976562 566.304688 137.617188 564.886719 137.617188 559.242188 L 137.617188 528.84375 L 148.90625 528.84375 L 148.90625 519.90625 L 137.617188 519.90625 Z M 168.5 519.90625 L 156.160156 519.90625 L 156.160156 575.738281 L 168.5 575.738281 Z M 168.5 500.527344 L 156.160156 500.527344 L 156.160156 512.964844 L 168.5 512.964844 Z M 204.507812 542.433594 L 196.636719 540.871094 C 192.007812 539.878906 189.175781 538 189.175781 534.246094 C 189.175781 530.492188 194.140625 528.117188 199.542969 528.117188 C 205.742188 528.117188 210.394531 530.089844 211.75 535.179688 L 223.015625 535.179688 C 220.726562 523.976562 210.792969 518.671875 199.929688 518.671875 C 187.941406 518.671875 177.355469 524.714844 177.355469 534.863281 C 177.355469 545.035156 184.863281 549.289062 194.285156 551.152344 L 202.765625 552.8125 C 208.238281 553.828125 212.378906 556.058594 212.378906 560.488281 C 212.378906 564.921875 207.5 567.746094 201.09375 567.746094 C 193.839844 567.746094 189.695312 564.355469 188.570312 558.710938 L 176.542969 558.710938 C 177.898438 569.292969 187.007812 577.082031 200.667969 577.082031 C 213.3125 577.082031 224.261719 559.023438 224.261719 559.023438 C 224.261719 548.078125 215.796875 544.613281 204.519531 542.433594 Z M 279.089844 542.226562 C 279.402344 524.398438 269.074219 518.269531 255.605469 518.269531 C 242.148438 518.269531 232.714844 526.035156 231.902344 537.46875 L 244.015625 537.46875 C 244.4375 530.722656 249.210938 527.390625 255.300781 527.390625 C 261.394531 527.390625 266.890625 530.296875 266.890625 539.828125 L 266.890625 540.871094 C 246.496094 542.964844 229.421875 546.464844 229.3125 560.367188 C 229.3125 570.542969 237.789062 577.082031 249.902344 577.082031 C 258.101562 577.082031 264.699219 574.175781 268.226562 568.167969 C 268.359375 570.710938 268.710938 573.230469 269.265625 575.726562 L 280.554688 575.726562 C 279.375 569.4375 278.820312 563.046875 278.894531 556.652344 C 278.894531 551.5625 279.089844 545.046875 279.089844 542.238281 Z M 267.207031 553.746094 C 267.207031 563.167969 261.816406 567.855469 252.699219 567.855469 C 246.507812 567.855469 242.476562 564.960938 242.464844 560.101562 C 242.464844 553.625 249.609375 551.140625 267.207031 549.480469 Z M 302.050781 500.527344 L 289.613281 500.527344 L 289.613281 575.738281 L 302.0625 575.738281 L 302.0625 500.527344 Z M 359.601562 542.226562 C 359.917969 524.398438 349.585938 518.269531 336.121094 518.269531 C 322.664062 518.269531 313.230469 526.035156 312.417969 537.46875 L 324.53125 537.46875 C 324.941406 530.722656 329.710938 527.390625 335.804688 527.390625 C 341.898438 527.390625 347.40625 530.296875 347.40625 539.828125 L 347.40625 540.871094 C 327 542.964844 309.933594 546.464844 309.933594 560.34375 C 309.933594 570.507812 318.425781 577.058594 330.523438 577.058594 C 338.746094 577.058594 345.347656 574.222656 348.738281 568.167969 C 348.886719 570.710938 349.222656 573.230469 349.78125 575.726562 L 361.070312 575.726562 C 359.886719 569.4375 359.328125 563.046875 359.398438 556.652344 C 359.398438 551.5625 359.589844 545.046875 359.589844 542.238281 Z M 347.722656 553.746094 C 347.722656 563.167969 342.332031 567.855469 333.214844 567.855469 C 327.023438 567.855469 322.992188 564.960938 322.96875 560.101562 C 322.992188 553.625 330.136719 551.140625 347.722656 549.480469 Z M 383.898438 505.179688 L 371.785156 505.179688 L 371.785156 519.90625 L 363.503906 519.90625 L 363.503906 528.855469 L 371.800781 528.855469 L 371.800781 561.109375 C 371.800781 572.503906 374.160156 575.726562 386.078125 575.726562 L 395.1875 575.726562 L 395.1875 566.304688 L 390.535156 566.304688 C 385.253906 566.304688 383.898438 564.886719 383.898438 559.242188 L 383.898438 528.84375 L 395.1875 528.84375 L 395.1875 519.90625 L 383.898438 519.90625 Z M 472.902344 542.226562 C 473.21875 524.398438 462.824219 518.269531 449.40625 518.269531 C 435.964844 518.269531 426.542969 526.035156 425.695312 537.46875 L 437.828125 537.46875 C 438.253906 530.722656 443.023438 527.390625 449.117188 527.390625 C 455.207031 527.390625 460.707031 530.296875 460.707031 539.828125 L 460.707031 540.871094 C 440.335938 542.964844 423.234375 546.464844 423.089844 560.367188 C 423.089844 570.542969 431.589844 577.082031 443.691406 577.082031 C 451.851562 577.082031 458.476562 574.175781 462.003906 568.167969 C 462.136719 570.710938 462.488281 573.230469 463.054688 575.726562 L 474.34375 575.726562 C 473.191406 569.433594 472.640625 563.046875 472.707031 556.652344 C 472.707031 551.5625 472.902344 545.046875 472.902344 542.238281 Z M 461.023438 553.746094 C 461.023438 563.167969 455.632812 567.855469 446.511719 567.855469 C 440.324219 567.855469 436.289062 564.960938 436.265625 560.101562 C 436.289062 553.625 443.4375 551.140625 461.023438 549.480469 Z M 512.664062 518.671875 C 505.796875 518.242188 499.28125 521.738281 495.839844 527.691406 L 495.839844 519.90625 L 483.535156 519.90625 L 483.535156 575.738281 L 495.839844 575.738281 L 495.839844 546.066406 C 495.839844 535.988281 499.367188 528.746094 508.800781 528.746094 C 518.222656 528.746094 519.359375 536.109375 519.359375 543.667969 L 519.359375 575.726562 L 531.59375 575.726562 L 531.59375 540.675781 C 531.59375 527.390625 526.132812 518.671875 512.664062 518.671875 Z M 579.832031 527.390625 C 576.300781 521.691406 569.960938 518.351562 563.261719 518.671875 C 550.109375 518.671875 539.054688 529.847656 539.054688 547.820312 C 539.054688 565.792969 550.109375 577.082031 563.277344 577.082031 C 569.96875 577.398438 576.304688 574.058594 579.832031 568.363281 L 579.832031 575.738281 L 592.136719 575.738281 L 592.136719 500.527344 L 579.832031 500.527344 Z M 565.976562 567.007812 C 557.753906 567.007812 551.855469 559.640625 551.855469 547.820312 C 551.855469 535.988281 557.910156 528.746094 565.976562 528.746094 C 574.042969 528.746094 580.363281 534.949219 580.363281 547.820312 C 580.363281 560.683594 574.1875 567.007812 565.976562 567.007812 Z M 565.976562 567.007812 " 
                />
              </g>
            </svg>
          </div>
        </div>
        <nav className="flex items-center gap-12">
          {DEPARTMENTS.map(d => (
            <button 
              key={d} 
              onClick={() => handleNavClick(d)}
              className={`text-base font-medium flex items-center gap-2 transition-colors ${
                dept === d ? 'text-black font-bold' : 'text-gray-400'
              } ${d === "COLLECTIONS" ? 'hover:text-black' : 'cursor-default'}`}
            >
              {d}
              {["BACK OFFICE", "SALES", "COLLECTIONS"].includes(d) && <ChevronDown size={18} className={d !== "COLLECTIONS" ? "opacity-30" : ""} />}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content optimized for 1920x1080 scaling */}
      <main className="flex-grow p-12 max-w-[1920px] mx-auto w-full">
        {/* Page Header */}
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-4xl font-light tracking-tight">
            {view === "DASHBOARD" ? "CREDIT & COLLECTION" : (
              dept === "COLLECTIONS" 
                ? `CREDIT & COLLECTIONS - ${currentData[subView]?.title}`
                : "CREDIT & COLLECTION"
            )}
            {agentLevel > 0 && subView === 'costSavings' && ` - FOLLOW-UP`}
          </h1>
          {view !== "DASHBOARD" && (
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  if (agentLevel > 0) setAgentLevel(agentLevel - 1);
                  else reset();
                }}
                className="bg-black text-white rounded-lg py-3 px-6 flex items-center gap-3 hover:bg-gray-800 transition-colors shadow-lg"
              >
                <ArrowLeft size={20} />
                <span className="text-base font-medium uppercase">CLICK TO GO BACK</span>
              </button>
            </div>
          )}
        </div>

        {/* Dashboard View */}
        {view === "DASHBOARD" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <SummaryCard 
              data={currentData.costSavings} 
              onClick={() => {
                setView("DETAILS");
                setSubView("costSavings");
              }} 
            />
            <SummaryCard 
              data={currentData.incrementalRevenue} 
              onClick={() => { setView("DETAILS"); setSubView("incrementalRevenue"); }} 
            />
            <SummaryCard 
              data={currentData.nonFinancial} 
              type="nonFinancial"
              onClick={() => { setView("DETAILS"); setSubView("nonFinancial"); }} 
            />
          </div>
        )}

        {/* Details View */}
        {view === "DETAILS" && subView && (
          <div className="flex flex-col lg:flex-row gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Sidebar Overview */}
            <div className="lg:w-[450px]">
              <div className="bg-[#ebe4d8] rounded-2xl p-8 shadow-sm">
                <CardHeader 
                  title={currentData[subView].title} 
                  description={currentData[subView].description} 
                />
                <div className="mt-6 mb-10">
                  <BarChart data={currentData[subView].chartData} height="h-24" />
                </div>
                <div className="space-y-6">
                  {subView !== 'nonFinancial' ? (
                    <>
                      <div className="flex justify-between items-center border-b border-gray-300 pb-3">
                        <span className="text-sm uppercase tracking-widest text-gray-700 font-bold uppercase uppercase">ACTUAL VALUE</span>
                        <span className="font-bold text-lg uppercase uppercase uppercase">{currentData[subView].actual}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-300 pb-3">
                        <span className="text-sm uppercase tracking-widest text-gray-700 font-semibold uppercase uppercase">TARGET VALUE</span>
                        <span className="font-bold text-lg uppercase uppercase uppercase">{currentData[subView].target}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm uppercase tracking-widest text-gray-700 font-semibold uppercase uppercase">VARIANCE</span>
                        <div className="flex items-center gap-3">
                          {currentData[subView].varianceDir === 'down' ? 
                            <TrendingDown className="text-red-300 fill-red-300" size={24} /> : 
                            currentData[subView].varianceDir === 'up' ?
                            <TrendingUp className="text-green-300 fill-green-300" size={24} /> :
                            null
                          }
                          <span className="font-bold text-lg uppercase uppercase uppercase">{currentData[subView].variance}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2 uppercase uppercase">
                          KPIs ON TRACK <div className="w-5 h-5 bg-black" />
                        </span>
                        <span className="font-bold text-lg uppercase uppercase uppercase">{currentData[subView].onTrack}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2 uppercase uppercase">
                          KPIs AT RISK <div className="w-4 h-4 bg-gray-500" />
                        </span>
                        <span className="font-bold text-lg uppercase uppercase uppercase">{currentData[subView].atRisk}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2 uppercase uppercase">
                          KPIS LAGGING <div className="w-5 h-5 bg-black/20" />
                        </span>
                        <span className="font-bold text-lg uppercase uppercase uppercase">{currentData[subView].lagging}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Main Table */}
            <div className="flex-grow bg-[#ebe4d8] rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="border-b border-black">
                  <tr className="bg-transparent">
                    <th className="px-8 py-5 font-normal text-gray-600 w-16 uppercase font-bold uppercase">#</th>
                    <th className="px-8 py-5 font-normal text-gray-600 text-lg uppercase tracking-tight font-bold uppercase">KPI</th>
                    <th className="px-8 py-5 font-normal text-gray-600 text-lg uppercase tracking-tight font-bold uppercase">UNIT</th>
                    <th className="px-8 py-5 font-normal text-gray-600 text-lg uppercase tracking-tight font-bold uppercase">ACTUAL VALUE</th>
                    <th className="px-8 py-5 font-normal text-gray-600 text-lg uppercase tracking-tight font-bold uppercase">TARGET VALUE</th>
                    <th className="px-8 py-5 font-normal text-gray-600 text-lg uppercase tracking-tight font-bold uppercase">VARIANCE</th>
                    <th className="px-8 py-5 font-normal text-gray-600 text-lg uppercase tracking-tight font-bold uppercase">MTD</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {currentData[subView].kpis.map((kpi, idx) => (
                    <tr key={idx} className="hover:bg-black/5 transition-colors">
                      <td className="px-8 py-8 text-base text-gray-500 uppercase">{idx + 1}</td>
                      <td className="px-8 py-8 text-base font-medium uppercase uppercase uppercase">{kpi.name}</td>
                      <td className="px-8 py-8 text-base text-gray-600 uppercase uppercase uppercase">{kpi.unit}</td>
                      <td className="px-8 py-8 text-lg font-bold uppercase uppercase uppercase">{kpi.actual}</td>
                      <td className="px-8 py-8 text-lg font-bold uppercase uppercase uppercase">{kpi.target}</td>
                      <td className="px-8 py-8 text-lg uppercase uppercase uppercase">
                        <div className="flex items-center gap-2">
                          {kpi.variance}
                          {kpi.varianceDir === 'down' ? 
                            <TrendingDown className="text-red-300 fill-red-300" size={20} /> : 
                            kpi.varianceDir === 'up' ?
                            <TrendingUp className="text-green-300 fill-green-300" size={20} /> :
                            null
                          }
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        {kpi.sparkline ? <Sparkline data={kpi.sparkline} /> : <div className="h-8 w-12 bg-gray-200/30 rounded" />}
                      </td>
                      <td className="px-8 py-8">
                        <ExternalLink 
                          size={20} 
                          className="text-gray-400 cursor-pointer hover:text-black transition-colors" 
                          onClick={() => {
                            if (dept === "COLLECTIONS" && subView === "costSavings" && kpi.name === "BAD DEBT %") {
                              setView("HIERARCHY");
                            }
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                  {/* Fill empty space */}
                  {[...Array(Math.max(0, 5 - currentData[subView].kpis.length))].map((_, i) => (
                    <tr key={`empty-${i}`} className="h-24 opacity-20">
                      <td colSpan={8}></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Hierarchy View split 3/4 and 1/4 */}
        {view === "HIERARCHY" && subView === "costSavings" && (
          <div className="relative animate-in fade-in duration-700 min-h-[750px] w-full">
            {agentLevel === 0 ? (
              <div className="flex flex-row gap-10 w-full items-start">
                {/* Diagram Container */}
                <div className="w-3/4 relative py-12 flex flex-col items-center min-h-[650px]">
                   {/* Dynamic SVG connectingPath using refs for perfect connectedness */}
                   <svg 
                     className="absolute inset-0 w-full h-full pointer-events-none" 
                     ref={svgRef}
                     style={{ zIndex: 0 }}
                   >
                    <defs>
                      <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                        <path d="M0,0 L10,5 L0,10" fill="none" stroke="#ccc" strokeWidth="1.5" />
                      </marker>
                    </defs>
                    {points.map((p, i) => (
                        <path 
                          key={i}
                          d={`M ${p.startX} ${p.startY} C ${p.startX} ${p.startY + 100}, ${p.endX} ${p.startY + 100}, ${p.endX} ${p.endY}`}
                          stroke="#ccc"
                          strokeWidth="2.5"
                          fill="none"
                          markerEnd="url(#arrow)"
                        />
                    ))}
                   </svg>
                  
                  {/* Root Agent */}
                  <div className="flex justify-center mb-40 relative z-10">
                    <div 
                      ref={parentRef}
                      className="bg-[#ebe4d8] border border-gray-200 rounded-2xl p-10 w-72 h-40 flex items-center justify-center shadow-lg text-center"
                    >
                      <h4 className="font-bold text-xl leading-tight uppercase tracking-tight uppercase uppercase">{AGENTS.root}</h4>
                    </div>
                  </div>

                  {/* Super Agent Cards Grid */}
                  <div className="grid grid-cols-6 gap-6 px-4 w-full relative z-10">
                    {AGENTS.children.map((child, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div 
                          ref={el => childRefs.current[idx] = el}
                          className={`
                            bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center text-center w-full h-[320px] border-t-4 transition-all
                            ${child.disabled ? 'opacity-50 border-gray-200' : 'border-black hover:shadow-xl hover:-translate-y-2'}
                          `}
                        >
                          <h5 className="font-bold text-xs mb-4 leading-tight min-h-[50px] flex items-center justify-center uppercase tracking-tight uppercase uppercase">
                            {child.name}
                          </h5>
                          <p className="text-[11px] text-gray-500 flex-grow mb-6 leading-relaxed uppercase uppercase uppercase uppercase">
                            {child.description}
                          </p>
                          {!child.disabled ? (
                            <button 
                              onClick={() => setAgentLevel(1)}
                              className="bg-black text-white text-[10px] uppercase font-bold tracking-widest py-3 px-4 rounded-xl flex items-center justify-between w-full mt-auto group uppercase uppercase"
                            >
                              <span>CLICK FOR DETAILS</span>
                              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                          ) : (
                            <button className="bg-gray-100 text-gray-400 text-[10px] uppercase font-bold tracking-widest py-3 px-4 rounded-xl flex items-center justify-between w-full mt-auto cursor-not-allowed uppercase uppercase">
                              <span>IN DEVELOPMENT</span>
                              <ArrowRight size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bad Debt Sidebar */}
                <div className="w-1/4 mt-12 animate-in slide-in-from-right duration-500">
                  <div className="bg-[#ebe4d8] rounded-2xl p-10 shadow-lg border border-gray-100">
                    <CardHeader 
                      title="BAD DEBT %" 
                      description="PROPORTION OF BAD DEBT AS PERCENTAGE OF REVENUE" 
                    />
                    <div className="mt-8 mb-12">
                      <BarChart data={[4.2, 3.5, 3.0, 2.8, 2.0, 4.5, 4.2, 4.5, 4.3, 3.8, 2.5, 4.1]} height="h-28" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center border-t border-gray-300 py-4">
                        <span className="text-sm uppercase tracking-widest text-gray-700 font-semibold uppercase uppercase uppercase uppercase">ACTUAL VALUE</span>
                        <span className="font-bold text-lg uppercase uppercase uppercase uppercase">1.4%</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-gray-300 py-4">
                        <span className="text-sm uppercase tracking-widest text-gray-700 font-semibold uppercase uppercase uppercase uppercase">TARGET VALUE</span>
                        <span className="font-bold text-lg uppercase uppercase uppercase uppercase">0.7%</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-gray-300 py-4">
                        <span className="text-sm uppercase tracking-widest text-gray-700 font-semibold uppercase uppercase uppercase uppercase">VARIANCE</span>
                        <div className="flex items-center gap-3">
                           <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-red-300" />
                           <span className="font-bold text-lg uppercase uppercase uppercase uppercase">0.7%</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setView("DETAILS")}
                      className="mt-12 bg-black text-white rounded-xl py-4 px-6 flex items-center justify-between w-full hover:bg-gray-800 transition-colors shadow-md group uppercase uppercase"
                    >
                      <span className="text-xs font-bold uppercase tracking-widest uppercase uppercase uppercase">CLICK TO GO BACK</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Sub-agent Drill-down View */
              <div className="flex flex-col gap-12 py-8">
                <div className="flex flex-row gap-12 items-start justify-center">
                  <div className="flex-grow flex flex-col gap-16 items-center animate-in zoom-in-95 duration-500">
                    {/* Header Node centralized to sub-agent cards */}
                    <div className="bg-[#ebe4d8] border border-gray-200 rounded-2xl p-8 w-80 h-32 flex items-center justify-center shadow-lg text-center">
                      <h4 className="font-bold text-xl uppercase tracking-tight uppercase uppercase uppercase">FOLLOW-UP SUPER AGENT</h4>
                    </div>
                    {/* Grid of Sub Agents */}
                    <div className="grid grid-cols-3 gap-6 w-full">
                      {SUB_AGENTS.map((sub, i) => (
                        <div key={i} className="bg-[#ebe4d8] rounded-3xl p-8 flex flex-col items-center text-center gap-6 h-[240px] justify-center transition-transform hover:scale-[1.05] shadow-sm uppercase uppercase uppercase">
                          <div className="flex gap-3">
                            {sub.icons.map((icon, j) => (
                              <div key={j} className="w-12 h-12 rounded-full bg-white border border-gray-200 flex flex-col items-center justify-center text-[9px] uppercase font-bold text-gray-400 shadow-sm uppercase uppercase uppercase uppercase">
                                {icon}
                                {j === 0 ? "CODE" : j === 1 ? "AR LEDGER" : "DB"}
                              </div>
                            ))}
                          </div>
                          <span className="text-sm font-bold uppercase tracking-widest leading-tight max-w-[180px] uppercase uppercase uppercase">{sub.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Status Table positioned on the right */}
                  <div className="lg:w-[550px] bg-[#ebe4d8] rounded-3xl overflow-hidden shadow-lg h-min animate-in slide-in-from-right duration-500">
                     <table className="w-full text-left">
                      <thead className="border-b border-black">
                        <tr>
                          <th className="px-6 py-6 text-xs font-bold text-gray-700 uppercase tracking-widest uppercase uppercase uppercase uppercase">#</th>
                          <th className="px-6 py-6 text-xs font-bold text-gray-700 uppercase tracking-widest uppercase uppercase uppercase uppercase">CUSTOMER ID</th>
                          <th className="px-6 py-6 text-xs font-bold text-gray-700 uppercase tracking-widest uppercase uppercase uppercase uppercase">TIME TAKEN</th>
                          <th className="px-6 py-6 text-xs font-bold text-gray-700 uppercase tracking-widest uppercase uppercase uppercase uppercase">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-300">
                        {CUSTOMER_STATUS.map((item, idx) => (
                          <tr key={idx} className="bg-transparent hover:bg-black/5 transition-colors">
                            <td className="px-6 py-6 text-sm text-gray-500 uppercase uppercase uppercase">{idx+1}</td>
                            <td className="px-6 py-6 text-sm font-mono font-bold tracking-tight uppercase uppercase uppercase uppercase uppercase">{item.id}</td>
                            <td className="px-6 py-6 text-sm uppercase uppercase uppercase uppercase uppercase uppercase">{item.time || "--"}</td>
                            <td className={`px-6 py-6 text-sm font-bold uppercase uppercase uppercase uppercase ${item.status === 'COMPLETE' ? 'text-green-600' : item.status === 'IN PROGRESS' ? 'text-gray-700' : 'text-red-500'}`}>
                              <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${item.status === 'COMPLETE' ? 'bg-green-600' : item.status === 'IN PROGRESS' ? 'bg-gray-400 animate-pulse' : 'bg-red-500'}`} />
                                {item.status}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}