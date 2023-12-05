// Import necessary modules and models
const express = require("express");
const router = express.Router();
const mongoose = require("../database/index");
const auth = require("../middlewares/authenticate");

const User = require("../model/User");
const Publi = require("../model/Pub");

// Route to get user's favorite publications
router.get("/favoritos", auth, async (req, res) => {
  try {
    // Check if the user is authenticated through the auth middleware
    if (!req.userLogged) {
      return res.status(401).send("Usuário não autenticado");
    }

    // Find the user by id
    const user = await User.findOne({
      _id: req.userLogged.id,
    });

    if (user) {
      // Find publications favorited by the user
      const publis = await Publi.find({
        _id: { $in: user.favoritos },
      });

      return res.json(publis);
    } else {
      return res.status(401).send("Usuário não autenticado");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao buscar favoritos",
      message: error.message,
    });
  }
});

// Route to add a publication to user's favorites
router.put("/favoritar", auth, async (req, res) => {
  try {
    const userId = req.userLogged.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).send("Usuário não autenticado");
    }

    const favId = req.body.favId;

    if (!user.favoritos.includes(favId)) {
      const publication = await Publi.findById(favId);

      if (!publication) {
        return res.status(404).json({ error: "Publicação não encontrada" });
      }

      publication.favorited = true;

      publication.user = user;

      await publication.save();

      user.favoritos.push(publication);
      await user.save();

      return res.status(200).json({ message: "Favoritado com sucesso" });
    } else {
      return res.status(400).json({ error: "Item já está nos favoritos" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Não foi possível favoritar a publicação, tente novamente mais tarde!",
      message: error.message,
    });
  }
});



module.exports = router;
