import React, { useEffect, useRef } from "react";
import "./posts.css";
import { useState } from "react";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../../Image/TechX.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Popup } from "../popup/Popup";
export const Posts = () => {
  const [allFinalpostData, setAllFinalpostData] = useState([]);
const [heartReaction, setHeartReaction] =useState(false);
const [count, setCount] = useState(null);

const [smileReaction, setSmileReaction] =useState(false);
const [count1, setCount1] = useState(null);
const [thumbReaction, setThumbReaction] =useState(false);
const [count2, setCount2] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  var dataCollection = collection(db, "posts");
  let navigate = useNavigate();
  const prevHeartReaction=useRef();

  useEffect(() => {
    getPostedData();
  }, []);

  useEffect(() => {
    prevHeartReaction.current = count;
  }, [count]);

  var preV=prevHeartReaction.current;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idname = open ? "simple-popover" : "";

  //function for get all post
  async function getPostedData() {
    var res = await getDocs(dataCollection);
    setAllFinalpostData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  // console.log(allFinalpostData);

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
  
  //code for home icon
  const goToTopOfPosts = () => {
    window.scrollTo(0, 0);
  };


  var usersData = JSON.parse(localStorage.getItem("userDetails"));

  const countReaction=(itemId, heartCount)=>{
    heartCount++;
    console.log("heart",heartCount)
    for(var i=0;i<allFinalpostData.length;i++){
      if(allFinalpostData[i].id===itemId){
        setCount(i);
        // heartCount=heartCount+1;
        setHeartReaction(!heartReaction);
      }
    }
  }
  const showSmileReaction=(itemId)=>{
    for(var i=0;i<allFinalpostData.length;i++){
      if(allFinalpostData[i].id===itemId){
        setCount1(i);
        setSmileReaction(!smileReaction);
      }
    }
  }
  const showThumbReaction=(itemId)=>{
    for(var i=0;i<allFinalpostData.length;i++){
      if(allFinalpostData[i].id===itemId){
        setCount2(i);
        setThumbReaction(!thumbReaction);
      }
    }
  }
  // console.log("num",preV);

  return (
    <div className="postsContainer">
      <div className="titleBox">
        <img width="30%" src={logo} alt="" />
      </div>
      <Link to={"/create"}>
        <div className="headInputBox">
          <p>What's in your mind?</p>
        </div>
      </Link>
      <div className="postsContain1">
        {allFinalpostData.map((item, index) => {
          return (
            <div key={item.id} className="cardDiv">
              <div className="postHeader">
                <div className="nameAndProfile">
                  <img className="postProfilePicture" src={item.profilePic} referrerpolicy="no-referrer" alt="" />
                 
                  <p>{item.name}</p>
                </div>
                {/* for post feed popup */}
                {item.email === usersData.email ? (
                  <Popup item={item} />) : ""}
                 
              </div>

              <p style={{marginLeft:"5%", marginRight:"2%", textAlign:"left"}}>{item.postText}</p>
              <div className="mainImageBox">
                {item.imageData.map((imageItem, i) => {
                  return (
                    <div key={i} className="postImageBox">
                      <img width="100%" src={imageItem} alt="" />
                    </div>
                  );
                })}
              </div>
              <div className="bottomBoxOfPost">
                <div className="heartIcon">
                  <FavoriteIcon
                  onClick={()=>{countReaction(item.id, item.heart); console.log(item.heart)}}
                    style={{
                      fontSize: "2.9vw",
                      color: (count===index) && item.heart>=0 ? "blue" : "gray" ,
                      cursor: "pointer",
                    }}
                  />
                </div>
                <div className="heartIcon">
                  <InsertEmoticonIcon
                  onClick={()=>{showSmileReaction(item.id)}}
                    style={{
                      fontSize: "2.9vw",
                      color: (count1===index) && (smileReaction) ? "blue" : "gray",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <div className="heartIcon">
                  <ThumbUpIcon
                   onClick={()=>{showThumbReaction(item.id)}}
                    style={{
                      fontSize: "2.9vw",
                      color: (count2===index) && (thumbReaction) ? "blue" : "gray",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* bottom box */}
      <div className="bottomBox">
        <div className="homeIcon">
          <HomeIcon
            onClick={goToTopOfPosts}
            style={{ fontSize: "4.2vw", color: "blue", cursor: "pointer" }}
          />
        </div>
        <div className="personIcon">
          <PersonIcon
            onClick={() => {
              navigate("/profile");
            }}
            style={{ fontSize: "4.2vw", color: "gray", cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};
