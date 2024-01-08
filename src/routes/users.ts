import express, {Router} from "express";

import {
    login,
    signup
} from "../controller/users";
import { sign } from "crypto";

const router = Router();

router.post("/login", login);

router.post("/signup", signup);


// router.post('/login', (req,res) => {
//     const {email,password} = req.body;
//     console.log(`From login page for email: ${email}, for password: ${password}`);  
//     res.redirect('/index.html'); 
  
//   })
  
//   router.post('/signup_input', (req,res) => {
//     const {email,password,firstname,lastname,gender,role,birthday,profilepic} = req.body;
  
//     console.log(`From singup page: email: ${email}, password: ${password}, firstname: ${firstname}, 
//     lastname: ${lastname}, gender: ${gender}, role: ${role}, birthday: ${birthday}, profile: ${profilepic}`);  
//     res.redirect('/index.html'); 
  
//     // const {email,password} = req.body;
//     // console.log(`From login page for email: ${email}, for password: ${password}`);  
//     // res.redirect('/index.html'); 
  
//   })


export default router; 