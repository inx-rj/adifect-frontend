import {
  DAM_ROOT_LIST_REQUEST,
  DAM_ROOT_LIST_SUCCESS,
  DAM_ROOT_LIST_FAIL,
  DAM_DETAILS_REQUEST,
  DAM_DETAILS_SUCCESS,
  DAM_DETAILS_FAIL,
  DAM_DETAILS_RESET,
  DAM_DELETE_REQUEST,
  DAM_DELETE_SUCCESS,
  DAM_DELETE_FAIL,
  DAM_LIST_POST_REQUEST,
  DAM_LIST_POST_SUCCESS,
  DAM_LIST_POST_FAIL,
  DAM_ID_LIST_REQUEST,
  DAM_ID_LIST_SUCCESS,
  DAM_ID_LIST_FAIL,
  DAM_ID_REQUEST,
  DAM_ID_SUCCESS,
  DAM_ID_FAIL,
  DAM_PARENT_LIST_POST_REQUEST,
  DAM_PARENT_LIST_POST_SUCCESS,
  DAM_PARENT_LIST_POST_FAIL,
  DAM_IMAGES_REQUEST,
  DAM_IMAGES_SUCCESS,
  DAM_IMAGES_FAIL,
  DAM_ID_IMAGES_REQUEST,
  DAM_ID_IMAGES_SUCCESS,
  DAM_ID_IMAGES_FAIL,
  DAM_LIST_COLLECTION_REQUEST,
  DAM_LIST_COLLECTION_SUCCESS,
  DAM_LIST_COLLECTION_FAIL,
  DAM_POST_COLLECTION_REQUEST,
  DAM_POST_COLLECTION_FAIL,
  DAM_POST_COLLECTION_SUCCESS,
  DAM_POST_ID_COLLECTION_REQUEST,
  DAM_POST_ID_COLLECTION_FAIL,
  DAM_POST_ID_COLLECTION_SUCCESS,
  DAM_COLLECTION_ID_LIST_REQUEST,
  DAM_COLLECTION_ID_LIST_SUCCESS,
  DAM_COLLECTION_ID_LIST_FAIL,
  DAM_ROOT_IMAGES_REQUEST,
  DAM_ROOT_IMAGES_SUCCESS,
  DAM_ROOT_IMAGES_FAIL,
  DAM_COLLECTION_LIST_REQUEST,
  DAM_COLLECTION_LIST_SUCCESS,
  DAM_COLLECTION_LIST_FAIL,
  DAM_Favourite_REQUEST,
  DAM_Favourite_SUCCESS,
  DAM_Favourite_FAIL,
  DAM_TITLE_REQUEST,
  DAM_TITLE_SUCCESS,
  DAM_TITLE_FAIL,
  COLLECTION_DELETE_REQUEST,
  COLLECTION_DELETE_SUCCESS,
  COLLECTION_DELETE_FAIL,
  COLLECTION_VIEW_REQUEST,
  COLLECTION_VIEW_SUCCESS,
  COLLECTION_VIEW_FAIL,
  COLLECTION_FILES_POST_REQUEST,
  COLLECTION_FILES_POST_SUCCESS,
  COLLECTION_FILES_POST_FAIL,
  MOVE_FILES_POST_REQUEST,
  MOVE_FILES_POST_SUCCESS,
  MOVE_FILES_POST_FAIL,
  DAM_MOVE_REQUEST,
  DAM_MOVE_SUCCESS,
  DAM_MOVE_FAIL,
  DAM_ROOT_MOVE_REQUEST,
  DAM_ROOT_MOVE_SUCCESS,
  DAM_ROOT_MOVE_FAIL,
  DAM_ROOT_COPY_REQUEST,
  DAM_ROOT_COPY_SUCCESS,
  DAM_ROOT_COPY_FAIL,
  DAM_RENAME_REQUEST,
  DAM_RENAME_SUCCESS,
  DAM_RENAME_FAIL,
  DAM_COLLECTION_COPY_REQUEST,
  DAM_COLLECTION_COPY_SUCCESS,
  DAM_COLLECTION_COPY_FAIL,
  DAM_COLLECTION_COPY_ID_REQUEST,
  DAM_COLLECTION_COPY_ID_SUCCESS,
  DAM_COLLECTION_COPY_ID_FAIL,
  DAM_COLLECTION_MULTIPLE_REQUEST,
  DAM_COLLECTION_MULTIPLE_SUCCESS,
  DAM_COLLECTION_MULTIPLE_FAIL,
  DAM_MOVE_MULTIPLE_REQUEST,
  DAM_MOVE_MULTIPLE_SUCCESS,
  DAM_MOVE_MULTIPLE_FAIL,
  DAM_MOVE_COLLECTION_REQUEST,
  DAM_MOVE_COLLECTION_SUCCESS,
  DAM_MOVE_COLLECTION_FAIL,
  DAM_SEARCH_REQUEST,
  DAM_SEARCH_SUCCESS,
  DAM_SEARCH_FAIL,
  DAM_VIDEOS_REQUEST,
  DAM_VIDEOS_SUCCESS,
  DAM_VIDEOS_FAIL,
  DAM_SEARCH1_REQUEST,
  DAM_SEARCH1_SUCCESS,
  DAM_SEARCH1_FAIL,
  DAM_FAVOURATE_FILTER_REQUEST,
  DAM_FAVOURATE_FILTER_SUCCESS,
  DAM_FAVOURATE_FILTER_FAIL,
  DAM_FAVOURATE_FILTER_ID_REQUEST,
  DAM_FAVOURATE_FILTER_ID_SUCCESS,
  DAM_FAVOURATE_FILTER_ID_FAIL,
  DAM_FAVOURATE_FILTER_COUNT_REQUEST,
  DAM_FAVOURATE_FILTER_COUNT_SUCCESS,
  DAM_FAVOURATE_FILTER_COUNT_FAIL,
  DAM_FAVOURATE_FILTER_COUNT_ID_REQUEST,
  DAM_FAVOURATE_FILTER_COUNT_ID_SUCCESS,
  DAM_FAVOURATE_FILTER_COUNT_ID_FAIL,
  DAM_MostUsed_REQUEST,
  DAM_MostUsed_SUCCESS,
  DAM_MostUsed_FAIL,
  DAM_Newest_REQUEST,
  DAM_Newest_SUCCESS,
  DAM_Newest_FAIL,
  DAM_PARENT_FILTER_REQUEST,
  DAM_PARENT_FILTER_SUCCESS,
  DAM_PARENT_FILTER_FAIL,
  DAM_SHARE_REQUEST,
  DAM_SHARE_SUCCESS,
  DAM_SHARE_FAIL,
  DAM_Company_REQUEST,
  DAM_Company_SUCCESS,
  DAM_Company_FAIL,
  DAM_Company_ID_REQUEST,
  DAM_Company_ID_SUCCESS,
  DAM_Company_ID_FAIL,
  DAM_Company_COUNT_REQUEST,
  DAM_Company_COUNT_SUCCESS,
  DAM_Company_COUNT_FAIL,
  DAM_Company_COUNT_ID_REQUEST,
  DAM_Company_COUNT_ID_SUCCESS,
  DAM_Company_COUNT_ID_FAIL,
  DAM_DATA_REQUEST,
  DAM_DATA_SUCCESS,
  DAM_DATA_FAIL,
  COLLECTION_DAM_SEARCH_REQUEST,
  COLLECTION_DAM_SEARCH_SUCCESS,
  COLLECTION_DAM_SEARCH_FAIL,
  COLLECTION_DAM_FILTER_REQUEST,
  COLLECTION_DAM_FILTER_SUCCESS,
  COLLECTION_DAM_FILTER_FAIL,
  COLLECTION_DAM_FILTER_ID_REQUEST,
  COLLECTION_DAM_FILTER_ID_SUCCESS,
  COLLECTION_DAM_FILTER_ID_FAIL,
  COLLECTION_DAM_COUNT_REQUEST,
  COLLECTION_DAM_COUNT_SUCCESS,
  COLLECTION_DAM_COUNT_FAIL
} from "../../constants/Dam-constant";

