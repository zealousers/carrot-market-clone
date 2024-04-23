import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

export async function middleware(request:NextRequest){

  // console.log(request.url);
  // console.log(request.cookies.getAll());
//  console.log(cookies()); 
// const session=await getSession()
// console.log(session);
const pathname = request.nextUrl.pathname;
if(pathname==="/"){
  const response = NextResponse.next()
  response.cookies.set("middlerware-cookies","hello!")
  return response
}
  if(request.nextUrl.pathname==="/profile"){
    // return Response.json({error:"You are not allowed here!"})
    return Response.redirect(new URL("/",request.url))
  }
}

export const config = {
  match:["/","/profile","/create-account","/user/:pathh*","/((?!api|_next/static|_next/image|favicon.ico).*)"]
}