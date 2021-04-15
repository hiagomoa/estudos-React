import { BrowserRouter as Router } from 'react-router-dom';
import {Provider} from 'react-redux'

import { SignIn } from "./pages/SignIn/SignIn"
import { GlobalStyle } from "./styles/global"
import { Routes } from './routes';
import {ContextLoginProvider} from './context/ContextLogin'
import store from './store';


export function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes></Routes>
          <GlobalStyle />
        </div>
      </Router>
    </Provider>

  );
}

