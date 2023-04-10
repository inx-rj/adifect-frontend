import React, { Suspense, lazy } from "react";

// Import lazy load component
const Logo = lazy(() => import("components/common/logo/Logo"));

const Footer: React.FC = () => {
  return (
    <footer className="bg-white p-2 shadow-sm flex items-center justify-center">
      <div className="logo h-[35px] max-w-[10px] lg:max-w-[130px] w-full px-4">
        <Suspense fallback={""}>
          <Logo />
        </Suspense>
      </div>
    </footer>
  );
};
export default Footer;
