import { React, useState } from 'react';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react-lite';
import businessDetails from '../mobx/BusinessDetails';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import { purple } from '@mui/material/colors';

const BusinessDetailsSet = observer((props) => {
    const [flag, setFlag] = useState(false);
    const data = businessDetails.getBusiness;
    const { register, handleSubmit } = useForm();
    function handleSubmitForm(form) {
        businessDetails.updateBusiness(form);
        props.onSendData(!flag);
        setFlag(!flag);
    }
    
    return (
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
            <Paper component="form" onSubmit={handleSubmit(handleSubmitForm)} sx={{ padding: '2%', position: 'relative' ,bgcolor: purple[50]}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            {...register('id')}
                            id="standard-password-input"
                            label="Id"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            defaultValue={data.id}
                            margin="dense"
                        /></Grid>
                        <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            {...register('name')}
                            id="standard-password-input"
                            label="Name"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            defaultValue={data.name}
                            margin="dense"
                        /></Grid>
                        <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            {...register('address')}
                            id="standard-password-input"
                            label="Address"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            defaultValue={data.address}
                            margin="dense"
                        /></Grid>
                        <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            {...register('phone')}
                            id="standard-password-input"
                            label="Phone"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            defaultValue={data.phone}
                            margin="dense"
                        /></Grid>
                        <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            {...register('owner')}
                            id="standard-password-input"
                            label="Owner"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            defaultValue={data.owner}
                            margin="dense"
                        /></Grid>
                        <Grid item xs={2} sm={4} md={4}>
                        <TextField
                            {...register('description')}
                            id="standard-password-input"
                            label="Description"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            defaultValue={data.description}
                            margin="dense"
                        />
                    </Grid>                
                    <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Fab color="secondary" aria-label="save" variant="contained"
                            type="submit"  sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                            <SaveIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
})
export default BusinessDetailsSet;