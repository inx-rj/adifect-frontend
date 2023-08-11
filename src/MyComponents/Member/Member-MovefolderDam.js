import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { BACKEND_API_URL } from "../../environment";
import LoadingSpinner from "../../containers/LoadingSpinner";
import swal from "sweetalert";
import { Alert, Form, Modal, ProgressBar } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { createMedia } from "../../redux/actions/media-actions";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import { useDropzone } from "react-dropzone";
import { ConstructionOutlined } from "@mui/icons-material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment/moment";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { DamIDReducer } from "../../redux/reducers/Dam-reducer";
import { relative } from "path";
import { element, elementType } from "prop-types";
import { memberAdminCompanyListAction } from "../../redux/actions/Member-Company-List-Action";
import {
  DamMovefolderdata,
  listAllDam,
  DamrootMovefolderdata,
  listAllROOTDam,
  getdamDetailswithid,
  DAMParentPost,
  listAllDamImages,
  getdamImageswithid,
  DAMParentPostCollection,
  DAMPost,
  DAMCollectionPost,
  listAllCollectionDAM,
  getdamCollectionDetailswithid,
  listAllRootImages,
  DAMParentCollection,
  collectionfilespost,
  DamrootMoveCollection,
  deletedam,
  Favorites,
  Titleupdate,
  deleteCollection,
  CollectionView,
  DAMMovePost,
  damcollectionmovereducer,
  DamrootMoveCollectionId,
  DamrootMoveCollectionID,
  // DamCollectionParentImages,
} from "../../redux/actions/Member-Dam-Actions";

