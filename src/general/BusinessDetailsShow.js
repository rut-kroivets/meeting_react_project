import { React, useState, useContext } from 'react';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react-lite';
import businessDetails from '../mobx/BusinessDetails';
import { Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import { KindOfUser } from '../App';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import { purple } from '@mui/material/colors';


const BusinessDetailsShow = observer((props) => {

    const isAdmin = useContext(KindOfUser).isAdmin;
    const data = businessDetails.getBusiness;
    const [flag, setFlag] = useState(true);
    function hundleclick() {
        props.onSendData(!flag);
        setFlag(!flag);
    }
    
    return (
        <>
            <Box
                sx={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        width: "100%",
                        height: "50%",
                    },
                }}
            >
                <Paper sx={{ padding: '2%', position: 'relative',bgcolor: purple[50]}}>
                    <Typography variant="h6" gutterBottom>
                        <Tooltip title="name" placement="left">
                            <BusinessIcon />{data.name}
                        </Tooltip>
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <Tooltip title="address" placement="left">
                            <HomeIcon /> {data.address}
                        </Tooltip>
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <Tooltip title="phone" placement="left">
                            <PhoneIcon /> {data.phone}
                        </Tooltip>
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <Tooltip title="owner" placement="left">
                            <PersonIcon /> {data.owner}
                        </Tooltip>
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <Tooltip title="description" placement="left">
                            <DescriptionIcon /> {data.description}
                        </Tooltip>
                    </Typography>
                    {isAdmin && <Fab color="secondary" aria-label="edit" variant="contained"
                        onClick={hundleclick} sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                        <EditIcon />
                    </Fab>}
                </Paper>
            </Box>
        </>
    );
})
export default BusinessDetailsShow;