import React from "react";
import { FiCheck } from "react-icons/fi";
import "./CheckoutProgress.css";

const steps = ["Cart", "Delivery details", "Payment"];

const CheckoutProgress = ({ currentStep }) => {
  const progressPercent = ((Math.min(Math.max(currentStep, 1), steps.length) - 1) / (steps.length - 1)) * 100;

  return (
    <nav className="checkout-progress" aria-label="Checkout progress">
      <div className="checkout-progress-track" aria-hidden="true">
        <span style={{ width: `${progressPercent}%` }} />
      </div>
      <ol>
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isComplete = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <li
              className={`checkout-progress-step${isComplete ? " is-complete" : ""}${isCurrent ? " is-current" : ""}`}
              key={label}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span className="checkout-progress-marker">
                {isComplete ? <FiCheck aria-hidden="true" /> : stepNumber}
              </span>
              <span className="checkout-progress-label">{label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default CheckoutProgress;
