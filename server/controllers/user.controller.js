const User = require("../models/user.model");

const verifyUser = async (email) => {
  try {
    const user = await User.findOne({ email }); // Find one user by email
    const allUsers = await User.find();

    console.log(allUsers);
    if (!user) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

async function handleUserLogin(req, res) {
  const { email } = req.body;
  const isValidUser = verifyUser(email);

  if (!isValidUser)
    return res.status(401).json({
      message: "Invalid user!",
    });
  else res.status(200).json({ email, message: "Login successful" });
}

module.exports = {
  handleUserLogin,
  verifyUser,
};
