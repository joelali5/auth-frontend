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
      <div className="form-deco">
        <PageTitle />
      </div>
      <p className="welcome-text">Welcome Back!</p>
      <form className="auth-form mb" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="form-input"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="form-input password-mb"
        />
        <input type="submit" value="Login" className="submit" />
        {err && (
          <p className="header-subtext error-text ml">
            {err} OR{" "}
            <span>
              <Link to="/signup" className="join">
                Signup
              </Link>
            </span>
          </p>
        )}
      </form>
      <p className="redirect ml">
        Not a member?{" "}
        <Link to="/signup" className="join">
          Register
        </Link>
      </p>
    </div>
  );
}
