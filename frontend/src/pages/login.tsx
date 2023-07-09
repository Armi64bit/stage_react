import React from 'react';

import { useState } from 'react';



const Login = () => {


  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
  
const submit= async(e:React.SyntheticEvent)=>{
  e.preventDefault();


await fetch('http://localhost:8000/api/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    credentials:'include', //to send cookies to the backend
    body:JSON.stringify({
        
        email,
        password
    }),
})
}

return ( <div >
        <form  onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
    
        <div className="form-floating">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
          onChange={e=>setEmail(e.target.value)}/>
          <label >Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
          onChange={e=>setPassword(e.target.value)}/>
          <label >Password</label>
        </div>
    
       
        <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
      </form>
      </div>
    );
};

export default Login;