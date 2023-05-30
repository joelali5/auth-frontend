import devchallenges from "../assets/devchallenges.png";
import {Link} from 'react-router-dom';

export default function PageTitle() {
  return (
    <Link to='/profile' className="page-title">
      <div className="logo-container">
        <img src={devchallenges} alt="page-logo" className="logo" />
      </div>
      <h2 className="profile-title">Profile</h2>
    </Link>
  );
}
