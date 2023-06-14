import {
    ADMIN_DAM_ROOT_LIST_REQUEST,
    ADMIN_DAM_ROOT_LIST_SUCCESS,
    ADMIN_DAM_ROOT_LIST_FAIL,
    ADMIN_DAM_DETAILS_REQUEST,
    ADMIN_DAM_DETAILS_SUCCESS,
    ADMIN_DAM_DETAILS_FAIL,
    ADMIN_DAM_DETAILS_RESET,
    ADMIN_DAM_DELETE_REQUEST,
    ADMIN_DAM_DELETE_SUCCESS,
    ADMIN_DAM_DELETE_FAIL,
    ADMIN_DAM_LIST_POST_REQUEST,
    ADMIN_DAM_LIST_POST_SUCCESS,
    ADMIN_DAM_LIST_POST_FAIL,
    ADMIN_DAM_ID_LIST_REQUEST,
    ADMIN_DAM_ID_LIST_SUCCESS,
    ADMIN_DAM_ID_LIST_FAIL,
    ADMIN_DAM_ID_REQUEST,
    ADMIN_DAM_ID_SUCCESS,
    ADMIN_DAM_ID_FAIL,
    ADMIN_DAM_PARENT_LIST_POST_REQUEST,
    ADMIN_DAM_PARENT_LIST_POST_SUCCESS,
    ADMIN_DAM_PARENT_LIST_POST_FAIL,
    ADMIN_DAM_IMAGES_REQUEST,
    ADMIN_DAM_IMAGES_SUCCESS,
    ADMIN_DAM_IMAGES_FAIL,
    ADMIN_DAM_ID_IMAGES_REQUEST,
    ADMIN_DAM_ID_IMAGES_SUCCESS,
    ADMIN_DAM_ID_IMAGES_FAIL,
    ADMIN_DAM_LIST_COLLECTION_REQUEST,
    ADMIN_DAM_LIST_COLLECTION_SUCCESS,
    ADMIN_DAM_LIST_COLLECTION_FAIL,
    ADMIN_DAM_POST_COLLECTION_REQUEST,
    ADMIN_DAM_POST_COLLECTION_FAIL,
    ADMIN_DAM_POST_COLLECTION_SUCCESS,
    ADMIN_DAM_POST_ID_COLLECTION_REQUEST,
    ADMIN_DAM_POST_ID_COLLECTION_FAIL,
    ADMIN_DAM_POST_ID_COLLECTION_SUCCESS,
    ADMIN_DAM_COLLECTION_ID_LIST_REQUEST,
    ADMIN_DAM_COLLECTION_ID_LIST_SUCCESS,
    ADMIN_DAM_COLLECTION_ID_LIST_FAIL,
    ADMIN_DAM_ROOT_IMAGES_REQUEST,
    ADMIN_DAM_ROOT_IMAGES_SUCCESS,
    ADMIN_DAM_ROOT_IMAGES_FAIL,
    ADMIN_DAM_COLLECTION_LIST_REQUEST,
    ADMIN_DAM_COLLECTION_LIST_SUCCESS,
    ADMIN_DAM_COLLECTION_LIST_FAIL,
    ADMIN_DAM_Favourite_REQUEST,
    ADMIN_DAM_Favourite_SUCCESS,
    ADMIN_DAM_Favourite_FAIL,
    ADMIN_DAM_TITLE_REQUEST,
    ADMIN_DAM_TITLE_SUCCESS,
    ADMIN_DAM_TITLE_FAIL,
    ADMIN_COLLECTION_DELETE_REQUEST,
    ADMIN_COLLECTION_DELETE_SUCCESS,
    ADMIN_COLLECTION_DELETE_FAIL,
    ADMIN_COLLECTION_VIEW_REQUEST,
    ADMIN_COLLECTION_VIEW_SUCCESS,
    ADMIN_COLLECTION_VIEW_FAIL,
    ADMIN_COLLECTION_FILES_POST_REQUEST,
    ADMIN_COLLECTION_FILES_POST_SUCCESS,
    ADMIN_COLLECTION_FILES_POST_FAIL,
    ADMIN_MOVE_FILES_POST_REQUEST,
    ADMIN_MOVE_FILES_POST_SUCCESS,
    ADMIN_MOVE_FILES_POST_FAIL,
    ADMIN_DAM_MOVE_REQUEST,
    ADMIN_DAM_MOVE_SUCCESS,
    ADMIN_DAM_MOVE_FAIL,
    ADMIN_DAM_ROOT_MOVE_REQUEST,
    ADMIN_DAM_ROOT_MOVE_SUCCESS,
    ADMIN_DAM_ROOT_MOVE_FAIL,
    ADMIN_DAM_ROOT_COPY_REQUEST,
    ADMIN_DAM_ROOT_COPY_SUCCESS,
    ADMIN_DAM_ROOT_COPY_FAIL,
    ADMIN_DAM_RENAME_REQUEST,
    ADMIN_DAM_RENAME_SUCCESS,
    ADMIN_DAM_RENAME_FAIL,
    ADMIN_DAM_COLLECTION_COPY_REQUEST,
    ADMIN_DAM_COLLECTION_COPY_SUCCESS,
    ADMIN_DAM_COLLECTION_COPY_FAIL,
    ADMIN_DAM_COLLECTION_COPY_ID_REQUEST,
    ADMIN_DAM_COLLECTION_COPY_ID_SUCCESS,
    ADMIN_DAM_COLLECTION_COPY_ID_FAIL,
    ADMIN_DAM_COLLECTION_MULTIPLE_REQUEST,
    ADMIN_DAM_COLLECTION_MULTIPLE_SUCCESS,
    ADMIN_DAM_COLLECTION_MULTIPLE_FAIL,
    ADMIN_DAM_MOVE_MULTIPLE_REQUEST,
    ADMIN_DAM_MOVE_MULTIPLE_SUCCESS,
    ADMIN_DAM_MOVE_MULTIPLE_FAIL,
    ADMIN_DAM_MOVE_COLLECTION_REQUEST,
    ADMIN_DAM_MOVE_COLLECTION_SUCCESS,
    ADMIN_DAM_MOVE_COLLECTION_FAIL,
    ADMIN_DAM_SEARCH_REQUEST,
    ADMIN_DAM_SEARCH_SUCCESS,
    ADMIN_DAM_SEARCH_FAIL,
    ADMIN_DAM_VIDEOS_REQUEST,
    ADMIN_DAM_VIDEOS_SUCCESS,
    ADMIN_DAM_VIDEOS_FAIL,
    ADMIN_DAM_SEARCH1_REQUEST,
    ADMIN_DAM_SEARCH1_SUCCESS,
    ADMIN_DAM_SEARCH1_FAIL,
    ADMIN_DAM_FAVOURATE_FILTER_REQUEST,
    ADMIN_DAM_FAVOURATE_FILTER_SUCCESS,
    ADMIN_DAM_FAVOURATE_FILTER_FAIL,
    ADMIN_DAM_FAVOURATE_FILTER_ID_REQUEST,
    ADMIN_DAM_FAVOURATE_FILTER_ID_SUCCESS,
    ADMIN_DAM_FAVOURATE_FILTER_ID_FAIL,
    ADMIN_DAM_FAVOURATE_FILTER_COUNT_REQUEST,
    ADMIN_DAM_FAVOURATE_FILTER_COUNT_SUCCESS,
    ADMIN_DAM_FAVOURATE_FILTER_COUNT_FAIL,
    ADMIN_DAM_FAVOURATE_FILTER_COUNT_ID_REQUEST,
    ADMIN_DAM_FAVOURATE_FILTER_COUNT_ID_SUCCESS,
    ADMIN_DAM_FAVOURATE_FILTER_COUNT_ID_FAIL,
    ADMIN_DAM_MostUsed_REQUEST,
    ADMIN_DAM_MostUsed_SUCCESS,
    ADMIN_DAM_MostUsed_FAIL,
    ADMIN_DAM_Newest_REQUEST,
    ADMIN_DAM_Newest_SUCCESS,
    ADMIN_DAM_Newest_FAIL,
    ADMIN_DAM_PARENT_FILTER_REQUEST,
    ADMIN_DAM_PARENT_FILTER_SUCCESS,
    ADMIN_DAM_PARENT_FILTER_FAIL,
    ADMIN_DAM_SHARE_REQUEST,
    ADMIN_DAM_SHARE_SUCCESS,
    ADMIN_DAM_SHARE_FAIL,
    ADMIN_DAM_Company_REQUEST,
    ADMIN_DAM_Company_SUCCESS,
    ADMIN_DAM_Company_FAIL,
    ADMIN_DAM_Company_ID_REQUEST,
    ADMIN_DAM_Company_ID_SUCCESS,
    ADMIN_DAM_Company_ID_FAIL,
    ADMIN_DAM_Company_COUNT_REQUEST,
    ADMIN_DAM_Company_COUNT_SUCCESS,
    ADMIN_DAM_Company_COUNT_FAIL,
    ADMIN_DAM_Company_COUNT_ID_REQUEST,
    ADMIN_DAM_Company_COUNT_ID_SUCCESS,
    ADMIN_DAM_Company_COUNT_ID_FAIL,
    ADMIN_DAM_DATA_REQUEST,
    ADMIN_DAM_DATA_SUCCESS,
    ADMIN_DAM_DATA_FAIL,
    ADMIN_COLLECTION_DAM_FILTER_REQUEST,
    ADMIN_COLLECTION_DAM_FILTER_SUCCESS,
    ADMIN_COLLECTION_DAM_FILTER_FAIL,
    ADMIN_COLLECTION_DAM_SEARCH_REQUEST,
    ADMIN_COLLECTION_DAM_SEARCH_SUCCESS,
    ADMIN_COLLECTION_DAM_SEARCH_FAIL,
    ADMIN_COLLECTION_DAM_COUNT_REQUEST,
    ADMIN_COLLECTION_DAM_COUNT_SUCCESS,
    ADMIN_COLLECTION_DAM_COUNT_FAIL,
  } from "../../constants/Admin-dam-constant";
  
  export const SuperAdminDamShareReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_SHARE_REQUEST:
        return { loading: true };
      case ADMIN_DAM_SHARE_SUCCESS:
        return {
          loading: false,
          success: true,
          shareDAM: action.payload.message,
        };
      case ADMIN_DAM_SHARE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_ID_REQUEST:
        return { loading: true };
      case ADMIN_DAM_ID_SUCCESS:
        return { loading: false, success: true, DamData: action.payload };
      case ADMIN_DAM_ID_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamimageReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_IMAGES_REQUEST:
        return { loading: true };
      case ADMIN_DAM_IMAGES_SUCCESS:
        return { loading: false, success: true, DamImageData: action.payload };
      case ADMIN_DAM_IMAGES_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminRootDamReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_ROOT_LIST_REQUEST:
        return { loading: true };
      case ADMIN_DAM_ROOT_LIST_SUCCESS:
        return { loading: false, success: true, RootDamData: action.payload };
      case ADMIN_DAM_ROOT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamIDReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_ID_LIST_REQUEST:
        return { loading: true };
      case ADMIN_DAM_ID_LIST_SUCCESS:
        return { loading: false, success: true, DamData1: action.payload };
      case ADMIN_DAM_ID_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamIDIMAGESReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_ID_IMAGES_REQUEST:
        return { loading: true };
      case ADMIN_DAM_ID_IMAGES_SUCCESS:
        return { loading: false, success: true, DamDataImages: action.payload };
      case ADMIN_DAM_ID_IMAGES_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamIDCollectionReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_COLLECTION_ID_LIST_REQUEST:
        return { loading: true };
      case ADMIN_DAM_COLLECTION_ID_LIST_SUCCESS:
        return {
          loading: false,
          success: true,
          DamDataCollectionId: action.payload,
        };
      case ADMIN_DAM_COLLECTION_ID_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminPostDamReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_LIST_POST_REQUEST:
        return { loading: true };
      case ADMIN_DAM_LIST_POST_SUCCESS:
        return { loading: false, success: true, DamPostData: action.payload };
      case ADMIN_DAM_LIST_POST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminPostDamParentReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_PARENT_LIST_POST_REQUEST:
        return { loading: true };
      case ADMIN_DAM_PARENT_LIST_POST_SUCCESS:
        return {
          loading: false,
          moveon: true,
          DamPostParentData: action.payload,
        };
      case ADMIN_DAM_PARENT_LIST_POST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminPostDamCollectionReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_POST_COLLECTION_REQUEST:
        return { loading: true };
      case ADMIN_DAM_POST_COLLECTION_SUCCESS:
        return {
          loading: false,
          success: true,
          DamPostCollection: action.payload,
        };
      case ADMIN_DAM_POST_COLLECTION_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminPostDamIdCollectionReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_POST_ID_COLLECTION_REQUEST:
        return { loading: true };
      case ADMIN_DAM_POST_ID_COLLECTION_SUCCESS:
        return {
          loading: false,
          success: true,
          DamPostCollectionId: action.payload,
        };
      case ADMIN_DAM_POST_ID_COLLECTION_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamCollectionReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_LIST_COLLECTION_REQUEST:
        return { loading: true };
      case ADMIN_DAM_LIST_COLLECTION_SUCCESS:
        return {
          loading: false,
          movecollection: true,
          DamPostCollectionData: action.payload,
        };
      case ADMIN_DAM_LIST_COLLECTION_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamDetailsReducer = (state = { DamDetails: {} }, action) => {
    switch (action.type) {
      case ADMIN_DAM_DETAILS_REQUEST:
        return { loading: true };
      case ADMIN_DAM_DETAILS_SUCCESS:
        return {
          loading: false,
          success: true,
          DamDetails: action.payload,
        };
      case ADMIN_DAM_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case ADMIN_DAM_DETAILS_RESET:
        return { DamDetails: {} };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_DELETE_REQUEST:
        return { loading: true };
      case ADMIN_DAM_DELETE_SUCCESS:
        return { loading: false, success: true };
      case ADMIN_DAM_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamRootImages = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_ROOT_IMAGES_REQUEST:
        return { loading: true };
      case ADMIN_DAM_ROOT_IMAGES_SUCCESS:
        return {
          loading: false,
          movecollection: true,
          DamRootImages: action.payload,
        };
      case ADMIN_DAM_ROOT_IMAGES_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamParentCollection = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_COLLECTION_LIST_REQUEST:
        return { loading: true };
      case ADMIN_DAM_COLLECTION_LIST_SUCCESS:
        return {
          loading: false,
          success: true,
          DamCollectionParentImages: action.payload,
        };
      case ADMIN_DAM_COLLECTION_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminFavourite = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_Favourite_REQUEST:
        return { loading: true };
      case ADMIN_DAM_Favourite_SUCCESS:
        return {
          loading: false,
          movecollection: true,
          FavouriteData: action.payload,
        };
      case ADMIN_DAM_Favourite_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminTitlereducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_TITLE_REQUEST:
        return { loading: true };
      case ADMIN_DAM_TITLE_SUCCESS:
        return { loading: false, success: true };
      case ADMIN_DAM_TITLE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminCollectionDelete = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_COLLECTION_DELETE_REQUEST:
        return { loading: true };
      case ADMIN_COLLECTION_DELETE_SUCCESS:
        return {
          loading: false,
          success: true,
          DeletecollectionData: action.payload,
        };
      case ADMIN_COLLECTION_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminCollectionviewreducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_COLLECTION_VIEW_REQUEST:
        return { loading: true };
      case ADMIN_COLLECTION_VIEW_SUCCESS:
        return {
          loading: false,
          success: true,
          Collectionviewdata: action.payload,
        };
      case ADMIN_COLLECTION_VIEW_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminCollectionfilespostreducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_COLLECTION_FILES_POST_REQUEST:
        return { loading: true };
      case ADMIN_COLLECTION_FILES_POST_SUCCESS:
        return {
          loading: false,
          success: true,
          Collectionfilesviewdata: action.payload,
        };
      case ADMIN_COLLECTION_FILES_POST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamMovepostreducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_MOVE_FILES_POST_REQUEST:
        return { loading: true };
      case ADMIN_MOVE_FILES_POST_SUCCESS:
        return {
          loading: false,
          success: true,
          Movedata: action.payload,
        };
      case ADMIN_MOVE_FILES_POST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdmindamfoldermovereducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_MOVE_REQUEST:
        return { loading: true };
      case ADMIN_DAM_MOVE_SUCCESS:
        return {
          loading: false,
          success: true,
          Dammovefolder: action.payload,
        };
      case ADMIN_DAM_MOVE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdmindamrootfoldermovereducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_ROOT_MOVE_REQUEST:
        return { loading: true };
      case ADMIN_DAM_ROOT_MOVE_SUCCESS:
        return {
          loading: false,
          success: true,
          DamROOTmovefolder: action.payload,
        };
      case ADMIN_DAM_ROOT_MOVE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdmindamcopyreducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_ROOT_COPY_REQUEST:
        return { loading: true };
      case ADMIN_DAM_ROOT_COPY_SUCCESS:
        return {
          loading: false,
          success: true,
          DamROOTCopyfolder: action.payload,
        };
      case ADMIN_DAM_ROOT_COPY_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdmindamrenamereducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_RENAME_REQUEST:
        return { loading: true };
      case ADMIN_DAM_RENAME_SUCCESS:
        return {
          loading: false,
          success: true,
          DamRenamefolder: action.payload,
        };
      case ADMIN_DAM_RENAME_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdmindamcollectionmovereducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_COLLECTION_COPY_REQUEST:
        return { loading: true };
      case ADMIN_DAM_COLLECTION_COPY_SUCCESS:
        return {
          loading: false,
          success: true,
          Damcollectioncopyfolder: action.payload,
        };
      case ADMIN_DAM_COLLECTION_COPY_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdmindamcollectionIDmovereducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_COLLECTION_COPY_ID_REQUEST:
        return { loading: true };
      case ADMIN_DAM_COLLECTION_COPY_ID_SUCCESS:
        return {
          loading: false,
          success: true,
          Damcollectioncopyfolder1: action.payload,
        };
      case ADMIN_DAM_COLLECTION_COPY_ID_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamcollectionMultipleDelete = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_COLLECTION_MULTIPLE_REQUEST:
        return { loading: true };
      case ADMIN_DAM_COLLECTION_MULTIPLE_SUCCESS:
        return {
          loading: false,
          success: true,
          DamMultipleDelete: action.payload,
        };
      case ADMIN_DAM_COLLECTION_MULTIPLE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamMultipleMove = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_MOVE_MULTIPLE_REQUEST:
        return { loading: true };
      case ADMIN_DAM_MOVE_MULTIPLE_SUCCESS:
        return {
          loading: false,
          success: true,
          DamMultipleMove: action.payload,
        };
      case ADMIN_DAM_MOVE_MULTIPLE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamSearch = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_SEARCH_REQUEST:
        return { loading: true };
      case ADMIN_DAM_SEARCH_SUCCESS:
        return {
          loading: false,
          success: true,
          DamSearch1: action.payload,
        };
      case ADMIN_DAM_SEARCH_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamSearchfolder = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_SEARCH1_REQUEST:
        return { loading: true };
      case ADMIN_DAM_SEARCH1_SUCCESS:
        return {
          loading: false,
          success: true,
          DamSearchnew: action.payload,
        };
      case ADMIN_DAM_SEARCH1_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamInsideMove = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_MOVE_COLLECTION_REQUEST:
        return { loading: true };
      case ADMIN_DAM_MOVE_COLLECTION_SUCCESS:
        return {
          loading: false,
          success: true,
          DamCollectioninside: action.payload,
        };
      case ADMIN_DAM_MOVE_COLLECTION_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamVideo = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_VIDEOS_REQUEST:
        return { loading: true };
      case ADMIN_DAM_VIDEOS_SUCCESS:
        return {
          loading: false,
          success: true,
          DamVideo: action.payload,
        };
      case ADMIN_DAM_VIDEOS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamFilterFavourateID = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_FAVOURATE_FILTER_ID_REQUEST:
        return { loading: true };
      case ADMIN_DAM_FAVOURATE_FILTER_ID_SUCCESS:
        return {
          loading: false,
          success: true,
          DamFilterFavourateId: action.payload,
        };
      case ADMIN_DAM_FAVOURATE_FILTER_ID_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamFilterFavourate = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_FAVOURATE_FILTER_REQUEST:
        return { loading: true };
      case ADMIN_DAM_FAVOURATE_FILTER_SUCCESS:
        return {
          loading: false,
          success: true,
          DamFiltering: action.payload,
        };
      case ADMIN_DAM_FAVOURATE_FILTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamFilterFavourateCount = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_FAVOURATE_FILTER_COUNT_REQUEST:
        return { loading: true };
      case ADMIN_DAM_FAVOURATE_FILTER_COUNT_SUCCESS:
        return {
          loading: false,
          success: true,
          DamCountData: action.payload,
        };
      case ADMIN_DAM_FAVOURATE_FILTER_COUNT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminDamFilterFavourateCountID = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_FAVOURATE_FILTER_COUNT_ID_REQUEST:
        return { loading: true };
      case ADMIN_DAM_FAVOURATE_FILTER_COUNT_ID_SUCCESS:
        return {
          loading: false,
          success: true,
          DamCountDataid: action.payload,
        };
      case ADMIN_DAM_FAVOURATE_FILTER_COUNT_ID_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminlistAllMostUsed = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_MostUsed_REQUEST:
        return { loading: true };
      case ADMIN_DAM_MostUsed_SUCCESS:
        return {
          loading: false,
          success: true,
          Dammostused: action.payload,
        };
      case ADMIN_DAM_MostUsed_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminAllParentFilter = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_PARENT_FILTER_REQUEST:
        return { loading: true };
      case ADMIN_DAM_PARENT_FILTER_SUCCESS:
        return {
          loading: false,
          success: true,
          DamParentFilter: action.payload,
        };
      case ADMIN_DAM_PARENT_FILTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminCompanyreducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_Company_REQUEST:
        return { loading: true };
      case ADMIN_DAM_Company_SUCCESS:
        return {
          loading: false,
          success: true,
          DamCompany: action.payload,
        };
      case ADMIN_DAM_Company_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminCompanyIDreducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_Company_ID_REQUEST:
        return { loading: true };
      case ADMIN_DAM_Company_ID_SUCCESS:
        return {
          loading: false,
          success: true,
          DamIdCompany: action.payload,
        };
      case ADMIN_DAM_Company_ID_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  
  export const SuperAdminCompanyCountreducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_Company_COUNT_REQUEST:
        return { loading: true };
      case ADMIN_DAM_Company_COUNT_SUCCESS:
        return {
          loading: false,
          success: true,
          DamIdCompanylist: action.payload,
        };
      case ADMIN_DAM_Company_COUNT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const SuperAdminCompanyCountIDreducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_Company_COUNT_ID_REQUEST:
        return { loading: true };
      case ADMIN_DAM_Company_COUNT_ID_SUCCESS:
        return {
          loading: false,
          success: true,
          DamIdCompanydatalist: action.payload,
        };
      case ADMIN_DAM_Company_COUNT_ID_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const AdminDaminsideData = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_DAM_DATA_REQUEST:
        return { loading: true };
      case ADMIN_DAM_DATA_SUCCESS:
        return {
          loading: false,
          success: true,
          InsideData: action.payload,
        };
      case ADMIN_DAM_DATA_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


export const AdminCollectionDamFilter = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_COLLECTION_DAM_FILTER_REQUEST:
      return { loading: true };
    case ADMIN_COLLECTION_DAM_FILTER_SUCCESS:
      return {
        loading: false,
        success: true,
        CollectionDamFilter: action.payload,
      };
    case ADMIN_COLLECTION_DAM_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const AdminCollectionsearchFilter = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_COLLECTION_DAM_SEARCH_REQUEST:
      return { loading: true };
    case ADMIN_COLLECTION_DAM_SEARCH_SUCCESS:
      return {
        loading: false,
        success: true,
        CollectionDamSearch: action.payload,
      };
    case ADMIN_COLLECTION_DAM_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AdminCollectioncountFilter = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_COLLECTION_DAM_COUNT_REQUEST:
      return { loading: true };
    case ADMIN_COLLECTION_DAM_COUNT_SUCCESS:
      return {
        loading: false,
        success: true,
        CollectionDamCount: action.payload,
      };
    case ADMIN_COLLECTION_DAM_COUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

