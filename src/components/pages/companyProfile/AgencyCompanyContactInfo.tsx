
const AgencyCompanyContactInfo = ({ companyData }) => {
  return (
    <div className="card border p-4 z-[1] relative mt-[14px]">
      <h5 className="card-page-title text-base mb-4">Contact Information</h5>
      <ul className="text-sm flex flex-col gap-[15px]">
        <li className="flex items-center gap-[10px]">
          <label className="block text-[#71757B]">Email Address:</label>
          <p>{companyData?.company_email ?? ""}</p>
        </li>
        <li className="flex items-center gap-[10px]">
          <label className="block text-[#71757B]">Phone Number:</label>
          <p>{companyData?.company_phone_number ?? ""}</p>
        </li>
        <li className="flex items-center gap-[10px]">
          <label className="block text-[#71757B]">Industry:</label>
          <p>{companyData?.industry_name ?? ""}</p>
        </li>
      </ul>
    </div>
  );
};

export default AgencyCompanyContactInfo;
