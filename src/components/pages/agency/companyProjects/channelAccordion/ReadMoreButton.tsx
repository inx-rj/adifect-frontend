import { Button, Typography } from "@mui/material";
import { useState } from "react";

const ReadMoreButton = (props) => {
  const { textContent } = props;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <>
      <div className="text">
        <Typography
          id="info-para"
          sx={{ textAlign: "justify" }}
          dangerouslySetInnerHTML={{
            __html: isReadMore ? textContent?.slice(0, 395) : textContent,
          }}
        />
        <Button
          variant="contained"
          className="btn btn-primary"
          onClick={toggleReadMore}
        >
          {isReadMore ? "View More" : "Show Less"}
        </Button>
      </div>
    </>
  );
};

export default ReadMoreButton;
