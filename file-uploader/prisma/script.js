const prisma = require("./prisma")

async function main() {
  await prisma.file.deleteMany({})
  await prisma.user.deleteMany({})
}

main()
