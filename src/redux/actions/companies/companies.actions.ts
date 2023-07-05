import { AppDispatch } from "redux/store";
import CompaniesApiClient from "services/companies/CompaniesApiClient";
import { initialTableConfigInterface } from "helper/types/common/tableType";
import {
  SET_COMPANIES_PROJECTS_DATA,
  SET_COMPANIES_PROJECTS_FILTERS_DATA,
  SET_COMPANIES_PROJECTS_LOADING,
  SET_STORY_DETAILS_DATA,
  SET_STORY_DETAILS_LOADING,
} from "redux/reducers/companies/companies.slice";

// Get Company Projects List
const GET_COMPANY_PROJECTS_LIST =
  (tableConfig: initialTableConfigInterface) =>
  async (dispatch: AppDispatch) => {
    dispatch(SET_COMPANIES_PROJECTS_LOADING(true));
    await CompaniesApiClient.fetchCompanyProjectsList(tableConfig)
      .then((response) => {
        dispatch(SET_COMPANIES_PROJECTS_DATA(response?.data?.data));
      })
      .finally(() => {
        dispatch(SET_COMPANIES_PROJECTS_LOADING(false));
      });
  };

// Get Company Projects Filters Dropdown List
const GET_COMPANY_PROJECTS_FILTERS_LIST =
  () => async (dispatch: AppDispatch) => {
    await CompaniesApiClient.fetchCompanyProjectsFiltersList().then(
      (response) => {
        dispatch(SET_COMPANIES_PROJECTS_FILTERS_DATA(response?.data?.data));
      }
    );
  };

// Get Story Details of individuals
const GET_STORY_DETAILS_LIST =
  (storyId: string) => async (dispatch: AppDispatch) => {
    dispatch(SET_STORY_DETAILS_LOADING(true));
    await CompaniesApiClient.fetchCompanyProjectsStroyDetails(storyId)
      .then((response) => {
        dispatch(SET_STORY_DETAILS_DATA(response?.data?.data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(SET_STORY_DETAILS_LOADING(false));
      });
  };

// Common auth Config
export {
  GET_COMPANY_PROJECTS_LIST,
  GET_COMPANY_PROJECTS_FILTERS_LIST,
  GET_STORY_DETAILS_LIST,
};
