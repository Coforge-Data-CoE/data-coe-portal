/**
 * `Container` sets a consistent max-width and horizontal padding for page content.
 * Use it to wrap major sections or full screens to keep layout aligned and centered.
 */

import { Container, ContainerProps } from '@mui/material';

interface CustomContainerProps extends ContainerProps {
    full?: boolean;
}

export const Page = ({ children, full, maxWidth, ...props }: CustomContainerProps) => {
    // If full is true, occupy full width (maxWidth=false). If maxWidth is provided, use it. Otherwise, default to 'xl'.
    const computedMaxWidth = full ? false : (typeof maxWidth !== 'undefined' ? maxWidth : 'xl');
    return (
        <Container className='page-container' maxWidth={computedMaxWidth} {...props} sx={{ width: '100%', display: 'flex', flex: 1, ...props.sx }}>
            {children}
        </Container>
    );
};