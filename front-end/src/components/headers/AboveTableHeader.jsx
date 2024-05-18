import GridParent from "../layout/GridParent";
import { Divider, Typography } from "@mui/material";

const AboveTableHeader = ({ title, subTitle }) => {
  return (
    <GridParent style={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="subtitle1">{subTitle}</Typography>
      <Divider />
    </GridParent>
  );
};

export default AboveTableHeader;
