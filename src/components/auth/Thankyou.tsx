import { useState } from "react";
import { useParams } from "react-router-dom";
import EmailConfirmation from "components/auth/EmailConfirmation";

const Thankyou = () => {
  const { successPage } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  return (
    <EmailConfirmation
      isLoading={isLoading}
      confirmationMsg={
        <p className="text-center">
          Thank you for registering yourself at Adifect.
          {!successPage && (
            <>
              <br /> An email has been sent to your registered email Id.
              <br /> Kindly verify the email to login and start using our
              services
            </>
          )}
          {successPage && (
            <>
              <br /> Please login to continue
            </>
          )}
        </p>
      }
    />
  );
};

export default Thankyou;
