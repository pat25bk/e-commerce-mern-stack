import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { privateRequest } from "../../axiosRequest";

export default function UserList() {
  const [data, setData] = useState([]);
  const handleDelete = async(id) => {
    console.log(id);
    try{
      const res = await privateRequest.delete(`/user/${id}`);
      console.log(res.data);
      setData(data.filter((item) => item._id !== id));
    }
    catch(err){
      console.log(err);
    }
  };

  useEffect(()=>{
    const getUser = async()=>{
      try{
        const res = await privateRequest.get("/user");
        setData(res.data);
        console.log(res.data);
      }
      catch(err){
        console.log(err);
      }
    };
    getUser();
  },[]);

  console.log(data);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={row=>row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
