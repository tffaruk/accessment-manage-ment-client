import { Box, Card, Typography } from "@mui/material";
import FeatherIcon from "feather-icons-react";

const TestimonialCard = ({ provided, item, index }) => {
  const { name, feedback } = item;
  return (
    <Card
      sx={{ borderRadius: 2, display: "flex" }}
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <Box {...provided.dragHandleProps} sx={{ marginRight: "15px" }}>
        <FeatherIcon
          icon="more-vertical"
          style={{ color: "#ddd", marginLeft: "-5px" }}
        />
        <FeatherIcon
          icon="more-vertical"
          style={{ color: "#ddd", marginLeft: "-15px" }}
        />
      </Box>
      <Box>
        <Typography variant="h5" sx={{}}>
          {index + 1}. {name}
        </Typography>

        <Typography>{feedback}</Typography>
      </Box>
    </Card>
  );
};

export default TestimonialCard;
