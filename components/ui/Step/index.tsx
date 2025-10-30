import { FC, ReactNode } from "react";
import { Box } from "@mui/material";
import "./index.scss";

interface StepProps {
  children: ReactNode;
  className?: string;
}

const Step: FC<StepProps> = ({ children, className }: StepProps) => {
  return <Box className={`step ${className}`}>{children}</Box>;
};

export default Step;
