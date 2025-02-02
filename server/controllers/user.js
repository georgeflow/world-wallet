const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const User = require("../models/user");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");

const create = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(409)
      .send({ error: "409", message: "User already exists" });
  }
  try {
    if (password === "") throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
      balances: [],
    });
    const user = await newUser.save();
    req.session.uid = user._id;
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error, message: "Could not create user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    req.session.uid = user._id;
    res.status(200).send(user);
  } catch (error) {
    res
      .status(401)
      .send({ error: "401", message: "Username or password is incorrect" });
  }
};

const profile = async (req, res) => {
  try {
    const { _id, firstName, lastName } = req.user;
    const user = { _id, firstName, lastName };
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error, message: "User not found" });
  }
};

const logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: "Could not log out, please try again" });
    } else {
      res.clearCookie("sid");
      res.status(200).send({ message: "Logout successful" });
    }
  });
};

// Configuration for the Plaid client
const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

// Instantiate the Plaid client with the configuration
const client = new PlaidApi(config);

// Creates a Link token and return it
const createLinkTokenUS = async (req, res, next) => {
  const tokenResponseUS = await client.linkTokenCreate({
    user: { client_user_id: req.sessionID },
    client_name: "worldwallet",
    language: "en",
    products: ["auth", "liabilities", "transactions"],
    country_codes: ["US"],
    redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
  });
  res.json(tokenResponseUS.data);
};

// Creates a Link token and return it
const createLinkTokenES = async (req, res, next) => {
  const tokenResponseES = await client.linkTokenCreate({
    user: { client_user_id: req.sessionID },
    client_name: "worldwallet",
    language: "en",
    products: ["auth", "transactions"],
    country_codes: ["ES"],
    redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
  });
  res.json(tokenResponseES.data);
};

// Creates a Link token and return it
const createLinkTokenGB = async (req, res, next) => {
  const tokenResponseGB = await client.linkTokenCreate({
    user: { client_user_id: req.sessionID },
    client_name: "worldwallet",
    language: "en",
    products: ["auth", "transactions"],
    country_codes: ["GB"],
    redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
  });
  res.json(tokenResponseGB.data);
};

// Exchanges the public token from Plaid Link for an access token
const exchangePublicToken = async (req, res, next) => {
  try {
    const exchangeResponse = await client.itemPublicTokenExchange({
      public_token: req.body.public_token,
    });

    // Get balance data
    const balanceResponse = await client.accountsBalanceGet({
      access_token: exchangeResponse.data.access_token,
    });

    // Get the user ID from the session
    const userId = req.session.uid;

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Concatenate the balances field for the existing user
    user.balances = user.balances.concat(balanceResponse.data.accounts);

    // Save the updated user data
    await user.save();

    res.json(exchangeResponse.data);
  } catch (error) {
    console.error("Error in /api/exchange_public_token:", error);

    // Handle specific errors
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    // Handle other unexpected errors
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBalances = async (req, res, next) => {
  try {
    // Get the user ID from the session
    const userId = req.session.uid;

    // Use Mongoose to find the user with the matching ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // You might want to make sure that the user has the balances field
    if (!user.balances) {
      return res.status(404).json({ error: "Balances not found for the user" });
    }

    // Return the user's balance data
    res.json(user.balances);
  } catch (error) {
    console.error("Error in /api/balance:", error);

    // Handle specific errors
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    // Handle other unexpected errors
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  create,
  login,
  profile,
  logout,
  createLinkTokenUS,
  createLinkTokenES,
  createLinkTokenGB,
  exchangePublicToken,
  getBalances,
};
