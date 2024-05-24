import { Box, CardContent, Typography } from "@mui/material"
import CodeUI from "../components/CodeUI";
import ImageSlider from "../components/ImageSlider";
import AnswerPreview from "../components/AnswerPreview";
import Model from '../components/Model';
import AnswerForm from '../components/AnswerForm';

const value = `void main() {
}
  int a = 1;
  int b = 2;
  int c = a + b;
  cout<<c<<endl;
}` ;


export default function Allanswer() {
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
                                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                aside for 10 minutes.
                            </Typography>
                            <Typography paragraph>
                                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                large plate and set aside, leaving chicken and chorizo in the pan. Add
                                pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                stirring often until thickened and fragrant, about 10 minutes. Add
                                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                            <Typography paragraph>
                                Add rice and stir very gently to distribute. Top with artichokes and
                                peppers, and cook without stirring, until most of the liquid is absorbed,
                                15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                mussels, tucking them down into the rice, and cook again without
                                stirring, until mussels have opened and rice is just tender, 5 to 7
                                minutes more. (Discard any mussels that don&apos;t open.)
                            </Typography>
                            <Typography>
                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                        </CardContent>

                        <CardContent>
                            <ImageSlider />
                        </CardContent>

                        <CardContent>
                            <CodeUI value={value} />
                        </CardContent>
                    </Box>
                </Box>

                {/* Answer Preview */}
                <hr />
                <Box>
                    <AnswerPreview />
                    <AnswerPreview />
                </Box>

                <Box>
                    <Model name='Answer'> 
                        <AnswerForm />
                    </Model>
                </Box>
            </Box>
        </div>
    )
}