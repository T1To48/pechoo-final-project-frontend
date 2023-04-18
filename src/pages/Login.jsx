import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login,reset } from '../features/users/userSlice.jsx';


// import 
const Login = () => {
const [loginDetails, setLoginDetails] = useState({
    email:"",
    password:"",
})

const{email,password}=loginDetails;
const{loggedUser, isLoading, isError, isSuccess, message}=useSelector(state=>state.user)
const dispatch=useDispatch();

useEffect(() => {
  if(isError){
    console.log(`ERROR While Login ${message}`)
  }
  if(isSuccess||loggedUser){
    setLoginDetails({
      email:"",
      password:"",
  })
  
    console.log(`successfully logged in`)
    
    // navigate()
  }
  dispatch(reset())
}, [loggedUser, isError, isSuccess, message])


const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(loginDetails)
    dispatch(login(loginDetails))
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
            required
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
            required
          />
        </label>
        <button type="submit" disabled={isLoading}>LOGIN</button>
    </form> 
  )
}

export default Login