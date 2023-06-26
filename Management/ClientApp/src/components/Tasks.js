import { useEffect, useState } from "react";
import { useNavigate, Navigate, useLocation, Link } from "react-router-dom";
import TodoList from "./TodoList";
import Login from "./Login";
const Tasks = () =>{
    // const navigate = useNavigate()


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
      //tries to display the tasks page if there is no user and tries too access from url it navigates to home page
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
      // handle the change on the checkbox to clarify if the todo is completed or not
      const handleChange = async (id, completed) => {
        const updatedData = {
          ...filteredData.find(todo => todo.id === id),
          completed: !completed
        }; 

        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        };
        try {
          const response = await fetch(`https://localhost:44419/todos/${id}`, options);
          if (response.ok) {
            // Update the checkbox value in the local state
            const updatedFilteredData = filteredData.map(todo =>
              todo.id === id ? { ...todo, completed: !completed } : todo
            );
            setFilteredData(updatedFilteredData);
          } else {
            console.error('Failed to update the checkbox value.');
          }
        } catch (error) {
          console.error(error);
        }
      }
      const updateTodo = (id) =>{
            const updatedTodo = filteredData.find(todo=> todo.id ===id)
            // console.log(updatedTodo);
            navigate(`/edit/${id}`, {state: {updatedTodo,user}});

      }
// console.log(filteredData);

        return (
        <>
      <div className="container">

        <h2>{user?.firstName } {user?.lastName}</h2>
        <div className="row">
          <div className="col">
       
        <ul>
      {filteredData.map((todo) => (
        
      
        <li key={todo.id}>
          <p>{todo.tittle} | {todo.description} <input onChange={()=>handleChange(todo.id,todo.completed)}type="checkbox" name="completed" checked={todo.completed} /></p>
          <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger  btn-inline ms-3">Delete</button>
          <button  className="btn btn-info btn-inline ms-3" onClick={()=>updateTodo(todo.id)}>Edit</button>

        </li>
        

      ))}
    </ul>
        <button className="btn btn-primary" onClick={redirect}>Add Todo</button>
              </div>
           </div>
        </div>
    </>

        
        
        
        )
      
    
}

export default Tasks;