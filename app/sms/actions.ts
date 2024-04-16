"use server";

import {z}from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z.string().trim().refine((phone)=>validator.isMobilePhone(phone,"ko-KR"),"Wrong phone format");
const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState{ 
  token:boolean;
}

export async function smsLogin(prevState:ActionState,formData:FormData){
  // console.log(typeof formData.get("phone"));
  // console.log(typeof tokenSchema.parse(formData.get("token")));
  const phone = formData.get("phone");
  const token = formData.get('token');
  if(!prevState.token){
    const result=phoneSchema.safeParse(phone);
    if(!result.success){
      return{token:false,
        error:result.error.flatten()
      };
    }else {
      return{token:true};
    }
  } else{
    const result=tokenSchema.safeParse(token);
    if(!result.success){
      return{
        token:true,
        error:result.error.flatten()
      };
    }else {
      // return{token:false};
      redirect("/");
    }
  }
  
}