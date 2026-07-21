import "../../styles/authorizationWindow.css"
import { useState } from "react";

import LoginForm from "../elements/LoginForm";
import RegistrationForm from "../elements/RegistrationForm";

interface AuthorizationWindowProps {
    onSuccessfulAuthorization: (username: string) => void;
}

const AuthorizationWindow = ({onSuccessfulAuthorization} : AuthorizationWindowProps) => {
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

    return <div className="authorization-container">
        {isLoginFormVisible ? <LoginForm onShowRegistrationForm={() => {
            setIsLoginFormVisible(false);
        }} onSuccessfulLogin={onSuccessfulAuthorization}/> : <RegistrationForm onShowLoginForm={() => {
            setIsLoginFormVisible(true);
        }}/>}
    </div> 
}

export default AuthorizationWindow;