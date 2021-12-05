import React from "react";
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  
  const [tasks, setTasks] = React.useState([]);

    const [showAddTask, setShowAddTask] = React.useState(false);

    React.useEffect(() => {
      const getTasks = async () => {
        const tasksFromServer = await fetchTasks();
        setTasks(tasksFromServer);
      };

      getTasks();
    }, []);

    const url = 'http://localhost:5000/tasks';
    
    // Fetch Tasks
    const fetchTasks = async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    };

    // Fetch Task
    const fetchTask = async (id) => {
      const res = await fetch(`${url}/${id}`);
      const data = await res.json();
      return data;
    };

    // Add Task
    const addTask = async (task) => {
      // const id = Math.floor(Math.random() * 10000) + 1;
      // const newTask = {id, ...task};
      // setTasks([ ...tasks, newTask]);
      const res =await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      // const data = await fetchTasks();
      const data = await res.json();
      setTasks([...tasks, data]);

    };

    // Delete Task
    const deleteTask = async (id) => {
      await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter((task) => task.id !== id))
    };


    // Toggle Reminder
    const toggleReminder = async (id) => {
      const taskToToggle = await fetchTask(id);
      const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder};
      const res = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      });

      const data = await res.json();
      setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder} : task));
    };

  const name = 'Matthew'; 

  return (
    <Router>
      <div className='container'>
        <Header title='Task Tracker' name={name} onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks Upcoming!'}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
