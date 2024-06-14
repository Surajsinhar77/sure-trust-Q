import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function ImageSlider({images}) {
    console.log("images", images);
    return (
        <ImageList className='m-auto' sx={{ width: '65%', height: 400 }} variant="woven" cols={3} gap={8}>
            {images?.map((item, index) => (
                <ImageListItem key={index}>
                    <img
                        srcSet={item}
                        src={item}
                        alt={item?.title}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

