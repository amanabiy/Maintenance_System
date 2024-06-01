import "./style.scss";
import { KeyboardArrowUp, PersonOutlineOutlined } from "@mui/icons-material";

const Widget = () => {
  return (
    <div className="widget">
      <div className="left">
        <span className="title">USERS</span>
        <span className="counter">214443</span>
        <span className="link">See all Users</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUp />
          20%
        </div>
        <PersonOutlineOutlined className="icon" />
      </div>
    </div>
  );
};

export default Widget;
