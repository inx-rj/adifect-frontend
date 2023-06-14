import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SuperAdminDamMovefolderdata,
  SuperAdminlistAllDam,
  SuperAdminDamrootMovefolderdata,
  SuperAdminDamrootMoveCollection,
  SuperAdminDamrootMoveCollectionID,
  // DamCollectionParentImages,
} from "../../redux/actions/Admin-dam-action";

function Admin_Movemedia(props) {
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

  const { Dammovefolder } = useSelector((state) => state.SuperAdmindamfoldermovereducer);
  const { DamROOTmovefolder } = useSelector(
    (state) => state.SuperAdmindamrootfoldermovereducer
  );
  const { Damcollectioncopyfolder } = useSelector(
    (state) => state.SuperAdmindamcollectionmovereducer
  );
  const { Damcollectioncopyfolder1 } = useSelector(
    (state) => state.SuperAdmindamcollectionIDmovereducer
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
    dispatch(SuperAdminDamrootMoveCollection());
    dispatch(SuperAdminDamMovefolderdata());
    dispatch(SuperAdminDamrootMovefolderdata());
  }, []);

  const selectcollection = (id) => {
    if (count.includes(id)) {
      setcount(count.filter((el, i) => el !== id));
    } else {
      setcount([id]);
    }
    localStorage.setItem("collectiontrue", id);
    localStorage.setItem("moveparentid", id);
  };

  const rootfolder = () => {
    let imageshow = localStorage.getItem("imageshow");
    if (imageshow) {
      setshowcollection(true);
    }
    props.setSkillsMove()
    setmovefoldershow(true);
    setshowcollectionid(false);
    localStorage.removeItem("moveparentid");
    dispatch(SuperAdminDamMovefolderdata());
    dispatch(SuperAdminDamrootMovefolderdata());
    setState([]);
    setStateid([]);
    setStateparent([]);
    setStateparentid([]);
    setParentidvalue();
    // setShowFolderModal(true);
  };

  const copynavigate = (parent, is_parent, id, name) => {
    setmovefoldershow(false);
    setmoveparentid(id);
    props.setSkillsMove(id)
    setshowcollection(false);
    localStorage.setItem("moveparentid", id);
    dispatch(SuperAdminlistAllDam(id));
    setAddNew([...addNew]);
    setParentidvalue(id);
    dispatch(SuperAdminDamMovefolderdata(id));
    dispatch(SuperAdminDamrootMoveCollectionID(id));
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
      dispatch(SuperAdminDamMovefolderdata(parentidbreedcrumbs));
      dispatch(SuperAdminDamrootMoveCollectionID(parentidbreedcrumbs));
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
                    <img className="selected_check_icon" src="/img/allok.png" />
                    <div
                      className="movefolimg"
                      onClick={() => selectcollection(item.id)}
                    >
                      <li>
                        <div className="collectionimageupload collectionimageuploadimg">
                          <img src={item?.dam_media[0]?.thumbnail} />
                        </div>
                      </li>

                      {item.dam_media.length > 1 && (
                        <li>
                          {" "}
                          <div className="collectionimageupload collectionimageuploadimg">
                            <img src={item?.dam_media[1]?.thumbnail} />
                          </div>
                        </li>
                      )}
                      {item.dam_media.length > 2 && (
                        <>
                          <li>
                            <div className="collectionimageupload collectionimageuploadimg">
                              <img src={item?.dam_media[2]?.thumbnail} />
                            </div>
                          </li>
                        </>
                      )}
                    </div>

                    <div className="collectionname">
                      <p className="looking_contnet">{item?.name}</p>
                      {/* <span className="price_contnetmediasec">
                        <i className="fas fa-shopping-bag"></i>
                        {item?.dam_media.length}
                      </span> */}
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
                    <img className="selected_check_icon" src="/img/allok.png" />
                    <div
                      className="movefolimg"
                      onClick={() => selectcollection(item.id)}
                    >
                      <img
                        className="selected_check_icon"
                        src="/img/allok.png"
                      />
                      <li>
                        <div className="collectionimagechanger ">
                          <img src={item?.dam_media[0]?.thumbnail} />
                        </div>
                      </li>

                      {item.dam_media.length > 1 && (
                        <li>
                          {" "}
                          <div className="collectionimagechanger">
                            <img src={item?.dam_media[1]?.thumbnail} />
                          </div>
                        </li>
                      )}

                      {item.dam_media.length > 2 && (
                        <>
                          <li>
                            <div className="collectionimagechanger">
                              <img src={item?.dam_media[2]?.thumbnail} />
                            </div>
                          </li>
                        </>
                      )}
                    </div>

                    <div className="collectionname">
                      <p className="looking_contnet">{item?.name}</p>
                      {/* <span className="price_contnetmediasec">
                        <i className="fas fa-shopping-bag"></i>
                        {item?.dam_media.length}
                      </span> */}
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
export default Admin_Movemedia;
