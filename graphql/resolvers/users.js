const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");

module.exports = {
  Mutation: {
    async register(_, { registerInput: { username, email, password, confirmPassword } }) {
      // TODO Validate user data
      // TODO user doesn't exist
      const user = await User.findOne({ username });

      if (user) {
        throw new UserInputError("Username is not available", {
          errors: {
            username: "This username is not available",
          },
        });
      }

      const userEmail = await User.findOne({ email });

      if (userEmail) {
        throw new UserInputError("Email already registered", {
          errors: {
            username: "There is already an account registered with this email",
          },
        });
      }

      // Hash the password and create token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
