import { Box, CardContent, Typography } from "@mui/material"
import CodeUI from "../components/CodeUI";
import ImageSlider from "../components/ImageSlider";
import AnswerPreview from "../components/AnswerPreview";
import Model from '../components/Model';
import AnswerForm from '../components/AnswerForm';
import { useEffect, useState } from "react";
import {gettingAllAnswersOfQuestion} from '../common/AuthHandler/apiHandler';
import { useParams } from "react-router-dom";
import {getQuestionById} from '../common/AuthHandler/apiHandler';
import {useAuth} from '../common/AuthProvider'
const value = `void main() {
}
  int a = 1;
  int b = 2;
  int c = a + b;
  cout<<c<<endl;
}` ;

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

const gettingAnswer = async(setAnswer, id)=>{
    setAnswer(await gettingAllAnswersOfQuestion(id));   
}


export default function Allanswer() {
    const form = new FormData();
    const {id} = useParams(); 
    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState({});
    const {setLoding} = useAuth();

    useEffect(()=>{
        setLoding(true);
        gettingAnswer(setAnswers, id)
        .then(()=>{
            setLoding(false);
        });
    },[])

    useEffect(()=>{
        setLoding(true);
        getQuestionById(id).then((data)=>{
            setQuestion(data);
        });
        setLoding(false);
    },[]);

    return (    
        <div>
            <Box className="container border m-auto bg-white text-slate-700 p-4 flex flex-col gap-16">
                <Box className="questionContainer">
                    <Box className="title">
                        <Typography variant='h6' gutterBottom>
                            Question Title
                        </Typography>
                    </Box>

                    <Box className="discription">
                        <CardContent>
                            <Typography paragraph>Method:</Typography>
                            <Typography paragraph>
                                {
                                    question?.text
                                }
                            </Typography>
                        </CardContent>

                        <CardContent>
                            <ImageSlider images={question?.images} />
                        </CardContent>

                        <CardContent>
                            <CodeUI value={question?.codeSnippet} />
                        </CardContent>
                    </Box>
                </Box>

                {/* Answer Preview */}
                <hr />
                <Box>
                    {
                        answers?.map((answer, index)=>
                            <AnswerPreview key={answer?._id} answer={answer} index={index} />
                        )
                    }
                </Box>

                <Box>
                    <Model name='Answer' style={style}> 
                        <AnswerForm form={form} />
                    </Model>
                </Box>
            </Box>
        </div>
    )
}