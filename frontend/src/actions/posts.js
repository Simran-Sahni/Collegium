import {
	START_LOADING,
	END_LOADING,
	FETCH_ALL,
	FETCH_POST,
	FETCH_BY_SEARCH,
	CREATE_POST,
	UPDATE_POST,
	DELETE_POST,
	LIKE,
	COMMENT,
	FETCH_BY_CREATOR,
	UPDATE_GROUP,
	END_LOADING_GROUPS,
	START_LOADING_GROUPS,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const getPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });

		const { data } = await api.fetchPost(id);

		dispatch({ type: FETCH_POST, payload: { post: data } });

		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getPosts = (page) => async (dispatch) => {
	console.log('get posts called');
	try {
		dispatch({ type: START_LOADING });
		const {
			data: { data, currentPage, numberOfPages },
		} = await api.fetchPosts(page);

		dispatch({
			type: FETCH_ALL,
			payload: { data, currentPage, numberOfPages },
		});
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getPostsByCreator = (name) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const {
			data: { data },
		} = await api.fetchPostsByCreator(name);

		dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const {
			data: { data },
		} = await api.fetchPostsBySearch(searchQuery);

		dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const createPost = (post, history) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.createPost(post);
		//console.log(data)
		dispatch({ type: CREATE_POST, payload: data });

		history.push(`/posts/${data.post._id}`);
	} catch (error) {
		console.log(error);
	}
};

export const createPostInGroup = (post, group_id, history) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING_GROUPS });
		const { data1 } = await api.createPost(post);
		//console.log(data)
		dispatch({ type: CREATE_POST, payload: data1 });

		const { data2 } = await api.addPostInGroup(group_id, data1.post._id);

		dispatch({
			type: UPDATE_GROUP,
			payload: data2,
		});

		dispatch({ type: END_LOADING_GROUPS });

		history.push(`/groups/${group_id}/post/${data1.post._id}`);
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);

		dispatch({ type: UPDATE_POST, payload: data.post });
	} catch (error) {
		console.log(error);
	}
};

export const likePost = (id) => async (dispatch) => {
	const user = JSON.parse(localStorage.getItem("profile"));

	try {
		const { data } = await api.likePost(id, user?.token);
		console.log('like post caleld');
		dispatch({ type: LIKE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const commentPost = (value, id) => async (dispatch) => {
	try {
		const { data } = await api.comment(value, id);

		dispatch({ type: COMMENT, payload: data });

		return data.comments;
	} catch (error) {
		console.log(error);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await await api.deletePost(id);

		dispatch({ type: DELETE_POST, payload: id });
	} catch (error) {
		console.log(error);
	}
};
