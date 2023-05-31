import PageTitle from "./pageTitle";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeProfile, uploadPhoto } from "../../utils/api";

export default function EditProfile() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [imageError, setImageError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [updateProfile, setUpdateProfile] = useState({
    name: "",
    bio: "",
    phone: "",
    email: "",
    password: "",
  });
  const [profileError, setProfileError] = useState(null);
  const [profileSuccess, setProfileSuccess] = useState(null);
  const navigate = useNavigate();

  //Handle Form Change
  const handleChange = (e) => {
    setUpdateProfile({ ...updateProfile, [e.target.name]: e.target.value });
  };

  //Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    //Send the form data to the backend
    changeProfile(updateProfile)
      .then((result) => {
        setProfileSuccess(result);
      })
      .catch((error) => {
        setProfileError(error.response.data.message);
      });
    setUpdateProfile({ name: "", bio: "", phone: "", email: "", password: "" });
  };

  //Handle file input change
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  //Handle file upload
  const handleUpload = () => {
    const image = new FormData();
    image.append("data", file);
    image.append("name", fileName);
    uploadPhoto(image)
      .then((result) => {
        setSuccessMsg(result);
      })
      .catch((error) => {
        setImageError(error.response.data.message);
      });
  };

  function handleLogout() {
    sessionStorage.removeItem("TOKEN");
    navigate("/signin");
  }

  return (
    <div className="profile edit-profile">
      <div className="profile-heading">
        <PageTitle />
        <Link
          to="/signin"
          className="logout edit-logout"
          onClick={handleLogout}
        >
          Logout
        </Link>
      </div>
      <Link className="back-link" to="/profile">
        ⬅ back
      </Link>
      <div className="edit-profile-details">
        <h4 className="edit-details-header-title">Change Info</h4>
        <p className="edit-details-header-description">
          Changes will be reflected on every service.
        </p>

        <div className="upload-img">
          <input type="file" className="edit-img-icon" onChange={saveFile} />
          <a className="upload-btn" onClick={handleUpload}>
            upload
          </a>
          {imageError ? (
            <p className="img-error-msg">{imageError}</p>
          ) : (
            <p className="success-msg">{successMsg}</p>
          )}
        </div>

        <form className="form-group" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={updateProfile.name}
            onChange={handleChange}
            className="change-name form-inputs"
            placeholder="change your name"
          />
          <textarea
            type="text"
            rows="4"
            cols="39"
            className="textarea form-inputs"
            name="bio"
            value={updateProfile.bio}
            onChange={handleChange}
            placeholder="Change your bio"
          />

          <input
            type="text"
            className="change-name form-inputs"
            name="phone"
            value={updateProfile.phone}
            onChange={handleChange}
            placeholder="change your phone number"
          />

          <input
            type="email"
            className="change-name form-inputs"
            name="email"
            value={updateProfile.email}
            onChange={handleChange}
            placeholder="change your email address"
          />
          <input
            type="password"
            className="change-name form-inputs"
            name="password"
            value={updateProfile.password}
            onChange={handleChange}
            placeholder="Enter your new password"
          />

          <input type="submit" className="form-inputs submit-btn" />
        </form>
        {profileError && <p className="img-error-msg">{profileError}</p>}
        {profileSuccess && <p className="success-msg">{profileSuccess}</p>}
      </div>
    </div>
  );
}
