import './App.css';
import { Navbar } from './components/navbar/Navbar';
import { Form } from './components/form/Form';
import { MainTable } from './components/table/MainTable';
import { Graf } from './components/graf/Graf'

function App() {
  return (
    <div className="App">
        <Navbar/>
        <br/>
        <Graf />
        <Form/>
        <MainTable/>
        <header className="App-header">
        </header>
    </div>
  );
}

export default App;
