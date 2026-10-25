/* Custom preview art for project cards. Purely decorative, so it is hidden from assistive tech. */

function Frame({ children }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-white/10 bg-navy-900 shadow-lg"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-rose-400" />
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="ml-3 h-2 w-2/5 rounded bg-white/10" />
      </div>
      <div className="flex-1 p-3">{children}</div>
    </div>
  );
}

function Portfolio() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="h-2 w-1/3 rounded bg-gradient-to-r from-sky-400 to-blue-400" />
      <div className="h-2 w-2/3 rounded bg-white/20" />
      <div className="h-2 w-1/2 rounded bg-white/10" />
      <div className="mt-2 grid flex-1 grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md bg-white/5 ring-1 ring-white/10" />
        ))}
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex flex-1 flex-col justify-center gap-2 rounded-md bg-gradient-to-br from-sky-600/60 to-blue-600/60 p-3">
        <div className="h-2.5 w-3/5 rounded bg-white/80" />
        <div className="h-2 w-2/5 rounded bg-white/40" />
        <div className="mt-1 h-4 w-16 rounded-md bg-white" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-8 rounded-md bg-white/5 ring-1 ring-white/10" />
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex h-full gap-2">
      <div className="flex w-1/5 flex-col gap-1.5 rounded-md bg-white/5 p-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1.5 rounded ${i === 0 ? 'bg-sky-400' : 'bg-white/20'}`} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-6 rounded-md bg-white/5 ring-1 ring-white/10" />
          ))}
        </div>
        <div className="flex-1 rounded-md bg-white/5 p-2 ring-1 ring-white/10">
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full">
            <polyline
              points="0,32 15,26 30,28 45,16 60,20 75,8 100,12"
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Store() {
  return (
    <div className="grid h-full grid-cols-3 grid-rows-2 gap-2">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex flex-col gap-1 rounded-md bg-white/5 p-1.5 ring-1 ring-white/10">
          <div
            className={`flex-1 rounded ${
              i % 2 === 0
                ? 'bg-gradient-to-br from-sky-500/50 to-blue-500/40'
                : 'bg-gradient-to-br from-blue-500/50 to-sky-400/40'
            }`}
          />
          <div className="h-1.5 w-3/4 rounded bg-white/30" />
          <div className="h-1.5 w-1/3 rounded bg-white/15" />
        </div>
      ))}
    </div>
  );
}

const visuals = { portfolio: Portfolio, landing: Landing, dashboard: Dashboard, store: Store };

export default function ProjectVisual({ type }) {
  const Visual = visuals[type] || Portfolio;
  return (
    <Frame>
      <Visual />
    </Frame>
  );
}
