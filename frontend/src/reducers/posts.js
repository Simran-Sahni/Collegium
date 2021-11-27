import {
	FETCH_ALL,
	FETCH_BY_SEARCH,
	FETCH_BY_CREATOR,
	FETCH_POST,
	CREATE_POST,
	UPDATE_POST,
	DELETE_POST,
	LIKE,
	COMMENT,
	START_LOADING,
	END_LOADING
} from "../constants/actionTypes";

const initialState = { 
	loadingPost: true,
	posts: [] ,
	post: null
}


export default (state = initialState, action) => {
	switch (action.type) {
		case START_LOADING:
			return { ...state, loadingPost: true };
		case END_LOADING:
			return { ...state, loadingPost: false };
		case FETCH_ALL:
			return {
				...state,
				posts: action.payload.data,
				currentPage: action.payload.currentPage,
				numberOfPages: action.payload.numberOfPages,
			};
		case FETCH_BY_SEARCH:
		case FETCH_BY_CREATOR:
			return { ...state, posts: action.payload.data };
		case FETCH_POST:
			return { ...state, post: action.payload.post };
		case LIKE:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
			};
		case COMMENT:
			return {
				...state,
				posts: state.posts.map((post) => {
					if (post._id == +action.payload._id) {
						return action.payload;
					}
					return post;
				}),
			};
		case CREATE_POST:
			return { ...state, posts: [...state.posts, action.payload] };
		case UPDATE_POST:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload),
			};
		default:
			return state;
	}
};
