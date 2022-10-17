import "./App.css";
import { CreatePost } from "./components/createPost/CreatePost";
import { Posts } from "./components/posts/Posts";
import { Registration } from "./components/registration/Registration";
import { Routes, Route } from "react-router-dom";
import { ProfilePage } from "./components/profile/ProfilePage";
import { EditPost } from "./components/editPost/EditPost";
import { useEffect } from "react";
import { firebase, messaging, token } from "./firebase";
import { getMessaging, getToken } from "firebase/messaging";

import React, { useState } from "react";
import { db } from "./firebase";
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
function App() {
  const [switchButton, setSwitchButton]= useState(false);
  useEffect(() => {
    getNotificationData();
  }, []);

  const [allNotificationData, setAllNotificationData] = useState({}); //state to handle notification data object

  var dataCollectionNotification = collection(db, "notification");
  const orderTimeQuery = query(dataCollectionNotification, orderBy("time")); //show data order by time

  var usersData = JSON.parse(localStorage.getItem("userDetails"));

  // code for get notification data
  async function getNotificationData() {
    onSnapshot(orderTimeQuery, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setAllNotificationData(doc.data());
      });
    });
  }
  // code for show notification
  function showNotification() {
    addNotification({
      title: "TechX Notification",
      subtitle: allNotificationData.senderName,
      message: allNotificationData.senderName + " " + allNotificationData.text,
      native: true, // when using native, your OS will handle theming.
    });
  }
  useEffect(() => {
    if (allNotificationData.receiverId === allNotificationData.senderId && switchButton) {
      showNotification();
    }
  }, [allNotificationData.time]);
  console.log("swtch", switchButton);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/profile" element={<ProfilePage setSwitchButton={setSwitchButton} />} />
        <Route path="/editpost" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;
