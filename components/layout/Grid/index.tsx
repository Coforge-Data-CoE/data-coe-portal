import React from 'react';
import { Grid as MuiGrid, GridProps } from '@mui/material';

interface CustomGridProps extends GridProps {
    children: React.ReactNode;
}

const Grid: React.FC<CustomGridProps> = ({
    children,
    ...rest
}) => {
    return (
        <MuiGrid container {...rest}>
            {children}
        </MuiGrid>
    );
};

export default Grid;
