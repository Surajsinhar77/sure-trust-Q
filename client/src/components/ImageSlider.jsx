import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function ImageSlider({images}) {
    if(images?.length === 0) return null;
    return (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {images?.map((item) => (
                <ImageListItem key={item}>
                    <img
                        src={item}
                        srcSet={item}
                        alt="image"
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

