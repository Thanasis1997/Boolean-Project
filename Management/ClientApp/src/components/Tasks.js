import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
const Tasks = () =>{
    // const navigate = useNavigate()
    //Todo make the component visible to logged in user
    const [authenticated, setauthenticated] = useState(false);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        const isLoggedIn = loggedInUser === "true"; // Convert to boolean

        console.log(isLoggedIn);
        setauthenticated(isLoggedIn);
    }, []);

        return (<div>Loged in</div>)
        

    
}

export default Tasks;