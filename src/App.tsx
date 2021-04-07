import { BrowserRouter as Router } from 'react-router-dom';

import { SignIn } from "./pages/SignIn/SignIn"
import { GlobalStyle } from "./styles/global"
import { Routes } from './routes';
import {ContextLoginProvider} from './context/ContextLogin'


export function App() {
  return (
    <ContextLoginProvider>
      <Router>
        <div className="App">
          <Routes></Routes>
          <GlobalStyle />
        </div>
      </Router>
    </ContextLoginProvider>

  );
}

