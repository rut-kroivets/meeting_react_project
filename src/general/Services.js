import { React, useState, useContext } from "react";
import { observer } from "mobx-react";
import servicesDetails from "../mobx/ServicesDetails";
import { Typography, Accordion, AccordionSummary, AccordionDetails, Grid, TextField, Button, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { KindOfUser } from '../App';
import { purple } from "@mui/material/colors";



const Services = observer(() => {

    const data = servicesDetails.getServices;
    const { register, handleSubmit, reset } = useForm();
    function handleSubmitForm(form) {
        if(data.length)
       form.id = (parseInt(data[data.length - 1].id) + 11).toString();
       else
       form.id="11";
        servicesDetails.postService(form);
        reset();
        handleChange('add')(null, false);;
    }
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const isAdmin = useContext(KindOfUser).isAdmin;
    return (       
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        width: "100%",
                        height: "70%",
                    },
                }}
            >
                {data.map((service) => (
                        <Accordion expanded={expanded === service.id} onChange={handleChange(service.id)}  >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }} variant="h6">
                                    {service.name}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    price: {service.price}
                                </Typography>
                                <Typography>
                                    duration: {service.duration}
                                </Typography>
                                <Typography>description: {service.description}</Typography>
                            </AccordionDetails>
                        </Accordion>
                ))}
                {isAdmin && <Accordion sx={{ backgroundColor: purple[100] }} component="form" onSubmit={handleSubmit(handleSubmitForm)} expanded={expanded === 'add'} onChange={handleChange('add')}>
                    <AccordionSummary
                        expandIcon={<AddIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }} variant="h6">
                            Add service
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                            {/* <TextField
                                    {...register('id')}
                                    id="standard-password-input"
                                    label="id"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="standard"
                                    required
                                    value={(parseInt(data[data.length - 1].id) + 11).toString()}
                                    disabled
                                /> */}
                                <TextField
                                    {...register('name')}
                                    id="standard-password-input"
                                    label="name"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="standard"
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    {...register('description')}
                                    id="standard-password-input"
                                    label="description"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="standard"
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    {...register('price')}
                                    id="standard-password-input"
                                    label="price"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="standard"
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    {...register('duration')}
                                    id="standard-password-input"
                                    label="duration"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="standard"
                                    required
                                />
                            </Grid>
                            <AccordionSummary>
                                <Grid item xs={6}>
                                    <Button color="secondary"
                                        startIcon={<CheckIcon />}
                                        variant="contained"
                                        type="submit"
                                    ></Button>
                                </Grid></AccordionSummary>
                        </Grid>
                    </AccordionDetails>
                </Accordion>}
            </Box>
    )
})
export default Services;

