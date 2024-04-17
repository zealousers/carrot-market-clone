import {PrismaClient} from '@prisma/client'

const db = new PrismaClient();

// async function main() {
//   const user = await db.user.create({data:{username:"alice",}});
//   console.log(user);}

//   main()
export default db;