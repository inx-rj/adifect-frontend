import React from "react";
import Mediamanager from "../Frontend/Mediamanager";

function Media() {
  return (
    <>
      <div className="topsliderdiv">
        <div className="sliderAdva">
          <div class="media_manager">
            <div class="media_contnet"></div>
          </div>

          <div class="advanced_btn"></div>
        </div>

        <div className="slidertoppage">
          <div className="main_slider">
            <div className="Sort_by_content">
              <h4 className="sort_contnet">Sort by</h4>
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
                <input id="checkbox-2" name="radio" type="checkbox" checked />
                <label htmlFor="checkbox-2" className="checkbox-label1">
                  Your Favorites <span className="files_types_size">28</span>
                </label>
              </div>

              <div className="checkbox11">
                <input id="checkbox-3" name="radio" type="checkbox" checked />
                <label htmlFor="checkbox-3" className="checkbox-label1">
                  Photos<span className="files_types_size">473</span>
                </label>
              </div>
              <div className="checkbox11">
                <input id="checkbox-4" name="radio" type="checkbox" checked />
                <label htmlFor="checkbox-4" className="checkbox-label1">
                  Audio<span className="files_types_size">15</span>
                </label>
              </div>
              <div className="checkbox11">
                <input id="checkbox-5" name="radio" type="checkbox" checked />
                <label htmlFor="checkbox-5" className="checkbox-label1">
                  Videos<span className="files_types_size">18</span>
                </label>
              </div>
              <div className="checkbox11">
                <input id="checkbox-6" name="radio" type="checkbox" checked />
                <label htmlFor="checkbox-6" className="checkbox-label1">
                  Documents<span className="files_types_size">34</span>
                </label>
              </div>
              <div className="checkbox11">
                <input id="checkbox-7" name="radio" type="checkbox" checked />
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
                <input id="checkbox-2" name="radio" type="checkbox" checked />
                <label htmlFor="checkbox-2" className="checkbox-label1">
                  Name 1
                </label>
              </div>

              <div className="checkbox11">
                <input id="checkbox-3" name="radio" type="checkbox" checked />
                <label htmlFor="checkbox-3" className="checkbox-label1">
                  Name 2
                </label>
              </div>
              <div className="checkbox11">
                <input id="checkbox-4" name="radio" type="checkbox" checked />
                <label htmlFor="checkbox-4" className="checkbox-label1">
                  Name 3
                </label>
              </div>
              <div className="checkbox11">
                <input id="checkbox-5" name="radio" type="checkbox" checked />
                <label htmlFor="checkbox-5" className="checkbox-label1">
                  Name 4
                </label>
              </div>
              <div className="checkbox11">
                <input id="checkbox-6" name="radio" type="checkbox" checked />
                <label htmlFor="checkbox-6" className="checkbox-label1">
                  Name 5
                </label>
              </div>
              <div className="checkbox11">
                <input id="checkbox-7" name="radio" type="checkbox" checked />
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
                <input id="checkbox-2" name="radio" type="checkbox" checked />
                <label htmlFor="checkbox-2" className="checkbox-label1">
                  Approved
                </label>
              </div>

              <div className="checkbox11">
                <input id="checkbox-3" name="radio" type="checkbox" checked />
                <label htmlFor="checkbox-3" className="checkbox-label1">
                  Under Review
                </label>
              </div>
              <div className="checkbox11">
                <input id="checkbox-4" name="radio" type="checkbox" checked />
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
      </div>
    </>
  );
}
export default Media;
