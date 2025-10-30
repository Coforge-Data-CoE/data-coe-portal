/**
 * `Section` is a vertical spacing wrapper used to separate content blocks within a page.
 * It adds consistent vertical padding and helps maintain layout rhythm and readability.
 */

import { Box, BoxProps } from '@mui/material';

export const Section = ({ children, ...props }: BoxProps) => {
    return (
        <Box
            sx={{ py: 2 }}
            {...props}
        >
            {children}
        </Box>
    );
};
