export interface AuthResponse {
    token: string;
    user: UserRegister;
}

export interface UserRegister {
    username: string;
    email: string;
    password: string;
    mobileNo: number;
    addressLine1: string;
    addressLine2: string;
    area: string;
    city: string;
    state: string;
    pincode: number;
    role: string;
  }

  export interface UserLogin{
    email: string;
    password: string;
  }