import { Avatar, Typography } from "@mui/material";
import Person from "../../assets/images/person1.jpg";

const Updates = ({ names, subject }) => {
  return (
    <div className="updates">
      <div className="title">
        <span>UPDATES</span>
      </div>
      <div className="internal">
        {names && subject && names.length === subject.length ? (
          names.slice(0, 5).map((name, index) => (
            <div className="update" key={index}>
              <div className="left">
                <Avatar className="avatar" style={{ color: "#4e24e1" }} />
              </div>
              <div className="right">
                <div className="msg">
                  {name} just reported {subject[index]}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No updates available</div>
        )}
      </div>
    </div>
  );
};

export default Updates;
