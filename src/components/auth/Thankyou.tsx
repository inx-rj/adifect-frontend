import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Logo from "components/common/logo/Logo";

const Thankyou = () => {
  const { successPage } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  return (
    <>
      {isLoading ? (
        // <LoadingSpinner />
        <></>
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
                    <a href="/">
                      <img
                        src="/img/logonew.svg"
                        className="login-logo"
                        alt=""
                      />
                    </a>
                  </div>

                  <p className="text-center">
                    Thank you for registering yourself at Adifect.
                    {!successPage && (
                      <>
                        <br /> An email has been sent to your registered email
                        Id.
                        <br /> Kindly verify the email to login and start using
                        our services
                      </>
                    )}
                    {successPage && (
                      <>
                        <br /> Please login to continue
                      </>
                    )}
                  </p>
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

export default Thankyou;
