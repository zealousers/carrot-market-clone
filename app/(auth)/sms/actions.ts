
"use server";
import db from "@/lib/db";
import {z}from "zod";
import validator from "validator";
import { redirect } from "next/navigation";
import crypto from "crypto";
import getSession from "@/lib/session";
import twilio from "twilio";


const phoneSchema = z.string().trim().refine((phone)=>validator.isMobilePhone(phone,"ko-KR"),"Wrong phone format");

async function tokenExists(token:number){
  const exists=await db.sMSToken.findUnique({
    where:{
      token:token.toString()
    },
    select:{
      id:true,
    }
  })
  // if(exists){
  //   return true
  // }else{
  //   return false
  // }
  return Boolean(exists);
}

const tokenSchema = z.coerce.number().min(100000).max(999999).refine(tokenExists,"This token does not exits.");

interface ActionState{ 
  token:boolean;
}
async function getToken(){
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
    return getToken();
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
const token=await getToken()
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
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID!,
        process.env.TWILIO_AUTH_TOKEN!
            )
            await client.messages.create({
              body:`You Carrot verification code is ${token}`,
              from:process.env.TWILIO_PHONE_NUMBER!,
              to:process.env.MY_PHONE_NUMBER!,
            })
      return {
        token:true
      };
    }
  } else{
    const result= await tokenSchema.spa(token);
    if(!result.success){
      return{
        token:true,
        error:result.error.flatten()
      };
    }else {

      const token=await db.sMSToken.findUnique({
        where:{
          token:result.data.toString()
        },
        select:{
          id:true,
          userId:true
          }        
      })
        
      const session=await getSession();
      session.id=token!.userId;
      await session.save();
      await db.sMSToken.delete({
        where:{
          id:token!.id
        },
      })        
      redirect("/profile");
      //get the userId of token
      //log the user in
      // return{token:false};
    }
  }  
}