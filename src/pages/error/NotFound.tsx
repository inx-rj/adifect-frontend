import { Link, useNavigate } from "react-router-dom";
// import Button from "../../components/common/button/Button";
import { Images } from "../../helper/images";
import { SYSTEM } from "../../routes/baseRoute";

const NotFound = () => {
  const navigate = useNavigate();
  const handleBack = (e: any) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <div>
      <div className="max-w-2xl mx-auto py-5">
        {/* <img className="" src={Images.NotFound} /> */}
        <div className="space-y-3">
          <h1 className="text-theme text-center font-bold">
            Sorry! We couldn't find this page.
          </h1>
        </div>
        <div className="mt-5 flex items-center gap-3 justify-center">
          {/* <Button
            type="button"
            className="btn-primary btn-outline"
            onClick={(e) => handleBack(e)}
            text="Go Back"
          /> */}
          <Link className="btn btn-primary" to={SYSTEM.HOME}>
            Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
