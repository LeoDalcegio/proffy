import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from './PrivateRoute'

import Landing from "../pages/Landing";
import TeacherList from "../pages/TeacherList";
import TeacherForm from "../pages/TeacherForm";
import Login from "../pages/Login";
import Register from "../pages/Register/indes";
import SuccessRegister from "../pages/SuccessRegister";
import ForgotPassword from "../pages/ForgotPassword";

function Routes() {

    return (
        <BrowserRouter>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/success-register" component={SuccessRegister} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute path="/landing" component={Landing} />
            <PrivateRoute path="/study" component={TeacherList} />
            <PrivateRoute path="/give-classes" component={TeacherForm} />
        </BrowserRouter>
    )
}

export default Routes;
