import React from "react";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

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

    // Fetch Tasks
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks');
      const data = await res.json();
      return data;
    };

    // Add Task
    const addTask = async (task) => {
      // const id = Math.floor(Math.random() * 10000) + 1;
      // const newTask = {id, ...task};
      // setTasks([ ...tasks, newTask]);
      const res =await fetch('http://localhost:5000/tasks', {
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
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter((task) => task.id !== id))
    };

    // Toggle Reminder
    const toggleReminder = (id) => {
      setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder} : task));
    };

  const name = 'Matthew'; 

  return (
    <div className='container'>
      <Header title='Task Tracker' name={name} onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks Upcoming!'}
    </div>
  );
}

export default App;
