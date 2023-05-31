import { useState } from "react";
import PageTitle from "./pageTitle";
import { Link } from "react-router-dom";
import { postNewUser } from "../../utils/api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regSuccess, setRegSuccess] = useState(null);
  const [err, setErr] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    postNewUser(email, password)
      .then((result) => {
        setRegSuccess(result);
      })
      .catch(() => {
        setErr("A user already exists with this email address! Please ");
      });
  };

  return (
    <div className="register">
      <PageTitle />
      <p className="header-text">
        Join thousands of learners from around the world.
      </p>
      <p className="header-subtext">
        Master web development by making real-life projects. There are multiple
        paths for you to choose from.
      </p>

      {regSuccess && (
        <p className="success">
          {regSuccess}{" "}
          <span>
            <Link className="join" to="/signin">
              login
            </Link>
          </span>
        </p>
      )}
      {err && (
        <p className="header-subtext error-text">
          {err}
          <span>
            <Link className="join" to="/signin">
              login
            </Link>
          </span>
        </p>
      )}

      <form className="auth-form mb" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="form-input text"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="form-input password-mb"
        />
        <input type="submit" value="Start coding now" className="submit" />
      </form>
      <p className="redirect">
        Already a member?{" "}
        <Link to="/" className="join">
          Login
        </Link>
      </p>
    </div>
  );
}
