import {
  MEMBER_DAM_ROOT_LIST_REQUEST,
  MEMBER_DAM_ROOT_LIST_SUCCESS,
  MEMBER_DAM_ROOT_LIST_FAIL,
  MEMBER_DAM_ID_LIST_REQUEST,
  MEMBER_DAM_ID_LIST_SUCCESS,
  MEMBER_DAM_ID_LIST_FAIL,
  MEMBER_DAM_DETAILS_REQUEST,
  MEMBER_DAM_DETAILS_SUCCESS,
  MEMBER_DAM_DETAILS_FAIL,
  MEMBER_DAM_DETAILS_RESET,
  MEMBER_DAM_DELETE_REQUEST,
  MEMBER_DAM_DELETE_SUCCESS,
  MEMBER_DAM_DELETE_FAIL,
  MEMBER_DAM_LIST_POST_REQUEST,
  MEMBER_DAM_LIST_POST_SUCCESS,
  MEMBER_DAM_LIST_POST_FAIL,
  MEMBER_DAM_PARENT_LIST_POST_REQUEST,
  MEMBER_DAM_PARENT_LIST_POST_SUCCESS,
  MEMBER_DAM_PARENT_LIST_POST_FAIL,
  MEMBER_DAM_IMAGES_REQUEST,
  MEMBER_DAM_IMAGES_SUCCESS,
  MEMBER_DAM_IMAGES_FAIL,
  MEMBER_DAM_ID_IMAGES_REQUEST,
  MEMBER_DAM_ID_IMAGES_SUCCESS,
  MEMBER_DAM_ID_IMAGES_FAIL,
  MEMBER_DAM_ID_REQUEST,
  MEMBER_DAM_ID_SUCCESS,
  MEMBER_DAM_ID_FAIL,
  MEMBER_DAM_LIST_COLLECTION_REQUEST,
  MEMBER_DAM_LIST_COLLECTION_SUCCESS,
  MEMBER_DAM_LIST_COLLECTION_FAIL,
  MEMBER_DAM_POST_COLLECTION_REQUEST,
  MEMBER_DAM_POST_COLLECTION_FAIL,
  MEMBER_DAM_POST_COLLECTION_SUCCESS,
  MEMBER_DAM_POST_ID_COLLECTION_REQUEST,
  MEMBER_DAM_POST_ID_COLLECTION_FAIL,
  MEMBER_DAM_POST_ID_COLLECTION_SUCCESS,
  MEMBER_DAM_COLLECTION_LIST_REQUEST,
  MEMBER_DAM_COLLECTION_LIST_SUCCESS,
  MEMBER_DAM_COLLECTION_LIST_FAIL,
  MEMBER_DAM_COLLECTION_ID_LIST_REQUEST,
  MEMBER_DAM_COLLECTION_ID_LIST_SUCCESS,
  MEMBER_DAM_COLLECTION_ID_LIST_FAIL,
  MEMBER_DAM_ROOT_IMAGES_REQUEST,
  MEMBER_DAM_ROOT_IMAGES_SUCCESS,
  MEMBER_DAM_ROOT_IMAGES_FAIL,
  MEMBER_DAM_Favourite_REQUEST,
  MEMBER_DAM_Favourite_SUCCESS,
  MEMBER_DAM_Favourite_FAIL,
  MEMBER_DAM_TITLE_REQUEST,
  MEMBER_DAM_TITLE_SUCCESS,
  MEMBER_DAM_TITLE_FAIL,
  MEMBER_COLLECTION_DELETE_REQUEST,
  MEMBER_COLLECTION_DELETE_SUCCESS,
  MEMBER_COLLECTION_DELETE_FAIL,
  MEMBER_COLLECTION_VIEW_REQUEST,
  MEMBER_COLLECTION_VIEW_SUCCESS,
  MEMBER_COLLECTION_VIEW_FAIL,
  MEMBER_COLLECTION_FILES_POST_REQUEST,
  MEMBER_COLLECTION_FILES_POST_SUCCESS,
  MEMBER_COLLECTION_FILES_POST_FAIL,
  MEMBER_MOVE_FILES_POST_REQUEST,
  MEMBER_MOVE_FILES_POST_SUCCESS,
  MEMBER_MOVE_FILES_POST_FAIL,
  MEMBER_DAM_MOVE_REQUEST,
  MEMBER_DAM_MOVE_SUCCESS,
  MEMBER_DAM_MOVE_FAIL,
  MEMBER_DAM_ROOT_MOVE_REQUEST,
  MEMBER_DAM_ROOT_MOVE_SUCCESS,
  MEMBER_DAM_ROOT_MOVE_FAIL,
  MEMBER_DAM_ROOT_COPY_REQUEST,
  MEMBER_DAM_ROOT_COPY_SUCCESS,
  MEMBER_DAM_ROOT_COPY_FAIL,
  MEMBER_DAM_RENAME_REQUEST,
  MEMBER_DAM_RENAME_SUCCESS,
  MEMBER_DAM_RENAME_FAIL,
  MEMBER_DAM_COLLECTION_COPY_REQUEST,
  MEMBER_DAM_COLLECTION_COPY_SUCCESS,
  MEMBER_DAM_COLLECTION_COPY_FAIL,
  MEMBER_DAM_COLLECTION_COPY_ID_REQUEST,
  MEMBER_DAM_COLLECTION_COPY_ID_SUCCESS,
  MEMBER_DAM_COLLECTION_COPY_ID_FAIL,
  MEMBER_DAM_COLLECTION_MULTIPLE_REQUEST,
  MEMBER_DAM_COLLECTION_MULTIPLE_SUCCESS,
  MEMBER_DAM_COLLECTION_MULTIPLE_FAIL,
  MEMBER_DAM_MOVE_MULTIPLE_REQUEST,
  MEMBER_DAM_MOVE_MULTIPLE_SUCCESS,
  MEMBER_DAM_MOVE_MULTIPLE_FAIL,
  MEMBER_DAM_MOVE_COLLECTION_REQUEST,
  MEMBER_DAM_MOVE_COLLECTION_SUCCESS,
  MEMBER_DAM_MOVE_COLLECTION_FAIL,
  MEMBER_DAM_SEARCH_REQUEST,
  MEMBER_DAM_SEARCH_SUCCESS,
  MEMBER_DAM_SEARCH_FAIL,
  MEMBER_DAM_VIDEOS_REQUEST,
  MEMBER_DAM_VIDEOS_SUCCESS,
  MEMBER_DAM_VIDEOS_FAIL,
  MEMBER_DAM_SEARCH1_REQUEST,
  MEMBER_DAM_SEARCH1_SUCCESS,
  MEMBER_DAM_SEARCH1_FAIL,
  MEMBER_DAM_FAVOURATE_FILTER_REQUEST,
  MEMBER_DAM_FAVOURATE_FILTER_SUCCESS,
  MEMBER_DAM_FAVOURATE_FILTER_FAIL,
  MEMBER_DAM_FAVOURATE_FILTER_ID_REQUEST,
  MEMBER_DAM_FAVOURATE_FILTER_ID_SUCCESS,
  MEMBER_DAM_FAVOURATE_FILTER_ID_FAIL,
  MEMBER_DAM_FAVOURATE_FILTER_COUNT_REQUEST,
  MEMBER_DAM_FAVOURATE_FILTER_COUNT_SUCCESS,
  MEMBER_DAM_FAVOURATE_FILTER_COUNT_FAIL,
  MEMBER_DAM_FAVOURATE_FILTER_COUNT_ID_REQUEST,
  MEMBER_DAM_FAVOURATE_FILTER_COUNT_ID_SUCCESS,
  MEMBER_DAM_FAVOURATE_FILTER_COUNT_ID_FAIL,
  MEMBER_DAM_MostUsed_REQUEST,
  MEMBER_DAM_MostUsed_SUCCESS,
  MEMBER_DAM_MostUsed_FAIL,
  MEMBER_DAM_PARENT_FILTER_REQUEST,
  MEMBER_DAM_PARENT_FILTER_SUCCESS,
  MEMBER_DAM_PARENT_FILTER_FAIL,
  MEMBER_DAM_SHARE_REQUEST,
  MEMBER_DAM_SHARE_SUCCESS,
  MEMBER_DAM_SHARE_FAIL,
  MEMBER_DAM_Company_REQUEST,
  MEMBER_DAM_Company_SUCCESS,
  MEMBER_DAM_Company_FAIL,
  MEMBER_DAM_Company_ID_REQUEST,
  MEMBER_DAM_Company_ID_SUCCESS,
  MEMBER_DAM_Company_ID_FAIL,
  MEMBER_DAM_Company_COUNT_REQUEST,
  MEMBER_DAM_Company_COUNT_SUCCESS,
  MEMBER_DAM_Company_COUNT_FAIL,
  MEMBER_DAM_Company_COUNT_ID_REQUEST,
  MEMBER_DAM_Company_COUNT_ID_SUCCESS,
  MEMBER_DAM_Company_COUNT_ID_FAIL,
  INHOUSE_COMPANY_ID_REQUEST,
  INHOUSE_COMPANY_ID_SUCCESS,
  INHOUSE_Company_ID_FAIL,
  INHOUSE_COMPANY_FILTER_REQUEST,
  INHOUSE_COMPANY_FILTER_SUCCESS,
  INHOUSE_Company_FILTER_FAIL,
  INHOUSE_COMPANY_SEARCH_REQUEST,
  INHOUSE_COMPANY_SEARCH_SUCCESS,
  INHOUSE_Company_SEARCH_FAIL,
  INHOUSE_COMPANY_COUNT_REQUEST,
  INHOUSE_COMPANY_COUNT_SUCCESS,
  INHOUSE_Company_COUNT_FAIL
} from "../../constants/Member-Dam-Constants.js";


