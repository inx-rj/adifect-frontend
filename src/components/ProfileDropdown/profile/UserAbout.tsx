import { LanguageOutlined } from "@mui/icons-material";

const NAVTYPE = {
  USER: "user",
  COMPANY: "company",
};

const UserAbout = ({
  data,
  navType = "user",
}: {
  data: any;
  navType?: string;
}) => {
  return (
    <>
      <h5 className="card-page-title text-base mb-4">
        {data?.name ? data?.name : data?.sub_title ?? "My Info"}
      </h5>
      <p className="card-page-info text-sm">
        {data?.description
          ? data?.description
          : data?.profile_description ?? "This is agency description."}
      </p>
      <ul className="text-sm flex gap-3">
        {navType === NAVTYPE.COMPANY && (
          <li className="flex items-center gap-2">
            <i className="bg-theme w-9 h-9 flex-center rounded-full p-2 text-white">
              <LanguageOutlined />
            </i>
            <div className="w-[calc(100%-35px)]">
              <label className="block text-[#71757B]">Owner</label>
              <p>{`${data?.agency_name}`}</p>
            </div>
          </li>
        )}
        <li className="flex items-center gap-2">
          <i className="bg-theme w-9 h-9 flex-center rounded-full p-2 text-white">
            <LanguageOutlined />
          </i>
          <div className="w-[calc(100%-35px)]">
            <label className="block text-[#71757B]">Website</label>
            <p>{data?.website ?? "adifect.com"}</p>
          </div>
        </li>
        <li className="flex items-center gap-2">
          <i className="bg-theme w-9 h-9 flex-center rounded-full p-2 text-white">
            <LanguageOutlined />
          </i>
          <div className="w-[calc(100%-35px)]">
            <label className="block text-[#71757B]">Language</label>
            <p>{data?.Language ?? "English (US)"}</p>
          </div>
        </li>
      </ul>
    </>
  );
};

export default UserAbout;
