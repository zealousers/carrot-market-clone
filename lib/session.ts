import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?:number // ?의 의미는 로그인한 사용자만 쿠키에 id를 가지고 있기 때문에.
}
export default function getSession(){
  return getIronSession<SessionContent>(
cookies(), {cookieName:"delicious-carrot",
  password:process.env.COOKIE_PASSWORD!})
}