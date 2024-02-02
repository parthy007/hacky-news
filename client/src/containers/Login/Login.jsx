import { useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom"
import rootUrl from "../../baseUrl"

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const loginUser = async () => {
        if (!email || !password) {
            setError("All fields are required.");
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
            credentials: 'include',
          };

        try {
            const res = await fetch(`${rootUrl}login`,requestOptions);
            if(!res.ok){
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();
            localStorage.setItem("username",data.username)
            navigate('/home'); 
        } catch (error) {
            console.error("Login failed", error);
            setError("Invalid credentials. Please try again.");
        }
    };

  return (
    <div className='login-container'>
      <div className="login-wrapper">
        <h1 className="login-heading">Login On Hacky News</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        {error && <div className="error-text"><i>** {error} **</i></div>}
        <button className="login-btn" onClick={loginUser}>Login</button>
        <div className="login-register-link" onClick={()=>navigate('/')}><i>Create an account</i></div>
      </div>
    </div>
  )
}