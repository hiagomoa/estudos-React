import { BrowserRouter as Router } from 'react-router-dom';

import { SignIn } from "./pages/SignIn/SignIn"
import { GlobalStyle } from "./styles/global"
import {Routes} from './routes';


export function App() {
  return (
    <Router>
    <div className="App">
<Routes></Routes>
     <GlobalStyle/>
    </div>
    </Router>
  );
}

