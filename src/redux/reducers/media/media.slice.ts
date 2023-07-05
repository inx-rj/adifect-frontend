import { combineReducers } from "redux";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
	loading: false,
	recentFiles: {
		loading: false,
		data: null,
	},
	folders: {
		loading: false,
		data: null,
	},
	collections: {
		loading: false,
		data: null,
	},
	success: "",
};

export const mediaSlice = createSlice({
	name: "media",
	initialState,
	reducers: {
		SET_RECENT_FILE_LOADING: (state, action) => {
			state.loading = action.payload;
		},

		SET_RECENT_FILE_DATA_LOADING: (state, action) => ({
			...state,
			recentFiles: {
				...state.recentFiles,
				loading: action.payload,
			},
		}),

		SET_RECENT_FILE_DATA: (state, action) => ({
			...state,
			recentFiles: {
				...state.recentFiles,
				data: action.payload,
			},
		}),

		SET_FOLDER_LOADING: (state, action) => {
			state.loading = action.payload;
		},

		SET_FOLDER_DATA_LOADING: (state, action) => ({
			...state,
			folders: {
				...state.folders,
				loading: action.payload,
			},
		}),

		SET_FOLDER_DATA: (state, action) => ({
			...state,
			folders: {
				...state.folders,
				data: action.payload,
			},
		}),

		SET_COLLECTION_LOADING: (state, action) => {
			state.loading = action.payload;
		},

		SET_COLLECTION_DATA_LOADING: (state, action) => ({
			...state,
			collections: {
				...state.collections,
				loading: action.payload,
			},
		}),

		SET_COLLECTION_DATA: (state, action) => ({
			...state,
			collections: {
				...state.collections,
				data: action.payload,
			},
		}),

		CLEAR_DAM: () => ({
			...initialState,
		}),
	},
});

export const {
	SET_RECENT_FILE_LOADING,
	SET_RECENT_FILE_DATA_LOADING,
	SET_RECENT_FILE_DATA,
	SET_FOLDER_DATA,
	SET_FOLDER_DATA_LOADING,
	SET_FOLDER_LOADING,
	SET_COLLECTION_DATA,
	SET_COLLECTION_DATA_LOADING,
	SET_COLLECTION_LOADING,
} = mediaSlice.actions;

export const RECENT_FILES_RESPONSE = (state: RootState) => state.media.media.recentFiles;

export const FOLDER_RESPONSE = (state: RootState) => state.media.media.folders;

export const COLLECTION_RESPONSE = (state: RootState) => state.media.media.collections;
