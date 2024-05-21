import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AnswerForm from './AnswerForm';
import { Height } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1024,
  Height:'90vh',
  bgcolor: '#f1f2f3',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant='outlined' color="success" onClick={handleOpen}>Answer</Button>
      <Modal
        open={open}
        onClose={handleClose}
        className='overflow-y-auto rounded-lg'
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AnswerForm onClose={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
}
