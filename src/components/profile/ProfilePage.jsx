import React, { useEffect, useState } from "react";
import "./profilePage.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Switch from "@mui/material/Switch";
import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
export const ProfilePage = () => {
  const [checked, setChecked] = useState(true);
  const [uploadedProfile, setUploadedProfile] = useState("");
  const [postedData, setPostedData] =useState([])

  useEffect(()=>{
    getPostedData();
  }, []);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  var dataCollection = collection(db, "posts");
  let navigate = useNavigate();

//function for get all post
async function getPostedData() {
  var res = await getDocs(dataCollection);
  setPostedData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
}

  var usersData = JSON.parse(localStorage.getItem("userDetails"));
  async function handleChangeForEditProfileFile(e) {
    const file = e.target.files[0];
    const convertedFileInbase64 = await converfile(file);
    setUploadedProfile(convertedFileInbase64);
  }

  //function for convert file into base64 file
  const converfile = (file) => {
    return new Promise((resolve, reject) => {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

   async function updateProfileData() {
    for(var i=0;i<postedData.length;i++){
      if(postedData[i].email===usersData.email){
        var path = doc(dataCollection, postedData[i].id);
    await updateDoc(path, {profilePic: uploadedProfile});
      

    localStorage.setItem('userDetails', JSON.stringify({
      name: usersData.name,
      email: usersData.email,
      uid:   usersData.uid,
       profilePic: uploadedProfile,
    }));
    // window.location.reload();
       }
    }
};
  console.log(postedData)

  return (
    <div>
      <div className="profileContainer">
        <div className="profileContain1">
          <div className="textBox1">
            <div className="profileArrowIcon">
              <ArrowBackIosNewIcon
                style={{ fontSize: "4vw", cursor: "pointer" }}
                onClick={() => {
                  navigate("/posts");
                }}
              />
              <p
                style={{
                  marginLeft: "7%",
                  color: "blue",
                  fontSize: "2.5vw",
                  fontWeight: "800",
                }}
              >
                Profile
              </p>
            </div>
            <span
              style={{
                marginRight: "7%",
                color: "gray",
                fontWeight: "800",
                cursor: "pointer",
              }}
            >
              <PowerSettingsNewIcon
                style={{ fontSize: "4vw" }}
                onClick={() => {
                  navigate("/");
                }}
              />
            </span>
          </div>
          <label for="file-input">
            <div className="profileIcon1">
              <img
                className="profileImage"
                src={usersData.profilePic}
                referrerpolicy="no-referrer"
                alt=""
              />
              <div className="editProfileBox">
                <EditIcon />
              </div>
            </div>
            <input
              name="photoImage"
              className="inputForEditProfileImage"
              id="file-input"
              type="file"
              multiple="true"
              onChange={(e) => handleChangeForEditProfileFile(e)}
            />
          </label>

          <div>
            <p style={{ fontSize: "2.2vw", fontWeight: "bold", color: "gray" }}>
              {usersData.name}
            </p>
          </div>

          <div className="profileNotificationBox">
            <div className="notificationIconText">
              <NotificationsIcon style={{ fontSize: "4.5vw", color: "blue" }} />
              <p
                style={{ fontSize: "2.2vw", fontWeight: "bold", color: "gray" }}
              >
                Notification
              </p>
            </div>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
              style={{ color: "blue" }}
            />
          </div>
          <div className="profileButtonBox1">
            <Button
              variant="contained"
              className="createButtonBox1"
              style={{
                width: "95%",
                height: "10vh",
                fontSize: "1.5vw",
                borderRadius: "1vw",
              }}
              onClick={updateProfileData}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
