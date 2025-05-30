type CustomButtonProps = {
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
};

export default function CustomedButton({
  onClick,
  selected = true,
  disabled = true,
  children,
  className = "",
}: CustomButtonProps) {
  return (
    <button
      className={`border px-8 p-2  ${
        selected
          ? " hover:bg-[var(--foreground)] hover:text-[var(--background)] cursor-pointer"
          : null
      } transition-all `}
      style={selected ? { opacity: 1 } : { opacity: 0.5 }}
      disabled={selected ? false : true}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
