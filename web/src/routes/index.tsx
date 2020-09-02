import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Landing from "../pages/Landing";
import TeacherList from "../pages/TeacherList";
import TeacherForm from "../pages/TeacherForm";
import Login from "../pages/Login";
import Register from "../pages/Register/indes";
import SuccessRegister from "../pages/SuccessRegister";
import ForgotPassword from "../pages/ForgotPassword";
import SuccessSendResetPasswordEmail from "../pages/SuccessSendResetPasswordEmail";
import UpdatePassword from "../pages/UpdatePassword";

function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/success-register" component={SuccessRegister} />
      <Route
        path="/success-send-reset-password-email"
        component={SuccessSendResetPasswordEmail}
      />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/update-password/:userId/:token" component={UpdatePassword} />
      <PrivateRoute path="/landing" component={Landing} />
      <PrivateRoute path="/study" component={TeacherList} />
      <PrivateRoute path="/give-classes" component={TeacherForm} />
    </BrowserRouter>
  );
}

export default Routes;
