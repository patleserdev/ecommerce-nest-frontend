type CustomButtonProps = {
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: string;
  title? : string
};

export default function CustomedButton({
  onClick,
  selected = true,
  disabled = true,
  children,
  type,
  className = "",
  title = ""
}: CustomButtonProps) {
  return (
    <button
      className={`${className} border w-full px-8 p-2 mt-2 mb-2 ${
        selected && !type
          ? " hover:bg-[var(--foreground)] hover:text-[var(--background)] cursor-pointer"
          : null
      } 
      ${
        type == "primary" || type == "submit" 
          ? "bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--foreground)] cursor-pointer"
          : null
      }
      transition-all `}
      style={selected ? { opacity: 1 } : { opacity: 0.5 }}
      disabled={selected ? false : true}
      onClick={onClick}
      type={type == "submit" ? "submit" : "button"}
    >
      {children}
    </button>
  );
}
