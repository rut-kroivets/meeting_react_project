import React, { useState, useContext } from 'react';
import { TextField, Button, Snackbar, Paper, Container } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { KindOfUser } from '../App';


export default function LoginManager() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const setIsAdmin = useContext(KindOfUser).setIsAdmin;



  function login() {
    fetch("http://localhost:8787/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "name": name, "password": password })
    }).then(response => response.text())
      .then(data => {
        console.log(data);
        if (data === "Login failed!") {
          setName("");
          setPassword("");
          handleClick();
        } else {
          setIsAdmin(true);
          navigate('/'); // Redirect to the '/' route on successful login
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField id="filled-basic" label="name" variant="filled" value={name} onChange={(e) => setName(e.target.value)} />
          <br />
          <br />
          <TextField id="filled-basic" label="password" variant="filled" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <br />
          <Button variant="outlined" color="secondary" onClick={login}>Login</Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">Login failed!</Alert>
          </Snackbar>
        </Paper>
      </Container>
    </>
  );
}
