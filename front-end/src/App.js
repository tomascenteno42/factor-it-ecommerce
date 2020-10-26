import React from "react";

import { Router } from "./components/Router.jsx";

import { ToastProvider } from "react-toast-notifications";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const App = () => {
  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={2000}
      placement="bottom-right"
    >
      <Router />
    </ToastProvider>
  );
};

export default App;
