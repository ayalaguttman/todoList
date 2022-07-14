import React, {useState, useEffect, useRef} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import {v4 as uuidv4} from 'uuid';
import TodoList from './components/TodoList';
import "./App.css"


function App() {

  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || [])
  const [isAddingTodo, setIsAddingTodo] = useState(false)
  const todoNameRef = useRef()

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]); 

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
    setIsAddingTodo(false)
  }

  function handleClearComplete() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function deleteTodo(id) {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  function submitEdit(id, changedName) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.name = changedName
    console.log(changedName)
    if (changedName === '') return
    setTodos(newTodos)
  }

  return (
    <div className='app'>
      <div className="menu text-center">
        <h1 className='title'>my todo list</h1>
        <button className='menuButtons' onClick={() => setIsAddingTodo(true)}>add todo</button>
        <button type="button" className='menuButtons' onClick={handleClearComplete}>Clear complete</button>
        {isAddingTodo && (<>
          <div className='todoTextField'>
            <TextField placeholder='what do you want for today?' multiline rows={4} size="large" inputRef={todoNameRef} ></TextField>
          </div>
          <IconButton onClick={() => setIsAddingTodo(false)} fill='rgb(230, 50, 80)' size='small'><CloseIcon /></IconButton>
          <IconButton onClick={handleAddTodo} size='small'><AddTaskRoundedIcon /></IconButton>
        </>)}
      </div>
      <div className='todosSection'>
        {todos.filter(todo => !todo.complete).length > 0 ? (
          <div className='leftTodosText'>
            you've got
            <label className='numTodos'> {todos.filter(todo => !todo.complete).length} </label> left to do
          </div>)
          : (<div className='leftTodosText'>nothing left to do<br />click on 'Add Todo' to add a task</div>
          )}
        <TodoList todos={todos} toggleTodo={toggleTodo} submitEdit={submitEdit} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
}

export default App;
