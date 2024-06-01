import { Avatar, Typography } from "@mui/material";
import Person from "../../assets/images/person1.jpg";

const Updates = () => {
  return (
    <div className="updates">
      <div className="title">
        <span>UPDATES</span>
      </div>
      <div className="internal">
        <div className="update">
          <div className="left">
            <Avatar className="avatar" src={Person} />
          </div>
          <div className="right">
            <div className="msg">
              Abebe just reported a broken door at Block 43
            </div>
          </div>
        </div>
        <div className="update">
          <div className="left">
            <Avatar className="avatar" />
          </div>
          <div className="right">
            <div className="msg">
              Abebe just reported a broken door at Block 43
            </div>
          </div>
        </div>
        <div className="update">
          <div className="left">
            <Avatar className="avatar" />
          </div>
          <div className="right">
            <div className="msg">
              Abebe just reported a broken door at Block 43
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updates;
