const User = require("../models/user.model");
async function handleUserLogin(req, res) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email }); // Find one user by email
    const allUsers = await User.find();

    console.log(allUsers);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    return res
      .status(200)
      .json({ email: user.email, message: "Login successful" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  handleUserLogin,
};
