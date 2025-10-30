/* Panel is a reusable layout component built on top of MUI’s Paper. It provides a consistent, elevated surface to display content,
* and supports optional header and footer sections.
* When a header or footer is provided, the component automatically renders them with styled borders to visually separate them from the main content.
*/
import React from 'react';
import { Paper, PaperProps, Box } from '@mui/material';
import { View } from '../View';

interface PanelProps extends PaperProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    children: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({
    header,
    footer,
    children,
    sx,
    ...rest
}) => {
    return (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', ...sx }} {...rest}>
            {header && (
                <View sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 1, mb: 2 }}>
                    {header}
                </View>
            )}

            <View className='flex-container' sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                {children}
            </View>

            {footer && (
                <View sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2, mt: 2 }}>
                    {footer}
                </View>
            )}
        </Paper>
    );
};

export default Panel;
