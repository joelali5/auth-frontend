import { signinUser } from "../../utils/api";
import PageTitle from "./pageTitle";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Spinner from "./loader";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signinUser(email, password)
      .then((token) => {
        sessionStorage.setItem("TOKEN", token);
        navigate("/profile");
      })
      .catch((error) => {
        setErr(error.response.data.message);
      });
  };
  return (
    <div className="login">
      <PageTitle />
      {err && (
        <p className="header-subtext error-text">
          {err} OR{" "}
          <span>
            <Link to="/signup" className="join">
              Signup
            </Link>
          </span>
        </p>
      )}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="📧 Email"
          className="form-input text"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="🔒 Password"
          className="form-input text"
        />
        <input type="submit" value="Login" className="submit" />
      </form>
      <p className="redirect">
        Not a member?{" "}
        <Link to="/signup" className="join">
          Register
        </Link>
      </p>
    </div>
  );
}
