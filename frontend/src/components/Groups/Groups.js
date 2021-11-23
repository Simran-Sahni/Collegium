import React , { useState } from "react";
import { Grid, CircularProgress, TextField, Container, Typography, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Group from "./Group/Group";
import useStyles from "./style";



const Groups = ({ setCurrentId }) => {
	const { groups, loadingGroup } = useSelector((state) => state.groups);
	const classes = useStyles();
	
	const dispatch = useDispatch();

	
	if (!groups.length && !loadingGroup) {
		console.log(groups, loadingGroup );
        return (
            <Typography variant="h5" component = "h5" gutterBottom>
                No Groups!
                <br />
				Create a new group
				
            </Typography>
        )
    }

	return loadingGroup ? (
		<CircularProgress />
	) : (
		<Container>
			
			<Grid
				className={classes.container}
				container
				alignItems='stretch'
				spacing={3}>
					{console.log(groups)}
				{groups?.map((group) => (
					<Grid key={group._id} item xs={12} sm={12} md={6} lg={4}>
						<Group group={group} setCurrentId={setCurrentId} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Groups;
