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
import { fontWeight } from "@mui/system";
export const Posts = () => {
  const [allFinalpostData, setAllFinalpostData] = useState([]);
  const [heartReaction, setHeartReaction] = useState(false);
  const [count, setCount] = useState(null);

  const [reacs, setReacs] = useState([]);

  const [heartcheck, setHeartcheck] = useState(false);
  const [smileReaction, setSmileReaction] = useState(false);
  const [count1, setCount1] = useState(null);
  const [thumbReaction, setThumbReaction] = useState(false);
  const [count2, setCount2] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [heart1, setHeart1] = useState([]);
  var dataCollection = collection(db, "posts");
  let navigate = useNavigate();
  const prevHeartReaction = useRef();

  useEffect(() => {
    getPostedData();
  }, []);

  useEffect(() => {
    prevHeartReaction.current = count;
  }, [count]);

  var preV = prevHeartReaction.current;

  //function for get all post
  async function getPostedData() {
    var res = await getDocs(dataCollection);
    setAllFinalpostData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  allFinalpostData.sort((a,b)=>b.time-a.time);
  // console.log(allFinalpostData);

  //code for home icon
  const goToTopOfPosts = () => {
    window.scrollTo(0, 0);
  };

  var usersData = JSON.parse(localStorage.getItem("userDetails"));

  const changeReactionColor = (itemId) => {
    for (var i = 0; i < allFinalpostData.length; i++) {
      if (allFinalpostData[i].id === itemId) {
        setCount(allFinalpostData[i].id);
        setHeartReaction(!heartReaction);
        // setCountHeartR((prev)=>prev+1)
      }
    }
  };
  // console.log(count)
  const showSmileReaction = (itemId) => {
    for (var i = 0; i < allFinalpostData.length; i++) {
      if (allFinalpostData[i].id === itemId) {
        setCount1(i);
        setSmileReaction(!smileReaction);
      }
    }
  };
  const showThumbReaction = (itemId) => {
    for (var i = 0; i < allFinalpostData.length; i++) {
      if (allFinalpostData[i].id === itemId) {
        setCount2(i);
        setThumbReaction(!thumbReaction);
      }
    }
  };
  async function countReaction(itemId, emailId, itemHeart) {
    // setHeart1(emailId)
    var path = doc(dataCollection, itemId);
    var editedObj = {
      heart: [...itemHeart, emailId],
      time: Date.now(),
    };
    await updateDoc(path, editedObj);
  }

  return (
    <div className="postsContainer">
      <div className="titleBox">
        <img width="30%" src={logo} alt="" />
      </div>
      <Link to={"/create"}>
        <div className="headInputBox">
          <p style={{fontWeight:"800", color:"gray"}}>What's in your mind?</p>
        </div>
      </Link>
      <div className="postsContain1">
        {allFinalpostData.map((item, index) => {
          return (
            <div key={item.id} className="cardDiv">
              <div className="postHeader">
                <div className="nameAndProfile">
                  <img
                    className="postProfilePicture"
                    src={item.profilePic}
                    referrerpolicy="no-referrer"
                    alt=""
                  />

                  <p style={{fontWeight:"800"}}>{item.name}</p>
                </div>
                {/* for post feed popup */}
                {item.email === usersData.email ? <Popup item={item} /> : ""}
              </div>
               
              <p
                style={{
                  marginLeft: "5%",
                  marginRight: "2%",
                  textAlign: "left",
                }}
              >
                {item.postText.split(/#\w+/g)}
              </p>
              <span><p style={{color:"blue", fontWeight:"bold",  marginRight: "2%", marginLeft: "5%", textAlign:"left"}}>{item.tags}</p></span>
              
              <div className="mainImageBox">
                {item.imageData&&item.imageData.map((imageItem, i) => {
                  return (
                    <div key={i} className="postImageBox">
                      <img width="100%" src={imageItem} alt="" />
                    </div>
                  );
                })}
              </div>

              <div className="bottomBoxOfPost">
                <div className="heartIcon">
                  <label for="checkbox_id" className="colorb">
                    <div className="rectBox">
                      <FavoriteIcon
                        className="heartcon"
                        // onClick={(e)=>{
                        //   countReaction(item.id, usersData.email, item.heart);
                        //   changeReactionColor(item.id)

                        // }}
                        style={{
                          fontSize: "1.8vw",
                        }}
                      />

                      <input
                        type="checkbox"
                        className="checkb"
                        name="checkbox"
                        id="checkbox_id"
                        value="checked"
                        onChange={(e) => setHeartcheck(e.target.checked)}
                      />
                    </div>
                  </label>
                </div>
                <div className="heartIcon">
                  <label for="checkbox_id1" className="colorb">
                    <div className="rectBox">
                      <InsertEmoticonIcon
                        className="heartcon"
                        // onClick={()=>{showSmileReaction(item.id)}}
                        style={{
                          fontSize: "1.8vw",
                        }}
                      />
                      <input
                        type="checkbox"
                        className="checkb"
                        name="checkbox"
                        id="checkbox_id1"
                        value="checked"
                        onChange={(e) => setHeartcheck(e.target.checked)}
                      />
                    </div>
                  </label>
                </div>
                <div className="heartIcon">
                  <label for="checkbox_id2" className="colorb">
                    <div className="rectBox">
                      <ThumbUpIcon
                        className="heartcon"
                        onClick={() => {
                          showThumbReaction(item.id);
                        }}
                        style={{
                          fontSize: "1.8vw",
                        }}
                      />
                      <input
                        type="checkbox"
                        className="checkb"
                        name="checkbox"
                        id="checkbox_id2"
                        value="checked"
                        onChange={(e) => setHeartcheck(e.target.checked)}
                      />
                    </div>
                  </label>
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
