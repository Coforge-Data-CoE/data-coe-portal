import { Typography, TypographyProps } from '@mui/material';

export const SubTitle = ({ children, ...props }: TypographyProps) => {
    return (
        <Typography
            variant="subtitle1"
            color="text.secondary"
            fontWeight={500}
            gutterBottom
            fontFamily="Lato, sans-serif"
            {...props}
        >
            {children}
        </Typography>
    );
};