import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider, Grid, Container, Button, List, ListItem, ListItemText, Grow, AppBar, TextField } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { fetchGroup, getGroupsBySearch } from '../../actions/groups';
import { getUser } from '../../actions/auth';
import { getPosts, getPostsBySearch } from "../../actions/posts";
import ChipInput from "material-ui-chip-input";
import useStyles from './styles';
import Post from "../Posts/Post/Post"
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import Pagination from "../Pagination";
import Form from "../Form/Form";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}


const GroupDetails = ({ posts: { posts, post }, groups: {group, groups, loadingGroup} }) => {
  
  const user = JSON.parse(localStorage.getItem("profile"));
  const [showMembers, setshowMembers] = useState(false)
  const [userMembers, setuserMembers] = useState([])
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const groupPosts = [];
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const page = query.get("page") || 1;


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
	(getPosts());
  }, []);

  // useEffect(() => {
  //   if (group) {
  //     dispatch(getGroupsBySearch({ search: 'none', tags: '' }));
  //   }
  // }, [group]);

  if (!group) return null;
  else {
    // getMembers();
   //console.log('User id ', userId);
   //console.log('Current group' ,group);
   //console.log('All posts fetched', posts.length);
   const tmp = [];
   posts.forEach((item) => {
	if(group.posts.includes(item._id))  
	{
		tmp.push(item);
	} 
   });
   groupPosts.push(...tmp);
   console.log('group Post of this group', groupPosts);

  }

  const openGroup = (_id) => history.push(`/groups/${_id}`);

  const searchPost = () => {
		if (search.trim() || tags) {
			dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
			history.push(
				`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
			);
		} else {
			history.push("/");
		}
	};


  const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			searchPost();
		}
	};

	const handleAddChip = (tag) => setTags([...tags, tag]);

	const handleDeleteChip = (chipToDelete) =>
		setTags(tags.filter((tag) => tag !== chipToDelete));

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
			{/* <Container maxWidth='lg' className={classes.postArea}>
				<Grid
					className={classes.container}
					container
					alignItems='stretch'
					spacing={3}>
					{groupPosts?.map((post) => (
						<Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
							<Post post={post} setCurrentId={0} />
						</Grid>
					))}
				</Grid>
			</Container> */}

			<Grow in>
				<Container maxWidth='lg'>
					<Grid
						container
						justify='space-between'
						alignItems='stretch'
						spacing={3}
						className={classes.gridContainer}>
						{/* <Grid item xs={12} sm={6} md={9}>
							<Posts setCurrentId={setCurrentId} />
						</Grid> */}

						{groupPosts?.map((post) => (
							<Grid key={post._id} item xs={12} sm={6} md={9}>
								<Post post={post} setCurrentId={0} />
							</Grid>
						))}

						<Grid item xs={12} sm={6} md={3}>
							<AppBar
								className={classes.appBarSearch}
								position='static'
								color='inherit'>
								<TextField
									onKeyDown={handleKeyPress}
									name='search'
									variant='outlined'
									label='Search Posts'
									fullWidth
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<ChipInput
									style={{ margin: "10px 0" }}
									value={tags}
									onAdd={(chip) => handleAddChip(chip)}
									onDelete={(chip) => handleDeleteChip(chip)}
									label='Search Tags'
									variant='outlined'
								/>
								<Button
									onClick={searchPost}
									className={classes.searchButton}
									variant='contained'
									color='primary'>
									Search
								</Button>
							</AppBar>
							<Form groupId={group._id} currentId={currentId} setCurrentId={setCurrentId} />
							{!searchQuery && !tags.length && (
								<Paper className={classes.pagination} elevation={6}>
									<Pagination page={page} groupId= {group._id} />
								</Paper>
							)}
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</>
	);
};


GroupDetails.propTypes = {
	getPosts: PropTypes.func.isRequired,
	getGroupsBySearch: PropTypes.func.isRequired,
	fetchGroup: PropTypes.func.isRequired,
	posts: PropTypes.object.isRequired,
	groups: PropTypes.object.isRequired,
	
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  groups: state.groups,
});

export default connect(mapStateToProps, { getPosts, getGroupsBySearch, fetchGroup }) (GroupDetails)


