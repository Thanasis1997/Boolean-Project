import { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { ReactDOM } from "react";

const Signup = () => {
    const navigate = useNavigate();
    const initialstate = { firstName: "",
    lastName: "",
    password:"",
    email:"",
    phone:"",
    isAdmin: false
}
    const [user, setUser] = useState(initialstate)

    const addUser = async(e) => {
        e.preventDefault()
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
          };
          
         const  users = await fetch('https://localhost:44419/users', options)

         const data = await users.json()
         setUser(initialstate)
         navigate("/sign-in")
         
            

        
    };

    const handleChange = (e) =>{
        const {name,value,text} = e.target
        setUser({...user, [name]: value})
    
      }
 
    return (
        <form onSubmit={addUser}>
            <h3>Sign Up</h3>
            <div className="mb-3">
                <label>First name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last name"  name="lastName"
                    onChange={handleChange}
                    value={user.lastName}/>
            </div>
            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}

                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}

                />
            </div> <div className="mb-3">
                <label>Phone</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Phone number"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}

                />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Sign Up
          </button>
            </div>
            <p className="forgot-password text-right">
                Already registered <a href="/sign-in">sign in?</a>
            </p>
        </form>
    )

}


export default Signup;