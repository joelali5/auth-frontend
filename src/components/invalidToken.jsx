import { Link } from "react-router-dom";

export default function InvalidAccessToken({err}) {
  return (
    <div className="profile center-div">
      <p className="profile-err">
        {err}{" "}
        <Link to="/" className="profile-err-text">
          Please Signin
        </Link>
      </p>
    </div>
  );
}
