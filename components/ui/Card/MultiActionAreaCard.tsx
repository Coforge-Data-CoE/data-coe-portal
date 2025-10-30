import { FC, ReactNode } from "react";
import { Card, CardActionArea, CardActions, CardContent } from "@mui/material";

type CardProps = {
  content?: ReactNode;
  actions?: ReactNode;
};

const MultiActionAreaCard: FC<CardProps> = ({
  content,
  actions,
}: CardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>{content}</CardContent>
      </CardActionArea>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};

export default MultiActionAreaCard;
