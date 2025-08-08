import { PropsWithChildren } from "react";

export default function AmbientGlow({ children }: PropsWithChildren) {
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  };

  return (
    <div className="pointer-glow relative" onMouseMove={handleMove}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
