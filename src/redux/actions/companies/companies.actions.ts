import { AppDispatch } from "redux/store";
import CompaniesApiClient from "services/companies/CompaniesApiClient";
import { initialTableConfigInterface } from "helper/types/common/table";
import {
  SET_COMPANIES_PROJECTS_DATA,
  SET_COMPANIES_PROJECTS_FILTERS_DATA,
} from "redux/reducers/companies/companies.slice";

// Get Company Projects List
const GET_COMPANY_PROJECTS_LIST =
  (tableConfig: initialTableConfigInterface) =>
  async (dispatch: AppDispatch) => {
    await CompaniesApiClient.fetchCompanyProjectsList(tableConfig).then(
      (response) => {
        dispatch(SET_COMPANIES_PROJECTS_DATA(response?.data?.data));
      }
    );
  };

// Get Company Projects Filters Dropdown List
const GET_COMPANY_PROJECTS_FILTERS_LIST =
  () =>
  async (dispatch: AppDispatch) => {
    await CompaniesApiClient.fetchCompanyProjectsFiltersList().then(
      (response) => {
        dispatch(SET_COMPANIES_PROJECTS_FILTERS_DATA(response?.data?.data));
      }
    );
  };

// Common auth Config
export { GET_COMPANY_PROJECTS_LIST, GET_COMPANY_PROJECTS_FILTERS_LIST };
