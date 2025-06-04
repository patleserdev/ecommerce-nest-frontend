// app/dashboard/layout.tsx
import Stepper from "@/components/Stepper";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6 text-[var(--foreground)] bg-[var(--background)]">
        <div className="w-[60%] justify-self-center">
        <Stepper/>
        </div>
        
        {children}
      </main>
    </div>
  );
}
