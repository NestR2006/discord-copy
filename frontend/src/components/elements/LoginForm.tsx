import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
interface LoginFormProps {
    onShowRegistrationForm: () => void;
    onSuccessfulLogin: (username: string) => void;
}

interface LoginForm {
    email: string
    password: string
}

const LoginForm = ({onShowRegistrationForm, onSuccessfulLogin} : LoginFormProps) => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const loginMutation = useMutation({
        mutationFn: async (form: LoginForm) => {
            const response = await fetch("/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(form)
            });
            if (!response.ok) {
                throw new Error("Login failed");
            }
            const data = await response.json();
            onSuccessfulLogin(data.username);
        }
    });

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const block: LoginForm = {
            email: emailRef.current!.value,
            password: passwordRef.current!.value
        };
        loginMutation.mutate(block);
    };

    return <>
        <h2>Login</h2>
        <form action="" onSubmit={submitHandler}>
            <input type="email" placeholder="Email" ref={emailRef}/>
            <input type="password" placeholder="Password" ref={passwordRef}/>
            <button>Авторизация</button>
        </form>
        <p>Don't have an account? <a href="#" onClick={(e) => {
            e.preventDefault();
            onShowRegistrationForm();
        }}>Create one</a></p>
    </> 
}

export default LoginForm;