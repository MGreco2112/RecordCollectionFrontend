import logo from './logo.svg';
import './App.css';
import AppRouter from './components/Routes/AppRouter';
import {BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './components/Providers/AuthProvider';

function App() {



  return (
    
    <BrowserRouter>
      {/* Routes to other Pages */}
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </BrowserRouter>
    
  );
}

export default App;
