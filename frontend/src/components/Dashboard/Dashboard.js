import React, { useState } from "react";
import {
	Container,
	Grow,
	Grid,
	AppBar,
	TextField,
	Button,
	Paper,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Groups from "../Groups/Groups";
import PaginateGroups from "../Groups/PaginateGroups";
import useStyles from "./styles";
import { createGroup } from "../../actions/groups";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}
const Dashboard = () => {
	const classes = useStyles();
	const query = useQuery();
	const page = query.get("page") || 1;
	const searchQuery = query.get("searchQuery");
	const [name, setname] = useState("");
	const [currentId, setCurrentId] = useState(0);
	const dispatch = useDispatch();

	const [search, setSearch] = useState("");
	const [tags, setTags] = useState([]);
	const history = useHistory();

	const createGroupclicked = async (e) => {
		e.preventDefault();
		const newGroup = {
			name,
		};
		dispatch(createGroup(newGroup,history));
	};

	
    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) =>
        setTags(tags.filter((tag) => tag !== chipToDelete));

	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			
		}
	};

    const searchGroups = (e) => {

    }


	return (
		<Grow in>
			<Container maxWidth='lg'>
				<Grid
					container
					justify='space-between'
					alignItems='stretch'
					spacing={3}
					className={classes.gridContainer}>
					<Grid item xs={12} sm={6} md={9} >
						<Groups setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppBar
							className={classes.appBarSearch}
							position='static'
							color='inherit'>
							<TextField
								onKeyDown={handleKeyPress}
								name='search'
								variant='outlined'
								label='Search Groups'
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
								onClick={searchGroups}
								className={classes.searchButton}
								variant='contained'
								color='primary'>
								Search
							</Button>
						</AppBar>

						<Paper>
							<TextField
								name='text'
								variant='outlined'
								label='Group name'
								fullWidth
								rows={4}
								value={name}
								onChange={(e) => setname(e.target.value)}
							/>
							<Button
								variant='contained'
								color='secondary'
								fullWidth
								size='large'
								onClick={createGroupclicked}>
								Create new group
							</Button>
						</Paper>

						<Paper className={classes.pagination} elevation={6}>
							<PaginateGroups page={page} />
						</Paper>
					</Grid>

					
				</Grid>
			</Container>
		</Grow>
	);
};

export default Dashboard;
