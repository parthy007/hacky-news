import Stories from './containers/Stories/Stories';
import Register from './containers/Register/Register.jsx';
import Login from './containers/Login/Login.jsx';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<Stories/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