function Member_MovefolderDam(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [state, setState] = React.useState([]);
  const [stateid, setStateid] = React.useState([]);
  const [stateparent, setStateparent] = React.useState([]);
  const [stateparentid, setStateparentid] = React.useState([]);
  const [parentidvalue, setParentidvalue] = useState();
  const [isDisplayDetails, setIsDisplayDetails] = useState(false);
  const [none, setnone] = useState(null);
  const [count, setcount] = useState([]);

  const [addNew, setAddNew] = useState([]);

  const [localname, setlocalname] = useState([]);
  const [localid, setlocalid] = useState();
  const [localparentid, setlocalparentid] = useState();

  const { Dammovefolder } = useSelector(
    (state) => state.Memberdamfoldermovereducer
  );
  const { DamROOTmovefolder } = useSelector(
    (state) => state.Memberdamrootfoldermovereducer
  );


  console.log("DamROOTmovefolder=-=-=-=-=-=", DamROOTmovefolder);

  const { Damcollectioncopyfolder } = useSelector(
    (state) => state.Memberdamcollectionmovereducer
  );
  const { Damcollectioncopyfolder1 } = useSelector(
    (state) => state.MemberdamcollectionIDmovereducer
  );
  const [movefoldershow, setmovefoldershow] = useState(true);
  const [moveparentid, setmoveparentid] = useState();
  const [dialoginsideparentid, setdialoginsideparentid] = useState();
  const [disableid, setdisplayid] = useState();
  const [showcollection, setshowcollection] = useState(false);
  const [showcollectionid, setshowcollectionid] = useState(false);
  const [collectionmove, setcollectionmove] = useState(true);

  useEffect(() => {
    localStorage.removeItem("moveparentid");
    let disableid = localStorage.getItem("disableid");
    setTimeout(() => {
      setdisplayid(disableid);
    }, 200);

    let imageshow = localStorage.getItem("imageshow");
    if (imageshow) {
      setshowcollection(true);
    }

    setdialoginsideparentid(dialoginsideparentid);
  }, []);



  useEffect(() => {
    let agecyIdCompany = localStorage.getItem("agencyid");
    dispatch(DamrootMoveCollection(agecyIdCompany));
    dispatch(DamrootMovefolderdata(agecyIdCompany));
  }, []);



  // useEffect(() => {
  //   dispatch(memberAdminCompanyListAction());
  // }, []);


  const selectcollection = (id) => {
    if (count.includes(id)) {
      props.setSkillsMove();
      setcount(count.filter((el, i) => el !== id));
    } else {
      props.setSkillsMove(id);
      setcount([id]);
    }
    localStorage.setItem("collectiontrue", id);
    localStorage.setItem("moveparentid", id);
  };

  const rootfolder = () => {
    let agecyIdCompany = localStorage.getItem("agencyid");
    let imageshow = localStorage.getItem("imageshow");
    if (imageshow) {
      setshowcollection(true);
    }
    props.setSkillsMove()
    setmovefoldershow(true);
    setshowcollectionid(false);
    localStorage.removeItem("moveparentid");
    dispatch(DamrootMovefolderdata(agecyIdCompany));
    setState([]);
    setStateid([]);
    setStateparent([]);
    setStateparentid([]);
    setParentidvalue();
    // setShowFolderModal(true);
  };

  const copynavigate = (parent, is_parent, id, name) => {
    let agecyIdCompany = localStorage.getItem("agencyid");
    setmovefoldershow(false);
    setmoveparentid(id);
    props.setSkillsMove(id)
    setshowcollection(false);
    localStorage.setItem("moveparentid", id);
    dispatch(listAllDam(id,agecyIdCompany));
    setAddNew([...addNew]);
    setParentidvalue(id);
    dispatch(DamMovefolderdata(id,agecyIdCompany));
    dispatch(DamrootMoveCollectionID(id,agecyIdCompany));
    setState([...state, name]);
    setStateid([...stateid, id]);
    setStateparent([...stateparent, is_parent]);
    setStateparentid([...stateparentid, parent]);
    setIsDisplayDetails(false);
    const propertyNames = Object.values(localname);
    const myname = [...state, name];
    const myid = [...stateid, id];
    const myparentid = [...stateparentid, parent];
    localStorage.setItem("dialogname", JSON.stringify(myname));
    localStorage.setItem("dialogid", JSON.stringify(myid));
    localStorage.setItem("dialogparentid", JSON.stringify(myparentid));
    setTimeout(() => {
      setlocalname(JSON.parse(localStorage.getItem("dialogname")));
      // setlocalid(JSON.parse(localStorage.getItem("id"))),
      setlocalparentid(JSON.parse(localStorage.getItem("dialogparentid")));
    }, 200);
    let imageshow = localStorage.getItem("imageshow");
    if (imageshow) {
      setshowcollectionid(true);
    }
  };

  const handleClick2 = (event, key, element) => {
    let agecyIdCompany = localStorage.getItem("agencyid");
    let parentidbreedcrumbs = localparentid[key];
    setmoveparentid(parentidbreedcrumbs);
    localStorage.setItem("moveparentid", parentidbreedcrumbs);
    setIsDisplayDetails(false);
    // alert(localparentid[key])
    let passed = stateid[key];
    const person = {
      firstName: localname,
    };
    const propertyNames = Object.keys(person);
    var lastelement = localname[localname.length - 1];
    if (parentidbreedcrumbs) {
      dispatch(DamMovefolderdata(parentidbreedcrumbs,agecyIdCompany));
      dispatch(DamrootMoveCollectionID(parentidbreedcrumbs,agecyIdCompany));
      localname.splice(key, localname.length);
      localparentid.splice(key, localparentid.length);
      stateid.splice(key, stateid.length);
      state.splice(key, state.length);
      stateparentid.splice(key, stateparentid.length);
      localStorage.setItem("name", JSON.stringify(localname));
      localStorage.setItem("id", JSON.stringify(stateid));
      localStorage.setItem("parentid", JSON.stringify(localparentid));
    }
  };

  return (
    <>
      <div>
        {movefoldershow && (
          <>
            <div className="foldermainDisplayDiv foldermainDisplayDivmove">
              {DamROOTmovefolder?.map((item) => (
                <>
                  {item.id == disableid ? (
                    <>
                      <div
                        disabled={true}
                        className="folderDisplayNewInline disabled folderDisplayNewInlinemove"
                      >
                        <div
                          className="file_contnet11New"
                          onClick={() =>
                            copynavigate(
                              item.parent,
                              item.is_parent,
                              item.id,
                              item.name
                            )
                          }
                        >
                          <div className="cardNewC">
                            <div className="folder_structuremove">
                              <div className="foldericonimg">
                                {item?.is_favourite == true && (
                                  <>
                                    <img src="/img/mediastarbox.png" />
                                  </>
                                )}
                                {item?.is_favourite == false && (
                                  <>
                                    <img src="/img/foldericon.png" />
                                  </>
                                )}
                              </div>
                              {/* <Link to={`/media/${item.id}`}> */}

                              <p>{item?.name}</p>
                              {/* </Link> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="folderDisplayNewInline folderDisplayNewInlinemove">
                        <div
                          className="file_contnet11New 1"
                          onClick={() =>
                            copynavigate(
                              item.parent,
                              item.is_parent,
                              item.id,
                              item.name
                            )
                          }
                        >
                          <div className="cardNewC">
                            <div className="folder_structuremove">
                              <div className="foldericonimg">
                                {item?.is_favourite == true && (
                                  <>
                                    <img src="/img/mediastarbox.png" />
                                  </>
                                )}
                                {item?.is_favourite == false && (
                                  <>
                                    <img src="/img/foldericon.png" />
                                  </>
                                )}
                              </div>
                              {/* <Link to={`/media/${item.id}`}> */}

                              <p>{item?.name}</p>
                              {/* </Link> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ))}
            </div>
          </>
        )}

        {!movefoldershow && (
          <>
            <div className="mydriver">
              <span onClick={rootfolder}>Media</span>
              <div className="damFolderBackButton">
                <img src="/img/angle-right-b.png" alt="" />
              </div>
            </div>
            {localname?.map((element, key) => (
              <div
                className="damFolderNameBackButton"
                onClick={(event) => handleClick2(event, key + 1, element)}
                key={key}
              >
                <h3 className="myDrivehead"> {element}</h3>

                <div className="damFolderBackButton">
                  <img src="/img/angle-right-b.png" alt="" />
                </div>
                <hr />
              </div>
            ))}
          </>
        )}

        {!movefoldershow && (
          <>
            <div className="foldermainDisplayDiv foldermainDisplayDivmove">
              {Dammovefolder?.map((item) => (
                <>
                  {item.id == disableid ? (
                    <>
                      <div
                        disabled={true}
                        className="folderDisplayNewInline disabled"
                      >
                        <div
                          className="file_contnet11New"
                          onClick={() =>
                            copynavigate(
                              item.parent,
                              item.is_parent,
                              item.id,
                              item.name
                            )
                          }
                        >
                          <div className="cardNewC">
                            <div className="folder_structure">
                              <div className="foldericonimg">
                                {item?.is_favourite == true && (
                                  <>
                                    <img src="/img/mediastarbox.png" />
                                  </>
                                )}
                                {item?.is_favourite == false && (
                                  <>
                                    <img src="/img/foldericon.png" />
                                  </>
                                )}
                              </div>
                              {/* <Link to={`/media/${item.id}`}> */}

                              <p>{item?.name}</p>
                              {/* </Link> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="folderDisplayNewInline">
                        <div
                          className="file_contnet11New"
                          onClick={() =>
                            copynavigate(
                              item.parent,
                              item.is_parent,
                              item.id,
                              item.name
                            )
                          }
                        >
                          <div className="cardNewC">
                            <div className="folder_structure">
                              <div className="foldericonimg">
                                {item?.is_favourite == true && (
                                  <>
                                    <img src="/img/mediastarbox.png" />
                                  </>
                                )}
                                {item?.is_favourite == false && (
                                  <>
                                    <img src="/img/foldericon.png" />
                                  </>
                                )}
                              </div>
                              {/* <Link to={`/media/${item.id}`}> */}

                              <p>{item?.name}</p>
                              {/* </Link> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ))}
            </div>
          </>
        )}

        {showcollection && (
          <>
            <div className="folderImagesNewDFlex1 folderImagesNewDFlex2">
              {Damcollectioncopyfolder?.map((item) => (
                <>
                  {/* {count == item.id && <> {item.id}</>} */}

                  <div
                    className={
                      count == item.id
                        ? "collectionnameimgdiv rootinsidediv selected"
                        : "collectionnameimgdiv rootinsidediv"
                    }
                  >
                    <img class="selected_check_icon" src="/img/allok.png" />
                    <div
                      className="movefolimg"
                      onClick={() => selectcollection(item.id)}
                    >
                      <li>
                        <div className="collectionimageupload collectionimageuploadimg">
                          {item?.dam_media[0]?.is_video == false && (
                            <>
                              <img src={item?.dam_media[0]?.thumbnail} />
                            </>
                          )}

                          {item?.dam_media[0]?.is_video == true && (
                            <>
                              <video className="videoSWithDamData" controls>
                                <source
                                  src={item?.dam_media[0].thumbnail}
                                  type="video/mp4"
                                />
                              </video>
                            </>
                          )}
                        </div>
                      </li>

                      {item.dam_media.length < 1 && (
                        <li>
                          {" "}
                          <div className="collectionimageupload collectionimageuploadimg">
                            <img
                              // onClick={() => Collectiondatashow(item.id)}
                              src="/img/dummy_collection.jpg"
                            />
                          </div>
                        </li>
                      )}


                      {item.dam_media.length > 1 && (
                        <li>
                          {" "}
                          <div className="collectionimageupload collectionimageuploadimg">
                            {item?.dam_media[1]?.is_video == false && (
                              <>
                                <img src={item?.dam_media[1]?.thumbnail} />
                              </>
                            )}
                            {item?.dam_media[1]?.is_video == true && (
                              <>
                                <video className="videoSWithDamData" controls>
                                  <source
                                    src={item?.dam_media[1].thumbnail}
                                    type="video/mp4"
                                  />
                                </video>
                              </>
                            )}
                          </div>
                        </li>
                      )}

                      {item.dam_media.length > 2 && (
                        <>
                          <li>
                            <div className="collectionimageupload collectionimageuploadimg">
                              {item?.dam_media[2]?.is_video == false && (
                                <>
                                  <img src={item?.dam_media[2]?.thumbnail} />
                                </>
                              )}
                            </div>
                            {item?.dam_media[2]?.is_video == true && (
                              <>
                                <video className="videoSWithDamData" controls>
                                  <source
                                    src={item?.dam_media[2].thumbnail}
                                    type="video/mp4"
                                  />
                                </video>
                              </>
                            )}
                          </li>
                        </>
                      )}
                    </div>

                    <div className="collectionname">
                      <p className="looking_contnet">{item?.name}</p>
                      <span className="price_contnetmediasec">
                        <i className="fas fa-shopping-bag"></i>
                        {item?.dam_media.length}
                      </span>
                    </div>
                    {/* <div className="collectionvalue12">
                            
                                          <img
                                            className="startimgst"
                                            src="/img/startimg.png"
                                          />
                                    
                                      </div> */}
                  </div>
                </>
              ))}
            </div>
          </>
        )}

        {showcollectionid && (
          <>
            <div className="folderImagesNewDFlex1 copyfoldable">
              {Damcollectioncopyfolder1?.map((item) => (
                <>
                  <div
                    className={
                      count == item.id
                        ? "collectionnameimgdiv selected"
                        : "collectionnameimgdiv"
                    }
                  >
                    <img class="selected_check_icon" src="/img/allok.png" />
                    <div
                      className="movefolimg"
                      onClick={() => selectcollection(item.id)}
                    >
                      <img
                        className="selected_check_icon"
                        src="/img/allok.png"
                      />
                       <li>
                        <div className="collectionimagechanger">
                          {item?.dam_media[0]?.is_video == false && (
                            <>
                              <img src={item?.dam_media[0]?.thumbnail} />
                            </>
                          )}

                          {item?.dam_media[0]?.is_video == true && (
                            <>
                              <video className="videoSWithDamData" controls>
                                <source
                                  src={item?.dam_media[0].thumbnail}
                                  type="video/mp4"
                                />
                              </video>
                            </>
                          )}
                        </div>
                      </li>

                      {item.dam_media.length < 1 && (
                        <li>
                          {" "}
                          <div className="collectionimagechanger">
                            <img
                              // onClick={() => Collectiondatashow(item.id)}
                              src="/img/dummy_collection.jpg"
                            />
                          </div>
                        </li>
                      )}


                      {item.dam_media.length > 1 && (
                        <li>
                          {" "}
                          <div className="collectionimagechanger">
                            {item?.dam_media[1]?.is_video == false && (
                              <>
                                <img src={item?.dam_media[1]?.thumbnail} />
                              </>
                            )}
                            {item?.dam_media[1]?.is_video == true && (
                              <>
                                <video className="videoSWithDamData" controls>
                                  <source
                                    src={item?.dam_media[1].thumbnail}
                                    type="video/mp4"
                                  />
                                </video>
                              </>
                            )}
                          </div>
                        </li>
                      )}

                      {item.dam_media.length > 2 && (
                        <>
                          <li>
                            <div className="collectionimagechanger">
                              {item?.dam_media[2]?.is_video == false && (
                                <>
                                  <img src={item?.dam_media[2]?.thumbnail} />
                                </>
                              )}
                            </div>
                            {item?.dam_media[2]?.is_video == true && (
                              <>
                                <video className="videoSWithDamData" controls>
                                  <source
                                    src={item?.dam_media[2].thumbnail}
                                    type="video/mp4"
                                  />
                                </video>
                              </>
                            )}
                          </li>
                        </>
                      )}
                    </div>

                    <div className="collectionname">
                      <p className="looking_contnet">{item?.name}</p>
                      <span className="price_contnetmediasec">
                        <i className="fas fa-shopping-bag"></i>
                        {item?.dam_media.length}
                      </span>
                    </div>
                    {/* <div className="collectionvalue12">
                            
                                          <img
                                            className="startimgst"
                                            src="/img/startimg.png"
                                          />
                                    
                                      </div> */}
                  </div>
                </>
              ))}
            </div>
          </>
        )}

        {/* <div className="cancelButtonnewFolder">
                      <button
                        className="canceButtonnewPop"
                        // onClick={rootfolder}
                      >
                        Cancel
                      </button>
                      <Button
                        className="shareNewPop"
                        onClick={movefilelocation}
                      >
                        Paste
                      </Button>
                    </div> */}
      </div>
    </>
  );
}
export default Member_MovefolderDam;
