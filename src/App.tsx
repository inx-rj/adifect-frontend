import { Suspense, lazy, useState } from "react";

const RouteApp = lazy(() => import("./RouteApp"));

const App = () => {
  return (
    <Suspense fallback={"loading..."}>
      <RouteApp />
    </Suspense>
  );
};

export default App;
