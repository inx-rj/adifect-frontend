import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchBar from 'components/common/searchBar/SearchBar';
import { TablePaginationType } from 'helper/types/muiTable/muiTable';
import { Link } from 'react-router-dom';
import { INTAKE_FORMS_ROUTE } from 'routes/baseRoute';
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch
} from '@mui/material';
import { FilterList } from 'helper/constants/media/MediaConstant';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { COMPANY_LIST } from 'redux/reducers/companyTab/companyTab.slice';
import { GET_COMPANY_LIST } from 'redux/actions/companyTab/companyTab.actions';
import { GET_USER_PROFILE_DATA, userProfileDetails } from 'redux/reducers/auth/auth.slice';
import { ROLES } from 'helper/config';
import { API_URL } from 'helper/env';
import { useSingleEffect } from 'react-haiku';
import ViewListIcon from '@mui/icons-material/ViewList';
import { GET_COLLECTION_DATA, GET_FOLDER_DATA, GET_RECENT_FILE_DATA } from 'redux/actions/media/media.actions';
import { COLLECTION_RESPONSE, FOLDER_RESPONSE, RECENT_FILES_RESPONSE } from 'redux/reducers/media/media.slice';
import FolderIcon from '@mui/icons-material/Folder';
import { initialTableConfigInterface } from 'helper/types/common/tableType';

const MediaHome = () => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);
  const recentData = useAppSelector(RECENT_FILES_RESPONSE);
  const folderData = useAppSelector(FOLDER_RESPONSE);
  const collectionData = useAppSelector(COLLECTION_RESPONSE);

  const [tableFilters, setTableFilters] = useState<initialTableConfigInterface>({
    page: 1,
    rowsPerPage: 1000,
    search: ''
  });
  const [companyList, setCompanyList] = useState([]);

  const companyData = useAppSelector(COMPANY_LIST);

  console.log({ collectionData });

  useSingleEffect(() => {
    dispatch(GET_RECENT_FILE_DATA());
    dispatch(GET_FOLDER_DATA(1)); //For fetching Folder data
    dispatch(GET_COLLECTION_DATA(2)); //For fetching Collection data
    // if (!companyData?.companyList?.data?.results) {
    dispatch(
      GET_COMPANY_LIST(
        tableFilters,
        userProfile?.data?.role === ROLES.ADMIN
          ? `${API_URL.COMPANY.ADMIN}`
          : userProfile?.data?.role === ROLES.MEMBER
          ? `${API_URL.COMPANY.MEMBER_COMPANY_LIST}`
          : `${API_URL.COMPANY.COMPANY_LIST}`
      )
    );
    setCompanyList(companyData?.companyList?.data?.results);
    // }
  });

  return (
    <div className="p-2">
      <h4 className="text-2xl font-bold">Media</h4>
      <div className="bg-white">
        <div className="page-filters-bar">
          <SearchBar setTableFilters={setTableFilters} tableFilters={tableFilters} />

          <div className="ml-auto savebtn Categorybtn">
            <Link to={INTAKE_FORMS_ROUTE.CREATE_INTAKE_FORM} className="w-full h-full btn btn-primary gap-2">
              <CloudUploadIcon /> Upload
            </Link>
          </div>
        </div>
        <div className="px-2">
          <Divider />
        </div>
        <div className="flex mt-4 px-2">
          <div className="w-[230px]">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Sort by</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel value="most_used" control={<Radio />} label={<p className="text-sm">Most Used</p>} />
                <FormControlLabel value="oldest" control={<Radio />} label={<p className="text-sm">Oldest</p>} />
                <FormControlLabel value="newest" control={<Radio />} label={<p className="text-sm">Newest</p>} />
              </RadioGroup>
            </FormControl>

            <Divider />

            <div>
              <FormControlLabel
                label="All Select"
                control={
                  <Checkbox
                  // checked={checked[0] && checked[1]}
                  // indeterminate={checked[0] !== checked[1]}
                  // onChange={handleChange1}
                  />
                }
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                {FilterList.map(item => (
                  <FormControlLabel label={item} control={<Checkbox />} />
                ))}
              </Box>
            </div>
            <Divider className="my-4" />
            <div>
              <FormLabel id="demo-radio-buttons-group-label">Company Filter</FormLabel>

              {companyData?.companyList?.data?.results?.map(item => (
                <div>
                  <FormControlLabel label={item.name} control={<Checkbox />} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div className="gap-3 flex items-center">
                <ViewListIcon /> List View
              </div>
              <div>
                Recent <Switch name="Recent" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-3">
              {recentData.data?.map(item => (
                <div className="w-full h-full max-h-[180px] overflow-hidden">
                  <div className="aspect-[]">
                    {!item.is_video ? (
                      <img
                        src={item.thumbnail}
                        className="shadow-lg object-contain object-center h-full w-full"
                        alt={item.files_name}
                      />
                    ) : (
                      <video>
                        <source src={item?.thumbnail} type="video/mp4" />
                      </video>
                    )}

                    <p>{item.files_name}</p>
                  </div>
                </div>
              ))}
            </div>
            <Divider className="my-10 " />
            <div className="mx-3">
              <div>Folders</div>
              <div className="grid grid-cols-4 gap-4 mt-3">
                {folderData.data?.map(item => (
                  <div className="border bg-zinc-50 rounded-md p-3 flex items-center gap-3 cursor-pointer">
                    <FolderIcon style={{ color: '#feaf4e' }} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <Divider className="my-10 " />
            <div className="mx-3">
              <div>Files</div>
              <div className="grid grid-cols-4 gap-4 mt-3">
                {collectionData.data?.map(item => (
                  <div className="">
                    <li className="list-none">
                      <div className="">
                        {item?.dam_media[0]?.is_video == false && (
                          <>
                            <img src={item?.dam_media[0]?.thumbnail} />
                          </>
                        )}
                        {item?.dam_media[0]?.is_video == true && (
                          <>
                            <video className="videoSWithDamData" controls>
                              <source src={item?.dam_media[0].thumbnail} type="video/mp4" />
                            </video>
                          </>
                        )}
                      </div>
                    </li>

                    {item.dam_media.length < 1 && (
                      <li className="list-none">
                        {' '}
                        <div className="collectionimageupload">
                          <img
                            // onClick={() => Collectiondatashow(item.id)}
                            src="/img/dummy_collection.jpg"
                          />
                        </div>
                      </li>
                    )}

                    {item.dam_media.length > 1 && (
                      <li className="list-none">
                        {' '}
                        <div className="collectionimageupload">
                          {item?.dam_media[1]?.is_video == false && (
                            <>
                              <img src={item?.dam_media[1]?.thumbnail} />
                            </>
                          )}
                          {item?.dam_media[1]?.is_video == true && (
                            <>
                              <video className="videoSWithDamData" controls>
                                <source src={item?.dam_media[1].thumbnail} type="video/mp4" />
                              </video>
                            </>
                          )}
                        </div>
                      </li>
                    )}

                    {item.dam_media.length > 2 && (
                      <li className="list-none">
                        <div className="collectionimageupload">
                          {item?.dam_media[2]?.is_video == false && (
                            <>
                              <img src={item?.dam_media[2]?.thumbnail} />
                            </>
                          )}
                          {item?.dam_media[2]?.is_video == true && (
                            <>
                              <video className="videoSWithDamData" controls>
                                <source src={item?.dam_media[2].thumbnail} type="video/mp4" />
                              </video>
                            </>
                          )}
                        </div>
                      </li>
                    )}

                    <p>{item.files_name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaHome;
