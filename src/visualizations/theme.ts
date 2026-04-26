export const VIZ_COLORS = {
  surface: '#c8d4c5',
  surfaceDeep: '#9eb7ae',
  surfaceWire: '#3e7478',
  geodesic: '#1f6f78',
  normalSection: '#c75f52',
  tangent: '#0f8f71',
  normal: '#c76f28',
  point: '#d7b84f',
  comparison: '#9b6a3a',
  cuttingPlane: '#d7a08c',
  plane: '#c8b08a',
  mutedText: '#7d6648',
  inkText: '#3a2d22',
  paper: '#fffaf1',
  paperSoft: '#fff6e4',
  accentRose: '#a45f6d',
  accentBlue: '#456f86',
} as const;

export const VIZ_CLASSES = {
  panel: 'rounded-2xl border border-amber-900/10 bg-[#fffaf1]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_12px_30px_rgba(120,83,39,0.08)]',
  canvas: 'overflow-hidden rounded-2xl border border-amber-900/10 bg-[#fff6e4] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_45px_rgba(120,83,39,0.12)]',
  buttonActive: 'border-teal-600 bg-teal-700/[0.12] text-teal-900 shadow-[0_10px_24px_rgba(31,111,120,0.14)]',
  buttonIdle: 'border-amber-900/20 bg-white/45 text-stone-700 hover:border-teal-700/45 hover:bg-white/70',
  labelPill: 'whitespace-nowrap rounded-full border border-teal-700/20 bg-[#fffaf1]/92 px-3 py-1 text-xs font-semibold text-teal-800 shadow-sm',
} as const;
