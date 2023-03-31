import { Suspense, lazy, useState } from "react";
// import "./assets/css/App.css";
// import "./assets/css/Responsive.css";

const RouteApp = lazy(() => import("./RouteApp"));

const App = () => {
  return (
    <Suspense fallback={"loading..."}>
      <RouteApp />
    </Suspense>
  );
};

export default App;
