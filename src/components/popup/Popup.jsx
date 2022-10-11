import React from "react";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { CreatePost } from "../createPost/CreatePost";

export const Popup = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [allFinalpostData, setAllFinalpostData] = useState([]);
  // const [editData, setEditData] = useState(false);
  var dataCollection = collection(db, "posts");
  let navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idname = open ? "simple-popover" : "";
  //function for getting all post data
  async function getPostedData() {
    var res = await getDocs(dataCollection);
    setAllFinalpostData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // console.log("postedData",res);
  }

  // function for delete post
  async function handleDeleteFunction(docItem) {
    let confirm = window.confirm("Are you sure, you want to delete this post?");
    if (confirm) {
      var path = doc(dataCollection, docItem);
      await deleteDoc(path);
      window.location.reload();
      getPostedData();
    }
  }

  sessionStorage.setItem("oneItemForEdit", JSON.stringify(item));

  // console.log("item", item)
  return (
    <div>
      <Button aria-describedby={idname} onClick={handleClick}>
        <MoreHorizIcon style={{ fontSize: "2.5vw", color: "blue" }} />
      </Button>

      <Popover
        idname={idname}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography
          onClick={() => {
            navigate("/editpost");
          }}
          sx={{ p: 2 }}
          style={{ cursor: "pointer" }}
        >
          Edit Post
        </Typography>
        <Typography
          onClick={() => {
            handleDeleteFunction(item.id);
          }}
          sx={{ p: 2 }}
          style={{ cursor: "pointer" }}
        >
          Delete Post
        </Typography>
      </Popover>
    </div>
  );
};
