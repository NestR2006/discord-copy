
interface RegistrationFormProps {
    onShowLoginForm: () => void;
}

const RegistrationForm = ({onShowLoginForm} : RegistrationFormProps) => {
    const submitHandler = (e: any) => {
        e.preventDefault();
    }

    return <>
        <h2>Registration</h2>
        <form action="" onSubmit={submitHandler}>
            <input type="email" placeholder="Email"/>
            <input type="text" placeholder="Nickname"/>
            <input type="text" placeholder="Username"/>
            <input type="password" placeholder="Password"/>
            <input type="password" placeholder="Password"/>
            <button>Регмстрация</button>
        </form>
        <p>Already have an account? <a href="#" onClick={(e) => {
            e.preventDefault();
            onShowLoginForm();
        }}>Login</a></p>
    </> 
}

export default RegistrationForm;