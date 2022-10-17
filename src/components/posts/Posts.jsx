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
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import addNotification from "react-push-notification";
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

  const [heartcheck, setHeartcheck] = useState(false);

  var dataCollection = collection(db, "posts");
  let navigate = useNavigate();

  useEffect(() => {
    getPostedData();
  }, []);

  // var preV = prevHeartReaction.current;
  var dataCollectionNotification = collection(db, "notification");
  const orderTimeQuery = query(dataCollectionNotification, orderBy("time"));

  //function for get all post
  async function getPostedData() {
    var res = await getDocs(dataCollection);
    setAllFinalpostData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  //code to sort the all posted data by time
  allFinalpostData.sort((a, b) => b.time - a.time);

  //code for home icon
  const goToTopOfPosts = () => {
    window.scrollTo(0, 0);
  };

  var usersData = JSON.parse(localStorage.getItem("userDetails"));

  async function addForNotification(receiverUid) {
    // console.log("hello", receiverUid);
    var objNotification = {
      receiverId: receiverUid,
      senderId: usersData.uid,
      text: "reacted on your post",
      senderName: usersData.name,
      time: Date.now(),
    };
    await addDoc(dataCollectionNotification, objNotification);
  }

  return (
    <div className="postsContainer">
      <div className="titleBox">
        <img width="30%" src={logo} alt="" />
      </div>
      <Link to={"/create"}>
        <div className="headInputBox">
          <p style={{ fontWeight: "800", color: "gray" }}>
            What's in your mind?
          </p>
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
                    alt=""
                  />
                    <div className="nameTimeDiv">
                  <p style={{ fontWeight: "800" }}>{item.name}</p>
                  {Math.floor((Date.now() - item.time) / 1000 / 60 / 60) >=
                  24 ? (
                    <p>
                      {Math.floor(
                        (Date.now() - item.time) / 1000 / 60 / 60 / 12
                      )}{" "}
                      day ago
                    </p>
                  ) : Math.floor((Date.now() - item.time) / 1000 / 60 / 60) >=
                    1 ? (
                    <p>
                      {Math.floor((Date.now() - item.time) / 1000 / 60 / 60)} hr
                      ago
                    </p>
                  ) : Math.floor((Date.now() - item.time) / 1000 / 60) >= 1 ? (
                    <p>
                      {Math.floor((Date.now() - item.time) / 1000 / 60)} min ago
                    </p>
                  ) : (
                    <p>{Math.floor((Date.now() - item.time) / 1000)} sec ago</p>
                  )}
                  </div>
                </div>
                {/* for post feed popup */}
                {item.email === usersData.email ? <Popup item={item} /> : ""}
              </div>

              <p
                style={{
                  marginLeft: "5%",
                  marginTop: "7%",
                  marginRight: "2%",
                  textAlign: "left",
                }}
              >
                {item.postText.split(/#\w+/g)}
              </p>
              <span>
                <p
                  style={{
                    color: "blue",
                    fontWeight: "bold",
                    marginRight: "2%",
                    marginLeft: "5%",
                    textAlign: "left",
                  }}
                >
                  {item.tags}
                </p>
              </span>

              <div className="mainImageBox">
                {item.imageData &&
                  item.imageData.map((imageItem, i) => {
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
                    <div
                      className="rectBox"
                      onClick={() => {
                        addForNotification(item.uid);
                      }}
                    >
                      <FavoriteIcon
                        className="heartcon"
                        style={{
                          fontSize: "25px",
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
                    <div
                      className="rectBox"
                      onClick={() => {
                        addForNotification(item.uid);
                      }}
                    >
                      <InsertEmoticonIcon
                        className="heartcon"
                        style={{
                          fontSize: "25px",
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
                    <div
                      className="rectBox"
                      onClick={() => {
                        addForNotification(item.uid);
                      }}
                    >
                      <ThumbUpIcon
                        className="heartcon"
                        style={{
                          fontSize: "25px",
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
