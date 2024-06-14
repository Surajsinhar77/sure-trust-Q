import ImageSlider from "./ImageSlider";
import CodeUI from "./CodeUI";
import { Box, CardContent, Typography, CardHeader, Avatar } from "@mui/material";
import { red } from '@mui/material/colors';


const value = `void main() {
}
  int a = 1;
  int b = 2;
  int c = a + b;
  cout<<c<<endl;
}`;

export default function AnswerPreview({answer, index}) {
    return (
        <Box>
            <Typography variant='h6' gutterBottom>
                {index+1} Answers
            </Typography>

            <Box>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        {
                            answer?.text
                        }
                    </Typography>
                </CardContent>
            </Box>
            <CardContent>

                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {
                                answer?.userId?.profilePicture ? <img src={answer?.userId?.profilePicture} alt="" /> : R
                            }
                        </Avatar>
                    }
                    
                    title={answer?.userId?.name}
                    subheader="September 14, 2016"
                />
            </CardContent>
            <CardContent>
                <ImageSlider images={answer?.images} />
            </CardContent>


            <CardContent>
                <CodeUI value={answer?.codeSnippet} />
            </CardContent>
        </Box>
    )
}