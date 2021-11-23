import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider, Grid, Container, Button, List, ListItem, ListItemText } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';
import { fetchGroup, getGroupsBySearch } from '../../actions/groups';
import { getUser } from '../../actions/auth';
import useStyles from './styles';
import Post from "../Posts/Post/Post"

const Group = () => {
  const { group, groups, loadingGroup
   } = useSelector((state) => state.groups);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [showMembers, setshowMembers] = useState(false)
  const [userMembers, setuserMembers] = useState([])
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  const userId = user?.result.googleId || user?.result?._id;

  const getMembers = () => {
      let tmp = [];
      group.members.forEach(element => {
        dispatch(getUser(element));
        const ret = user;
        tmp.push(ret);
      });

      setuserMembers(tmp);
  }


  useEffect(() => {
    dispatch(fetchGroup(id));
  }, [id]);

  // useEffect(() => {
  //   if (group) {
  //     dispatch(getGroupsBySearch({ search: 'none', tags: '' }));
  //   }
  // }, [group]);

  if (!group) return null;
  else {
   // getMembers();
   console.log('user from auth state', user)
   console.log(userId);
   console.log(group)
  }

  const openGroup = (_id) => history.push(`/groups/${_id}`);

  if (loadingGroup) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }


  return (
		<>
			<Container maxWidth='lg' className={classes.topInfo}>
				<Paper>
					<Typography variant='h3' component='h2' margin='5px'>
						{group.name}
					</Typography>
					<Typography variant='body1'>
						{moment(group.date).format("DD/MM/YYYY")}
					</Typography>
				</Paper>
				<Divider style={{ margin: "20px 0" }} />
				<Grid container spacing={3} justify='center'>
					<Grid item>
						<Button
							variant='contained'
							color='primary'
							onClick={() => setshowMembers(true)}>
							See Members
						</Button>
					</Grid>
					{group.admin.includes(userId) && (
						<>
							<Grid item>
								<Button variant='contained' color='primary'>
									Add Member
								</Button>
							</Grid>
							<Grid item>
								<Button variant='contained' color='primary'>
									Remove Member
								</Button>
							</Grid>
						</>
					)}
				</Grid>
			</Container>
			<Divider style={{ margin: "20px 0" }} />
			{showMembers && (
				<List>
					{group.members?.map((item) => (
						<ListItem key={item} button>
							<ListItemText primary={` ${item} `} />
						</ListItem>
					))}
				</List>
			)}
			<Container maxWidth='lg' className={classes.postArea}>
				<Grid
					className={classes.container}
					container
					alignItems='stretch'
					spacing={3}>
					{group.posts?.map((post) => (
						<Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
							<Post post={post} setCurrentId={0} />
						</Grid>
					))}
				</Grid>
			</Container>

			<Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
				<div className={classes.card}>
					<div className={classes.section}>
						{/* <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{group.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography> */}
						<Typography gutterBottom variant='body1' component='p'>
							{group.name}
						</Typography>
						{/* <Typography variant="h6">
            Created by:
            <Link to={`/creators/${group.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${group.name}`}
            </Link>
          </Typography> */}

						<Divider style={{ margin: "20px 0" }} />
					</div>
				</div>
			</Paper>
		</>
	);
};

export default Group;
