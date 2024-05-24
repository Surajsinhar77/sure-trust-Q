import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AnswerForm from './AnswerForm';
import { Height } from '@mui/icons-material';
import { Avatar } from '@mui/material';

const style = {
  position: 'absolute',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1024,
  Height: '90vh',
  bgcolor: '#f1f2f3',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Model({ children, name, src }) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          </Box>
        </Modal>
      </div>
  );
}
