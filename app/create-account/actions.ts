"use server";
import { PASSWORD_MATCH_ERROR, PASSWORD_REGEX_ERROR, USERNAME_ERROR, USERNAME_INVALID_TYPE_ERROR, USERNAME_REQUIRED_ERROR } from "@/lib/constants";
import {z} from "zod";
// const usernameSchema = z.string().min(5).max(10);

const passwordRegex= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
const checkUsername =(username:string)=> !username.includes("admin");
const checkPassword = ({password,confirmPassword}:{password:string,confirmPassword:string})=>password===confirmPassword;

const formSchema =z.object({
  username:z
  .string({
    invalid_type_error: USERNAME_INVALID_TYPE_ERROR,
    required_error:USERNAME_REQUIRED_ERROR,
  })
  .min(3,"Way too short!!!")
  .max(10,"Way too long!!!")
  .trim()
  .toLowerCase()
  .transform((username) => `🔥 ${username}`)
  .refine(checkUsername,USERNAME_ERROR),
  email:z.string().email().toLowerCase().trim(),
  password:z.string().min(10).trim().regex(passwordRegex,PASSWORD_REGEX_ERROR),
  confirmPassword:z.string().min(10).trim(),
}).refine(checkPassword,{message:PASSWORD_MATCH_ERROR,path:["confirmPassword"]});


export async function createAccount(prevState:any,formData:FormData){
  const data ={
    username:formData.get("username"),
    email:formData.get("email"),
    password:formData.get("password"),
    confirmPassword:formData.get("confirmPassword"),
  };
  console.log(data);
  // usernameSchema.parse(data.username);
  const result = formSchema.safeParse(data);
  
  if(!result.success){
    return result.error.flatten();
  } else {console.log(result.data)}
}