import React from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { Box, Typography, IconButton, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
// import axios from 'axios';
import 'tailwindcss/tailwind.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FileUploaderCard = () => {
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState({ type: '', message: '' });

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);
      alert(`${file.name} file uploaded successfully.`);
    //   axios.post('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then(response => {
    //     setMessageInfo({ type: 'success', message: `${file.name} file uploaded successfully.` });
    //     setOpen(true);
    //   })
    //   .catch(error => {
    //     setMessageInfo({ type: 'error', message: `${file.name} file upload failed.` });
    //     setOpen(true);
    //   });
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto bg-gray-100">
      <Box
        {...getRootProps()}
        className="w-[100%] h-auto p-4 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center bg-white cursor-pointer"
      >
        <input {...getInputProps()} />
        <CloudUploadIcon className="text-gray-500" style={{ fontSize: 48 }} />
        <Typography variant="h6" className="text-center">
          Click or drag file to this area to upload
        </Typography>
        <Typography variant="body2" color="textSecondary" className="text-center">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
        </Typography>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={messageInfo.type}>
          {messageInfo.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FileUploaderCard;
