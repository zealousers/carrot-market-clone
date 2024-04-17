import { SMSToken } from './../node_modules/.prisma/client/index.d';
import {PrismaClient} from '@prisma/client'

const db = new PrismaClient();

// async function main() {
//   const user = await db.user.create({data:{username:"alice",}});
//   console.log(user);}

//   main()

// async function test(){
//   const tokens= await db.sMSToken.create({
//     data:{
//       token:"1234567",
//       user:{
//         connect:{ 
//           id:2,
//         }
//       }
//     }
//   })
//   console.log(tokens)
// }
async function test(){
  const tokens= await db.sMSToken.findUnique({
    where:{
      id:1,
    },include:{user:true}
  })
  console.log(tokens)
}
test()
export default db;