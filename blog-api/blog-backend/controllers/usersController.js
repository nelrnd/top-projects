const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const prisma = require("../prisma/client")
const bcrypt = require("bcryptjs")

const getUserId = (req, res, next) => {
  const bearerHeader = req.headers["authorization"]
  if (!bearerHeader) {
    return res.status(401).json({ message: "No authorization header provided" })
  }
  const token = bearerHeader.split(" ").at(1)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" })
    }
    req.userId = decoded.id
  })
  next()
}

exports.verifyUser = verifyUser = [
  getUserId,
  asyncHandler(async (req, res, next) => {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { password: false },
    })
    if (!user) {
      return res.status(401).json({ message: "No user found with this token" })
    }
    req.user = user
    next()
  }),
]

exports.verifyAdmin = verifyAdmin = [
  getUserId,
  asyncHandler(async (req, res, next) => {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { password: false },
    })
    if (!user) {
      return res.status(401).json({ message: "Invalid token" })
    }
    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden: you must be admin" })
    }
    req.user = user
    next()
  }),
]

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
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
  res.json({ token })
})

exports.getMe = [
  verifyUser,
  (req, res) => {
    res.json(req.user)
  },
]
