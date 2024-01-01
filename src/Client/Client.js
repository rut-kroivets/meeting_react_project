import React, { useState } from "react";
import { observer } from "mobx-react";
import servicesDetails from "../mobx/ServicesDetails";
import { Container } from "@mui/system";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import meetingsDetails from "../mobx/MeetingsDetails";
import BusinessDetailsShow from "../general/BusinessDetailsShow";
import Grid from '@mui/material/Grid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Fab } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import ResponsiveAppBar from "../general/AppBar";
import { purple } from "@mui/material/colors";
import { Outlet } from "react-router-dom";


const Client = observer(() => {
  const services = servicesDetails.getServices;
  const meetings = meetingsDetails.getMeetings;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { register, handleSubmit, reset } = useForm();
  const [open, setOpen] = useState(false);
  const [isAvailableDate, setIsAvailableDate] = useState(true); // Added state

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  async function handleSubmitForm(form) {
    form.id = (parseInt(meetings[meetings.length - 1].id) + 1).toString();
    form.serviceType = services[selectedIndex].id;
    //form.dateTime = form.dateTime.toString;
    const isAvailableDate = await meetingsDetails.postMeeting(form);
    setIsAvailableDate(isAvailableDate); // Update state based on API response
    if (isAvailableDate) {
      reset();
      handleClose();
    }
  }
  const fabStyle = {
    position: 'absolute',
    bottom: '7%',
    right: '11%',
    color: purple[300]
  };
  return (
    <>
    {<ResponsiveAppBar/>}
    <Container sx={{ padding: '2%' }} >
      <Grid container spacing={2} >
        <Grid item xs={16} >
          {<BusinessDetailsShow />}
        </Grid>
        <Grid item xs={8}>   
          <Link to='/service' underline="none"> <Button variant="outlined" color="secondary">services</Button></Link>
        <Outlet />
          <Fab variant="extended" onClick={handleClickOpen} sx={fabStyle}>
            <PersonAddIcon sx={{ mr: 1 }} />
            Add a meeting
          </Fab>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter your details:</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <TextField
              {...register("serviceType")}
              id="standard-select-currency"
              select
              fullWidth
              margin="dense"
              label="service type"
              defaultValue=""
              variant="standard"
              required
            >
              {services.map((option) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              {...register("dateTime")}
              autoFocus
              required
              margin="dense"
              id="date"
              type="date"
              fullWidth
              variant="standard"
              sx={{ borderColor: isAvailableDate ? "initial" : "red" }}
            />
            {!isAvailableDate && (
              <div style={{ color: "red" }}>Date not available!</div>
            )}
            <TextField
              {...register("clientName")}
              autoFocus
              required
              margin="dense"
              id="name"
              label="name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              {...register("clientPhone")}
              autoFocus
              required
              margin="dense"
              id="phone"
              label="Phone"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              {...register("clientEmail")}
              autoFocus
              required
              margin="dense"
              id="email"
              label="Email Address"
              type="text"
              fullWidth
              variant="standard"
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Subscribe</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
    </>
  );
});

export default Client;
