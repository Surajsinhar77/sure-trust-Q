import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImgPostSection from './ImgPostSection';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CodeUI from './CodeUI';
import Model from './Model';
import { Link } from 'react-router-dom';
import AnswerForm from './AnswerForm';

function formatDate(isoString) {
  const date = new Date(isoString);
  
  // Options for formatting the date
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };

  // Format the date
  return date.toLocaleString('en-US', options);
}

const style = {
  position: 'absolute',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1024,
  Height: '90vh',
  bgcolor: '#f1f2f3',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const value = `void main() {
}
  int a = 1;
  int b = 2;
  int c = a + b;
  cout<<c<<endl;
}` ;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Questioncard({question}) {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: '60%' }} className='m-auto w-[60%]' >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <img src={question?.userId?.profilePicture} alt="profile images" />
          </Avatar>
        }
        title={question?.userId?.name}
        subheader={formatDate(question?.createdAt)}
      />
      {/* <ImgPostSection/> */}

      <CardContent>
        <Link to='/all-answer' className='text-lg text-slate-700 hover:text-blue-300'>
          <Typography
            fontSize={17}
          >
            {question?.title}
          </Typography>
        </Link>
      </CardContent>
      <CardActions disableSpacing className='gap-2'>

        <Box>
          {/* ==========================================================================================> */}

          <Model name={'Answer'} style={style}>
            <AnswerForm onClose={onClose} />
          </Model>

          {/* =============================================================================================> */}
        </Box>

        <Box>
          <Button variant='outlined' color="success"> AI Solution </Button>
        </Box>

        {/* Icons Start--------------------------------------------------------------------------------- */}
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {/* Icons End --------------------------------------------------------------------------------- */}


        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon className='text-red-500'/>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          
          {question?.images?.map((image, index) => (
            <CardMedia
              key={index}
              component="img"
              height="140"
              image={image}
              alt="Paella dish"
            />
          ))}
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            {question?.text}
          </Typography>
        </CardContent>

        <CardContent>
          <CodeUI value={question?.codeSnippet} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
