import React from "react";

const Agency_profile_feedback = () => {
  return (
    <>
      <div className="allContentOfFeedbackPPView">
        <div className="seachActivityMostRecentPP">
          {/* <div className="searchActivityPublicP">
                          <input type="text" placeholder="Search Activity" />
                        </div> */}
          <div className="searchActivityPublicP">
            <input
              className="newSearchActInputPp"
              type="text"
              placeholder="Search Activity"
            />
            <img className="newSearchLogoPp" src="/img/newSearchIcon.png" />
          </div>
          <div className="MostRecentFeedbackP">
            <button className="mostRecentButtonFeedback">
              <img src="/img/activityarrowold.png" alt="" />
              Most recent first
            </button>
          </div>
        </div>
        <div className="fiveStartsAnddateFeedbackmain">
          <div className="fiveStarsFeedbackFirst">
            <img src="/img/Frame 220.png" alt="" />
            <h3 className="timeFiveStarts">
              5.00
              <span className="dateFiveStars">july 25,2022</span>
            </h3>
          </div>
          <p className="paragraphOffeedbackMsg">
            “Working with Tony was easy, he was really fast and communicative.
            Definitely would use him again. “
          </p>
        </div>
        <div className="fiveStartsAnddateFeedbackmain">
          <div className="fiveStarsFeedbackFirst">
            <img src="/img/Frame 220.png" alt="" />
            <h3 className="timeFiveStarts">
              5.00
              <span className="dateFiveStars">july 18,2022</span>
            </h3>
          </div>
          <p className="paragraphOffeedbackMsg">
            "Working with Tony is always a pleasure - a professional that knows
            what to do and gets it done in on schedule and on budget!"
          </p>
        </div>
        <div className="fiveStartsAnddateFeedbackmain">
          <div className="fiveStarsFeedbackFirst">
            <img src="/img/Frame 220.png" alt="" />
            <h3 className="timeFiveStarts">
              5.00
              <span className="dateFiveStars">july 17,2022</span>
            </h3>
          </div>
          <p className="paragraphOffeedbackMsg">
            “Working with Tony was a dream come true for our growing company! He
            is extremely skilled, reliable, a great communicator, a fast worker,
            and delivers a top notch product. He worked with us patiently and
            effectively throughout every step of the process in designing our
            new website. Everything that we brought to him was addressed with
            the utmost in clarity and professionalism, he simply "knows his
            stuff" and knows how to work with people on top of all that.”
          </p>
        </div>
        <div className="fiveStartsAnddateFeedbackmain">
          <div className="fiveStarsFeedbackFirst">
            <img src="/img/Frame 220.png" alt="" />
            <h3 className="timeFiveStarts">
              5.00
              <span className="dateFiveStars">july 14,2022</span>
            </h3>
          </div>
          <p className="paragraphOffeedbackMsg">
            “The quality was great, but I wish we’d gotten the work a little
            faster.”
          </p>
          <div className="freelancerResponse">
            <h3>Freelancer’s response</h3>
            <p className="paragraphOffeedbackMsg">
              “I completed the work a day earlier than our agreed-on date. You
              messaged me midway through the job asking if I could speed it up,
              without offering to pay extra. I kept to the agreed-on terms and
              still delivered early.”
            </p>
          </div>
        </div>
        <div className="fiveStartsAnddateFeedbackmain">
          <div className="fiveStarsFeedbackFirst">
            <img src="/img/Frame 220.png" alt="" />
            <h3 className="timeFiveStarts">
              5.00
              <span className="dateFiveStars">july 25,2022</span>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Agency_profile_feedback;
