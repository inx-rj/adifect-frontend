import React from "react";
import { Link } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";


function ActivityDetail() {
  return (
    <>
      <div className="activity_main">
        <div className="close_contnet_icon">
          <i className="fa fa-close"></i>
        </div>
        <div className="file_name_contnet">
          <h3 className="file_path_name">LookingIntoSky.jpeg</h3>
          <div className="file_text_contnet">
            <h6 className="detail detail1" style={{ color: "#2472fc" }}>
              Details
              {/* <hr className="detaail2" /> */}
            </h6>
            {/* <hr className="last_line_hr"/> */}
            <h5 className="detail ">Activity</h5>
          </div>

          <div className="update_file">
            <h6 className="upload_contnet">
              <span className="date_contnet"> Uploaded</span>July 23, 2022
            </h6>
            <h6 className="upload_contnet">
              <span className="date_contnet"> Uploaded by</span>John Doe
            </h6>
            <h6 className="upload_contnet">
              <span className="date_contnet"> Company</span>Stark Industries
            </h6>
            <h6 className="upload_contnet">
              <span className="date_contnet"> File size</span>185 KB
            </h6>
            <h6 className="upload_contnet">
              <span className="date_contnet"> Jobs</span>6
            </h6>
            <h6 className="upload_contnet">
              <span className="date_contnet"> Jobs</span>6
            </h6>
          </div>
          <div className="Createmidebtn11 ">
            <button className="crbdnmide11">
              <i className="fa fa-plus"></i>
              Create
            </button>
          </div>
          <div className="toggle_btn_contnet">
            <FormGroup>
              <FormControlLabel control={<Switch />} label="Limit Usage" />
              <input
              className="toggle_slider_title"
              type="text"
              placeholder="20"
            />
            <p className="toggle_text">This file has been used in 6 jobs</p>
              <FormControlLabel control={<Switch />} label="Require Approval" />
            </FormGroup>
          </div>
          <div className="select-box_title1">
            <p className="useage_contnet">Usage</p>
            <select className="company_contnet">
              <option value="volvo">Publicly available</option>
              <option value="saab">Publicly available</option>
              <option value="opel">Publicly available</option>
              <option value="audi">Publicly available</option>
            </select>
          </div>
          <div className="title_contnet_name">
            <p className="tit_contnet1">Title</p>
            <input
              className="file_text_title"
              type="text"
              placeholder=" LookingIntoSky.jpeg"
            />
          </div>
          <div className="message_textarea_content1">
            <p className="message_content">Description</p>
            <textarea className=" Textbox-textarea-content " placeholder="" />
            <p className="number-count">0/4000</p>
          </div>

          <div className="tag_contnet1">
            <p className="skil11">Skills</p>
            <div className="skill_name_contnet11">
              <Link to="#" className="skillname_contnet">
                skill Name
              </Link>
              <Link to="#" className="skillname_contnet">
                skill Name2
              </Link>
            </div>
            <p className="skil2">Tags</p>
            <div className="skill_name_contnet2">
              <Link to="#" className="skillname_contnet">
                Tag Name
              </Link>
              <Link to="#" className="skillname_contnet">
                Tag Name2
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ActivityDetail;
