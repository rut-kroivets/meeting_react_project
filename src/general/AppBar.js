import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import businessDetails from '../mobx/BusinessDetails';
import { KindOfUser } from '../App';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


function ResponsiveAppBar() {
   const isAdmin=React.useContext(KindOfUser).isAdmin;
   const setIsAdmin=React.useContext(KindOfUser).setIsAdmin;
    const data = businessDetails.getBusiness;
    const navigate = useNavigate();
    const click=(()=>{
        setIsAdmin(false);
navigate('/');
    })
    return (
        <AppBar position="static" sx={{backgroundColor:'white' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{display: 'flex' , flexWrap: 'wrap',flexDirection:'row',justifyContent:'center'}}>
                    <Avatar
                        variant="square"
                        src={data.logo}
                        sx={{ width: '20%', height: '10%' }}
                        placement="left"
                        
                    />
                    {isAdmin&&<Button variant="text" onClick={click}  >Logout</Button>}
                </Toolbar>              
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;