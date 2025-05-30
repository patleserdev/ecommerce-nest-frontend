"use client";
type StepperProps = {
  activeStep: number;
};
import React from "react";
import { usePathname } from "next/navigation";

export default function Stepper({ activeStep = 2 }: StepperProps) {
  const pathname = usePathname();

  const steps = [
    { id: 1, name: "panier", url: "/checkout/basket" },
    { id: 2, name: "livraison", url: "/checkout/delivery" },
    { id: 3, name: "paiement", url: "/checkout/payment" },
    { id: 4, name: "confirmation", url: "/checkout/confirmation" },
  ];

  const activeBadge =
    "w-8 h-8 rounded-full border-2 border-green-500 text-green-500 flex items-center justify-center font-semibold";
  const inactiveBadge =
    "w-8 h-8 rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center font-semibold";

  const activeText = "text-green-600 font-medium";
  const inactiveText = "";

  const line = <div className="flex-1 h-px bg-gray-300"></div>;
  return (
    <div className="flex items-center justify-center space-x-8 py-6">
      {steps.map((step) => {
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center space-y-2">
              <div
                className={step.url == pathname ? activeBadge : inactiveBadge}
              >
                {step.id}
              </div>
              <span
                className={step.url == pathname ? activeText : inactiveText}
              >
                {step.name}
              </span>
            </div>
            {step.id < steps.length && line}
          </React.Fragment>
        );
      })}

      {/* <div className="flex flex-col items-center space-y-2">
        <div className="w-8 h-8 rounded-full border-2 border-green-500 text-green-500 flex items-center justify-center font-semibold">
          1
        </div>
        <span className="text-green-600 font-medium">Panier</span>
      </div>

      <div className="flex-1 h-px bg-gray-300"></div>

      <div className="flex items-center space-x-2 text-gray-400">
        <div className="w-8 h-8 rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center font-semibold">
          2
        </div>
        <span>Livraison</span>
      </div>

      <div className="flex-1 h-px bg-gray-300"></div>

      <div className="flex items-center space-x-2 text-gray-400">
        <div className="w-8 h-8 rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center font-semibold">
          3
        </div>
        <span>Paiement</span>
      </div>

      <div className="flex-1 h-px bg-gray-300"></div>

      <div className="flex items-center space-x-2 text-gray-400">
        <div className="w-8 h-8 rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center font-semibold">
          4
        </div>
        <span>Confirmation</span>
      </div> */}
    </div>
  );
}
