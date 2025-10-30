import { Typography, TypographyProps } from '@mui/material';

export const Title = ({ children, ...props }: TypographyProps) => (
  <Typography variant="h5" fontWeight="bold" gutterBottom {...props}>
    {children}
  </Typography>
);
