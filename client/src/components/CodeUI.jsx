import React from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript'; // Import the language mode you need

const CodeUI = ({ value, onChange }) => {
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Typography variant="p" component="div" gutterBottom>
        Code Snippet
      </Typography>
      <CodeMirror
        value={value}
        options={{
          mode: 'javascript', // Set the language mode you need
          theme: 'material',
          lineNumbers: true
        }}
        onBeforeChange={(editor, data, value) => {
          onChange(value);
        }}
      />
    </Box>
  );
};

export default CodeUI;
