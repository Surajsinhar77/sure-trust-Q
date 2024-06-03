import React, {useState} from 'react';
import './AskQuestion.css';
import { Box, Button, TextField, Paper } from '@mui/material';
import CodeUI from '../components/CodeUI';
import FileUploaderCard from '../components/FileUploaderCard';

function AskQuestion() {
    const [code , setCode] = React.useState('');
    const [images, setSelectsImages] = useState([]);
    const form = new FormData();
    const [formValue, setFormValue] = React.useState({
        title: '',
        discription: '',
        tags: ''
    });

    function pleaseWrite(){
        console.log('Please write the code')
    }

    function setFormValueFunction(e){
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => { 
        form.append('title', formValue.title);
        form.append('discription', formValue.discription);
        form.append('tags', formValue.tags);
        form.append('code', code);
        form.append('images', images[0]);


        console.log("this is the value from form data ", form );
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
                                name= "title"
                                onChange={setFormValueFunction}
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
                            >
                            </textarea>
                        </label>

                        <label htmlFor="ask-ques-body">
                            <h4>Uplode Images</h4>
                            <p>Include all the Images</p>
                            <FileUploaderCard images={images} selectedFile={setSelectsImages} />
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
                            />
                        </label>

                        <label htmlFor="ask-tags">
                            <h4>Tags</h4>
                            <p>Add up to 5 tags to describe what your question is about</p>
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