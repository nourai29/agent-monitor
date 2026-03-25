import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// ─── Node definitions ─────────────────────────────────────────────────────────
const NODES = [
  {
    id: 'sales', label: 'Sales Mgr', x: 290, y: 230,
    icon: (
      <g transform="translate(-18,-18)">
        <rect x="2" y="4" width="28" height="20" rx="2" fill="currentColor" />
        <rect x="12" y="24" width="8" height="4" fill="currentColor" />
        <rect x="8" y="28" width="16" height="2" rx="1" fill="currentColor" />
        <circle cx="29" cy="8" r="4" fill="currentColor" />
        <path d="M24 20 Q24 14 29 14 Q34 14 34 20" fill="currentColor" />
      </g>
    ),
  },
  {
    id: 'contract', label: 'Contract', x: 470, y: 130,
    icon: (
      <g transform="translate(-14,-16)">
        <path d="M4 0 L20 0 L28 8 L28 32 L4 32 Z" fill="currentColor" />
        <path d="M20 0 L20 8 L28 8" fill="none" stroke="#600" strokeWidth="1.5" />
        <line x1="8" y1="14" x2="24" y2="14" stroke="#600" strokeWidth="1.5" />
        <line x1="8" y1="19" x2="24" y2="19" stroke="#600" strokeWidth="1.5" />
        <line x1="8" y1="24" x2="18" y2="24" stroke="#600" strokeWidth="1.5" />
      </g>
    ),
  },
  {
    id: 'proposal', label: 'Proposal', x: 615, y: 245,
    icon: (
      <g transform="translate(-14,-14)">
        <polygon points="14,0 28,10 14,28 0,10" fill="currentColor" />
        <polygon points="14,4 24,10 14,24 4,10" fill="#900" />
      </g>
    ),
  },
  {
    id: 'product', label: 'Product', x: 980, y: 130,
    icon: (
      <g transform="translate(-14,-14)">
        <polygon points="14,0 28,8 28,22 14,28 0,22 0,8" fill="currentColor" />
        <polyline points="0,8 14,14 28,8" fill="none" stroke="#600" strokeWidth="1.5" />
        <line x1="14" y1="14" x2="14" y2="28" stroke="#600" strokeWidth="1.5" />
      </g>
    ),
  },
  {
    id: 'opportunity', label: 'Opportunity', x: 1165, y: 265,
    icon: (
      <g transform="translate(-14,-14)">
        <polygon points="14,0 17,9 26,9 19,15 22,24 14,18 6,24 9,15 2,9 11,9" fill="currentColor" />
        <circle cx="22" cy="6" r="3" fill="currentColor" />
        <line x1="20" y1="4" x2="26" y2="0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'lead', label: 'Lead', x: 140, y: 430,
    icon: (
      <g transform="translate(-12,-16)">
        <circle cx="12" cy="6" r="6" fill="currentColor" />
        <path d="M0 28 Q0 18 12 18 Q24 18 24 28" fill="currentColor" />
      </g>
    ),
  },
  {
    id: 'ticket', label: 'Ticket', x: 650, y: 470,
    icon: (
      <g transform="translate(-14,-14)">
        <circle cx="14" cy="14" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="14" cy="12" r="4" fill="currentColor" />
        <rect x="4" y="12" width="4" height="6" rx="2" fill="currentColor" />
        <rect x="20" y="12" width="4" height="6" rx="2" fill="currentColor" />
        <path d="M14 22 Q14 27 18 27" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'customer', label: 'Customer', x: 460, y: 610,
    icon: (
      <g transform="translate(-14,-16)">
        <circle cx="10" cy="6" r="5" fill="currentColor" />
        <path d="M0 24 Q0 16 10 16 Q18 16 18 24" fill="currentColor" />
        <circle cx="22" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="22" cy="20" r="2" fill="currentColor" />
        {[0,45,90,135,180,225,270,315].map((a, i) => (
          <line key={i}
            x1={22 + 5   * Math.cos(a * Math.PI / 180)}
            y1={20 + 5   * Math.sin(a * Math.PI / 180)}
            x2={22 + 7.5 * Math.cos(a * Math.PI / 180)}
            y2={20 + 7.5 * Math.sin(a * Math.PI / 180)}
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        ))}
      </g>
    ),
  },
  {
    id: 'order', label: 'Order', x: 1210, y: 590,
    icon: (
      <g transform="translate(-12,-16)">
        <rect x="3" y="0" width="18" height="28" rx="2" fill="currentColor" />
        <rect x="0" y="4" width="6" height="20" rx="3" fill="currentColor" />
        <line x1="7" y1="8"  x2="18" y2="8"  stroke="#600" strokeWidth="1.5" />
        <line x1="7" y1="13" x2="18" y2="13" stroke="#600" strokeWidth="1.5" />
        <line x1="7" y1="18" x2="14" y2="18" stroke="#600" strokeWidth="1.5" />
      </g>
    ),
  },
];

// ─── Edge definitions ─────────────────────────────────────────────────────────
const EDGES = [
  { from: 'sales',       to: 'proposal',    label: 'Creates',              dashed: false },
  { from: 'sales',       to: 'lead',        label: 'Creates',              dashed: false },
  { from: 'contract',    to: 'proposal',    label: '',                     dashed: false },
  { from: 'proposal',    to: 'opportunity', label: 'Links to',             dashed: false },
  { from: 'product',     to: 'opportunity', label: '',                     dashed: false },
  { from: 'proposal',    to: 'ticket',      label: 'Should Refer',         dashed: false },
  { from: 'lead',        to: 'ticket',      label: 'Receives',             dashed: false },
  { from: 'lead',        to: 'customer',    label: 'Become',               dashed: false },
  { from: 'customer',    to: 'order',       label: 'Contains\nContact of', dashed: false },
  { from: 'opportunity', to: 'order',       label: 'Links to',             dashed: false },
  { from: 'ticket',      to: 'opportunity', label: 'Links to',             dashed: true  },
  { from: 'ticket',      to: 'order',       label: 'Links to',             dashed: true  },
];

// ─── Fields shown when a node is expanded ────────────────────────────────────
// All nodes expand to the same 5 fields
const SUB_ITEMS = ['Contact', 'Product', 'Source', 'ID', '...'];


// ─── Constants ───────────────────────────────────────────────────────────────
const NODE_R      = 46;
const SUB_R       = 30;
const SUB_DIST    = 110;
const GRAPH_CX    = 700;
const GRAPH_CY    = 380;

// Per-node deterministic float params
const FLOAT_PARAMS = NODES.map((_, i) => {
  const s = i * 137.508;
  return {
    ax:     6 + (Math.sin(s * 0.31) * 0.5 + 0.5) * 6,
    ay:     6 + (Math.cos(s * 0.53) * 0.5 + 0.5) * 6,
    speedX: 0.18 + (Math.sin(s * 0.71) * 0.5 + 0.5) * 0.22,
    speedY: 0.14 + (Math.cos(s * 0.89) * 0.5 + 0.5) * 0.18,
    phaseX: s % (Math.PI * 2),
    phaseY: (s * 1.618) % (Math.PI * 2),
  };
});

const NODE_INDEX = Object.fromEntries(NODES.map((n, i) => [n.id, i]));

// ─── Helpers ─────────────────────────────────────────────────────────────────
function edgeEndpoint(from, to, r) {
  const dx = to.x - from.x, dy = to.y - from.y;
  const d  = Math.sqrt(dx * dx + dy * dy) || 1;
  return { x: from.x + (dx / d) * r, y: from.y + (dy / d) * r };
}

// Sub-node positions: fanned away from graph centre in parent-local space
function subNodePositions(node, count) {
  const baseAngle = Math.atan2(node.y - GRAPH_CY, node.x - GRAPH_CX);
  const spread    = (Math.PI * 5) / 4; // 225°
  const step      = count > 1 ? spread / (count - 1) : 0;
  const start     = baseAngle - spread / 2;
  return Array.from({ length: count }, (_, i) => ({
    x: Math.cos(start + i * step) * SUB_DIST,
    y: Math.sin(start + i * step) * SUB_DIST,
  }));
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function Graph() {
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);
  const navigate = useNavigate();

  const nodeGroupRefs = useRef({});
  const edgePathRefs  = useRef({});
  const edgeFlowRefs  = useRef({});
  const edgeLabelRefs = useRef({});
  const animFrameRef  = useRef(null);

  // ── rAF animation loop (direct DOM — no React re-render overhead) ───────────
  useEffect(() => {
    const animate = (ms) => {
      const t = ms / 1000;

      const pos = NODES.map((node, i) => {
        const p = FLOAT_PARAMS[i];
        return {
          x: node.x + p.ax * Math.sin(t * p.speedX + p.phaseX),
          y: node.y + p.ay * Math.cos(t * p.speedY + p.phaseY),
        };
      });

      NODES.forEach((node, i) => {
        const el = nodeGroupRefs.current[node.id];
        if (el) el.setAttribute('transform', `translate(${pos[i].x},${pos[i].y})`);
      });

      EDGES.forEach((edge, i) => {
        const src = pos[NODE_INDEX[edge.from]];
        const tgt = pos[NODE_INDEX[edge.to]];
        const s   = edgeEndpoint(src, tgt, NODE_R + 2);
        const e   = edgeEndpoint(tgt, src, NODE_R + 10);
        const mx  = (s.x + e.x) / 2;
        const my  = (s.y + e.y) / 2;
        const d   = `M ${s.x} ${s.y} Q ${mx} ${my} ${e.x} ${e.y}`;

        const path = edgePathRefs.current[i];
        if (path) path.setAttribute('d', d);
        const flow = edgeFlowRefs.current[i];
        if (flow) flow.setAttribute('d', d);
        const lbl  = edgeLabelRefs.current[i];
        if (lbl) {
          lbl.setAttribute('x', mx);
          lbl.setAttribute('y', my - 6);
          for (const ts of lbl.children) ts.setAttribute('x', mx);
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const handleNodeClick = (nodeId, e) => {
    e.stopPropagation();
    setClicked(prev => prev === nodeId ? null : nodeId);
  };

  // Initial positions for first render
  const pos0 = NODES.map(n => ({ x: n.x, y: n.y }));

  return (
    <div
      style={{ width: '100vw', height: '100vh', background: '#000', overflow: 'hidden' }}
      onClick={() => setClicked(null)}
    >
      {/* Back to Overview button */}
      <button
        onClick={e => { e.stopPropagation(); navigate('/overview'); }}
        className="absolute top-4 left-4 z-50 flex items-center gap-2 bg-[#C00000] hover:bg-[#a00000] text-white text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded transition-colors duration-200 shadow-lg"
      >
        <ArrowLeft size={12} />
        Overview
      </button>
      <style>{`
        @keyframes flowDot {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -320; }
        }
        @keyframes pulseRing {
          0%,100% { opacity: 0;    r: 52; }
          50%     { opacity: 0.25; r: 58; }
        }
        @keyframes pulseRing2 {
          0%,100% { opacity: 0;    r: 60; }
          50%     { opacity: 0.12; r: 68; }
        }
        @keyframes flyOut {
          from { transform: translate(0px, 0px); opacity: 0; }
          to   { transform: translate(var(--tx), var(--ty)); opacity: 1; }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: var(--len); opacity: 0; }
          to   { stroke-dashoffset: 0; opacity: 1; }
        }
      `}</style>

      <svg viewBox="0 0 1400 760" width="100%" height="100%">
        <defs>
          <marker id="arr"  markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#555" />
          </marker>
          <marker id="arrD" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#444" />
          </marker>
          <marker id="arrSub" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#888" />
          </marker>
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glowRed" x="-50%" y="-50%" width="200%" height="200%">
            <feColorMatrix type="matrix" values="1 0 0 0 .6  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feGaussianBlur in="r" stdDeviation="7" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Main edges ── */}
        {EDGES.map((edge, i) => {
          const src = pos0[NODE_INDEX[edge.from]];
          const tgt = pos0[NODE_INDEX[edge.to]];
          const s   = edgeEndpoint(src, tgt, NODE_R + 2);
          const e   = edgeEndpoint(tgt, src, NODE_R + 10);
          const mx  = (s.x + e.x) / 2;
          const my  = (s.y + e.y) / 2;
          const d0  = `M ${s.x} ${s.y} Q ${mx} ${my} ${e.x} ${e.y}`;
          const isHov = hovered === edge.from || hovered === edge.to;
          const labelLines = edge.label.split('\n');

          return (
            <g key={i}>
              <path
                ref={el => { edgePathRefs.current[i] = el; }}
                d={d0} fill="none"
                stroke={isHov ? '#777' : '#3e3e3e'}
                strokeWidth={isHov ? 1.8 : 1.2}
                strokeDasharray={edge.dashed ? '8 5' : undefined}
                markerEnd={edge.dashed ? 'url(#arrD)' : 'url(#arr)'}
              />
              <path
                ref={el => { edgeFlowRefs.current[i] = el; }}
                d={d0} fill="none"
                stroke="#C00000" strokeWidth={edge.dashed ? 1.5 : 2}
                strokeDasharray="6 314" strokeLinecap="round"
                opacity={edge.dashed ? 0.45 : 0.7}
                style={{
                  animation: `flowDot ${2.2 + i * 0.35}s linear infinite`,
                  animationDelay: `${-(i * 0.55)}s`,
                }}
              />
              {edge.label && (
                <text
                  ref={el => { edgeLabelRefs.current[i] = el; }}
                  x={mx} y={my - 6}
                  textAnchor="middle" fontSize="13"
                  fontFamily="sans-serif" fill="#C00000" opacity={isHov ? 1 : 0.8}
                >
                  {labelLines.map((line, li) => (
                    <tspan key={li} x={mx} dy={li === 0 ? 0 : 16}>{line}</tspan>
                  ))}
                </text>
              )}
            </g>
          );
        })}

        {/* ── Nodes ── */}
        {NODES.map((node, ni) => {
          const isHov     = hovered === node.id;
          const isClicked = clicked === node.id;
          const subItems  = SUB_ITEMS;
          const subPos    = subNodePositions(node, subItems.length);

          return (
            <g
              key={node.id}
              ref={el => { nodeGroupRefs.current[node.id] = el; }}
              transform={`translate(${node.x},${node.y})`}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={(e) => handleNodeClick(node.id, e)}
              style={{ cursor: 'pointer' }}
            >
              {/* ── Pulse rings (always on) ── */}
              <circle r="60" fill="none" stroke="#C00000" strokeWidth="1"
                style={{
                  animation: `pulseRing2 ${3.5 + (ni % 3) * 0.8}s ease-in-out infinite`,
                  animationDelay: `${-(ni * 0.7)}s`,
                }}
              />
              <circle r="52" fill="none" stroke="#C00000" strokeWidth="1.5"
                style={{
                  animation: `pulseRing ${2.8 + (ni % 4) * 0.5}s ease-in-out infinite`,
                  animationDelay: `${-(ni * 0.4)}s`,
                }}
              />

              {/* ── Hover glow ── */}
              {isHov && !isClicked && (
                <circle r={NODE_R + 8} fill="none" stroke="#C00000"
                  strokeWidth="1.5" opacity="0.5" filter="url(#glowRed)" />
              )}

              {/* ── Main circle ── */}
              <circle
                r={NODE_R}
                fill={isClicked ? '#C00000' : isHov ? '#2c2020' : '#1e1e1e'}
                stroke={isClicked ? '#ff3333' : isHov ? '#C00000' : '#3a3a3a'}
                strokeWidth={isClicked ? 2.5 : isHov ? 2 : 1.5}
                filter={isClicked ? 'url(#glowRed)' : isHov ? 'url(#glow)' : undefined}
                style={{ transition: 'fill 0.2s, stroke 0.2s' }}
              />

              {/* ── Icon (colour flips on click) ── */}
              <g color={isClicked ? '#1a0000' : '#C00000'}>
                {node.icon}
              </g>

              {/* ── Label ── */}
              <text y={NODE_R + 16} textAnchor="middle" fontSize="13"
                fontWeight="600" fontFamily="sans-serif"
                fill={isClicked ? '#ff6666' : '#C00000'}
              >
                {node.label}
              </text>

              {/* ── Expanded sub-nodes (L2) ── */}
              {isClicked && subItems.map((field, fi) => {
                const { x: sx, y: sy } = subPos[fi];
                const angle   = Math.atan2(sy, sx);
                const ax      = Math.cos(angle) * (NODE_R + 4);
                const ay      = Math.sin(angle) * (NODE_R + 4);
                const bx      = sx - Math.cos(angle) * (SUB_R + 8);
                const by      = sy - Math.sin(angle) * (SUB_R + 8);
                const lineLen = Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2);
                const delay   = `${fi * 0.055}s`;
                const isMore  = field === '...';

                return (
                  <g key={fi}>
                    {/* Connector — draws outward from node edge */}
                    <line
                      x1={ax} y1={ay} x2={bx} y2={by}
                      stroke="#888" strokeWidth="1.2"
                      markerEnd="url(#arrSub)"
                      strokeDasharray={lineLen}
                      style={{
                        '--len': lineLen,
                        animation: `drawLine 0.3s ease-out ${delay} both`,
                      }}
                    />

                    {/* Sub-node — flies from node centre */}
                    <g style={{
                      '--tx': `${sx}px`,
                      '--ty': `${sy}px`,
                      animation: `flyOut 0.45s ease-out ${delay} both`,
                    }}>
                      <circle
                        r={SUB_R}
                        fill={isMore ? '#2a2a2a' : '#383838'}
                        stroke={isMore ? '#666' : '#999'}
                        strokeWidth="1.5"
                      />
                      <text
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize={isMore ? 15 : 11} fontWeight={isMore ? '400' : '600'}
                        fontFamily="sans-serif"
                        fill={isMore ? '#aaa' : '#ffffff'}
                      >
                        {field}
                      </text>
                    </g>
                  </g>
                );
              })}

            </g>
          );
        })}
      </svg>
    </div>
  );
}
