import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// import { InfinitySpin } from 'react-loader-spinner';

function LoadingButton({ isLoading, onClick, children, ...props }) {
    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            {...props}
            sx={{
                position: 'relative',
                padding: (theme) => `${theme.spacing(1.5)} ${theme.spacing(4)}`,
            }}
        >
            {isLoading && (
                <CircularProgress
                    size={24}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                    }}
                />
                // <InfinitySpin
                //     visible={true}
                //     width="100"
                //     color="#1565c0"
                //     ariaLabel="infinity-spin-loading"
                // />
            )}
            <Box
                sx={{
                    visibility: isLoading ? 'hidden' : 'visible',
                }}
            >
                {children}
            </Box>
        </Button>
    );
}

export default LoadingButton;
