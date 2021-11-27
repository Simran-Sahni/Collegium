import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	media: {
		borderRadius: "20px",
		objectFit: "cover",
		width: "100%",
		maxHeight: "600px",
	},
	card: {
		display: "flex",
		width: "100%",
		[theme.breakpoints.down("sm")]: {
			flexWrap: "wrap",
			flexDirection: "column",
		},
	},
	section: {
		borderRadius: "20px",
		margin: "10px",
		flex: 1,
	},
	imageSection: {
		marginLeft: "20px",
		[theme.breakpoints.down("sm")]: {
			marginLeft: 0,
		},
	},
	recommendedPosts: {
		display: "flex",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
		},
	},
	loadingPaper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "20px",
		borderRadius: "15px",
		height: "39vh",
	},
	commentsOuterContainer: {
		display: "flex",
		justifyContent: "space-between",
	},
	commentsInnerContainer: {
		height: "200px",
		overflowY: "auto",
		marginRight: "30px",
	},
	topInfo: {
		justifyContent: "center",
	},
	postArea: {
		justifyContent: "center",
	},
	appBarSearch: {
		borderRadius: 4,
		marginBottom: "1rem",
		display: "flex",
		padding: "16px",
	},
	pagination: {
		borderRadius: 4,
		marginTop: "1rem",
		padding: "16px",
	},
	gridContainer: {
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column-reverse",
		},
	},
}));
