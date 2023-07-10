
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Nav from "./component/nav";
import { Routes } from "react-router-dom";
import "./App.css";
import Notes from "./pages/Notes";

function App() {

  
return ( 
  <div className="App bg">
   
    <BrowserRouter>
      <Nav  />
      <main className=" w-100 m-auto">
       
        <Routes>
        <Route path="/home" Component={Home} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/notes" Component={Notes} />
        
        </Routes>
      
      </main> </BrowserRouter>
    
  </div>
//   
);
}

export default App;
