import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const resumes = await prisma.resume.findMany();
  console.log(JSON.stringify(resumes));
}
main();
