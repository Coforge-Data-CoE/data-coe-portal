import React from 'react';
import Flex from '../layout/Flex';

interface InfoCardProps {
    title: React.ReactNode;
    value: React.ReactNode;
    sx?: object;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, sx }) => {
    return (
        <Flex
            sx={{
                flex: 1,
                p: 2,
                bgcolor: '#f1f6ff',
                borderRadius: 2,
                border: '1px solid #bfc5ff',
                ...sx,
            }}
            direction="column"
            gap={1}
        >
            {title}
            {value}
        </Flex>
    );
};

export default InfoCard;
