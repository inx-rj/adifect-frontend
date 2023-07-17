const AgencyReportingNoDataFound = () => {
  return (
    <div className="text-center">
      <div className="w-full flex items-center justify-center max-w-[300px] mx-auto">
        <img
          className="w-full h-full object-cover"
          src="/img/data-not-found.jpg"
          alt="No data Found"
        />
      </div>
      <h3>No data found</h3>
    </div>
  );
};

export default AgencyReportingNoDataFound;
