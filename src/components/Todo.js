import React, { useState, useRef } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';

export default function Todo({ todo, toggleTodo, submitEdit, deleteTodo }) {

  const [isEdit, setIsEdit] = useState(false)
  const changedNameRef = useRef()

  function handleTodoClick() {
    toggleTodo(todo.id)
  }

  function handleSubmitEdit(e) {
    const changedName = changedNameRef.current.value
    console.log(changedName);
    submitEdit(todo.id, changedName)
    changedNameRef.current.value = changedName
    setIsEdit(false)
  }

  function handleDelete() {
    deleteTodo(todo.id)
  }

  return (
    <div >
      <div className="card" style={{ width: '10rem' }}>
        <div className="card-body">
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              {isEdit ?
                (<div>
                  <TextField size="small" variant="filled" multiline rows={4} defaultValue={todo.name} inputRef={changedNameRef} type="input"></TextField>
                  <IconButton onClick={handleSubmitEdit} size="small">ok</IconButton>
                 </div>
                ) : (<Typography gutterBottom variant="h7" component="div" color="text.secondary">{todo.name}</Typography>)
              }
            </CardContent>
            <CardActions>
              <IconButton onClick={handleDelete} aria-label="delete"><DeleteIcon/></IconButton>
              <IconButton onClick={() => setIsEdit(true)}><CreateRoundedIcon/></IconButton>
              <Checkbox className='checkbox' checked={todo.complete} onChange={handleTodoClick}/>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  )
}
