"use server";
import { PASSWORD_MATCH_ERROR, PASSWORD_REGEX_ERROR, USERNAME_ERROR, USERNAME_INVALID_TYPE_ERROR, USERNAME_REQUIRED_ERROR } from "@/lib/constants";
import {z} from "zod";
// const usernameSchema = z.string().min(5).max(10);
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const passwordRegex= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
const checkUsername =(username:string)=> !username.includes("admin");
const checkPassword = ({password,confirmPassword}:{password:string,confirmPassword:string})=>password===confirmPassword;

const checkUniqueUsername = async(username:string)=>{
  const user = await db.user.findUnique({
    where:{
      username,
    },
    select:{
      id:true,
    },
  })
return !Boolean(user);
}
const checkUniqueEmail = async(email:string)=>{
  const user = await db.user.findUnique({
    where:{
      email,
    },
    select:{
      id:true,
    },
  })
return Boolean(user)===false;
}

const formSchema =z.object({
  username:z
  .string({
    invalid_type_error: USERNAME_INVALID_TYPE_ERROR,
    required_error:USERNAME_REQUIRED_ERROR,
  })
  .min(3,"Way too short!!!").max(10,"Way too long!!!").trim().toLowerCase()
  // .transform((username) => `🔥 ${username}`)
  .refine(checkUsername,USERNAME_ERROR)
  .refine(checkUniqueUsername,"That username is already taken."),

  email:z.string().email().toLowerCase().trim().refine(checkUniqueEmail,"There is an account already registered with that email."),

  password:z.string()
  .trim(),
  // .min(10)
  // .regex(passwordRegex,PASSWORD_REGEX_ERROR)

  confirmPassword:z
  .string()
  // .min(10)
  .trim(),
})
.refine(checkPassword,{message:PASSWORD_MATCH_ERROR,path:["confirmPassword"]});


export async function createAccount(prevState:any,formData:FormData){
  const data ={
    username:formData.get("username"),
    email:formData.get("email"),
    password:formData.get("password"),
    confirmPassword:formData.get("confirmPassword"),
  };
  // console.log(data);
  // usernameSchema.parse(data.username);
  const result = await formSchema.spa(data);
  
  if(!result.success){
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password,12);
    //console.log(hashedPassword);
    const user = await db.user.create({
      data:{
        username:result.data.username,
        email:result.data.email,
        password:hashedPassword,
      },
      select:{
        id:true,
      },
    })
// console.log(user);
const session = await getSession();
session.id=user.id
await session.save();
redirect('/profile');
}
}
