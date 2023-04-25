import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login,reset } from '../features/users/userSlice.jsx';

import { Container,Box,Typography,Grid,TextField } from '@mui/material';


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
    dispatch(login(loginDetails))
  }


  return (
    <Container
    component="main"
    maxWidth="xs"
    sx={{ width: "95%"}}
    elevation="20"
  >
    <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
            p: "2rem",
            borderRadius: "40px",
             boxShadow: 24
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
                <TextField
                  name="email"
                  type="email"
                  label="Email Address"
                  fullWidth
                  value={email}
                  onChange={handleChange}
                  required={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  required={true}
                />
              </Grid>
            </Grid>
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
    </Box>
    </Box>
    </Container>
  )
}

export default Login