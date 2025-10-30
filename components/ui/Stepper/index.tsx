import React, { FC } from "react";
import "./index.scss";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LoopIcon from "@mui/icons-material/Loop";
import { Box } from "@mui/material";

type StepperProps = {
  steps: Steps[];
  currentStep: number;
};

interface Steps {
  label: string;
  completed: boolean;
}

const Stepper = ({ currentStep, steps }: StepperProps) => {
  return (
    <div className="stepper">
      <>
        {steps?.map((step, index) => {
          return (
            <>
              {index === 0 ? (
                <div
                  key={index}
                  style={{
                    clipPath:
                      "polygon(75% 0%, 85% 50%, 75% 100%, 0% 100%, 0% 0%, 0% 0%)",
                  }}
                  className={`step ${index <= currentStep ? "completed" : ""} ${index === steps.length - 1 ? "last" : ""} ${currentStep === index ? "active" : ""}`}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    {step.label}
                    {index < currentStep ? (
                      <CheckCircleOutlineIcon sx={{ fontSize: "16px" }} />
                    ) : (
                      <LoopIcon sx={{ fontSize: "16px" }} />
                    )}
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className={`step ${index === 0 ? "firstStep" : ""} ${index <= currentStep ? "completed" : ""} ${index === steps.length - 1 ? "last" : ""} ${currentStep === index ? "active" : ""}`}
                >
                  <div
                    style={{
                      marginLeft: 20,
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    {step.label}
                    {index < currentStep ? (
                      <CheckCircleOutlineIcon sx={{ fontSize: "16px" }} />
                    ) : (
                      <LoopIcon sx={{ fontSize: "16px" }} />
                    )}
                  </div>
                </div>
              )}
            </>
          );
        })}
      </>
    </div>
  );
};

export default Stepper;
