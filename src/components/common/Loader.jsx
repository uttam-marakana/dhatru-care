export default function Loader({ size = "md" }) {
  const sizes = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`
        animate-spin rounded-full
        border-4 border-current border-t-transparent
        text-[var(--color-primary)]
        ${sizes[size]}
        `}
      />
    </div>
  );
}
