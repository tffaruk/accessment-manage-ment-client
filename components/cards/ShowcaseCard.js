import { Box, Card, Link, Switch, Typography } from "@mui/material";
import FeatherIcon from "feather-icons-react";

const ShowcaseCard = ({ provided, item, index, handleUpdate }) => {
  const { title, website, featured, _id } = item;
  return (
    <Card
      sx={{ borderRadius: 2, display: "flex" }}
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <Box
        {...provided.dragHandleProps}
        sx={{ marginRight: "15px", whiteSpace: "nowrap" }}
      >
        <FeatherIcon
          icon="more-vertical"
          style={{ color: "#ddd", marginLeft: "-5px" }}
        />
        <FeatherIcon
          icon="more-vertical"
          style={{ color: "#ddd", marginLeft: "-15px" }}
        />
      </Box>
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h5">
          {index + 1}.{" "}
          <Link href={website} target="_blank" rel="nofollow" color="inherit">
            {title}
          </Link>
        </Typography>
        <Switch
          onChange={() => handleUpdate(!featured, _id)}
          defaultChecked={featured}
        />
      </Box>
    </Card>
  );
};

export default ShowcaseCard;
