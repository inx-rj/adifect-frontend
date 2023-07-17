const AgencyReportingIframe = ({ iframeURL = "" }) => {
  return (
    <div className="agency-reporting">
      <iframe
        width="100%"
        height="100%"
        src={iframeURL}
        title="agency_company_reporting"
        className="min-h-screen border-0"
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default AgencyReportingIframe;
