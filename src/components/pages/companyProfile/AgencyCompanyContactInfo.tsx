import { AccountCircleOutlined, LanguageOutlined } from "@mui/icons-material";
import ProfileIconListItem from "components/profileDropdown/profile/ProfileIconListItem";
import { useMemo } from "react";

const AgencyCompanyContactInfo = (props) => {

  const {companyData} = props;
  console.log("companyData", companyData?.data, companyData?.data?.company_email,
    companyData?.data?.company_phone_number, companyData?.data?.industry_name);


  //prepare the icons list to display on the profile
  const iconList = useMemo(() => {
    return [
      {
        title: "Owner",
        value: companyData?.data?.agency_name,
        icon: <AccountCircleOutlined />,
      },
      {
        title: "Website",
        value: companyData?.data?.company_website,
        url: companyData?.data?.company_website,
        icon: <LanguageOutlined />,
      },
      {
        title: "Language",
        value: companyData?.data?.Language ?? "English (US)",
        icon: <LanguageOutlined />,
      },
    ];
  }, [
    companyData?.data?.agency_name,
    companyData?.data?.company_website,
    companyData?.data?.Language,
  ]);

  return (
    <>
      <ul className="card drop-shadow-none border p-4 z-[1] flex gap-3 mb-4 text-sm">
        {iconList?.map((item) => item.value && item?.url !== null && (
          <ProfileIconListItem
            icon={item.icon}
            title={item.title}
            value={item?.value}
            url={item?.url}
          />
        ))}
      </ul>
      <div className="card drop-shadow-none border p-4 z-[1] relative mt-[14px]">
        <h5 className="mb-4 text-base card-page-title">Contact Information</h5>
        {!companyData?.data?.company_email &&
      !companyData?.data?.company_phone_number &&
      !companyData?.data?.industry_name ? (
        <p>No data available</p>
      ) : (
        <ul className="text-sm flex flex-col gap-[15px]">
          {companyData?.data?.company_email && (
            <li className="flex items-center gap-[10px]">
              <label className="block text-[#71757B]">Email Address:</label>
              <p>{companyData?.data?.company_email}</p>
            </li>
          )}

          {companyData?.data?.company_phone_number && (
            <li className="flex items-center gap-[10px]">
              <label className="block text-[#71757B]">Phone Number:</label>
              <p>{companyData?.data?.company_phone_number}</p>
            </li>
          )}
          {companyData?.data?.industry_name && (
            <li className="flex items-center gap-[10px]">
              <label className="block text-[#71757B]">Industry:</label>
              <p>{companyData?.data?.industry_name}</p>
            </li>
          )}
        </ul>
        )}
      </div>
    </>
  );
};

export default AgencyCompanyContactInfo;
