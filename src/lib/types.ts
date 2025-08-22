

export type UserSignUpForm = {
    username: string;
    email: string;
    phone: string;
    password: string;
    passwordConfirmation?: string;
}

export type SigninUser = {
  email?: string;
  password?: string;
  name: string;
  image?: string;
}; 

