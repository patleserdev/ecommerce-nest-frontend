// app/dashboard/layout.tsx
import Stepper from "@/components/Stepper";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 md:p-6 text-[var(--foreground)] bg-[var(--background)] pb-5">

        
        {children}
      </main>
    </div>
  );
}
