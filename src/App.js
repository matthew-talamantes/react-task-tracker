import Header from "./components/Header";

function App() {

  const name = 'Matthew'; 
  return (
    <div className='container'>
      <Header title='Task Tracker' name={name} />
    </div>
  );
}

export default App;
