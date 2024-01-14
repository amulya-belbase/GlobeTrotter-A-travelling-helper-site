import { promises as fs } from "fs";
import knexConfig, { baseKnexConfig } from "../knexFile";
import knex from "knex";
import { LoginInfo, SignupInfo } from "../interface/userInterface";
import { DateTime } from "luxon";
import bcrypt from "bcrypt";
const knexInstance = knex(baseKnexConfig);



// POST METHOD
export async function signup(result: SignupInfo) {
  const desiredTimezone = "Asia/Kathmandu";
  const currentTimeInDesiredZone = DateTime.now().setZone(desiredTimezone);
  const formattedTime = currentTimeInDesiredZone.toFormat(
    "yyyy-MM-dd HH:mm:ss"
  );

  const hashedPassword = await bcrypt.hash(result.password, 10); // 10 cost factor


  try {
    const databaseInsert = await knexInstance
      .insert({
        email: result.email,
        password: hashedPassword,
        firstname: result.firstname,
        lastname: result.lastname,
        dateofbirth: result.dateofbirth,
        gender: result.gender,
        profilepic: result.profilepic,
        role: result.role,
        createdat: formattedTime,
      })
      .into("users")
      .then(function () {
        return (200);
      });
      // console.log(databaseInsert);
    return databaseInsert;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

export async function login(result: LoginInfo) {

    const emailValidation = await knexInstance
      .select('*')
      .from('users')
      .where('email', result.email);
  
    if(emailValidation.length === 0) {
      // console.log("User doesnt exist")    // return a code
      return (404);
    }else{
      if(!await bcrypt.compare(result.password, emailValidation[0].password)){
        return (401);
        // console.log("Invalid credentials");
      }else{
        return emailValidation;
        // console.log(`Welcome ${emailValidation[0].firstname}`);
      }
    }
  
}
