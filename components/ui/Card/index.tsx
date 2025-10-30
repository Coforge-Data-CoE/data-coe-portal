import { FC, ReactNode } from "react";
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';


type CardProps = {
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  sx?: object;
  variant?: 'elevation' | 'outlined';
  elevation?: number;
  [key: string]: any;
};


const Card: FC<CardProps> = ({ children, actions, className = '', sx = {}, ...rest }) => {
  return (
    <MuiCard
      className={className}
      variant="outlined"
      elevation={0}
      sx={{
        borderRadius: 3,
        background: '#f8fafc',
        border: '1.5px solid #e5e7eb',
        boxShadow: 'none',
        ...sx,
      }}
      {...rest}
    >
      <CardContent>
        {children}
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </MuiCard>
  );
};

export default Card;
