import Card from './components/Card';
import './App.css'
import { ChangeEvent, useEffect, useState } from 'react';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('@todolist:todos');

    if(storedTodos) {
      return JSON.parse(storedTodos);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('@todolist:todos', JSON.stringify(todos));
  }, [todos])



  function handleAddTodo() {
    setTodos((previousTodos) => 
    [...previousTodos, { id: Math.random(), title: todoInput, completed: false }]
    );

    setTodoInput('');
  }

  function completeTodo(id: number) {
    setTodos((previousTodos) => 
    previousTodos.map((todo) => todo.id != id ? todo : {...todo, completed: !todo.completed })
    );
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTodoInput(e.target.value);
  }

  function deleteTodo(id: number) {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id != id));
  }
  return (
    <>
      <div className="App">
        <div className="add-todo">
          <input type="text" placeholder="Acariciar um gatinho" value={todoInput} onChange={handleInputChange}/>
          <button onClick={handleAddTodo}>Adicionar</button>
        </div>

        {
          todos.map(todo => (
            <Card key={todo.id} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo}/>
          ))
        }
      </div>
    </>
  )
}

export default App
