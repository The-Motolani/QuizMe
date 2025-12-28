// components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { UseAuth } from "../../utils/UseAuth";

export default function Sidebar() {
  const { user, logout } = UseAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img
          src={user?.profile_picture || "/default-avatar.png"}
          alt="Profile"
          className="sidebar-avatar"
        />
        <p>Hello, {user?.username}</p>
      </div>

      <nav>
        <NavLink to="overview">Dashboard</NavLink>
        <NavLink to="profile">Profile</NavLink>
        <NavLink to="security">Login & Security</NavLink>
        <NavLink to="help">Help & Security</NavLink>
        <button onClick={logout}>Logout</button>
      </nav>
    </aside>
  );
}
