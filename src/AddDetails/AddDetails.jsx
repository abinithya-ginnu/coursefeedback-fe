import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { styled, Alert } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import './AddDetails.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    '& .MuiPaper-root': {
      maxWidth: '800px',
      width: '800px',
      borderRadius: '10px'
    },
    '& .MuiFormLabel-root, & .MuiInputBase-inputMultiline': {
      fontFamily: 'Poppins'
    },
    '& .MuiFormControl-root.income-date': {
      width: '100%'
    }
  }));
  

const AddDetails = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [alert, setAlert] = useState("");

    const [input, setInput] = useState({
        course_name: '',
        training_type: '',
        course_type: '',
        date: new Date(),
        description: '',
        user_id: sessionStorage.getItem("id")
      });
    const dateHandler = (event) => {
    if (event.$isDayjsObject) {
        console.log(new Date(event.$d));
        setInput({...input,['date']:new Date(event.$d)});
    }
    }

  return (
    <div className='add-details-modal'>
        <a className="nav-link" href="#">
            <button onClick={handleOpen} className='btn btn-color'>Add Course Details </button>
        </a>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <React.Fragment> 
          <Box sx={style}>
          <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              >
              <DialogTitle 
              sx={{ m: 0, p: 2, 
                backgroundColor: "#014f86",
                color: 'white',
                fontSize: 'medium',
                fontFamily: 'Poppins'
              }} 
              id="customized-dialog-title">
                Add Details
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent sx={{fontSize:'small'}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                    fullWidth
                    required
                    label="Course Name"
                    size="medium"
                    id="courseName"
                    name='course_name'
                    sx={{ fontFamily: 'Poppins' }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <TextField
                    fullWidth
                    required
                    label="Training Type"
                    size="medium"
                    id="trainingType"
                    name='training_type' 
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <TextField
                    fullWidth
                    required
                    label="Course Type"
                    size="medium"
                    id="courseType"
                    name='course_type'
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                  <LocalizationProvider required dateAdapter={AdapterDayjs}>
                      <DatePicker className='income-date'
                        label="Start Date"
                        fullWidth
                        required
                        name='date' 
                        size='medium'
                        value={dayjs(input.date)}
                        onChange={dateHandler}
                        format="YYYY-MM-DD"
                        disableFuture
                        openTo="year"
                        views={["year", "month", "day"]} 
                      />
                  </LocalizationProvider>
                  </Grid>  
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                    label="Description"
                    fullWidth
                    name='description'
                    multiline
                    rows={2}
                    id="description"
                    placeholder="Type Here..."
                    sx={{fontSize:'50px'}}
                    />
                  </Grid>

                </Grid>
                <DialogActions>
                  {alert.includes('success') &&
                    <Alert sx={{ padding: '0px 16px' }} variant="outlined" severity="success">
                    {alert}
                  </Alert>}
                  {alert && !alert.includes('success') &&
                  <Alert sx={{ padding: '0px 16px' }} variant="outlined" severity="error">
                    {alert}
                  </Alert>}
                  <Button autoFocus variant="contained" size='large' type='submit' style={{backgroundColor: "#014f86", fontSize:'medium', fontFamily: 'Poppins' }} >
                    Add
                  </Button>
                </DialogActions>
              </DialogContent>
          </BootstrapDialog>
          </Box>
          </React.Fragment>
        </Modal>
      </div>
  )
}

export default AddDetails
