import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Height } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import LoadingButton from './Loadingbutton';

export default function Model({ children, name, src, style , triggerFunction, loading}) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  console.log( loading, "this is the value of triggerFunction and loading in Model.jsx")
  return (
    <div>
      {src ?
        <Avatar src={src} onClick={handleOpen} />
        :
        <Button onClick={handleOpen} variant="outlined">{name}</Button>
      }
      <Modal
        open={open}
        onClose={handleClose}
        className='overflow-y-auto rounded-lg'
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {children}

          <Box className='flex flex-row gap-4 items-center mt-2'>
            {
              src ?
                <Button
                  variant="contained"
                  className='font-bold text-lg'
                > Upload </Button>

                : <LoadingButton
                  variant="contained"
                  isLoading={loading}
                  className='font-bold text-lg'
                  onClick={triggerFunction}
                > Post the Answer </LoadingButton>
            }

            <Button
              variant="contained"
              className='font-bold text-lg w-1/4'
              onClick={handleClose}
            > Cancel </Button>
          </Box>
        </Box>

      </Modal>


    </div>
  );
}
