import { useEffect, useRef, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [btnState, setBtnState] = useState(true);

  const editId = useRef("");

  // localStorage.setItem("todos",JSON.stringify(todos));

  useEffect(() => {
    let todoString = JSON.parse(localStorage.getItem("todos"));
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }


  const addTodo = async (e) => {
    let todoLength = todo.length;
    if(todoLength === 0){
      alert("Please write some thing");
    }
    else{
      setTodos([...todos, { id: uuidv4(), todo: todo, isComplited: false }]);
      setTodo("");
      saveToLS()
    }
  }

  const taskIsComplited = (e) => {
    let isComplited;
    todos.forEach((item) => {
      if (item.id === e.target.id) {
        isComplited = item.isComplited;
      }
    })


    let todo = todos.filter((item) => {
      return item.id === e.target.id;
    })

    console.log(todo[0])

    let index = todos.findIndex((item) => {
      return item.id === todo[0].id;
    })

    if (isComplited === false) {
      todo[0] = { ...todo[0], isComplited: true };
    }
    else {
      todo[0] = { ...todo[0], isComplited: false };
    }

    todos[index] = todo[0];

    setTodos([...todos]);
    saveToLS()

  }

  const handleEdit = (e) => {
    let id = e.target.id;
    let text;
    todos.forEach((item) => {
      if (item.id === id) {
        text = item.todo;
      }
    })
    setTodo(text);
    editId.current = id;
    setBtnState(false);
  }

  const handleEditSubmit = (e) => {
    let todoItem;
    todos.forEach((item) => {
      if (item.id === editId.current) {
        todoItem = { ...item };
      }
    });

    todoItem = { ...todoItem, todo: todo };

    let index = todos.findIndex((item) => {
      return item.id === todoItem.id;
    })

    todos[index] = todoItem;

    setTodos([...todos]);
    setTodo("");
    setBtnState(true);
    saveToLS()
  }

  const handleDelete = (e) => {
    let id = e.target.id;

    let newTodos = todos.filter((item) => {
      if (item.id === id)
        return false;
      else return true;
    })

    setTodos([...newTodos]);
    saveToLS()
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className=' container my-5'>
        <div className='mx-auto bg-violet-100 rounded-xl p-5 h-auto'>
          <div className=' '>
            <h1 className='text-xl font-bold'>Add Todo Here</h1>
            <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} className='my-2 w-1/2 p-4 rounded-lg' />
            {
              btnState ? <button onClick={addTodo} className=' bg-green-700 mx-4 px-4 py-2 text-white rounded-lg'>Add</button> : <button onClick={handleEditSubmit} className=' bg-green-700 mx-4 px-4 py-2 text-white rounded-lg'>Add</button>
            }
            <h1 className='text-xl font-bold'>Your Todos</h1>
            {
              todos.map((item) => {
                return (
                  <div key={item.id} className='flex items-center my-2'>
                    <input id={item.id} onChange={taskIsComplited} type="checkbox" className='' />
                    <h2 className=' w-80 mx-2'><div id={item.id} name='textArea' className={item.isComplited ? ' line-through' : ''}>{item.todo}</div></h2>
                    <div className='flex items-center'>
                      <button onClick={handleEdit} id={item.id} className=' bg-green-700 mx-4 px-2 py-1 text-white rounded-lg'>Edit</button>
                      <button onClick={handleDelete} id={item.id} className=' bg-green-700 mx-4 px-2 py-1 text-white rounded-lg'>Delete</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
