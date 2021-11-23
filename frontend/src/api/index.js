import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}

	return req;
});

export const fetchGroup = (id) => API.get(`/groups/${id}`);
export const fetchAllGroups = (page) => API.get(`/groups?page=${page}`);
export const fetchGroupsBySearch = (searchQuery) =>
	API.get(
		`/groups/search?searchQuery=${searchQuery.search || "none"}&tags=${
			searchQuery.tags
		}`
	);

export const updateGroup = (id, updatedPost) =>
	API.patch(`/groups/${id}`, updatedPost);
export const deleteGroup = (id) => API.delete(`/groups/${id}`);
//export const joinGroup = (id) =>API.patch(`groups/${id}/join`);
export const createGroup = (newGroup) => API.post("/groups", newGroup);

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsByCreator = (name) =>
	API.get(`/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) =>
	API.get(
		`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
			searchQuery.tags
		}`
	);
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) =>
	API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) =>
	API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/users/login", formData);
export const signUp = (formData) => API.post("/users/register", formData);

export const getUser = (id) => API.get(`/users/${id}`);
