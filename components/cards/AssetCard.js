import {
  Collapse,
  TableCell,
  TableRow,
  IconButton,
  TableBody,
  Typography,
  Grid,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";
import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import { useAppContext } from "context/state";
import Axios from "@/lib/axios";
import { dateInput } from "@/lib/dateInput";
import UpdateAsset from "components/assets/UpdateAsset";
//   import OrganiztionUpdateForm from "components/form/OrganiztionUpdateForm";
//   import ToolUpdate from "components/tools/UpdateTool";

const AssetCard = ({ asset }) => {
  const [open, setOpen] = useState(false);
  const {
    assetDispatch,
    filterAssetsDisPatch,

    filterAssetsState: { assets: filterAsset },
  } = useAppContext();
  // expand card
  const handleExpand = (expand, id) => {
    assetDispatch({
      type: "EXPAND_ASSET",
      expand: expand,
      id: id,
    });
  };

  // open form modal
  const handleOpen = (id) => {
    setOpen(true);

    filterAssetsDisPatch({
      type: "SINGLE_ASSET",
      id: asset._id,
    });
  };

  // delete tool
  const deleteasset = async (id) => {
    const res = await Axios.delete(`asset/${id}`);

    if (res.status === 200) {
      assetDispatch({
        type: "DELETE_ASSETS",
        id: id,
      });
    }
  };

  return (
    <TableBody key={asset._id}>
      {filterAsset.length > 0 && (
        <UpdateAsset
          assets={filterAsset[0]}
          setOpen={setOpen}
          open={open}
          assetDispatch={assetDispatch}
        />
      )}
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleExpand(!asset.expand, asset._id)}
          >
            <FeatherIcon
              icon={asset.expand ? "minus-square" : "square"}
              style={{ color: "#ddd" }}
            />
          </IconButton>
        </TableCell>
        <TableCell>{asset.name}</TableCell>
        <TableCell>{asset.value}</TableCell>
        <TableCell>{asset.user}</TableCell>
        <TableCell>{dateInput(asset.purchase_date)}</TableCell>

        <TableCell>
          {" "}
          <IconButton size="small" onClick={() => handleOpen(asset._id)}>
            <FeatherIcon icon="edit" style={{ color: "green" }} />
          </IconButton>
        </TableCell>
        <TableCell>
          {" "}
          <IconButton size="small" onClick={() => deleteasset(asset._id)}>
            <FeatherIcon icon="trash" style={{ color: "red" }} />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={8}
        >
          <Collapse in={asset.expand} timeout="auto" unmountOnExit>
            <Typography variant="h3">Assets:</Typography>

            <Grid
              sx={{
                backgroundColor: "#ddd",
                marginBottom: "10px",
                padding: "15px",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                }}
              >
                {" "}
                <Typography variant="h4" mr={3}>
                  {asset.name}
                </Typography>{" "}
              </Grid>
              <Typography>Issue:</Typography>

              <List>
                {asset.issues.map((el, i) => (
                  <ListItem key={i} disableGutters>
                    <ListItemText primary={el.issue} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default AssetCard;
