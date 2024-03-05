const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Contact = require("../models/contactModel");
const Transaction = require("../models/transactionsModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    console.log("The request body is :", req.body);
  const { userId, email, password, operatorId, balance } = req.body;
  if (!userId || !email || !password || !balance || !operatorId) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    userId,
    email,
    password: hashedPassword,
    balance,
    operatorId
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  //res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          userId: user.userId,
          operatorId: user.operatorId,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );
    console.log(user.id);
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  const user1 = await User.find({ email: req.user.email });
  res.json(user1);
});

//@desc Current balance info
//@route POST /api/users/current/balance
//@access private
const currentUserBalance = asyncHandler(async (req, res) => {
  const user1 = await User.find({ email: req.user.email });
  console.log(user1);
  var obj1 = {"balance":user1[0].balance, "status": "OP_SUCCESS"}
  res.json(obj1);
});

//@desc Current bet request info
//@route POST /api/users/current/betrequest
//@access private
const currentUserBetRequest = asyncHandler(async (req, res) => {

  console.log("The request body is :", req.body);
  const { operatorId, token, userId,reqId,  transactionId,gameId,roundId, debitAmount, betType } = req.body;

  // if (!operatorId || !userId1 || !reqId || !transactionId || !gameId || !roundId
  //   || !debitAmount ||  !betType) {
  //   res.status(400);
  //   throw new Error("All fields are mandatory !");
  // }
  var transactionType = "Debit";
  var transactionAmount = debitAmount;
  const contact = await Transaction.create({
    operatorId, userId,reqId,  transactionId,gameId,roundId, transactionType, transactionAmount, betType
  });



  console.log("contact");
  console.log(contact);
  const user1 = await User.findOne({ userId: userId });
  console.log("user1");
  console.log(user1);
  user1.balance -= debitAmount;
  var id1 = user1._id.toString();
  const updatedUser = await User.findByIdAndUpdate(
    id1,
    user1,
    { new: true }
  );
  console.log("updatedUser");

  var obj1 = {"balance":user1.balance.toString(), "status": "OP_SUCCESS"}
  res.json(obj1);
});


//@desc Current result request info
//@route POST /api/users/current/resultrequest
//@access private
const currentUserResultRequest = asyncHandler(async (req, res) => {

  console.log("The request body is :", req.body);
  const { operatorId, token, userId,reqId,  transactionId,gameId,roundId, creditAmount, betType } = req.body;

  // if (!operatorId || !userId1 || !reqId || !transactionId || !gameId || !roundId
  //   || !debitAmount ||  !betType) {
  //   res.status(400);
  //   throw new Error("All fields are mandatory !");
  // }
  var transactionType = "Credit";
  var transactionAmount = creditAmount;
  const contact = await Transaction.create({
    operatorId, userId,reqId,  transactionId,gameId,roundId, transactionType, transactionAmount, betType
  });

  console.log("contact");
  console.log(contact);
  const user1 = await User.findOne({ userId: userId });
  console.log("user1");
  console.log(user1);
  // Convert string variables to integers
  user1.balance += creditAmount;
  console.log("updatedUser");
  var id1 = user1._id.toString();
  const updatedUser = await User.findByIdAndUpdate(
    id1,
    user1,
    { new: true }
  );
  console.log("updatedUser");

  var obj1 = {"balance":user1.balance.toString(), "status": "OP_SUCCESS"}
  res.json(obj1);
});

//@desc Current Rollback request info
//@route POST /api/users/current/rollbackrequest
//@access private
const currentUserRollbackrequest = asyncHandler(async (req, res) => {

  console.log("The request body is :", req.body);
  const { operatorId, token, userId,reqId,  transactionId,gameId,roundId, rollbackAmount, betType } = req.body;

  // if (!operatorId || !userId1 || !reqId || !transactionId || !gameId || !roundId
  //   || !debitAmount ||  !betType) {
  //   res.status(400);
  //   throw new Error("All fields are mandatory !");
  // }
  var transactionType = "Rollback";
  var transactionAmount = rollbackAmount;
  const contact = await Transaction.create({
    operatorId, userId,reqId,  transactionId,gameId,roundId, transactionType, transactionAmount, betType
  });

  console.log("contact");
  console.log(contact);
  const user1 = await User.findOne({ userId: userId });
  console.log("user1");
  console.log(user1);
  // Convert string variables to integers
  user1.balance += transactionAmount;
  console.log("updatedUser");
  var id1 = user1._id.toString();
  const updatedUser = await User.findByIdAndUpdate(
    id1,
    user1,
    { new: true }
  );
  console.log("updatedUser");

  var obj1 = {"balance":user1.balance.toString(), "status": "OP_SUCCESS"}
  res.json(obj1);
});




module.exports = { registerUser, loginUser, currentUser,currentUserBalance,currentUserBetRequest,currentUserResultRequest,currentUserRollbackrequest };