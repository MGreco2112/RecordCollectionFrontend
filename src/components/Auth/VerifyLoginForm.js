import React from "react";
import VerifyLogin from "./VerifyLogin";

const VerifyLoginForm = (props) => {

    /**
     * Have user input old login credentials
     * send old login to backend with new user object fields
     * if old login is valid
     *      update user with new details
     *      login user with new credentials via backend
     *      return new user details and JWT to React
     *      navigate Home
     * else
     *      Alert that credentaials have not been updated
     */
    return(
        <h1>Verify Login</h1>
    );
}

export default VerifyLoginForm;