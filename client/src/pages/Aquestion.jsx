import React, { useState } from 'react';
import './AskQuestion.css';
import { Box, Button, TextField, Paper } from '@mui/material';
import CodeUI from '../components/CodeUI';
import FileUploaderCard from '../components/FileUploaderCard';
import { useAuth } from '../common/AuthProvider'
import { addNewQuestion } from '../common/AuthHandler/apiHandler';
import { useNavigate } from 'react-router-dom'

function clearForm(form) {
    form.delete('file');
    form.delete('title');
    form.delete('text');
    form.delete('tags');
    form.delete('codeSnippet');
    form.delete('courseId');
    form.delete('batchId');
}

function AskQuestion() {
    const { user, setLoding } = useAuth();
    const [code, setCode] = React.useState('');
    const [images, setSelectsImages] = useState([]);
    const navigate = useNavigate();
    const form = new FormData();
    const [addedNewQuestion, setAddedNewQuestion] = useState('');
    const [formValue, setFormValue] = React.useState({
        title: '',
        discription: '',
        tags: ''
    });

    function setFormValueFunction(e) {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        setLoding(true);
        form.append('title', formValue.title);
        form.append('text', formValue.discription);
        form.append('tags', formValue.tags);
        form.append('codeSnippet', code);
        form.append('file', images[0]);
        form.append('courseId', user?.user?.courseId);
        form.append('batchId', user?.user?.batchId);

        console.log("form data is ", form);
        setAddedNewQuestion(await addNewQuestion(form, setLoding, navigate));
        setLoding(false);
        clearForm(form);
    }


    return (
        <Box className="ask-question text-slate-700" varient='outlined'>
            <Box className="ask-ques-container">
                <h1 className='text-2xl'>Ask a public Question</h1>
                <form className='flex flex-col gap-7'>
                    <Box className="ask-form-container flex flex-col gap-5 rounded">
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>Be specific and imagine you're asking a question</p>
                            <TextField
                                type="text"
                                id="ask-ques-title"
                                placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
                                className='w-full'
                                name="title"
                                onChange={setFormValueFunction}
                                required
                            />
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>Discription</h4>
                            <p>Include all the information someone would need to answer your question</p>
                            <textarea
                                name="discription"
                                id="ask-ques-body"
                                cols="32"
                                rows="10"
                                className='w-full'
                                onChange={setFormValueFunction}
                                required
                            >
                            </textarea>
                        </label>

                        <label htmlFor="ask-ques-body">
                            <h4>Uplode Images</h4>
                            <p>Include all the Images With error Screenshort </p>
                            <FileUploaderCard
                                images={images}
                                selectedFile={setSelectsImages}
                            />
                        </label>
                        <label htmlFor="ask-tags"><
                            h4>Tags</h4>
                            <p>Add up to 5 tags to describe what your question is about</p>
                            <TextField
                                type="text"
                                id="ask-ques-tags"
                                placeholder='e.g. (postgresql sql c++)'
                                className='w-full'
                                name="tags"
                                onChange={setFormValueFunction}
                                required
                            />
                        </label>

                        <label htmlFor="ask-tags">
                            <h4>Code </h4>
                            <p>Add code Snippet in which you have issue in.</p>
                            <CodeUI value={code} onChange={setCode} />
                        </label>
                    </Box>
                    <Button
                        variant="contained"
                        className='font-bold text-lg w-1/4'
                        onClick={handleSubmit}
                    > Post the Answer </Button>
                </form>
            </Box>
        </Box>
    )
}

export default AskQuestion