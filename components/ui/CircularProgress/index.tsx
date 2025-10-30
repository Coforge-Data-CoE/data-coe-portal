import { FC } from "react";
import { Box, CircularProgress as MuiCircularProgress } from "@mui/material";
import LoadingIndicator from "../../../assets/images/loading.gif";

type CircularProgressType = {
  size?: number;
  color?:
    | "primary"
    | "inherit"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | undefined;
};

const CircularProgress: FC<CircularProgressType> = ({
  size = 30,
  color = "primary",
}) => (
  <Box
    sx={{
      position: "absolute",
      top: `calc(50% - ${size / 2}px)`,
      left: `calc(50% - ${size / 2}px)`,
      zIndex: 9999,
    }}
  >
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
      }}
    >
      {/* <img src={LoadingIndicator} height={30} width={30} /> */}
      <MuiCircularProgress size={size} color={color} />
    </Box>
  </Box>
);

export default CircularProgress;
