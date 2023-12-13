const PostService = require("../services/publicacao");
const PostModel = require("../model/Pub");
const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/authenticate');

const postService = new PostService(PostModel);

router.post("/postagem", async (req, res) => {
 
  try {
    const { userName, user, productName, productLink, productDescription, imageUrl, productPrice } = req.body;
    const publicacao = await postService.createPubli(userName, user, productName, productLink, productDescription, imageUrl, productPrice);
    
      
    res
      .status(201)
      .json({ message: "Publicação criada com sucesso", publicacao });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao criar publicação", message: error.message });
  }
});

router.get("/listar", async (req, res) => {

  try {

    const { productName } = req.body;
    const publicacao = await postService.selectPubli(productName);
    res.status(200).json(publicacao);
    
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar publicacoes", message: error.message });
    res.status(404).json({ error: "Publicação não encontrada!" });
  }
});

router.delete("/apagar:id", async (req, res) => {
  try {

    const  pubId  = req.params.id;

      const id = pubId.substring(1);
      postService.deletePubli(id);
   
    res
      .status(200)
      .json({ message: "Publicação excluida com sucesso!", message });
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Não foi possivel excluir a publicação, tente novamente mais tarde!",
        message: error.message,
      });
  }
});


router.get('/meus-posts', authMiddleware, async (req, res) => {
  try {
    console.log(req.body);
     const userId = req.userLogged.id;
     console.log(userId , 'userId');
     const publicacoes = await postService.selectPubliByUser(userId);
     res.status(200).json(publicacoes);
  } catch (error) {
     res.status(500).json({ error: 'Erro ao buscar seus posts', message: error.message });
  }
});


module.exports = router;