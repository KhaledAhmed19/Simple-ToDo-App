import React, {useEffect, useState} from "react"
import Axios from 'axios';
import ErrorNotice from "../components/misc/ErrorNotice";

const Todo = (props) =>  {
  const [todos, settodos] = useState([])
    const [todoName, settodoName] = useState("")
    const [newName, setNewName] = useState("")
    const [error, setError] = useState()

    useEffect (()=> {
      const getTodos = async() => {
        const response = await Axios.get("http://localhost:5000/todos/all", {headers: {
        'auth-token': props.token
      }})
      settodos(response.data)
      }
      getTodos()
      
    }, [todos, props.token])
    

    const addTodo = async (e) => {
      e.preventDefault();
      
        try {
           await Axios.post(
            "http://localhost:5000/todos/insert",
            {todoName}, {headers: {
              'auth-token': props.token
            }}
          );
        
          
        } catch (err) {
          err.response.data.msg && setError(err.response.data.msg);
        }
      };

      const deleteTodo = (id) => {
        
          Axios.delete(
           `http://localhost:5000/todos/delete/${id}`,
           {headers: {
             'auth-token': props.token
           }}
         );
      
      }

      const updateTodo = (id) => {
        
        Axios.put(
         "http://localhost:5000/todos/update",
        {id, newName},  {headers: {
           'auth-token': props.token
         }}
       );
    
    }




    return(
        <div className = "page">
            <h2>Your To-Do List: </h2>
            {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className = "form" onSubmit={addTodo}>
        <label>Add To-Do</label>
            <input type="text"
            onChange = {(event) => {
                settodoName(event.target.value)
            }} 
            value = {todoName}
            ></input>
             <input type="submit" value="ADD" />
            </form>
            <hr></hr>
            {todos.length !== 0 ? todos.map((val, key)=> {
              return (
                <div className="card" key={key}>
                  <p>{val.todoName}</p>
                  <input style={{marginBottom: '5px'}} type="text" placeholder="Enter new To-Do name.." value={newName} 
                  onChange={e => setNewName(e.target.value)}></input>
                  <button style={{backgroundColor: 'green'}} onClick = {()=> updateTodo(val._id)}>Update</button>
                  <button onClick = {()=> deleteTodo(val._id)}>Delete</button>

                </div> 
              )
            }) : null}
            
        </div>



    );
}

export default Todo;