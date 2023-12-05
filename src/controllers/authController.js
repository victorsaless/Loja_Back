const express = require("express");
const bccrypt = require("bcryptjs");
const UserModel = require("../model/User");
const UserServices = require("../services/user");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const generateToken = (user = {}) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    authConfig.secret,
    {
      expiresIn: 86400,
    }
  );
};

const router = express.Router();

router.post("/register", async (req, res) => {
  
  const { email } = req.body;

  if (await UserModel.findOne({ email })) {
    return res.status(400).json({
      error: true,
      message: "Este usuario ja existe",
    });
  }

  const user = await UserModel.create(req.body);
  return res.status(200).json({
    message: "Usuario cadastrado com sucesso!",
  });

  user.password = undefined;

  return res.json({
    user,
    token: generateToken(user),
  });
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({
      error: true,
      message: "Este usuario nao existe",
    });
  }

  if (!(await bccrypt.compare(password, user.password))) {
    return res.status(404).send({
      error: true,
      message: "Email ou senha incorreta",
    });
  }

  user.password = undefined;

  return res.json({
    user,
    token: generateToken(user),
  });

  return res.json(user);
});

router.delete("/remove:id", async (req, res) => {
  try {
    const { userId } = req.params.id;
    const deleteduser = UserServices.deletedUser(userId);

    res.status(200).json({ message: "Usuario deletado com sucesso!", message });
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "não foi possivel deletar o usuario, por favor tente novamente mais tarde",
        message: error.message,
      });
  }
});

module.exports = router;
