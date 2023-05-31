import "./App.css";
import Signin from "./components/signin";
import Signup from "./components/signup";
import Profile from "./components/profile";
import Users from "./components/users";
import { Routes, Route } from "react-router-dom";
import EditProfile from "./components/editProfile";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </div>
  );
}
