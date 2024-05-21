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
}` ;


export default function AnswerPreview() {
    return (
        <Box>
            <Typography variant='h6' gutterBottom>
                1 Answers
            </Typography>

            <CardContent>

                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    // action={
                    //     <IconButton aria-label="settings">
                    //         <MoreVertIcon />
                    //     </IconButton>
                    // }
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