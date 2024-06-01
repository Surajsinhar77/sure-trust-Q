import { Box, Typography, Badge, Divider } from "@mui/material";
import ProfileTabs from "../components/ProfileTabs";
import {useAuth} from '../common/AuthProvider';

export default function UserProfile() {
    const {user} = useAuth().user;


    return (
        <Box className="w-[60%] m-auto text-gray-700 py-7">
            <Box className='flex justify-between'>
                <Box className="profile-Picture flex gap-4 items-center">
                    <Box className="profileImage rounded-full">
                        <img
                            src={user?.profilePicture}
                            alt='profile-picture'
                            className="rounded-full w-32 object-cover h-32"
                        />
                    </Box>
                    <Box className="name-email">
                        <Box className="nameOfPerson">
                            <Typography
                                variant="h5"
                                fontWeight={550}
                                fontSize={27}
                            >{user?.name}</Typography>
                        </Box>
                        <Box className="emailOfPerson flex gap-3 items-center">
                            <Badge
                                className="
                                    border 
                                    bg-slate-200 
                                    rounded-3xl 
                                    p-1 px-3 
                                    text-blue-600
                                    
                                    ">
                                {user?.role}
                            </Badge>
                            <Typography
                                variant="p"
                                className="text-gray-500"
                            >
                                {user?.email}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box className="studyAndWorkinfo flex flex-col gap-3">
                    <Box>
                        <Typography
                            variant="h6"
                            className="text-gray-800"
                            fontSize={16}
                        >
                            Involvements
                        </Typography>
                        <Typography
                            variant="p"
                            fontSize={12}
                        >
                            B.Tech in Computer Science
                        </Typography>
                    </Box>
                    <Divider />
                    <Box>
                        <Typography
                            variant="h6"
                            className="text-gray-800"
                            fontSize={16}
                        >Specialisation</Typography>
                        <Typography
                            variant="p"
                            fontSize={12}
                        >
                            Bachelor of IT
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ my: 5 }} /> 

            <Box className="w-[80%] m-auto">
                <ProfileTabs />
            </Box>
        </Box>
    );
}