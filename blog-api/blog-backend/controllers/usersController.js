const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const prisma = require("../prisma/client")
const bcrypt = require("bcryptjs")

exports.createUser = asyncHandler(async (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 12)

  await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    },
  })

  res.json({ message: "User created successfully" })
})

exports.loginUser = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  })
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" })
  }
  const passwordMatch = bcrypt.compareSync(req.body.password, user.password)
  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid email or password" })
  }
  delete user.password
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "30d" })
  res.json({ token })
})

exports.verifyUser = asyncHandler(async (req, res, next) => {
  const bearerHeader = req.headers["authorization"]
  if (!bearerHeader) {
    return res.status(403).json({ message: "No authorization header provided" })
  }
  const token = bearerHeader.split(" ").at(1)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" })
    }
    const user = decoded
    req.user = user
  })
  next()
})

exports.getMe = (req, res) => {
  res.json(req.user)
}
