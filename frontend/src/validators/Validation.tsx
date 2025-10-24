export const validateName=(value:string)=>{
    const pRegex = /^[A-Z][a-z]+( [A-Z][a-z]*)*$/;
    if(pRegex.test(value) && value.length <= 45){
        return true;
    }
    else{
        return false;
    }
}

export const validateContactNumber=(value:string)=>{
    const contactNumberRegex = /^[6789][0-9]{9}$/;
    return contactNumberRegex.test(value);
}
export const validateEmail=(value:string)=>{
    const emailRegex = /^\S+@\S+\.(com|in)$/;
    if(emailRegex.test(value) && value.length <= 45){
        return true;
    }
    else{
        return false;
    }
}

export const validatePassword = (value:string)=>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,20}$/;
    return passwordRegex.test(value);
}

export const validatePinCode = (value:string)=>{
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(value);
}

export const validateFinancialYear = (value:string)=>{
    const pincodeRegex = /^(2021|2022|2023|2024|2025)$/;
    return pincodeRegex.test(value);
}
