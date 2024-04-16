"use server";
import {z} from "zod";
// const usernameSchema = z.string().min(5).max(10);

const passwordRegex= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
const checkUsername =(username:string)=> !username.includes("admin");
const checkPassword = ({password,confirmPassword}:{password:string,confirmPassword:string})=>password===confirmPassword;

const formSchema =z.object({
  username:z
  .string({
    invalid_type_error:"Username must be a string!",
    required_error:"Where is my username???"
  })
  .min(3,"Way too short!!!")
  .max(10,"Way too long!!!")
  .trim()
  .toLowerCase()
  .transform((username) => `🔥 ${username}`)
  .refine(checkUsername,"Username cannot contain the word 'admin'"),
  email:z.string().email().toLowerCase().trim(),
  password:z.string().min(10).trim().regex(passwordRegex,"A password must contain at least one lowercase letter, one uppercase letter, one number, and one special character."),
  confirmPassword:z.string().min(10).trim(),
}).refine(checkPassword,{message:"Passwords do not match",path:["confirmPassword"]});


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