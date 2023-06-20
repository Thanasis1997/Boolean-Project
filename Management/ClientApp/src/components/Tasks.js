import { useEffect, useState } from "react";
import { useNavigate, Navigate, useLocation, Link } from "react-router-dom";
import TodoList from "./TodoList";
import Login from "./Login";
const Tasks = () =>{
    // const navigate = useNavigate()
    //Todo make the component visible to logged in user
    const initialstate = {

            tittle: "",
            description: "",
            completed: false,
            userId: null,
            user: null
    }
    const [authenticated, setauthenticated] = useState(false);
    const [todos, setTodos] = useState([])
   const location = useLocation();
   const { user } = location.state|| {};
   const navigate = useNavigate()


    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        const isLoggedIn = loggedInUser === "true"; // Convert to boolean

        // console.log("test");
        setauthenticated(isLoggedIn);
    }, []);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://localhost:44419/todos');
            const data = await response.json();
            setTodos(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);
      // filters the todos with to match the users id
      const [filteredData, setFilteredData] = useState([])
      useEffect(() => {
        try{

          const filteredData = todos.filter((todo) => todo.userId === user.id);
          setFilteredData(filteredData);
        }catch(error){
          console.log(error);
          navigate("/")
        }
      }, [todos, user]);

      const redirect = () =>{
            navigate("/AddTodo", {state: {user}});

      }
      
      const deleteTodo = async (id) => {
        const options = { method: 'DELETE' };
      
        await fetch(`https://localhost:44419/todos/${id}`, options)
          .then(response => response.json())
          .then(response => console.log(response))
          .catch(err => console.error(err));
      
        const updatedFilteredData = filteredData.filter(todo => todo.id !== id);
        setFilteredData(updatedFilteredData);
      };


        return (
        <>

        <h2>{user?.firstName } {user?.lastName}</h2>
        <ul>
      {filteredData.map((todo) => (
        
      
        <li key={todo.id}>
          <p>{todo.tittle} | {todo.description}</p>
          <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger  btn-inline ms-3">Delete</button>
          <button  className="btn btn-info btn-inline ms-3">Edit</button>


        </li>
        

      ))}
    </ul>

        <button className="btn btn-primary" onClick={redirect}>Add Todo</button>

    </>

        
        
        
        )
        
      
    
}

export default Tasks;