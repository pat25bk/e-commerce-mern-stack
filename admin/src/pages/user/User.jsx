import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { useEffect, useState } from "react";
import { privateRequest } from "../../axiosRequest";

export default function User() {
  const [user,setUser] = useState({});
  const [newUser,setNewUser] = useState({});
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  console.log(userId);

  useEffect(()=>{
    const getUser = async()=>{
      try{
        const res = await privateRequest.get(`/user/find/${userId}`);
        setUser(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getUser();
  },[userId]);

  const handleUserChange = (e)=>{
    const attrName = e.target.name;
    const attrValue = e.target.value;
    setNewUser((prev)=>({...prev,[attrName]:attrValue}));
  }

  const handleUpdateClick = async(e)=>{
    e.preventDefault();
    try{
      const res = await privateRequest.put(`/user/${userId}`,newUser);
      alert("User Updated Successfully!");
      setUser(res.data);
    }
    catch(err){
      console.log(err);
      alert("User Updated Failed!");
    }
  }
  console.log(user);
  console.log(newUser);
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="UserImage"
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user?.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder={user?.username}
                  className="userUpdateInput"
                  onChange={handleUserChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={user?.username}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user?.email}
                  name='email'
                  onChange={handleUserChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" onClick={handleUpdateClick}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
