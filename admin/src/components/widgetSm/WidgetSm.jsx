import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { privateRequest } from "../../axiosRequest";
import avatar from "../../avatar.jpg";
export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  
  useEffect(()=>{
    const getUsers = async()=>{
      try{
      const res = await privateRequest.get("/user/?new=true");
      setUsers(res.data);
      }
      catch(err){
        console.log(err);
      }
    };
    getUsers();
  },[]);
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map(e=>(
          <li className="widgetSmListItem" key={e._id}>
          <img
            src={avatar}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{e.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))}
        
      </ul>
    </div>
  );
}
