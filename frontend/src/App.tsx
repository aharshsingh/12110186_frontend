import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Dashboard} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
