import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ImageCard = ({ image }) => {
  const navigate = useNavigate();



  const handleDoubleClick = () => {
    navigate(`/details/${image.id}`);
  };

  return (
    <Card onClick={handleDoubleClick} className='image-card'>
      <CardMedia
        component="img"
        height="140"
        image={image.image}
        sx={{ objectFit: 'contain' }}
        alt={image.title}
      />
      <CardContent>
        <Typography variant="h2" gutterBottom className='card-title'>{image.title}</Typography>
        <Typography variant="body1" gutterBottom className='card-title'><span>Category : </span>{image.category}</Typography>
        <Typography variant="body1" gutterBottom className='card-title'><span>Price : </span>{`$${image.price}`}</Typography>
        <Typography variant="body1" gutterBottom className='card-title'><span>{`Rating: ${image.rating.rate} (${image.rating.count} reviews)`}</span></Typography>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
