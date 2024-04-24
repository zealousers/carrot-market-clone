export function GET(){
  // console.log("GET /github/start");
  const baseURL="https://github.com/login/oauth/authorize"
  const params={
    client_id:process.env.GITHUB_CLIENT_ID!,
    scope:"read:user,user:email",
    allow_signup:"true"

  }
  const formattedParams =new URLSearchParams(params).toString();
  // console.log(formattedParams);
  const finalURL=`${baseURL}?${formattedParams}`;
  return Response.redirect(finalURL)
}