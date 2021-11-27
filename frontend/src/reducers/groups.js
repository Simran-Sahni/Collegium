import {
    FETCH_GROUP_BY_SEARCH,
    FETCH_ALL_GROUPS,
    CREATE_GROUP,
    UPDATE_GROUP,
    DELETE_GROUP,
    FETCH_GROUP,
    START_LOADING_GROUPS,
    END_LOADING_GROUPS,
    JOIN_GROUP
} from "../constants/actionTypes";

const initialState = { 
    loadingGroup: true,
    groups: [],
    group: null
}

export default (state = initialState, action) => {
    switch (action.type) {
			case START_LOADING_GROUPS:
				return { ...state, loadingGroup: true };
			case END_LOADING_GROUPS:
				return { ...state, loadingGroup: false };
            case FETCH_ALL_GROUPS:
                return {
                        ...state,
                        groups: action.payload.data,
                        currentPage: action.payload.currentPage,
                        numberOfPages: action.payload.numberOfPages,
                        };
			case FETCH_GROUP:
                return {
                    ...state,
                    group: action.payload.group
                }
			case FETCH_GROUP_BY_SEARCH:
                return { ...state, groups: action.payload.data };
			case CREATE_GROUP:
                return { ...state, groups: [...state.groups, action.payload] };
			case UPDATE_GROUP:
                return {
                        ...state,
                        groups: state.groups.map((group) =>
                            group._id === action.payload._id ? action.payload : group
                        ),
                    };
			case DELETE_GROUP:
                return {
                        ...state,
                        groups: state.groups.filter(
                            (group) => group._id !== action.payload
                        ),
                    };
            case JOIN_GROUP:
                return {
                    ...state
                }
			default:
				return state;
		}
};