import { useState , useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";


const EditTodo = () =>{
    const location = useLocation()
    const {updatedTodo,user} = location.state||{};
    const [editedTodo, seteditedTodo] = useState(updatedTodo)
    console.log(editedTodo);
    // console.log(user);
  
    
    // const {handleInputChange}= location.state;
    const navigate = useNavigate();
    const handleInputChange = (e)=>{
        const { name, value,checked} = e.target;
        seteditedTodo((prevState) => ({
          ...prevState,
          [name]: name!== "completed" ? value : checked
          
        }));

    }
    const handleUpdateTodo = async(event) =>{
        event.preventDefault();
        const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(editedTodo)
          };
          try{
            await fetch(`https://localhost:44419/todos/${editedTodo.id}`, options)
            navigate("/Tasks", {state:{user}})
          }catch(error)
          {
            console.log(error);
          }
          
        
    }
    // console.log(editedTodo);
    return (
        <>
        <form onSubmit={handleUpdateTodo}>

          <div>
            <label>Title:</label>
            <input
            className="form-control"
              type="text"
              name="tittle"
              required
              value={editedTodo.tittle}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
            className="form-control"
              type="text"
              required
              name="description"
              value={editedTodo.description}
              onChange={handleInputChange}
            />
          </div>
          <div >
            <label>Completed:</label>
            <input onChange={handleInputChange}type="checkbox" name="completed" checked={editedTodo.completed}></input>
        </div>
          <div className="d-grid pt-3">

            <button className="btn btn-primary"
            type="submit">Update Todo</button>
          </div> 
      
        </form>
        </>
      );

}

export default EditTodo;