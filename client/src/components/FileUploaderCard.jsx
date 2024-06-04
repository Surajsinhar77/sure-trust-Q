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

const FileUploaderCard = ({ images, selectedFile }) => {
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState({ type: '', message: '' });

  const onDrop = (acceptedFiles) => {
    const array = acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }));
    selectedFile(array)
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
        {
          images?.length > 0 ?
            <>
              <div className='flex items-center justify-center p-2 gap-3'>
                {images.map((file, index) => (
                  <img key={index} src={file.preview} alt={file.name} className="w-32 h-32 object-cover rounded-md" />
                ))
                }
              </div>
              <Typography>
                {images[0]?.name}
              </Typography>
              {/* <Typography variant="h6" className="text-center">
                {images[0]?.name}
              </Typography>
              <IconButton
                onClick={() => {
                  setOpen(true);
                  setMessageInfo({ type: 'success', message: 'File removed successfully.' });
                  selectedFile(null);
                }}
              >
                <CloudUploadIcon className="text-gray-500" style={{ fontSize: 48 }} />
              </IconButton> */}
            </>
            : (
              <>
                <CloudUploadIcon className="text-gray-500" style={{ fontSize: 48 }} />
                <Typography variant="h6" className="text-center">
                  Click or drag file to this area to upload
                </Typography>
                <Typography variant="body2" color="textSecondary" className="text-center">
                  Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
                </Typography>
              </>
            )
        }

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
