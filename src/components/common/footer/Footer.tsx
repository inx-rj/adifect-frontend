import React, { Suspense, lazy } from "react";

// Import lazy load component
const Logo = lazy(() => import("components/common/logo/Logo"));

const Footer: React.FC = () => {
  return (
    <footer className="bg-white p-2 shadow-sm flex items-center justify-center relative z-[11]">
      <div className="logo h-[35px] max-w-[100px] lg:max-w-[130px] w-full p-0 md:px-4">
        <Suspense fallback={""}>
          <Logo />
        </Suspense>
      </div>
    </footer>
  );
};
export default Footer;
