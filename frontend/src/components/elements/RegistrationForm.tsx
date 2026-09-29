import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import type { RegistrationFormBody } from "../../types";

interface RegistrationFormProps {
    onShowLoginForm: () => void;
}

const RegistrationForm = ({ onShowLoginForm }: RegistrationFormProps) => {

    const emailRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const firstPasswordRef = useRef<HTMLInputElement>(null);
    const secondPasswordRef = useRef<HTMLInputElement>(null);


    const mutation = useMutation({
        mutationKey: ["registration"], mutationFn: async () => {
            const dataBlock: RegistrationFormBody = {
                username: usernameRef.current!.value,
                email: emailRef.current!.value,
                password: firstPasswordRef.current!.value
            }

            const response = await fetch("/users/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataBlock)
            })

            if (response.ok) {
                onShowLoginForm();
            }
        }
    })

    const submitHandler = (e: any) => {
        e.preventDefault();
        mutation.mutate();
    }

    return <>
        <h2>Registration</h2>
        <form action="" onSubmit={submitHandler}>
            <input type="email" placeholder="Email" ref={emailRef} />
            <input type="text" placeholder="Username" ref={usernameRef} />
            <input type="password" placeholder="Password" ref={firstPasswordRef} />
            <input type="password" placeholder="Password" ref={secondPasswordRef} />
            <button>Регмстрация</button>
        </form>
        <p>Already have an account? <a href="#" onClick={(e) => {
            e.preventDefault();
            onShowLoginForm();
        }}>Login</a></p>
    </>
}

export default RegistrationForm;