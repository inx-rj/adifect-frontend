import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

const TaskAssets = (props) => {
  const { myTaskDetails } = props;

  return (
    <>
      <div>
        {myTaskDetails?.length > 0 ? (
          myTaskDetails?.map((asset, index) => {
            return (
              <div key={index}>
                {" "}
                {asset?.field_type === "file" && (
                  <>
                    <div className="attachAssertspopDivfirst">
                      <a
                        href={asset.field_value}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="w-full flex items-center justify-between relative overflow-ellipsis z-[6]"
                      >
                        <div className="flex gap-2">
                          <img
                            className="attachAssertspopImage h-[20px] mr-0"
                            src="/img/assertgallery.png"
                          />
                          <p className="truncate"> {asset.field_name}</p>
                        </div>
                        <p className="w-[20px]">
                          <VisibilityIcon fontSize="small" />
                        </p>
                      </a>
                    </div>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <>No Task Attachment Found</>
        )}
      </div>
    </>
  );
};

export default TaskAssets;
