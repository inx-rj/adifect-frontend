
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCreatorRatingDetails } from "../../../redux/actions/auth-actions";
import Rating from "@mui/material/Rating";
import moment from "moment";
import { Menu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const Creator_profile_feedback = () => {
  const dispatch = useDispatch();

  const [searchfeedback, setSearchfeedback] = useState("");
  const [sortRating, setSortRating] = useState("-created");
  const [orderingName, setOrderingName] = useState("Sort by newest");

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  const handleCloseSort = () => {
    setAnchorEl(null);
  };

  const handleClickSort = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuOptions = [
    { id: 1, name: "Sort by newest", value: "-created" },
    { id: 2, name: "Sort by oldest", value: "created" },
    { id: 3, name: "Sort by highest", value: "-rating" },
    { id: 4, name: "Sort by lowest", value: "rating" },
  ];

  const menuHandleSort = (event, value, name) => {
    handleCloseSort();
    setSortRating(value)
    setOrderingName(name);
  };

  useEffect(() => {
    const handler = () => {
      setAnchorEl(null);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const {
    CreatorRatingDetails,
    error: appliedError,
    loading: ratingsLoading,
    success: CreatorRatingDetailsSucces,
  } = useSelector((state) => state.getCreatorRatingDetailsReducer);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  useEffect(() => {
    dispatch(getCreatorRatingDetails(searchfeedback, sortRating));
  }, [searchfeedback, sortRating]);

  return (
    <>
      <div className="allContentOfFeedbackPPView">
        <div className="seachActivityMostRecentPP">
          <div className="searchActivityPublicP">
            <input
              className="newSearchActInputPp"
              type="text"
              value={searchfeedback}
              placeholder="Search Activity"
              onChange={(e) => setSearchfeedback(e.target.value)}
            />
            <img className="newSearchLogoPp" src="/img/newSearchIcon.png" />
          </div>
           <div className="MostRecentFeedbackP">
          <h6
            className="creatorprtite"
            style={{ cursor: "pointer" }}
            onClick={handleClickSort}
          >
            <img src="/img/Sort.png" alt="" /> {orderingName}
          </h6>
          </div> 

          <Menu
            id="long-menu"
            MenuProps={menuProps}
            anchorEl={anchorEl}
            keepMounted
            open={openMenu}
            onClose={handleCloseSort}
          >
            {menuOptions?.map((option) => (
              <MenuItem
                key={option.id}
                onClick={(e) => menuHandleSort(e, option.value, option.name)}
              >
                {option.name}
              </MenuItem>
            ))}
          </Menu>
        </div>
        {CreatorRatingDetails?.results?.map((item, index) => (
            <div className="fiveStartsAnddateFeedbackmain" key={index}>
              <div className="fiveStarsFeedbackFirst">
                <Rating value={item.rating} />
                <h3 className="timeFiveStarts">
                  {item.rating}.0
                  <span className="dateFiveStars">
                    {moment(item.created).format("MMMM D, h:mm A")}
                  </span>
                </h3>
              </div>
              <p className="paragraphOffeedbackMsg">{item.feedback}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Creator_profile_feedback;
