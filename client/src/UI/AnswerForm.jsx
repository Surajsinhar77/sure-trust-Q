import React from 'react';
import './AskQuestion.css';
// import {useNavigate} from 'react-router-dom'
import { Box, Button, TextField, Paper } from '@mui/material';
// import { TextareaAutosize } from '@mui/base/TextareaAutosize'
import CodeUI from '../components/CodeUI';
import FileUploaderCard from '../components/FileUploaderCard';

function AskQuestion({onClose}) {
    const [code, setCode] = React.useState('');
    
    function pleaseWrite() {
        console.log('Please write the code')
    }

    return (
        <Box className="ask-question" varient='outlined'>
             {/* <Box className="ask-ques-container"> */}
                <h1 className='text-2xl'>Answering public Question</h1>
                <form className='flex flex-col gap-5'>
                    <Box className="ask-form-container flex flex-col gap-5">
                        <label htmlFor="ask-ques-body">
                            <h4>Solution</h4>
                            <p>Include all the information someone would need to answer your question</p>
                            <textarea
                                name=""
                                id="ask-ques-body"
                                cols="32"
                                rows="10"
                                className='w-full'
                            >
                            </textarea>
                        </label>

                        <label htmlFor="ask-ques-body">
                            <h4>Uplode Images of Soultion</h4>
                            <p>Include all the Images</p>
                            <FileUploaderCard />
                        </label>

                        <label htmlFor="code-snippet">
                            <CodeUI value={code} onChange={setCode} />
                        </label>
                    </Box>
                    <Box className='flex flex-row gap-4 items-center'>
                        <Button
                            variant="contained"
                            className='font-bold text-lg w-1/4'
                        > Post the Answer </Button>
                        <Button
                            variant="contained"
                            className='font-bold text-lg w-1/4'
                            onClick={onClose}
                        > Cancel </Button>
                    </Box>
                </form>
            {/* </Box> */}
        </Box>
    )
}

export default AskQuestion