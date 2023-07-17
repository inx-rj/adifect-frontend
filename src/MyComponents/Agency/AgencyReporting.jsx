import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSingleEffect } from "../../hooks/useSingleEffect";
import { AGENCY_Company_DETAILS_RESET } from "../../constants/AgencyCompany-constant";
import { listAllCompanies } from "../../redux/actions/Workflow-company-action";
import AgencyCompaniesDropDown from "./AgencyCompaniesDropDown";
import AgencyReportingIframe from "./AgencyReportingIframe";
import { useUpdateEffect } from "../../hooks/useUpdateEffect";
import AgencyReportingNoDataFound from "./AgencyReportingNoDataFound";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const AgencyReporting = () => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(0);
  const [embeddedURL, setEmbeddedURL] = useState("");
  const [isLoadingIframe, setIsLoadingIframe] = useState(false);

  // Get Companies list from store.
  const { companyData, loading: stagesLoading } = useSelector(
    (state) => state.agencyCompanyReducer
  );

  // Fetch Companies
  useSingleEffect(() => {
    dispatch({ type: AGENCY_Company_DETAILS_RESET });
    dispatch(listAllCompanies());
  });

  // On update filter the data and re-render the component
  useUpdateEffect(() => {
    if (selectedValue) {
      setIsLoadingIframe(true);
      companyData
        ?.filter((item) => item.id === selectedValue)
        .map((item) => {
          setEmbeddedURL(item?.embedded_url);
          setTimeout(() => {
            setIsLoadingIframe(false);
          }, 500);
          return item;
        });
    }
  }, [selectedValue]);

  // Set default selected data for listing dropdown
  useUpdateEffect(() => {
    if (companyData?.[0]) {
      setSelectedValue(companyData?.[0]?.id);
    }
  }, [companyData?.[0]]);

  return (
    <div>
      <div className="min-h-[calc(100vh-75px)] my-[30px] bg-white mx-[25px] p-4 rounded">
        <div className="flex items-center justify-between mb-4">
          <h1>Reporting</h1>
          <div>
            <AgencyCompaniesDropDown
              isLoading={stagesLoading}
              companyData={companyData}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          </div>
        </div>
        {companyData?.length > 0 && (
          <div>
            {embeddedURL && !isLoadingIframe ? (
              <AgencyReportingIframe iframeURL={embeddedURL} />
            ) : isLoadingIframe ? (
              <div>
                <Box className="flex items-center justify-center h-[calc(100vh-150px)]">
                  <CircularProgress />
                </Box>
              </div>
            ) : (
              <div>
                <AgencyReportingNoDataFound />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default AgencyReporting;
