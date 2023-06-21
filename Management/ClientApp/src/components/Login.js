import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const initialstate = { firstName: "",
    lastName: "",
    password:"",
    email:"",
    phone:"",
    isAdmin: false
}
    const [currentUser, setCurrentUser] = useState(initialstate)
    const [authenticated, setauthenticated] = useState(false);
    const [message, setMessage] = useState("")
    const [submited, setSubmited] = useState(false)
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://localhost:44419/users');
            const data = await response.json();
            setUsers(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);


    const login = (e) =>{
        e.preventDefault();
        setSubmited(true)
        // users.forEach(user =>{
        //     if(user.email === currentUser.email && user.password === currentUser.password){
        //         console.log("login");
        //         setauthenticated(true)
        //         localStorage.setItem("authenticated", true);
        //         setCurrentUser(initialstate)
        //         navigate("/Tasks");
        //     }

        // })
        const user = users.find(
            (user) =>
              user.email === currentUser.email && user.password === currentUser.password
          );
        
          if (user) {
            setauthenticated(true);
            localStorage.setItem("authenticated", "true");
            navigate("/Tasks", {state: {user}});
            setCurrentUser(initialstate);
          } else {
            setauthenticated(false);
            localStorage.removeItem("authenticated");
            setMessage("Invalid email or password."); 
            setCurrentUser(initialstate);

            
          }
          console.log(authenticated);
            
        
        
      
    }

    
    const handleChange = (e) =>{
        const {name,value} = e.target
        setCurrentUser({...currentUser, [name]: value})
    
      }
 
    
    return (
        <>
        <form onSubmit={login}>
            <h3>Sign In</h3>
            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={handleChange}
                    name="email"
                    value={currentUser.email}
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={handleChange}
                    name="password"
                    value={currentUser.password}
                />
            </div>
         
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit
          </button>
            </div>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
        {submited && authenticated === false && ( // Render the error message if authentication failed
          <div className="alert alert-danger">{message}</div>
        )}
        </>
    )

}


export default Login;