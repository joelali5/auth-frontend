import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userPhoto, userProfile } from "../../utils/api";
import InvalidAccessToken from "./invalidToken";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [image, setImage] = useState(null);
  const [imgErr, setImgErr] = useState(null);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    userProfile()
      .then((result) => {
        setProfile(result);
      })
      .catch((error) => {
        setErr(error.response.data.message);
      });
  }, [profile]);

  useEffect(() => {
    userPhoto()
      .then((result) => {
        setImage(JSON.parse(result.data).data.data);
      })
      .catch((error) => {
        setImgErr(error.response.data.message);
      });
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("TOKEN");
    navigate("/signin");
  }

  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const base64Str = arrayBufferToBase64(image);

  return err ? (
    <InvalidAccessToken err={err} />
  ) : (
    <div className="profile">
      <div className="profile-heading">
        <div className="user-info">
          <div className="img-container">
            <img
              src={`data:image/png;base64,${base64Str}`}
              alt="profile image"
            />
          </div>
          {imgErr && <p className="set-img-err">{imgErr}</p>}
          <h5 className="username">{profile.name}</h5>
          <Link to="/signin" className="logout" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </div>
      <p className="personal-info">Personal Info</p>
      <div className="profile-details">
        <div className="details-header border-bottom">
          <div className="details-header-left">
            <h4 className="details-header-title">Profile</h4>
            <p className="details-header-description">
              A brief description of who you are and what you do.
            </p>
          </div>
          <Link to="/edit-profile" className="edit-profile-btn">
            Edit
          </Link>
        </div>
        <div className="photo-group border-bottom">
          <h3 className="photo">Photo</h3>
          <div className="img-container img-size">
            <img
              src={`data:image/png;base64,${base64Str}`}
              alt="profile image"
            />
          </div>
        </div>
        <div className="name-group border-bottom">
          <h3 className="name">Name</h3>
          <p className="name-value">{profile.name}</p>
        </div>
        <div className="bio-group border-bottom">
          <h3 className="bio">Bio</h3>
          <p className="bio-value">{profile.bio}</p>
        </div>
        <div className="phone-group border-bottom">
          <h3 className="phone">Phone</h3>
          <p className="phone-value">{profile.phone}</p>
        </div>
        <div className="email-group border-bottom">
          <h3 className="email">Email</h3>
          <p className="email-value">{profile.email}</p>
        </div>
        <div className="password-group">
          <h3 className="password">Password</h3>
          <p className="password-value">********</p>
        </div>
      </div>
    </div>
  );
}