export const MemberDamShareReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_SHARE_REQUEST:
      return { loading: true };
    case MEMBER_DAM_SHARE_SUCCESS:
      return {
        loading: false,
        success: true,
        shareDAM: action.payload.message,
      };
    case MEMBER_DAM_SHARE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_ID_REQUEST:
      return { loading: true };
    case MEMBER_DAM_ID_SUCCESS:
      return { loading: false, success: true, DamData: action.payload };
    case MEMBER_DAM_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamimageReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_IMAGES_REQUEST:
      return { loading: true };
    case MEMBER_DAM_IMAGES_SUCCESS:
      return { loading: false, success: true, DamImageData: action.payload };
    case MEMBER_DAM_IMAGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberRootDamReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_ROOT_LIST_REQUEST:
      return { loading: true };
    case MEMBER_DAM_ROOT_LIST_SUCCESS:
      return { loading: false, success: true, RootDamData: action.payload };
    case MEMBER_DAM_ROOT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamIDReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_ID_LIST_REQUEST:
      return { loading: true };
    case MEMBER_DAM_ID_LIST_SUCCESS:
      return { loading: false, success: true, DamData1: action.payload };
    case MEMBER_DAM_ID_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamIDIMAGESReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_ID_IMAGES_REQUEST:
      return { loading: true };
    case MEMBER_DAM_ID_IMAGES_SUCCESS:
      return { loading: false, success: true, DamDataImages: action.payload };
    case MEMBER_DAM_ID_IMAGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamIDCollectionReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_COLLECTION_ID_LIST_REQUEST:
      return { loading: true };
    case MEMBER_DAM_COLLECTION_ID_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        DamDataCollectionId: action.payload,
      };
    case MEMBER_DAM_COLLECTION_ID_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberPostDamReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_LIST_POST_REQUEST:
      return { loading: true };
    case MEMBER_DAM_LIST_POST_SUCCESS:
      return { loading: false, success: true, DamPostData: action.payload };
    case MEMBER_DAM_LIST_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberPostDamParentReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_PARENT_LIST_POST_REQUEST:
      return { loading: true };
    case MEMBER_DAM_PARENT_LIST_POST_SUCCESS:
      return {
        loading: false,
        moveon: true,
        DamPostParentData: action.payload,
      };
    case MEMBER_DAM_PARENT_LIST_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberPostDamCollectionReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_POST_COLLECTION_REQUEST:
      return { loading: true };
    case MEMBER_DAM_POST_COLLECTION_SUCCESS:
      return {
        loading: false,
        success: true,
        DamPostCollection: action.payload,
      };
    case MEMBER_DAM_POST_COLLECTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberPostDamIdCollectionReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_POST_ID_COLLECTION_REQUEST:
      return { loading: true };
    case MEMBER_DAM_POST_ID_COLLECTION_SUCCESS:
      return {
        loading: false,
        success: true,
        DamPostCollectionId: action.payload,
      };
    case MEMBER_DAM_POST_ID_COLLECTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamCollectionReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_LIST_COLLECTION_REQUEST:
      return { loading: true };
    case MEMBER_DAM_LIST_COLLECTION_SUCCESS:
      return {
        loading: false,
        movecollection: true,
        DamPostCollectionData: action.payload,
      };
    case MEMBER_DAM_LIST_COLLECTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamDetailsReducer = (state = { DamDetails: {} }, action) => {
  switch (action.type) {
    case MEMBER_DAM_DETAILS_REQUEST:
      return { loading: true };
    case MEMBER_DAM_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        DamDetails: action.payload,
      };
    case MEMBER_DAM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case MEMBER_DAM_DETAILS_RESET:
      return { DamDetails: {} };
    default:
      return state;
  }
};

