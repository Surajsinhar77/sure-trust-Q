import React from 'react';
import './AskQuestion.css';
// import {useNavigate} from 'react-router-dom'
import { Box, Button, TextField, Paper } from '@mui/material';
// import { TextareaAutosize } from '@mui/base/TextareaAutosize'
import CodeUI from '../components/CodeUI';
import FileUploaderCard from '../components/FileUploaderCard';

function AskQuestion() {
    const [code , setCode] = React.useState('');
    function pleaseWrite(){
        console.log('Please write the code')
    }

    return (
        <Box className="ask-question  border" varient='outlined'>
            <Box className="ask-ques-container">
                <h1 className='text-2xl'>Ask a public Question</h1>
                <form className='flex flex-col gap-7'>
                    <Box className="ask-form-container flex flex-col gap-5">
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>Be specific and imagine you're asking a question</p>
                            <TextField
                                type="text"
                                id="ask-ques-title"
                                placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
                                className='w-full'
                            />
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>Body</h4>
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
                            <h4>Uplode Images</h4>
                            <p>Include all the Images</p>
                            <FileUploaderCard/>
                        </label>
                        <label htmlFor="ask-tags"><
                            h4>Tags</h4>
                            <p>Add up to 5 tags to describe what your question is about</p>
                            <TextField
                                type="text"
                                id="ask-ques-tags"
                                placeholder='e.g. (postgresql sql c++)'
                                className='w-full'
                            />
                        </label>

                        <label htmlFor="ask-tags"><
                            h4>Tags</h4>
                            <p>Add up to 5 tags to describe what your question is about</p>
                            <CodeUI value={code} onChange={setCode} />
                        </label>
                    </Box>
                    <Button
                        variant="contained"
                        className='font-bold text-lg w-1/4'
                    > Post the Answer </Button>
                </form>
            </Box>
        </Box>
    )
}

export default AskQuestion