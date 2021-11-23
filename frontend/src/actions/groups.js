import {
	START_LOADING_GROUPS,
	END_LOADING_GROUPS,
	FETCH_ALL_GROUPS,
	FETCH_GROUP,
	FETCH_GROUP_BY_SEARCH,
	CREATE_GROUP,
	UPDATE_GROUP,
	DELETE_GROUP,
	JOIN_GROUP
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const fetchGroup = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING_GROUPS });

		const { data } = await api.fetchGroup(id);

		dispatch({ type: FETCH_GROUP, payload: { group: data } });

		dispatch({ type: END_LOADING_GROUPS });
	} catch (error) {
		console.log(error);
	}
};

export const getAllGroups = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING_GROUPS });
		const {
			data: { data, currentPage, numberOfPages },
		} = await api.fetchAllGroups(page);
		//console.log(data)
		dispatch({
			type: FETCH_ALL_GROUPS,
			payload: { data, currentPage, numberOfPages },
		});
		dispatch({ type: END_LOADING_GROUPS });
	} catch (error) {
		console.log(error);
	}
};


export const getGroupsBySearch = (searchQuery) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING_GROUPS });
		const {
			data: { data },
		} = await api.fetchGroupsBySearch(searchQuery);

		dispatch({ type: FETCH_GROUP_BY_SEARCH, payload: { data } });
		dispatch({ type: END_LOADING_GROUPS });
	} catch (error) {
		console.log(error);
	}
};

export const createGroup = (group, history) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING_GROUPS });
		const { data } = await api.createGroup(group);
		//console.log(data)
		dispatch({ type: CREATE_GROUP, payload: data.group });

		history.push(`/groups/${data.group._id}`);
		dispatch({ type: END_LOADING_GROUPS });
	} catch (error) {
		console.log(error);
	}
};

export const updateGroup = (id, group) => async (dispatch) => {
	try {
		const { data } = await api.updateGroup(id, group);

		dispatch({ type: UPDATE_GROUP, payload: data });

		dispatch({ type: END_LOADING_GROUPS });
	} catch (error) {
		console.log(error);
	}
};

export const deleteGroup = (id) => async (dispatch) => {
	try {
		await await api.deleteGroup(id);

		dispatch({ type: DELETE_GROUP, payload: id });

		dispatch({ type: END_LOADING_GROUPS });
	} catch (error) {
		console.log(error);
	}
};

// export const joinGroup = (id) = async (dispatch) => {
//     try {
// 			await api.joinGroup(id);

// 			dispatch({
// 				type: JOIN_GROUP,
// 				payload: id,
// 			});
// 		} catch (error) {
// 			console.log(error);
// 		}
// };