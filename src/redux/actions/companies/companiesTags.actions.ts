import swal from "sweetalert";
import { AppDispatch } from "redux/store";
import CompaniesTagsApiClient from "services/companies/CompaniesTagsApiClient";
import {
  SET_COMPANIES_PROJECTS_TAGS_LOADING,
  SET_COMPANIES_PROJECTS_TAGS_DATA,
  SET_COMPANIES_PROJECTS_STORY_TAGS_DATA,
  SET_EXISTING_COMPANIES_PROJECTS_STORY_TAGS_DATA,
  SET_NEW_COMPANIES_PROJECTS_STORY_TAGS_DATA,
} from "redux/reducers/companies/companiesTags.slice";
import { tagPayloadDataType } from "helper/types/companies/comapniesTagsType";
import { initialTableConfigInterface } from "helper/types/common/tableType";
import { Images } from "helper/images";

// Get Company Projects List
const GET_COMPANY_PROJECTS_TAGS_LIST =
  (tableConfig: initialTableConfigInterface) =>
  async (dispatch: AppDispatch) => {
    dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(true));
    await CompaniesTagsApiClient.fetchCompanyProjectsTagsList(tableConfig)
      .then((response) => {
        const dummyData = {
          count: 2,
          next: null,
          prev: null,
          results: [
            {
              id: 0,
              name: "Community 1 (Dummy Data)",
              tags: [
                { id: 0, title: "Design" },
                { id: 1, title: "Marketing" },
                { id: 2, title: "Coding" },
              ],
            },
            {
              id: 1,
              name: "Community 2 (Dummy Data)",
              tags: [
                { id: 0, title: "Design" },
                { id: 2, title: "Coding" },
              ],
            },
          ],
        };

        if (response.data.data.results.length) {
          dispatch(SET_COMPANIES_PROJECTS_TAGS_DATA(response?.data?.data));
        } else {
          dispatch(SET_COMPANIES_PROJECTS_TAGS_DATA(dummyData));
        }

        dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(false));
      })
      .catch((error) => {
        dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(false));
        swal({
          title: "Error",
          text: error?.response?.data?.message ?? error?.response?.data?.detail,
          className: "errorAlert-login",
          icon: Images.Logo,
          buttons: {
            OK: false,
          },
          timer: 5000,
        });
      });
  };

// Add new Tag to the tagList
const POST_COMPANY_PROJECTS_TAG =
  (tagData: tagPayloadDataType) => async (dispatch: AppDispatch) => {
    dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(true));
    await CompaniesTagsApiClient.addCompanyProjectsTag(tagData)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          swal({
            title: "Successfully Complete",
            text: response?.data?.message,
            icon: Images.Logo,
            buttons: {
              OK: false,
            },
            timer: 5000,
          });
        }
        dispatch(
          GET_COMPANY_PROJECTS_TAGS_LIST({
            page: 1,
            rowsPerPage: 10,
          })
        );
        dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(false));
      })
      .catch((error) => {
        let errMsg = "";
        if (error?.response?.data?.non_field_errors?.length > 0) {
          errMsg = error?.response?.data?.non_field_errors?.[0];
        } else if (error?.response?.data?.community) {
          errMsg = error?.response?.data?.community?.[0];
        } else if (error?.response?.data?.title) {
          errMsg = error?.response?.data?.title?.[0];
        } else if (error?.response?.data?.description) {
          errMsg = error?.response?.data?.title?.[0];
        } else {
          errMsg =
            error?.response?.data?.message ?? error?.response?.data?.detail;
        }
        dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(false));
        swal({
          title: "Error",
          text: errMsg,
          className: "errorAlert-login",
          icon: Images.Logo,
          buttons: {
            OK: false,
          },
          timer: 5000,
        });
      });
  };

// Add new story Tag to the tagList
const POST_COMPANY_PROJECTS_STORY_TAG =
  (tagData) => async (dispatch: AppDispatch) => {
    dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(true));
    await CompaniesTagsApiClient.addCompanyProjectsStoryTag(tagData)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          // swal({
          //   title: "Successfully Complete",
          //   text: response?.data?.message,
          //   icon: Images.Logo,
          //   buttons: {
          //     OK: false,
          //   },
          //   timer: 5000,
          // });
          dispatch(
            SET_NEW_COMPANIES_PROJECTS_STORY_TAGS_DATA(response?.data?.message)
          );
        }
        dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(false));
      })
      .catch((error) => {
        let errMsg = "";
        if (error?.response?.data?.message?.length > 0) {
          errMsg = JSON.stringify(error.response.data.message);
        } else {
          errMsg =
            error?.response?.data?.message ?? error?.response?.data?.detail;
        }
        dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(false));
        swal({
          title: "Error",
          text: errMsg,
          className: "errorAlert-login",
          icon: Images.Logo,
          buttons: {
            OK: false,
          },
          timer: 5000,
        });
      });
  };

// Add Story Tag to existing story tag list
const POST_EXISTING_COMPANY_PROJECTS_STORY_TAG =
  (tagData: tagPayloadDataType, storyId) => async (dispatch: AppDispatch) => {
    dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(true));
    const params = {
      story: storyId,
      title: tagData,
    };
    await CompaniesTagsApiClient.addExistingCompanyProjectsStoryTag(params)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          dispatch(
            SET_EXISTING_COMPANIES_PROJECTS_STORY_TAGS_DATA(
              response?.data?.message
            )
          );
        }

        dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(false));
      })
      .catch((error) => {
        let errMsg = "";
        if (error?.response?.data?.message?.length > 0) {
          errMsg = JSON.stringify(error.response.data.message);
        } else {
          errMsg = error?.response?.data?.message;
        }
        dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(false));
        swal({
          title: "Error",
          text: errMsg,
          className: "errorAlert-login",
          icon: Images.Logo,
          buttons: {
            OK: false,
          },
          timer: 5000,
        });
      });
  };
// Delete Story Tag from Story Tag list
const DELETE_STORY_TAG =
  (tagData: tagPayloadDataType, storyId) => async (dispatch: AppDispatch) => {
    dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(true));
    const params = {
      story: storyId,
      tag: tagData,
    };
    await CompaniesTagsApiClient.deleteCompanyProjectsStoryTag(params)
      .then((response) => {
        if (response.status === 204 || response.status === 200) {
          dispatch(
            SET_COMPANIES_PROJECTS_STORY_TAGS_DATA(
              "Story Tag removed successfully"
            )
          );
        }
        dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(false));
      })
      .catch((error) => {
        // console.log("error", error);
        dispatch(SET_COMPANIES_PROJECTS_TAGS_LOADING(false));
        swal({
          title: "Error",
          text: "errMsg",
          className: "errorAlert-login",
          icon: Images.Logo,
          buttons: {
            OK: false,
          },
          timer: 5000,
        });
      });
  };
// Common auth Config
export {
  GET_COMPANY_PROJECTS_TAGS_LIST,
  POST_COMPANY_PROJECTS_TAG,
  POST_COMPANY_PROJECTS_STORY_TAG,
  DELETE_STORY_TAG,
  POST_EXISTING_COMPANY_PROJECTS_STORY_TAG,
};
