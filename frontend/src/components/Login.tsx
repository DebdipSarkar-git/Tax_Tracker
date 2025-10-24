import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../validators/Validation";
import { login } from "../services/authService";
import { useDispatch } from "react-redux";

type loginFormState = {
    email: string,
    password: string,

}
interface LoginProps {
    setIsAuthenticated : (auth:boolean)=> void
}

export const Login: React.FC<LoginProps> = ({setIsAuthenticated}) => {
    const [state, setState] = useState<loginFormState>({
        email: "",
        password: "",
    });

    type FormErrorState = {
        emailError: string,
        passwordError: string,
        [key: string]: string;
    }

    const [formErrors, setFormErrors] = useState<FormErrorState>({
        emailError: "",
        passwordError: "",
    })

    const [mandatory, setMandatory] = useState(false);
    //state variable to capture the success Message once the book is completed successfully.
    const [successMessage, setSuccessMessage] = useState("");
    // state variable used to disable the button when any of the given form values is invalid
    const [valid, setValid] = useState(false);
    //state variable to capture the Error Message when there is any error with book.
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const [isLoading, setIsLoading] = useState(false);

    type Messages = {
        EMAIL_ERROR: string,
        PASSWORD_ERROR: string,
        Success: string;
        ApiRunError: string;
        Mandatory: string;
        WrongUsername: string;
        WrongPassword: string;
        [key: string]: string;
    }


    const messages: Messages = {
        EMAIL_ERROR: "Please enter a valid email id",
        PASSWORD_ERROR: "Please enter a valid password",
        Success: "Successfully submitted with Id:",
        ApiRunError: "Please run the backend",
        Mandatory: "Form data is incomplete",
        WrongUsername: "User not Found",
        WrongPassword: "Invalid password for the provided user"
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (state.email === "" || state.password === "") {
            setMandatory(true);
        }
        else {
            setIsLoading(true);
            setMandatory(false);
            try {
                const data = await login(state);
                if (data) {
                    sessionStorage.setItem('authToken', data.token);
                    dispatch({type:'LOGIN',payload:data});
                    setSuccessMessage("Logged In Successfully!");
                    setErrorMessage("");
                    setTimeout(() => {
                        navigate("/view-transactions");
                        sessionStorage.setItem('user','true');
                        setIsAuthenticated(true);
                    }, 3000);
                }
            } catch (error: any) {
                setErrorMessage(error.response.data.errorMessage);
            }
            finally{
                setIsLoading(false);
            }
        }

    }

    useEffect(()=>{
        if(!sessionStorage.getItem('user')){
          window.history.pushState(null, "", window.location.href);
          window.history.replaceState(null,"",window.location.href);
        }
},[]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        /*
               1. This method will be invoked whenever the user changes the value of any form field. 
                   This method should also validate the form fields.
               2. 'event' input parameter will contain both name and value of the form field.
               3. Set state using the name and value recieved from event parameter. 
               4. Call the validateField method for validating form fields.
               */
        const { name, value } = event.target;
        setMandatory(false);
        setErrorMessage("");
        setSuccessMessage("");
        setState((prevState) => ({ ...prevState, [name]: value }));
        validateField(name, value);
    };

    const validateField = (name: string, value: any): void => {
        const validators: { [key: string]: Function } = {
            email: validateEmail,
            password: validatePassword,
        };

        let errors = { ...formErrors };
        const errorMessageKey = `${name}Error`;

        if (validators[name]) {
            const isValid = validators[name](value);
            errors[errorMessageKey] = isValid ? "" : messages[`${name.toUpperCase()}_ERROR`];
            setFormErrors(errors);

            // After updating the errors, check the form's overall validity.
            checkFormValidity(errors);
        } else {
            setFormErrors(errors);
        }
    };
    const checkFormValidity = (errors: { [key: string]: string }) => {
        const isValid = !Object.values(errors).some(error => error !== "");
        setValid(isValid);
    };

    return (
        <React.Fragment>
            {isLoading && (
                <div className="loader-container">
                    <output className="spinner-border text-primary">
                        <span className="visually-hidden">Loading...</span>
                    </output>
                </div>
            )}
            <div className="container" >
                <div className="row">
                    <br />
                    <div className="offset-md-5 col-md-5  ">
                        <br />
                        <div>
                            <div className="head">
                                <h3><b>User Login</b></h3>
                            </div>
                            <div>
                                <form className="form form-background"
                                    //Your code here
                                    onSubmit={handleSubmit}
                                >

                                    {/* create form as per the view given in screenshots */}
                                    {/* Display success or error messages as given in QP */}

                                    {/*Using the concept of conditional rendering,display success message, 
                     error messages related to required fields and axios calls */}
                                    {/*if the form fields are not entered then set the message as 
                     'Enter all the form fields'*/}
                                    <div className='form-group'>
                                        <label className='form-label' htmlFor='email'><b>Email</b><span style={{ color: 'red' }}>*</span></label>
                                        <input type='email' name='email' id='email' data-testid='email' placeholder='Enter Your Email Id' className='form-control' onChange={handleChange} />
                                        {formErrors.emailError ? <span className='text-danger' data-test-id='emailError'>{formErrors.emailError}</span> : ""}
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label' htmlFor='pwd'><b>Password</b><span style={{ color: 'red' }}>*</span></label>
                                        <div style={{position:'relative'}}>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name='password'
                                                id='password'
                                                data-testid='password'
                                                placeholder='Enter Your Password'
                                                className='form-control'
                                                onChange={handleChange}
                                            />
                                            <button
                                                type="button"
                                                className="btn"
                                                style={{
                                                    position: 'absolute',
                                                    right: '10px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={togglePasswordVisibility}
                                                aria-label="Toggle password visibility"
                                            >
                                                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
                                            </button>
                                        </div>
                                        {formErrors.passwordError ? <span className='text-danger' data-test-id='passwordError'>{formErrors.passwordError}</span> : ""}
                                    </div>
                                    <div className='form-group text-center'>
                                        <button type='submit' className='btn btn-primary mt-2 text-center' name='login' data-testid='login' disabled={!valid}>Login</button>
                                        <br />
                                        {mandatory ? <span className='text-danger text-center'><b>{messages.Mandatory}</b></span> : ""}
                                        {errorMessage ? <span className='text-danger text-center'><b>{errorMessage}</b></span> : ""}
                                        {successMessage ? <span className='text-success text-center'><b>{successMessage}</b></span> : ""}
                                    </div>
                                    <div className='form-group text-center'>
                                        <button type='submit' className='btn btn-success mt-2 text-center' name='register' data-testid='register' onClick={()=>{navigate('/register')}}>New User? Register Now!!</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}