export const MemberDamDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_DELETE_REQUEST:
      return { loading: true };
    case MEMBER_DAM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case MEMBER_DAM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamRootImages = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_ROOT_IMAGES_REQUEST:
      return { loading: true };
    case MEMBER_DAM_ROOT_IMAGES_SUCCESS:
      return {
        loading: false,
        success: true,
        DamRootImages: action.payload,
      };
    case MEMBER_DAM_ROOT_IMAGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamParentCollection = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_COLLECTION_LIST_REQUEST:
      return { loading: true };
    case MEMBER_DAM_COLLECTION_LIST_SUCCESS:
      return {
        loading: false,
        movecollection: true,
        DamCollectionParentImages: action.payload,
      };
    case MEMBER_DAM_COLLECTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberFavourite = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_Favourite_REQUEST:
      return { loading: true };
    case MEMBER_DAM_Favourite_SUCCESS:
      return {
        loading: false,
        movecollection: true,
        FavouriteData: action.payload,
      };
    case MEMBER_DAM_Favourite_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberTitlereducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_TITLE_REQUEST:
      return { loading: true };
    case MEMBER_DAM_TITLE_SUCCESS:
      return { loading: false, success: true };
    case MEMBER_DAM_TITLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberCollectionDelete = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_COLLECTION_DELETE_REQUEST:
      return { loading: true };
    case MEMBER_COLLECTION_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        DeletecollectionData: action.payload,
      };
    case MEMBER_COLLECTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberCollectionviewreducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_COLLECTION_VIEW_REQUEST:
      return { loading: true };
    case MEMBER_COLLECTION_VIEW_SUCCESS:
      return {
        loading: false,
        success: true,
        Collectionviewdata: action.payload,
      };
    case MEMBER_COLLECTION_VIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberCollectionfilespostreducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_COLLECTION_FILES_POST_REQUEST:
      return { loading: true };
    case MEMBER_COLLECTION_FILES_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        Collectionfilesviewdata: action.payload,
      };
    case MEMBER_COLLECTION_FILES_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamMovepostreducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_MOVE_FILES_POST_REQUEST:
      return { loading: true };
    case MEMBER_MOVE_FILES_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        Movedata: action.payload,
      };
    case MEMBER_MOVE_FILES_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const Memberdamfoldermovereducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_MOVE_REQUEST:
      return { loading: true };
    case MEMBER_DAM_MOVE_SUCCESS:
      return {
        loading: false,
        success: true,
        Dammovefolder: action.payload,
      };
    case MEMBER_DAM_MOVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const Memberdamrootfoldermovereducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_ROOT_MOVE_REQUEST:
      return { loading: true };
    case MEMBER_DAM_ROOT_MOVE_SUCCESS:
      return {
        loading: false,
        success: true,
        DamROOTmovefolder: action.payload,
      };
    case MEMBER_DAM_ROOT_MOVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const Memberdamcopyreducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_ROOT_COPY_REQUEST:
      return { loading: true };
    case MEMBER_DAM_ROOT_COPY_SUCCESS:
      return {
        loading: false,
        success: true,
        DamROOTCopyfolder: action.payload,
      };
    case MEMBER_DAM_ROOT_COPY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const Memberdamrenamereducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_RENAME_REQUEST:
      return { loading: true };
    case MEMBER_DAM_RENAME_SUCCESS:
      return {
        loading: false,
        success: true,
        DamRenamefolder: action.payload,
      };
    case MEMBER_DAM_RENAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const Memberdamcollectionmovereducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_COLLECTION_COPY_REQUEST:
      return { loading: true };
    case MEMBER_DAM_COLLECTION_COPY_SUCCESS:
      return {
        loading: false,
        success: true,
        Damcollectioncopyfolder: action.payload,
      };
    case MEMBER_DAM_COLLECTION_COPY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberdamcollectionIDmovereducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_COLLECTION_COPY_ID_REQUEST:
      return { loading: true };
    case MEMBER_DAM_COLLECTION_COPY_ID_SUCCESS:
      return {
        loading: false,
        success: true,
        Damcollectioncopyfolder1: action.payload,
      };
    case MEMBER_DAM_COLLECTION_COPY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamcollectionMultipleDelete = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_COLLECTION_MULTIPLE_REQUEST:
      return { loading: true };
    case MEMBER_DAM_COLLECTION_MULTIPLE_SUCCESS:
      return {
        loading: false,
        success: true,
        DamMultipleDelete: action.payload,
      };
    case MEMBER_DAM_COLLECTION_MULTIPLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamMultipleMove = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_MOVE_MULTIPLE_REQUEST:
      return { loading: true };
    case MEMBER_DAM_MOVE_MULTIPLE_SUCCESS:
      return {
        loading: false,
        success: true,
        DamMultipleMove: action.payload,
      };
    case MEMBER_DAM_MOVE_MULTIPLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamSearch = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_SEARCH_REQUEST:
      return { loading: true };
    case MEMBER_DAM_SEARCH_SUCCESS:
      return {
        loading: false,
        success: true,
        DamSearch1: action.payload,
      };
    case MEMBER_DAM_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamSearchfolder = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_SEARCH1_REQUEST:
      return { loading: true };
    case MEMBER_DAM_SEARCH1_SUCCESS:
      return {
        loading: false,
        success: true,
        DamSearchnew: action.payload,
      };
    case MEMBER_DAM_SEARCH1_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamInsideMove = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_MOVE_COLLECTION_REQUEST:
      return { loading: true };
    case MEMBER_DAM_MOVE_COLLECTION_SUCCESS:
      return {
        loading: false,
        success: true,
        DamCollectioninside: action.payload,
      };
    case MEMBER_DAM_MOVE_COLLECTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamVideo = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_VIDEOS_REQUEST:
      return { loading: true };
    case MEMBER_DAM_VIDEOS_SUCCESS:
      return {
        loading: false,
        success: true,
        DamVideo: action.payload,
      };
    case MEMBER_DAM_VIDEOS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamFilterFavourateID = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_FAVOURATE_FILTER_ID_REQUEST:
      return { loading: true };
    case MEMBER_DAM_FAVOURATE_FILTER_ID_SUCCESS:
      return {
        loading: false,
        success: true,
        DamFilterFavourateId: action.payload,
      };
    case MEMBER_DAM_FAVOURATE_FILTER_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamFilterFavourate = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_FAVOURATE_FILTER_REQUEST:
      return { loading: true };
    case MEMBER_DAM_FAVOURATE_FILTER_SUCCESS:
      return {
        loading: false,
        success: true,
        DamFiltering: action.payload,
      };
    case MEMBER_DAM_FAVOURATE_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamFilterFavourateCount = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_FAVOURATE_FILTER_COUNT_REQUEST:
      return { loading: true };
    case MEMBER_DAM_FAVOURATE_FILTER_COUNT_SUCCESS:
      return {
        loading: false,
        success: true,
        DamCountData: action.payload,
      };
    case MEMBER_DAM_FAVOURATE_FILTER_COUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberDamFilterFavourateCountID = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_FAVOURATE_FILTER_COUNT_ID_REQUEST:
      return { loading: true };
    case MEMBER_DAM_FAVOURATE_FILTER_COUNT_ID_SUCCESS:
      return {
        loading: false,
        success: true,
        DamCountDataid: action.payload,
      };
    case MEMBER_DAM_FAVOURATE_FILTER_COUNT_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberlistAllMostUsed = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_MostUsed_REQUEST:
      return { loading: true };
    case MEMBER_DAM_MostUsed_SUCCESS:
      return {
        loading: false,
        success: true,
        Dammostused: action.payload,
      };
    case MEMBER_DAM_MostUsed_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberAllParentFilter = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_PARENT_FILTER_REQUEST:
      return { loading: true };
    case MEMBER_DAM_PARENT_FILTER_SUCCESS:
      return {
        loading: false,
        success: true,
        DamParentFilter: action.payload,
      };
    case MEMBER_DAM_PARENT_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberCompanyreducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_Company_REQUEST:
      return { loading: true };
    case MEMBER_DAM_Company_SUCCESS:
      return {
        loading: false,
        success: true,
        DamCompany: action.payload,
      };
    case MEMBER_DAM_Company_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberCompanyIDreducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_Company_ID_REQUEST:
      return { loading: true };
    case MEMBER_DAM_Company_ID_SUCCESS:
      return {
        loading: false,
        success: true,
        DamIdCompany: action.payload,
      };
    case MEMBER_DAM_Company_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const MemberCompanyCountreducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_Company_COUNT_REQUEST:
      return { loading: true };
    case MEMBER_DAM_Company_COUNT_SUCCESS:
      return {
        loading: false,
        success: true,
        MEMBER_DamIdCompanylist: action.payload,
      };
    case MEMBER_DAM_Company_COUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MemberCompanyCountIDreducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DAM_Company_COUNT_ID_REQUEST:
      return { loading: true };
    case MEMBER_DAM_Company_COUNT_ID_SUCCESS:
      return {
        loading: false,
        success: true,
        DamIdCompanydatalist: action.payload,
      };
    case MEMBER_DAM_Company_COUNT_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



