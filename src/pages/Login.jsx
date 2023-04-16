import React,{useEffect,useState} from 'react'

const Login = () => {
const [loginDetails, setLoginDetails] = useState({
    email:"",
    password:"",
})

const{email,password}=loginDetails;

const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(loginDetails)
  }

  return (
    <form onSubmit={handleSubmit}> 
         <label htmlFor="email">
          Email Address:
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
        </label>
        
        <br />
        <br />
        <label htmlFor="Password">
          Password:
          <input
            name="password"
            label="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">LOGIN</button>
    </form> 
  )
}

export default Login