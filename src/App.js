import logo from './logo.svg';
import './App.css';
import AppRouter from './components/Routes/AppRouter';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Routes to other Pages */}
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