export const InHouseCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case INHOUSE_COMPANY_ID_REQUEST:
      return { loading: true };
    case INHOUSE_COMPANY_ID_SUCCESS:
      return { loading: false, success: true, CompanyIdget: action.payload };
    case INHOUSE_Company_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const InhouseCollectionDamSearch = (state = {}, action) => {
  switch (action.type) {
    case INHOUSE_COMPANY_SEARCH_REQUEST:
      return { loading: true };
    case INHOUSE_COMPANY_SEARCH_SUCCESS:
      return {
        loading: false,
        success: true,
        CollectionDamSearch: action.payload,
      };
    case INHOUSE_Company_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const InhouseCollectionDamFilter = (state = {}, action) => {
  switch (action.type) {
    case INHOUSE_COMPANY_FILTER_REQUEST:
      return { loading: true };
    case INHOUSE_COMPANY_FILTER_SUCCESS:
      return {
        loading: false,
        success: true,
        CollectionDamFilter: action.payload,
      };
    case INHOUSE_Company_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const InhouseCollectionDamCount = (state = {}, action) => {
  switch (action.type) {
    case INHOUSE_COMPANY_COUNT_REQUEST:
      return { loading: true };
    case INHOUSE_COMPANY_COUNT_SUCCESS:
      return {
        loading: false,
        success: true,
        CollectionDamCount: action.payload,
      };
    case INHOUSE_Company_COUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
