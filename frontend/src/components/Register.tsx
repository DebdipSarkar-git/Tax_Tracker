import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { validateContactNumber, validateEmail, validateName, validatePassword, validatePinCode } from "../validators/Validation";

type registrationFormState = {
    username: string,
    email: string,
    password: string,
    mobileNo: number,
    addressLine1: string,
    addressLine2: string,
    area: string,
    city: string,
    state: string,
    pincode: number,
    id: string

}

export const Register: React.FC = () => {
    const [state, setState] = useState<registrationFormState>({
        username: "",
        email: "",
        password: "",
        mobileNo: 0,
        addressLine1: "",
        addressLine2: "",
        area: "",
        city: "",
        state: "",
        pincode: 0,
        id: ""
    });

    const stateList: string[] = [
        "Andaman & Nicobar",
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Dadra and Nagar Haveli",
        "Daman and Diu",
        "Delhi",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu & Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Ladakh",
        "Lakshadweep",
        "Madhya Pradesh",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Maharashtra",
        "Nagaland",
        "Odisha",
        "Puducherry",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
    ]

    type FormErrorState = {
        usernameError: string,
        emailError: string,
        passwordError: string,
        mobileNoError: string,
        addressLine1Error: string,
        addressLine2Error: string,
        areaError: string,
        cityError: string,
        stateError: string,
        pincodeError: string,
        [key: string]: string;
    }

    const [formErrors, setFormErrors] = useState<FormErrorState>({
        usernameError: "",
        emailError: "",
        passwordError: "",
        mobileNoError: "",
        addressLine1Error: "",
        addressLine2Error: "",
        areaError: "",
        cityError: "",
        stateError: "",
        pincodeError: ""

    })

    const [mandatory, setMandatory] = useState(false);
    //state variable to capture the success Message once the book is completed successfully.
    const [successMessage, setSuccessMessage] = useState("");
    // state variable used to disable the button when any of the given form values is invalid
    const [valid, setValid] = useState(false);
    //state variable to capture the Error Message when there is any error with book.
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    type Messages = {
        USERNAME_ERROR: string,
        EMAIL_ERROR: string,
        PASSWORD_ERROR: string,
        MOBILENO_ERROR: string,
        ADDRESSLINE1_ERROR: string,
        ADDRESSLINE2_ERROR: string,
        AREA_ERROR: string,
        CITY_ERROR: string,
        STATE_ERROR: string,
        PINCODE_ERROR: string,
        Success: string;
        Error: string;
        Mandatory: string;
        [key: string]: string;
    }

    const messages: Messages = {
        USERNAME_ERROR: "Please enter a valid name",
        EMAIL_ERROR: "Please enter a valid email id",
        PASSWORD_ERROR: "Please enter a valid password",
        MOBILENO_ERROR: "Please enter a valid mobile no.",
        ADDRESSLINE1_ERROR: "Addres Line 1 should be between 3 to 40 characters",
        ADDRESSLINE2_ERROR: "Address Line 2 should be between 3 to 60 charcacters",
        AREA_ERROR: "Area should be between 3 to 30 characters",
        CITY_ERROR: "City should be between 3 to 20 characters",
        STATE_ERROR: "Please select a state",
        PINCODE_ERROR: "Please enter a valid pincode",
        Success: "User Registered Successfully",
        Error: "Please run the backend",
        Mandatory: "Form data is incomplete"
    }

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (state.username === "" || state.email === "" || state.password === "" || state.mobileNo === 0 ||
            state.mobileNo === null || state.addressLine1 === "" || state.addressLine2 === "" ||
            state.area === "" || state.city === "" || state.state === "" || state.state === null ||
            state.pincode === 0 || state.pincode === null) {
            setMandatory(true);
        }
        else {
            setMandatory(false);
            setIsLoading(true);
            try {
                const data = await register({...state, role: "USER"});
                if(data){
                setSuccessMessage("User Registered Successfully");
                setErrorMessage("");
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
                }
              } catch (error:any) {
                setErrorMessage(error.response.data.errorMessage);
              }
              finally{
                setIsLoading(false);
              }
          
        }

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = event.target;
        setMandatory(false);
        setErrorMessage("");
        setSuccessMessage("");
        setState((prevState) => ({ ...prevState, [name]: value }));
        validateField(name, value);
    };

    const validateField = (name: string, value: any): void => {
        const validators: { [key: string]: Function } = {
            username: validateName,
            email: validateEmail,
            password: validatePassword,
            mobileNo: validateContactNumber,
            pincode: validatePinCode,
            addressLine1: (val: string) => val.length >= 3 && val.length <= 40,
            addressLine2: (val: string) => val.length >= 3 && val.length <= 60,
            area: (val: string) => val.length >= 3 && val.length <= 30,
            city: (val: string) => val.length >= 3 && val.length <= 20,
            state: (val: string) => val !== ""
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
                                <h3><b>New User Registration</b></h3>
                            </div>
                            <div>
                                <form className="form form-background"
                                    //Your code here
                                    onSubmit={handleSubmit}
                                >

                                    <div className='form-group'>
                                        <label className='form-label' htmlFor='username'><b>Name</b><span style={{ color: 'red' }}>*</span></label>
                                        <input type='text' name='username' id='username' data-testid='username' placeholder='Enter Your Name' className='form-control' onChange={handleChange} />
                                        {formErrors.usernameError ? <span className='text-danger' data-test-id='usernameError'>{formErrors.usernameError}</span> : ""}
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label' htmlFor='email'><b>Email</b><span style={{ color: 'red' }}>*</span></label>
                                        <input type='email' name='email' id='email' data-testid='email' placeholder='Enter Your Email' className='form-control' onChange={handleChange} />
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
                                    <div className='form-group'>
                                        <label className='form-label' htmlFor='mobileNo'><b>Mobile Number</b><span style={{ color: 'red' }}>*</span></label>
                                        <input type='number' name='mobileNo' id='mobileNo' data-testid='mobileNo' placeholder='Enter your Mobile Number' className='form-control' onChange={handleChange} />
                                        {formErrors.mobileNoError ? <span className='text-danger' data-test-id='mobileNoError'>{formErrors.mobileNoError}</span> : ""}
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label' htmlFor='addressLine1'><b>Address Details</b><span style={{ color: 'red' }}>*</span></label>
                                        <input type='text' name='addressLine1' id='addressLine1' className='form-control' data-testid='addressLine1'
                                            placeholder='Address Line 1' onChange={handleChange} />
                                        {formErrors.addressLine1Error ? <span className='text-danger' data-test-id='addressLine1Error'>{formErrors.addressLine1Error}</span> : ""}
                                        <input type='text' name='addressLine2' id='addressLine2' className='form-control mt-2' data-testid='addressLine2'
                                            placeholder='Address Line 2' onChange={handleChange} />
                                        {formErrors.addressLine2Error ? <span className='text-danger' data-test-id='addressLine2Error'>{formErrors.addressLine2Error}</span> : ""}
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label' htmlFor='area'><b>Area</b><span style={{ color: 'red' }}>*</span></label>
                                        <input type='text' name='area' id='area' data-testid='area' placeholder='Enter Your Area' className='form-control' onChange={handleChange} />
                                        {formErrors.areaError ? <span className='text-danger' data-test-id='areaError'>{formErrors.areaError}</span> : ""}
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label' htmlFor='city'><b>City</b><span style={{ color: 'red' }}>*</span></label>
                                        <input type='text' name='city' id='city' data-testid='city' placeholder='Enter Your City' className='form-control' onChange={handleChange} />
                                        {formErrors.cityError ? <span className='text-danger' data-test-id='cityError'>{formErrors.cityError}</span> : ""}
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label' htmlFor='state'><b>State</b><span style={{ color: 'red' }}>*</span></label>
                                        <select name='state' id='state' className='form-select' data-testid='state' onChange={handleChange}>
                                            <option value={""}>--Select State--</option>
                                            {stateList.map((value) => {
                                                return (
                                                    <option key={value} value={value}>{value}</option>
                                                )
                                            })}
                                        </select>
                                        {formErrors.stateError ? <span className="text-danger" data-testid="stateError">{formErrors.stateError}</span> : ""}
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label' htmlFor='pincode'><b>Pincode</b><span style={{ color: 'red' }}>*</span></label>
                                        <input type='number' name='pincode' id='pincode' className='form-control' data-testid='pincode'
                                            placeholder='Enter your pincode' onChange={handleChange} />
                                        {formErrors.pincodeError ? <span className='text-danger' data-test-id='pincodeError'>{formErrors.pincodeError}</span> : ""}
                                    </div>
                                    <div className='form-group text-center'>
                                        <button type='submit' className='btn btn-primary mt-2 text-center' name='register' data-testid='register' disabled={!valid}>Register</button>
                                        <br />
                                        {mandatory ? <span className='text-danger text-center'><b>{messages.Mandatory}</b></span> : ""}
                                        {errorMessage ? <span className='text-danger text-center'><b>{errorMessage}</b></span> : ""}
                                        {successMessage ? <span className='text-success text-center'><b>{successMessage}</b></span> : ""}
                                    </div>
                                    <div className='form-group text-center'>
                                        <button type='submit' className='btn btn-success mt-2 text-center' name='login' data-testid='login' onClick={()=>{navigate('/login')}}>Existing User? Login Now!!</button>
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