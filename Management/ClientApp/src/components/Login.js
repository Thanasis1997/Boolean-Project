import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

        users.forEach(user =>{
            if(user.email === currentUser.email && user.password === currentUser.password){
                console.log("login");
                navigate("/Tasks");
                setCurrentUser(initialstate)
            }

        })
            
        
        
      
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
            <div className="mb-3">
                <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                    />
                    <label className="custom-control-label" htmlFor="customCheck1">
                        Remember me
            </label>
                </div>
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
        </>
    )

}


export default Login;