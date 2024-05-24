import { Box, Typography } from "@mui/material"
import Breadcrumb from "./Breadcrumb";

function Badge({ children, className }) {
    return (
        <Typography 
            className={className}
            fontSize={12}    
        >{children}
        </Typography>
    )
}

export default function Aboutme() {
    return (
        <Box className="flex flex-col gap-4">
            <Box className="flex flex-col gap-5 bg-gray-200 p-4 rounded-2xl">
                <Typography
                    variant='h6'
                    fontSize={16}
                    className="text-blue-600"
                >
                    Complete your profile
                </Typography>

                <Breadcrumb />

                <Typography
                    variant='h6'
                    fontSize={12}
                    color={'#4B5563'}
                >
                    Please complete your profile to get the best experience (1/3)
                </Typography>
            </Box>

            <Box className="flex flex-col gap-3 bg-gray-200 p-4 rounded-2xl">
                <Typography
                    variant='h6'
                    fontSize={16}
                    className="text-blue-600"
                >
                    About
                </Typography>

                <Typography
                    variant='p'
                    fontSize={13}
                    className="text-gray-600"
                >
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt fuga provident temporibus excepturi! Cumque temporibus enim ducimus, praesentium, dolores sunt doloremque molestias aut quas vero ullam distinctio quisquam eligendi tempora.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad omnis at minima eius fugit repellat est voluptate fugiat ut doloribus, dolor commodi beatae dolore eligendi illum quibusdam modi exercitationem, tenetur enim magni quod. Velit error veritatis pariatur porro corrupti earum necessitatibus eos accusantium soluta quos eum sed, natus laboriosam libero.
                </Typography>
            </Box>

            <Box className="flex flex-col gap-3 bg-gray-200 p-4 rounded-2xl">
                <Typography
                    variant='h6'
                    fontSize={16}
                    className="text-blue-600"
                >
                    Skils
                </Typography>
                <Box className="flex gap-3">
                    <Badge
                        className="
                            border 
                            bg-blue-200 
                            rounded-3xl 
                            p-1 px-3 
                            text-blue-600
                            ">
                        Figma
                    </Badge>
                    <Badge
                        className="
                            border 
                            bg-blue-200 
                            rounded-3xl 
                            p-1 px-3 
                            text-blue-600
                            ">
                        React
                    </Badge>
                    
                </Box>
            </Box>
        </Box>
    )
}