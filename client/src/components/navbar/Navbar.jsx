import { useEffect, useState } from "react"
import "./Navbar.css"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const [username, setUsername] = useState('')
  const navigate = useNavigate();

  useEffect(()=>{
    const storedUsername = localStorage.getItem("username")
    setUsername(storedUsername);
  },[])

  const handleLogout = () => {
    // Clearing user-related data from localStorage
    localStorage.removeItem("username");

    // Redirecting to the login or home page after logout
    navigate("/login");
  };

  return (
    <div className='navbar'>
      <div className="navbar-wrapper">
        <div className="navbar-heading-wrapper">
          <h1 className="navbar-heading">Hacky News</h1>
        </div>
        <div className="navbar-user-wrapper">
          <h3 className="navbar-username">Hello! {username}</h3>
          <button className="navbar-logout-btn" onClick={handleLogout}>LOG OUT</button>
        </div>
      </div>
    </div>
  )
}
