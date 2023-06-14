import React from "react";
import Mediamanager from "../Frontend/Mediamanager";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function PopupMedia() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="topsliderdiv">
        <div className="sliderAdva">
          <div className="media_manager">
            <div className="media_contnet"></div>
          </div>

          <div className="advanced_btn">
            <button
              onClick={handleClickOpen}>


Browse Vault
            </button>
            <Dialog
              className="dampopupDialog"
              open={open}
              onClose={handleClose}
            >
              <DialogTitle className="dampopupDialog">
                <div className="media_valut_contnet">
                  <div className="media_text11">
                    <h1>Media Vault</h1>
                  </div>
                  <div className="input_media11">
                    <input type="text" placeholder="Search Files and Folders" className="file_input2" /> <div className="seerch_ingine"><i className="fa fa-search"></i></div>
                  </div>
                  <span onClick={handleClose}>
                    <i className="fa-solid fa-xmark"></i>
                  </span>

                </div>
                <div className="media_valut_contnet">
                  <div className="media_text11">
                    <button className="create_btn_popup"> 
                      <i className="fa fa-plus"></i>
                      Create
                    </button>
                  </div>
                  <div className="input_media11">
                    <div className="files_selected">
                      <div className="select_contnet22">
                        <h6 className="circle">1</h6>
                        <span className="files_dam_pop">files selected</span>

                      </div>
                      <div className="social_icon_contnet">
                        <img className="vector_img22" src="/img/deletebtnblue.png" />

                        <img className="vector_img22" src="/img/closebtnblue.png" />

                      </div>
                    </div>
                  </div>
                  <div className="vector_toggle">
                    <img className="vector_img" src="/img/mediaimagevector.png" />
                  </div>

                </div>



              </DialogTitle>
              <div className="dialogcontent_and_actions">
                <DialogContent className="popupimage_and_names">

                  <div className="slidertoppage">
                    <div className="main_slider">
                      <div className="Sort_by_content">
                        <h4 className="popupsort_contnet">Sort by</h4>
                      </div>
                      <div className="container1">
                        <div className="radio1">
                          <input id="radio-1" name="radio" type="radio" checked />
                          <label htmlFor="radio-1" className="radio-label">
                            Best match
                          </label>
                        </div>

                        <div className="radio1">
                          <input id="radio-2" name="radio" type="radio" />
                          <label htmlFor="radio-2" className="radio-label">
                            Most used
                          </label>
                        </div>

                        <div className="radio1">
                          <input id="radio-3" name="radio" type="radio" />
                          <label htmlFor="radio-3" className="radio-label">
                            Newest
                          </label>
                        </div>
                      </div>
                      {/* <hr className="sort_end" /> */}
                      <div className="file_contnet">
                        <h4>File types</h4>
                      </div>
                      <div className="container2">
                        <div className="checkbox1">
                          <input
                            id="checkbox-1"
                            name="checkbox"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-1" className="checkbox-label1">
                            All
                          </label>
                        </div>

                        <div className="checkbox11">
                          <input
                            id="checkbox-2"
                            name="radio"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-2" className="checkbox-label1">
                            Your Favorites{" "}
                            <span className="files_types_size">28</span>
                          </label>
                        </div>

                        <div className="checkbox11">
                          <input
                            id="checkbox-3"
                            name="radio"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-3" className="checkbox-label1">
                            Photos<span className="files_types_size">473</span>
                          </label>
                        </div>
                        <div className="checkbox11">
                          <input
                            id="checkbox-4"
                            name="radio"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-4" className="checkbox-label1">
                            Audio<span className="files_types_size">15</span>
                          </label>
                        </div>
                        <div className="checkbox11">
                          <input
                            id="checkbox-5"
                            name="radio"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-5" className="checkbox-label1">
                            Videos<span className="files_types_size">18</span>
                          </label>
                        </div>
                        <div className="checkbox11">
                          <input
                            id="checkbox-6"
                            name="radio"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-6" className="checkbox-label1">
                            Documents<span className="files_types_size">34</span>
                          </label>
                        </div>
                        <div className="checkbox11">
                          <input
                            id="checkbox-7"
                            name="radio"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-7" className="checkbox-label1">
                            Collections<span className="files_types_size">1</span>
                          </label>
                        </div>
                      </div>
                      {/* file Type end */}
                      {/* <hr className="sort_end" /> */}
                      <div className="file_contnet">
                        <h4>Creator</h4>
                      </div>
                      <div className="container3">
                        <div className="checkbox1">
                          <input
                            id="checkbox-1"
                            name="checkbox"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-1" className="checkbox-label1">
                            All
                          </label>
                        </div>

                        <div className="checkbox11">
                          <input
                            id="checkbox-2"
                            name="radio"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-2" className="checkbox-label1">
                            Name 1
                          </label>
                        </div>

                        <div className="checkbox11">
                          <input
                            id="checkbox-3"
                            name="radio"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-3" className="checkbox-label1">
                            Name 2
                          </label>
                        </div>
                        <div className="checkbox11">
                          <input
                            id="checkbox-4"
                            name="radio"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-4" className="checkbox-label1">
                            Name 3
                          </label>
                        </div>
                        <div className="checkbox11">
                          <input
                            id="checkbox-5"
                            name="radio"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-5" className="checkbox-label1">
                            Name 4
                          </label>
                        </div>
                        <div className="checkbox11">
                          <input
                            id="checkbox-6"
                            name="radio"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-6" className="checkbox-label1">
                            Name 5
                          </label>
                        </div>
                        <div className="checkbox11">
                          <input
                            id="checkbox-7"
                            name="radio"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-7" className="checkbox-label1">
                            Name 6
                          </label>
                        </div>
                      </div>
                      {/* crator end */}
                      {/* <hr className="sort_end" /> */}
                      <div className="file_contnet">
                        <h4>Usage rights</h4>
                      </div>
                      <div className="container3">
                        <div className="checkbox1">
                          <input
                            id="checkbox-1"
                            name="checkbox"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-1" className="checkbox-label1">
                            All
                          </label>
                        </div>

                        <div className="checkbox11">
                          <input
                            id="checkbox-2"
                            name="radio"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-2" className="checkbox-label1">
                            Approved
                          </label>
                        </div>

                        <div className="checkbox11">
                          <input
                            id="checkbox-3"
                            name="radio"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-3" className="checkbox-label1">
                            Under Review
                          </label>
                        </div>
                        <div className="checkbox11">
                          <input
                            id="checkbox-4"
                            name="radio"
                            type="checkbox"
                            checked
                          />
                          <label htmlFor="checkbox-4" className="checkbox-label1">
                            Archived
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="sliderleftsec">
                      <Mediamanager />
                    </div>
                  </div>
                </DialogContent>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
export default PopupMedia;
