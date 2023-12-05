const User = require("../model/User");

class userService {
  constructor(UserSchema) {
    this.userSchema = UserSchema;
  }

  async deleteUser(userId) {
    const userDelete = await User.findByIdAndRemove(userId);

    if (!userDelete) {
      throw new Error("User not found");
    }

    return userDelete;
  }
}

module.exports = userService;
