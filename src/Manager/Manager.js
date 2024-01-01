import { React, useState } from 'react';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import { Container } from '@mui/material';
import BusinessDetailsShow from '../general/BusinessDetailsShow';
import BusinessDetailsSet from '../general/BusinessDetailsSet';
import { Link, Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';
import ResponsiveAppBar from '../general/AppBar';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';

const Manager = observer(() => {
  const [flag, setFlag] = useState(true);
  const fromSon = (data) => {
    setFlag(data);
  };

  return (
    <>
      {<ResponsiveAppBar />}
      <Container sx={{ padding: '2%' }}>
        <Grid  container spacing={2}>
          <Grid item xs={16}>
            <Box >
              {flag ?
                <BusinessDetailsShow onSendData={fromSon} />
                :
                <BusinessDetailsSet onSendData={fromSon} />
              }</Box>
          </Grid>
          <Grid item xs={8}>
            <Box >
              <ButtonGroup
                disableElevation
                variant="outlined"
                aria-label="Disabled elevation buttons"
              >
              <Link to='/service'> <Button variant="outlined" color="secondary">services</Button></Link>
              <Link to='/meeting'> <Button variant="outlined" color="secondary">meetings</Button></Link>
              </ButtonGroup><br></br>
              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
})

export default Manager;