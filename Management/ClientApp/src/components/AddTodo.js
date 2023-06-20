import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../index.css';

const AddTodo = () =>{
    const location = useLocation()
    const { user } = location.state|| {};
    const navigate = useNavigate()
    const [newTodo, setNewTodo] = useState({
        tittle: "",
        description: "",
        completed: false,
        userId: user ? user.id : null,
        user: null
      });
      console.log(user);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTodo((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };
    console.log(newTodo);
      const handleCreateTodo = async (e) => {
        e.preventDefault();
        // const newTodoData = { ...newTodo, userId: user.id };
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTodo)
          };
          
          await fetch('https://localhost:44419/todos', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
            navigate("/Tasks", {state: {user}});

        // onTodoCreate(newTodoData);
        // setNewTodo({
        //   title: "",
        //   description: "",
        //   completed: false,
        //   userId: null,
        //   user: null
        // });
      };
    
      return (
        <form onSubmit={handleCreateTodo}>
          <div>
            <label>Title:</label>
            <input
            className="form-control"
              type="text"
              name="tittle"
              required
              value={newTodo.tittle}
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
              value={newTodo.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="d-grid pt-3">

            <button className="btn btn-primary"
            type="submit">Create Todo</button>
          </div>
        </form>
      );
    };


export default AddTodo;