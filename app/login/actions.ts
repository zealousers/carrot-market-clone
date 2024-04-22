"use server";
import bcrypt from 'bcrypt';
import db from "@/lib/db";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REQUIRED_ERROR,PASSWORD_REGEX_ERROR } from "@/lib/constants";
import { z } from "zod";
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

const checkEmailExists = async(email:string)=>{
  const user = await db.user.findUnique({
    where:{
      email,
    },
    select:{
      id:true,
    }
  })
  // if(user){
  //   return true;
  // } else{
  //   return false;
  // }
return Boolean(user);
}

const formSchema = z.object({
  email: z.string().email().toLowerCase().refine(checkEmailExists,"An account with that email does not exits."),
  password: z
    .string({ required_error: PASSWORD_REQUIRED_ERROR })
    // .min(PASSWORD_MIN_LENGTH)
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});
export async function login(prevState:any, formData:FormData){
  const data={
    email:formData.get("email"),
    password:formData.get("password"),
  }
  const result = await formSchema.spa(data);
  if(!result.success){
    // console.log(result.error.flatten());
    return result.error.flatten();
  }else {
    const user = await db.user.findUnique({
      where:{
        email:result.data.email,
      },
      select:{
        id:true,
        password:true,
      }     
    })
    const ok=await bcrypt.compare(result.data.password, user!.password?? "");
    
    console.log(ok);
    if(ok){
      const session = await getSession()
      session.id = user!.id;
      await session.save();
      redirect("/profile")
    } else{
      fieldErrors:{
        password:"wrong password"
      email:[]
      }
    }
    // find a user with the email
    // if the user is found, check password has
    // log the user in
    // redirect "/profile"

    // console.log(result.data)
  }
  // return { errors: ["wrong password","password too short"],      
  //   };
}
