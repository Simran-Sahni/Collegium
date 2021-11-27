import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Box } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from "@material-ui/icons/Info";
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { joinGroup,  deleteGroup, fetchGroup } from '../../../actions/groups';
import useStyles from './style';

const Group = ({ group, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [members, setMembersCount] = useState(group?.members.length);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;
  // const hasLikedPost = post.likes.find((like) => like === userId);

  const handleJoining =  (e) => {
    console.log(group);
    //dispatch(joinGroup(group._id));

    // if (hasLikedPost) {
    //   setLikes(post.likes.filter((id) => id !== userId));
    // } else {
    //   setLikes([...post.likes, userId]);
    // }
  };

  // const Likes = () => {
  //   if (likes.length > 0) {
  //     return likes.find((like) => like === userId)
  //       ? (
  //         <><ThumbUpAltIcon fontSize="small" />&nbsp;{members >= 3 ? `You and ${members - 1} others` : `${members} are ${members > 1 ? 's' : ''}` }</>
  //       ) : (
  //         <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
  //       );
  //   }

  //   return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  // };

  const openGroup = (e) => {
    dispatch(fetchGroup(group._id, history));
    history.push(`/groups/${group._id}`);
  };

  return (
		// <Box>
		//   {console.log(group)}
		//   <Typography>
		//     Group grid item
		//    </Typography>
		// </Box>
		<Card className={classes.card} raised elevation={6}>
			<ButtonBase
				component='span'
				name='test'
				className={classes.cardAction}
				onClick={openGroup}>
				{/* {(user?.result?.googleId === group?.creator || user?.result?._id === group?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(group._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
        )} */}

				<Typography
					className={classes.title}
					gutterBottom
					variant='h6'
					component='h6'>
					{group.name}
				</Typography>
				<CardContent>
					<Typography variant='body2' color='textSecondary' component='p'>
						{group.members.length} are part of this group...
					</Typography>
				</CardContent>
			</ButtonBase>
			<CardActions className={classes.cardActions}>
				<Button
					size='small'
					color='primary'
					disabled={!user?.result}
					onClick={openGroup}>
					<InfoIcon fontSize='small' /> &nbsp; 
				</Button>
				{!group?.members.includes(user?.result?.googleId) &&
					!group?.members.includes(user?.result?._id) && (
						<Button
							size='small'
							color='primary'
							disabled={!user?.result}
							onClick={handleJoining}>
							<AddCircleSharpIcon fontSize='small' /> &nbsp; 
						</Button>
					)}
				{(group?.admin.includes(user?.result?.googleId) ||
					group?.admin.includes(user?.result?._id)) && (
					<Button
						size='small'
						color='secondary'
						onClick={() => dispatch(deleteGroup(group._id))}>
						<DeleteIcon fontSize='small' /> &nbsp; 
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Group;
