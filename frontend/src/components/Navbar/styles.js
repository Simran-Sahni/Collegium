import { makeStyles } from '@material-ui/core/styles';
import { deepPurple, deepOrange } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
	appBar: {
		borderRadius: 15,
		margin: "30px 0",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "10px 50px",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
		},
	},
	heading: {
		color: theme.palette.primary.main,
		textDecoration: "none",
		fontSize: "2em",
		fontWeight: 300,
	},
	image: {
		marginLeft: "10px",
		marginTop: "5px",
		marginBottom: "5px",
		alignItems: "center",
	},
	toolbar: {
		display: "flex",
		justifyContent: "space-evenly",
		width: "400px",
		[theme.breakpoints.down("sm")]: {
			width: "auto",
		},
	},
	profile: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		[theme.breakpoints.down("sm")]: {
			width: "auto",
			marginTop: 20,
			justifyContent: "center",
		},
	},
	logout: {
		
	},
	userName: {
		display: "flex",
		alignItems: "center",
		textAlign: "center",
	},
	brandContainer: {
		display: "flex",
		alignItems: "center",
		textDecoration: "none",
	},
	purple: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500],
	},
	buttons: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
		margin: theme.spacing(1),
	},
}));
