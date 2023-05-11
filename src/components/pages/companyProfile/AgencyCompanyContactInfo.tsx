const AgencyCompanyContactInfo = ({ companyData }) => {
  return (
    <div className="card border p-4 z-[1] relative mt-[14px]">
      <h5 className="mb-4 text-base card-page-title">Contact Information</h5>
      {!companyData?.companyEmail &&
      !companyData?.companyPhone &&
      !companyData?.industryName ? (
        <p>No data available</p>
      ) : (
        <ul className="text-sm flex flex-col gap-[15px]">
          {companyData?.companyEmail && (
            <li className="flex items-center gap-[10px]">
              <label className="block text-[#71757B]">Email Address:</label>
              <p>{companyData?.companyEmail}</p>
            </li>
          )}

          {companyData?.companyPhone && (
            <li className="flex items-center gap-[10px]">
              <label className="block text-[#71757B]">Phone Number:</label>
              <p>{companyData?.companyPhone}</p>
            </li>
          )}
          {companyData?.industryName && (
            <li className="flex items-center gap-[10px]">
              <label className="block text-[#71757B]">Industry:</label>
              <p>{companyData?.industryName}</p>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AgencyCompanyContactInfo;
