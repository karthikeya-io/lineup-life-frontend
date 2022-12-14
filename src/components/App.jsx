import { Outlet } from 'react-router-dom';
import  '../css/App.css';
import Nav from './Nav';

function App() {
  return (
    <div >
      <header>
      <Nav></Nav>
      </header>
      <Outlet/>
    </div>
  );
}

export default App;
