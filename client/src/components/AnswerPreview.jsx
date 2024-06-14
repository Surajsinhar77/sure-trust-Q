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
                1 Answers
            </Typography>

            <Box>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Box>
            <CardContent>

                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />
            </CardContent>
            <CardContent>
                <ImageSlider />
            </CardContent>


            <CardContent>
                <CodeUI value={value} />
            </CardContent>
        </Box>
    )
}