export const DamShareReducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_SHARE_REQUEST:
      return { loading: true };
    case DAM_SHARE_SUCCESS:
      return {
        loading: false,
        success: true,
        shareDAM: action.payload.message,
      };
    case DAM_SHARE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamReducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_ID_REQUEST:
      return { loading: true };
    case DAM_ID_SUCCESS:
      return { loading: false, success: true, DamData: action.payload };
    case DAM_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamimageReducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_IMAGES_REQUEST:
      return { loading: true };
    case DAM_IMAGES_SUCCESS:
      return { loading: false, success: true, DamImageData: action.payload };
    case DAM_IMAGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const RootDamReducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_ROOT_LIST_REQUEST:
      return { loading: true };
    case DAM_ROOT_LIST_SUCCESS:
      return { loading: false, success: true, RootDamData: action.payload };
    case DAM_ROOT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamIDReducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_ID_LIST_REQUEST:
      return { loading: true };
    case DAM_ID_LIST_SUCCESS:
      return { loading: false, success: true, DamData1: action.payload };
    case DAM_ID_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamIDIMAGESReducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_ID_IMAGES_REQUEST:
      return { loading: true };
    case DAM_ID_IMAGES_SUCCESS:
      return { loading: false, success: true, DamDataImages: action.payload };
    case DAM_ID_IMAGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamIDCollectionReducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_COLLECTION_ID_LIST_REQUEST:
      return { loading: true };
    case DAM_COLLECTION_ID_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        DamDataCollectionId: action.payload,
      };
    case DAM_COLLECTION_ID_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const PostDamReducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_LIST_POST_REQUEST:
      return { loading: true };
    case DAM_LIST_POST_SUCCESS:
      return { loading: false, success: true, DamPostData: action.payload };
    case DAM_LIST_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const PostDamParentReducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_PARENT_LIST_POST_REQUEST:
      return { loading: true };
    case DAM_PARENT_LIST_POST_SUCCESS:
      return {
        loading: false,
        moveon: true,
        DamPostParentData: action.payload,
      };
    case DAM_PARENT_LIST_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const PostDamCollectionReducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_POST_COLLECTION_REQUEST:
      return { loading: true };
    case DAM_POST_COLLECTION_SUCCESS:
      return {
        loading: false,
        success: true,
        DamPostCollection: action.payload,
      };
    case DAM_POST_COLLECTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const PostDamIdCollectionReducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_POST_ID_COLLECTION_REQUEST:
      return { loading: true };
    case DAM_POST_ID_COLLECTION_SUCCESS:
      return {
        loading: false,
        success: true,
        DamPostCollectionId: action.payload,
      };
    case DAM_POST_ID_COLLECTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamCollectionReducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_LIST_COLLECTION_REQUEST:
      return { loading: true };
    case DAM_LIST_COLLECTION_SUCCESS:
      return {
        loading: false,
        movecollection: true,
        DamPostCollectionData: action.payload,
      };
    case DAM_LIST_COLLECTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamDetailsReducer = (state = { DamDetails: {} }, action) => {
  switch (action.type) {
    case DAM_DETAILS_REQUEST:
      return { loading: true };
    case DAM_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        DamDetails: action.payload,
      };
    case DAM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case DAM_DETAILS_RESET:
      return { DamDetails: {} };
    default:
      return state;
  }
};

