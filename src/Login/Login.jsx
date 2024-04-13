import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Box, Grid, TextField, Button, Alert} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Person4Icon from '@mui/icons-material/Person4';
import './Login.css'

const Login = () => {
    const [isEmailFormatValid, setIsEmailFormatValid] = useState(true);
    const [alert, setAlert] = useState("");
    const navigate = useNavigate();


    const[input, setInput] = new useState(
        {
          email: "",
          password: "",
        }
    )
    const inputHandler= (event)=> {
    setInput({...input,[event.target.name]:event.target.value});
        if(event.target.name === "email"){
            if(validateEmail(event.target.value)){
            setIsEmailFormatValid (true);
            } else {
            setIsEmailFormatValid(false);
            }
        }  
    }
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const handleSubmit = (event) => {
        event.preventDefault();
    };
    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/login",input).then(
          (response)=>{
              if (response.data.status === "success"){
                sessionStorage.setItem("id", response.data.userId);
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("name", response.data.name);
                navigate("/dashboard");
              } else {
                setAlert("Invalid credentials!");
                setTimeout(() => {
                  setAlert("");
                }, 3000);
              } 
          }
        ).catch((err)=> {
          console.log(err);
          setAlert(err.message);
                setTimeout(() => {
                  setAlert("");
                }, 3000);
        })
    }

  return (
    <div>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'black' }}>
              <Person4Icon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                error={!isEmailFormatValid}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email-id"
                name="email"
                autoComplete="email"
                autoFocus
                value={input.email}
                onChange={inputHandler}
                helperText = {!isEmailFormatValid ? "Please enter a valid email-id." : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                type="password"
                autoComplete="password"
                value={input.password}
                onChange={inputHandler}
              />
            <div className='forgot mt-3' >
              <h6><a href="/forgotpassword">Forgot Password ?</a></h6>
            </div> 
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Login
              </Button>
              {alert && !alert.includes('success') &&
                <Alert sx={{ padding: '0px 16px' }} variant="outlined" severity="error">
                  {alert}
                </Alert>}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default Login
