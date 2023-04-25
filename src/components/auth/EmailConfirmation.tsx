import { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "components/common/logo/Logo";
import LoadingSpinner from "components/common/loadingSpinner/Loader";

const EmailConfirmation = ({ confirmationMsg, isLoading }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="login-signup-wrapper">
          <div className="card max-w-[380px] w-full">
            <div className="max-w-[150px] md:max-w-[200px] w-full mx-auto my-3 h-[65px]">
              <Logo />
            </div>
            <div className="thankyoupage">
              <div className="login-content-registering">
                <div className="thanktext">
                  <div className="logo-content">
                    <Link to="/">
                      <img
                        src="/img/logonew.svg"
                        className="login-logo"
                        alt=""
                      />
                    </Link>
                  </div>
                  {confirmationMsg}
                  <div className="center mt-4 thankyoudiv flex justify-center">
                    <Link to="/" type="button" className="btn btn-primary">
                      Log In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailConfirmation;