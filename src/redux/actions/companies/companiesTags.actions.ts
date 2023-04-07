import { AppDispatch } from "redux/store";
import CompaniesTagsApiClient from "services/companies/CompaniesTagsApiClient";
import { initialTableConfigInterface } from "helper/types/common/table";
import { tagPayloadDataType } from "helper/types/companies/comapniesTagsType";
import {
  SET_COMPANIES_PROJECTS_TAGS_LOADING,
  SET_COMPANIES_PROJECTS_TAGS_DATA,
} from "redux/reducers/companies/companiesTags.slice";
import swal from "sweetalert";
import { Images } from "helper/images";

// Get Company Projects List
const GET_COMPANY_PROJECTS_TAGS_LIST =
  (tableConfig: initialTableConfigInterface) =>
    async (dispatch: AppDispatch) => {
      dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(true));
      await CompaniesTagsApiClient.fetchCompanyProjectsTagsList(tableConfig)
        .then((response) => {
          dispatch(SET_COMPANIES_PROJECTS_TAGS_DATA(response?.data?.data));
          dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(false));
        }).catch((error) => {
          dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(false));
          swal({
            title: "Error",
            text: error?.response?.data?.message,
            className: "errorAlert-login",
            icon: Images.Logo,
            timer: 5000,
          });
        });
    };

// Add new Tag to the tagList
const POST_COMPANY_PROJECTS_TAG =
  (tagData: tagPayloadDataType) =>
    async (dispatch: AppDispatch) => {
      dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(true));
      await CompaniesTagsApiClient.addCompanyProjectsTag(tagData)
        .then((response) => {
          console.log("POST_COMPANY_PROJECTS_TAG response", response)

          if (response.status === 201 || response.status === 200) {
            swal({
              title: "Successfully Complete",
              text: response?.data?.message,
              icon: Images.Logo,
              timer: 5000,
            });
          }
          dispatch(GET_COMPANY_PROJECTS_TAGS_LIST({
            page: 1,
            rowsPerPage: 10,
          }));
          dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(false));
        }).catch((error) => {
          console.log("POST_COMPANY_PROJECTS_TAG", error)
          let errMsg = ""
          if (error?.response?.data?.message?.non_field_errors) {
            errMsg = error?.response?.data?.message?.non_field_errors?.[0]
          } else if (error?.response?.data?.message?.community) {
            errMsg = error?.response?.data?.message?.community?.[0]
          } else if (error?.response?.data?.message?.title) {
            errMsg = error?.response?.data?.message?.title?.[0]
          } else if (error?.response?.data?.message?.description) {
            errMsg = error?.response?.data?.message?.title?.[0]
          } else { }
          dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(false));
          swal({
            title: "Error",
            text: errMsg,
            className: "errorAlert-login",
            icon: Images.Logo,
            timer: 5000,
          });
        });
    };

// Common auth Config
export { GET_COMPANY_PROJECTS_TAGS_LIST, POST_COMPANY_PROJECTS_TAG };