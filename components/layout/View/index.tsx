/**
 * `View` is the foundational layout wrapper based on MUI's Box.
 * It should be used instead of raw `Box` for layout, spacing, and style control.
 * This helps maintain consistency and allows future enhancements at one place.
 */
import { Box, BoxProps } from '@mui/material';

export const View = ({ children, ...props }: React.ComponentProps<typeof Box>) => {
    return <Box {...props}>{children}</Box>;
};