import { Typography, TypographyProps } from '@mui/material';

export const Caption = ({ children, ...props }: TypographyProps) => {
    return (
        <Typography
            variant="caption"
            color="text.secondary"
            fontFamily="Lato, sans-serif"
            {...props}
        >
            {children}
        </Typography>
    );
};