import * as userModel from "../model/users";

import { SignupInfo, LoginInfo } from "../interface/userInterface";


export const signup = async (
    email:string, 
    password:string,
    firstname:string,
    lastname:string,
    dateofbirth: number,
    gender: string,
    profilepic: string,
    role: string
  ) => {
      const result: SignupInfo = {
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
          dateofbirth: dateofbirth,
          gender: gender,
          profilepic: profilepic,
          role: role
        };
        
      const data = await userModel.signup(result);
      return data; 
  }
  
export const login = async (email:string, password:string) => {
    const result: LoginInfo = {
        email: email,
        password: password,
    };

    const data = await userModel.login(result);
    return data; 
};