export const DamDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_DELETE_REQUEST:
      return { loading: true };
    case DAM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DAM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamRootImages = (state = {}, action) => {
  switch (action.type) {
    case DAM_ROOT_IMAGES_REQUEST:
      return { loading: true };
    case DAM_ROOT_IMAGES_SUCCESS:
      return {
        loading: false,
        movecollection: true,
        DamRootImages: action.payload,
      };
    case DAM_ROOT_IMAGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamParentCollection = (state = {}, action) => {
  switch (action.type) {
    case DAM_COLLECTION_LIST_REQUEST:
      return { loading: true };
    case DAM_COLLECTION_LIST_SUCCESS:
      return {
        loading: false,
        movecollection: true,
        DamCollectionParentImages: action.payload,
      };
    case DAM_COLLECTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const Favourite = (state = {}, action) => {
  switch (action.type) {
    case DAM_Favourite_REQUEST:
      return { loading: true };
    case DAM_Favourite_SUCCESS:
      return {
        loading: false,
        movecollection: true,
        FavouriteData: action.payload,
      };
    case DAM_Favourite_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const Titlereducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_TITLE_REQUEST:
      return { loading: true };
    case DAM_TITLE_SUCCESS:
      return { loading: false, success: true };
    case DAM_TITLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const CollectionDelete = (state = {}, action) => {
  switch (action.type) {
    case COLLECTION_DELETE_REQUEST:
      return { loading: true };
    case COLLECTION_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        DeletecollectionData: action.payload,
      };
    case COLLECTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const Collectionviewreducer = (state = {}, action) => {
  switch (action.type) {
    case COLLECTION_VIEW_REQUEST:
      return { loading: true };
    case COLLECTION_VIEW_SUCCESS:
      return {
        loading: false,
        success: true,
        Collectionviewdata: action.payload,
      };
    case COLLECTION_VIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const Collectionfilespostreducer = (state = {}, action) => {
  switch (action.type) {
    case COLLECTION_FILES_POST_REQUEST:
      return { loading: true };
    case COLLECTION_FILES_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        Collectionfilesviewdata: action.payload,
      };
    case COLLECTION_FILES_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamMovepostreducer = (state = {}, action) => {
  switch (action.type) {
    case MOVE_FILES_POST_REQUEST:
      return { loading: true };
    case MOVE_FILES_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        Movedata: action.payload,
      };
    case MOVE_FILES_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const damfoldermovereducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_MOVE_REQUEST:
      return { loading: true };
    case DAM_MOVE_SUCCESS:
      return {
        loading: false,
        success: true,
        Dammovefolder: action.payload,
      };
    case DAM_MOVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const damrootfoldermovereducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_ROOT_MOVE_REQUEST:
      return { loading: true };
    case DAM_ROOT_MOVE_SUCCESS:
      return {
        loading: false,
        success: true,
        DamROOTmovefolder: action.payload,
      };
    case DAM_ROOT_MOVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const damcopyreducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_ROOT_COPY_REQUEST:
      return { loading: true };
    case DAM_ROOT_COPY_SUCCESS:
      return {
        loading: false,
        success: true,
        DamROOTCopyfolder: action.payload,
      };
    case DAM_ROOT_COPY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const damrenamereducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_RENAME_REQUEST:
      return { loading: true };
    case DAM_RENAME_SUCCESS:
      return {
        loading: false,
        success: true,
        DamRenamefolder: action.payload,
      };
    case DAM_RENAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const damcollectionmovereducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_COLLECTION_COPY_REQUEST:
      return { loading: true };
    case DAM_COLLECTION_COPY_SUCCESS:
      return {
        loading: false,
        success: true,
        Damcollectioncopyfolder: action.payload,
      };
    case DAM_COLLECTION_COPY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const damcollectionIDmovereducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_COLLECTION_COPY_ID_REQUEST:
      return { loading: true };
    case DAM_COLLECTION_COPY_ID_SUCCESS:
      return {
        loading: false,
        success: true,
        Damcollectioncopyfolder1: action.payload,
      };
    case DAM_COLLECTION_COPY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamcollectionMultipleDelete = (state = {}, action) => {
  switch (action.type) {
    case DAM_COLLECTION_MULTIPLE_REQUEST:
      return { loading: true };
    case DAM_COLLECTION_MULTIPLE_SUCCESS:
      return {
        loading: false,
        success: true,
        DamMultipleDelete: action.payload,
      };
    case DAM_COLLECTION_MULTIPLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamMultipleMove = (state = {}, action) => {
  switch (action.type) {
    case DAM_MOVE_MULTIPLE_REQUEST:
      return { loading: true };
    case DAM_MOVE_MULTIPLE_SUCCESS:
      return {
        loading: false,
        success: true,
        DamMultipleMove: action.payload,
      };
    case DAM_MOVE_MULTIPLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamSearch = (state = {}, action) => {
  switch (action.type) {
    case DAM_SEARCH_REQUEST:
      return { loading: true };
    case DAM_SEARCH_SUCCESS:
      return {
        loading: false,
        success: true,
        DamSearch1: action.payload,
      };
    case DAM_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamSearchfolder = (state = {}, action) => {
  switch (action.type) {
    case DAM_SEARCH1_REQUEST:
      return { loading: true };
    case DAM_SEARCH1_SUCCESS:
      return {
        loading: false,
        success: true,
        DamSearchnew: action.payload,
      };
    case DAM_SEARCH1_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamInsideMove = (state = {}, action) => {
  switch (action.type) {
    case DAM_MOVE_COLLECTION_REQUEST:
      return { loading: true };
    case DAM_MOVE_COLLECTION_SUCCESS:
      return {
        loading: false,
        success: true,
        DamCollectioninside: action.payload,
      };
    case DAM_MOVE_COLLECTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamVideo = (state = {}, action) => {
  switch (action.type) {
    case DAM_VIDEOS_REQUEST:
      return { loading: true };
    case DAM_VIDEOS_SUCCESS:
      return {
        loading: false,
        success: true,
        DamVideo: action.payload,
      };
    case DAM_VIDEOS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamFilterFavourateID = (state = {}, action) => {
  switch (action.type) {
    case DAM_FAVOURATE_FILTER_ID_REQUEST:
      return { loading: true };
    case DAM_FAVOURATE_FILTER_ID_SUCCESS:
      return {
        loading: false,
        success: true,
        DamFilterFavourateId: action.payload,
      };
    case DAM_FAVOURATE_FILTER_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamFilterFavourate = (state = {}, action) => {
  switch (action.type) {
    case DAM_FAVOURATE_FILTER_REQUEST:
      return { loading: true };
    case DAM_FAVOURATE_FILTER_SUCCESS:
      return {
        loading: false,
        success: true,
        DamFiltering: action.payload,
      };
    case DAM_FAVOURATE_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamFilterFavourateCount = (state = {}, action) => {
  switch (action.type) {
    case DAM_FAVOURATE_FILTER_COUNT_REQUEST:
      return { loading: true };
    case DAM_FAVOURATE_FILTER_COUNT_SUCCESS:
      return {
        loading: false,
        success: true,
        DamCountData: action.payload,
      };
    case DAM_FAVOURATE_FILTER_COUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DamFilterFavourateCountID = (state = {}, action) => {
  switch (action.type) {
    case DAM_FAVOURATE_FILTER_COUNT_ID_REQUEST:
      return { loading: true };
    case DAM_FAVOURATE_FILTER_COUNT_ID_SUCCESS:
      return {
        loading: false,
        success: true,
        DamCountDataid: action.payload,
      };
    case DAM_FAVOURATE_FILTER_COUNT_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listAllMostUsed = (state = {}, action) => {
  switch (action.type) {
    case DAM_MostUsed_REQUEST:
      return { loading: true };
    case DAM_MostUsed_SUCCESS:
      return {
        loading: false,
        success: true,
        Dammostused: action.payload,
      };
    case DAM_MostUsed_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AllParentFilter = (state = {}, action) => {
  switch (action.type) {
    case DAM_PARENT_FILTER_REQUEST:
      return { loading: true };
    case DAM_PARENT_FILTER_SUCCESS:
      return {
        loading: false,
        success: true,
        DamParentFilter: action.payload,
      };
    case DAM_PARENT_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const Companyreducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_Company_REQUEST:
      return { loading: true };
    case DAM_Company_SUCCESS:
      return {
        loading: false,
        success: true,
        DamCompany: action.payload,
      };
    case DAM_Company_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const CompanyIDreducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_Company_ID_REQUEST:
      return { loading: true };
    case DAM_Company_ID_SUCCESS:
      return {
        loading: false,
        success: true,
        DamIdCompany: action.payload,
      };
    case DAM_Company_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const CompanyCountreducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_Company_COUNT_REQUEST:
      return { loading: true };
    case DAM_Company_COUNT_SUCCESS:
      return {
        loading: false,
        success: true,
        DamIdCompanylist: action.payload,
      };
    case DAM_Company_COUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const CompanyCountIDreducer = (state = {}, action) => {
  switch (action.type) {
    case DAM_Company_COUNT_ID_REQUEST:
      return { loading: true };
    case DAM_Company_COUNT_ID_SUCCESS:
      return {
        loading: false,
        success: true,
        DamIdCompanydatalist: action.payload,
      };
    case DAM_Company_COUNT_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DaminsideData = (state = {}, action) => {
  switch (action.type) {
    case DAM_DATA_REQUEST:
      return { loading: true };
    case DAM_DATA_SUCCESS:
      return {
        loading: false,
        success: true,
        InsideData: action.payload,
      };
    case DAM_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const CollectionDamSearch = (state = {}, action) => {
  switch (action.type) {
    case COLLECTION_DAM_SEARCH_REQUEST:
      return { loading: true };
    case COLLECTION_DAM_SEARCH_SUCCESS:
      return {
        loading: false,
        success: true,
        CollectionDamSearch: action.payload,
      };
    case COLLECTION_DAM_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const CollectionDamFilter = (state = {}, action) => {
  switch (action.type) {
    case COLLECTION_DAM_FILTER_REQUEST:
      return { loading: true };
    case COLLECTION_DAM_FILTER_SUCCESS:
      return {
        loading: false,
        success: true,
        CollectionDamFilter: action.payload,
      };
    case COLLECTION_DAM_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



export const CollectionDamCount = (state = {}, action) => {
  switch (action.type) {
    case COLLECTION_DAM_COUNT_REQUEST:
      return { loading: true };
    case COLLECTION_DAM_COUNT_SUCCESS:
      return {
        loading: false,
        success: true,
        CollectionDamCount: action.payload,
      };
    case COLLECTION_DAM_COUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const CollectionDamIDFilter = (state = {}, action) => {
  switch (action.type) {
    case COLLECTION_DAM_FILTER_ID_REQUEST:
      return { loading: true };
    case COLLECTION_DAM_FILTER_ID_SUCCESS:
      return {
        loading: false,
        success: true,
        CollectionDamIdFilter: action.payload,
      };
    case COLLECTION_DAM_FILTER_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


