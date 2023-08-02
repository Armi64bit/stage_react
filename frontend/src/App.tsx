import { BrowserRouter, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Nav from "./component/nav";
import { Routes } from "react-router-dom";
import "./App.css";
import Notes from "./pages/Notes";
import PrivateRoute from './component/PrivateRoute';
import PublicRoute from './component/PublicRoute';

function App() {
  return (
    <div className="App bg">
      <BrowserRouter>
        <Nav />
        <main className=" w-100 m-auto">
          <Routes>
          <Route path="/" Component={Home} />
            <Route path="/home" Component={Home} />
            <Route path="/register" Component={Register} />
            <Route path="/login" Component={Login} />
            <Route path="/notes" Component={Notes} />
          </Routes>
        </main>{" "}
      </BrowserRouter>
    </div>
    //
  );
}



export default App;


//wih protected routes needs to be fixed doesnt redirecy after login 
// function App() {
//   const token = localStorage.getItem('token');
//   const isAuthenticated = !!token;

//   return (
//     <div className="App bg">
//       <BrowserRouter>
//         <Nav />
//         <main className=" w-100 m-auto">
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
//             <Route path="/register" element={isAuthenticated ? <Home /> : <Register />} />

//             {/* Private Routes */}
//             <Route path="/home" element={isAuthenticated ? <Home /> : <Login />} />
//             <Route path="/notes" element={isAuthenticated ? <Notes /> : <Login />} />
//           </Routes>
//         </main>
//       </BrowserRouter>
//     </div>
//   );
// }
