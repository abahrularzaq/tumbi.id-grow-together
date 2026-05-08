export function DemoSkeleton() {
  return (
    <div className="h-full w-full bg-[#FDF8F2] flex flex-col">
      <div
        className="demo-shimmer rounded-b-[2.5rem] h-44 shrink-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, oklch(0.78 0.06 50) 0%, oklch(0.82 0.04 75) 100%)",
        }}
      />

      <div className="px-5 -mt-6 space-y-4 flex-1">
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 rounded-2xl demo-shimmer shadow-card" />
          ))}
        </div>

        <div className="h-44 rounded-3xl demo-shimmer shadow-card" />

        <div className="space-y-2.5">
          <div className="h-5 w-32 rounded-full demo-shimmer" />
          <div className="h-20 rounded-2xl demo-shimmer shadow-card" />
          <div className="h-20 rounded-2xl demo-shimmer shadow-card" />
        </div>

        <div className="h-24 rounded-3xl demo-shimmer shadow-card" />
      </div>

      <div className="mx-3 mb-3 mt-2 h-16 rounded-3xl demo-shimmer shadow-soft" />
    </div>
  );
}
