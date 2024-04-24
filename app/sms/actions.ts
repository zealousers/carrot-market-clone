
"use server";
import db from "@/lib/db";
import {z}from "zod";
import validator from "validator";
import { redirect } from "next/navigation";
import crypto from "crypto";


const phoneSchema = z.string().trim().refine((phone)=>validator.isMobilePhone(phone,"ko-KR"),"Wrong phone format");
const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState{ 
  token:boolean;
}
async function createToken(){
  const token=crypto.randomInt(100000,999999).toString();
  const exists=await db.sMSToken.findUnique({
    where:{
      token,
    },
    select:{
      id:true,
    }
  })
  if(exists){
    return createToken();
  }else{ 
    return token
  }
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
      await db.sMSToken.deleteMany({
        where:{
          user:{
            phone:result.data
          }
        }
      }) // delete previous token
const token=await createToken()
      await db.sMSToken.create({
        data:{
          token,
          user:{
            // connect:{
            //   phone:result.data
            // },
            connectOrCreate:{
              where:{
                phone:result.data
              },
            
            create:{
               username:crypto.randomBytes(10).toString("hex"),
               phone:result.data
            },
           },
          },
        }
      })// create new token
      // send the token using SMS
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