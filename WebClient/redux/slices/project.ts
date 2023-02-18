import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState, AppThunk } from "../store";
import { ProjectApi, ProjectResponse } from '../api/project-api';

export interface ProjectState {
  data: {
    projectList: ProjectResponse[] | null,
    project: ProjectResponse | null
  }
}

const initialState: ProjectState = {
  data: {
    projectList: null,
    project: null
  }
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectListData: (state, action: PayloadAction<ProjectResponse[] | null>) => {
      state.data.projectList = action.payload;
    },
    setProjectData: (state, action: PayloadAction<ProjectResponse | null>) => {
      state.data.project = action.payload;
    },
    addProject: (state, action: PayloadAction<ProjectResponse>) => {
      state.data.projectList = [...state.data.projectList, action.payload];
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.project
      };
    }
  },
});

export const fetchProjectsByUserId = (userId: string): AppThunk => async dispatch => {
  try {
    const projects = await ProjectApi.getByUserId(userId);
    dispatch(setProjectListData(projects));
  } catch (err) {
    console.error('Could not fetch projects by user id:' + err);
  }
};

export const fetchProjectById = (id: string): AppThunk => async dispatch => {
  try {
    const project = await ProjectApi.getById(id);
    dispatch(setProjectData(project));
  } catch (err) {
    console.error('Could not fetch project by id:' + err);
  }
};

export const { setProjectListData, setProjectData, addProject } = projectSlice.actions;

export const selectProjectData = (state: AppState) => state.project.data;

export const projectReducer = projectSlice.reducer;

