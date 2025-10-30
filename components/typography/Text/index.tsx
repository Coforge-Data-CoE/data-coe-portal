import { Typography, TypographyProps } from '@mui/material';

export const Text = ({ children, ...props }: TypographyProps) => {
    return (
        <Typography
            variant="body1"
            color="text.primary"
            fontFamily="Lato, sans-serif"
            {...props}
        >
            {children}
        </Typography>
    );
};