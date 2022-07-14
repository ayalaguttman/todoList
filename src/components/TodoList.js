import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo, submitEdit, deleteTodo }) {
    return (
        <div className='todoList'>
            {todos.map(todo => {
                return <Todo key={todo.id} toggleTodo={toggleTodo} submitEdit={submitEdit} deleteTodo={deleteTodo} todo={todo} />
            })}
        </div>

    )
}
