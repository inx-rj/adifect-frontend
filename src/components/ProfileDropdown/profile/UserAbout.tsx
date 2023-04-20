import { AccountCircleOutlined, LanguageOutlined } from "@mui/icons-material";
import { ProfilePageAccess } from "helper/config/config";

interface UserAboutType {
  data: any;
  navType: string;
}

const UserAbout = (props: UserAboutType) => {
  const { data, navType = "user" } = props;
  return (
    <>
      <h5 className="card-page-title text-base mb-4">
        {data?.name ? data?.name : data?.sub_title ?? ""}
      </h5>
      <p className="card-page-info text-sm">
        {data?.description
          ? data?.description
          : data?.profile_description ?? ""}
      </p>
      <ul className="text-sm flex gap-3">
        {navType === ProfilePageAccess.COMPANY && data?.agency_name && (
          <li className="flex items-center gap-2">
            <i className="bg-theme w-9 h-9 flex-center rounded-full p-2 text-white">
              <AccountCircleOutlined />
            </i>
            <div className="w-[calc(100%-35px)]">
              <label className="block text-[#71757B]">Owner</label>
              <p>{data?.agency_name ?? ""}</p>
            </div>
          </li>
        )}
        {data?.website && (
          <li className="flex items-center gap-2">
            <i className="bg-theme w-9 h-9 flex-center rounded-full p-2 text-white">
              <LanguageOutlined />
            </i>
            <div className="w-[calc(100%-35px)]">
              <label className="block text-[#71757B]">Website</label>
              <a target="_blank" href={data?.website ?? ""}>
                {data?.website ?? ""}
              </a>
            </div>
          </li>
        )}
        {data?.Language && (
          <li className="flex items-center gap-2">
            <i className="bg-theme w-9 h-9 flex-center rounded-full p-2 text-white">
              <LanguageOutlined />
            </i>
            <div className="w-[calc(100%-35px)]">
              <label className="block text-[#71757B]">Language</label>
              <p>{data?.Language ?? "English (US)"}</p>
            </div>
          </li>
        )}
      </ul>
    </>
  );
};

export default UserAbout;
