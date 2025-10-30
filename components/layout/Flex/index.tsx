import React from 'react';
import { Stack, StackProps } from '@mui/material';


interface FlexProps extends StackProps {
    direction?: StackProps['direction'];
    justify?: StackProps['justifyContent'];
    align?: StackProps['alignItems'];
    wrap?: boolean;
    gap?: number | string;
    children: React.ReactNode;
    scrollable?: boolean;
}


const Flex: React.FC<FlexProps> = ({
    direction = 'column',
    justify = 'flex-start',
    align = 'stretch',
    wrap = false,
    gap,
    children,
    sx,
    ...rest
}) => {
    return (
        <Stack
            direction={direction}
            justifyContent={justify}
            alignItems={align}
            flexWrap={wrap ? 'wrap' : 'nowrap'}
            minHeight={direction === 'column' ? 0 : 'auto'} // Prevents overflow issues in flex containers only for column
            gap={gap}
            sx={sx}
            className={rest.scrollable ? 'flex-scrollable' : undefined}
            // overflow={'auto'} // Allows scrolling if content overflows
            {...rest}
        >
            {children}
        </Stack>
    );
};

export default Flex;