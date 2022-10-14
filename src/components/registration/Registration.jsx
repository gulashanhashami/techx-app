import React from "react";
import "./registration.css";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { authen } from "../../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import logo from "../../Image/TechX.png";
import { useNavigate } from "react-router-dom";
import { firebase } from "../../firebase";

export const Registration = () => {
  let navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  // console.log("data", db)
  const signInWithGoogle = () => {
    signInWithPopup(authen, provider)
      .then((result) => {
        console.log(result.user.uid);
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        const uid= result.user.uid;
        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            name: name,
            email: email,
            profilePic: profilePic,
            uid: uid,
          })
        );
        navigate("/posts");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(authen, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="container">
      <div className="contain1">
        <div className="imageBox">
          <img width="90%" src={logo} alt="" />
        </div>
        <div>
          <Button
            onClick={signInWithFacebook}
            variant="contained"
            className="buttonBox"
            startIcon={
              <FacebookIcon
                style={{ width: "3.5vw", height: "10vh", borderRadius: "10vw" }}
              />
            }
            style={{ fontSize: "1.7vw", borderRadius: ".8vw" }}
          >
            LOG IN WITH FACEBOOK
          </Button>
        </div>
        <br />
        <br />
        <div>
          <Button
            onClick={signInWithGoogle}
            variant="contained"
            className="buttonBox"
            startIcon={
              <GoogleIcon
                style={{ width: "3.5vw", height: "10vh", borderRadius: "10vw" }}
              />
            }
            style={{ fontSize: "1.7vw", borderRadius: ".8vw" }}
          >
            LOG IN WITH GOOGLE
          </Button>
        </div>
      </div>
    </div>
  );
};
