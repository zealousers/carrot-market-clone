import { NextRequest } from "next/server";

export async function GET(request:NextRequest){
  //console.log(request);
  return Response.json({ok:true});
}

export async function POST(request:NextRequest){
  const body = await request.json();
 // console.log(body);
  return Response.json(body);
}