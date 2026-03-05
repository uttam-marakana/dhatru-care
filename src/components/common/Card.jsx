export default function Card({
  children,
  className = "",
  hover = true,
  padding = "p-6",
}) {
  return (
    <div
      className={`
      bg-[var(--card)]
      border border-[var(--border)]
      rounded-xl shadow-md
      ${padding}
      ${hover ? "hover:shadow-xl hover:-translate-y-1 transition-all duration-300" : ""}
      ${className}
      `}
    >
      {children}
    </div>
  );
}
