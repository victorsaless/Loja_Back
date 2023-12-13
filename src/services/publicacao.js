const Publi = require("../model/Pub");

class publiServices {
    constructor(PubSchema){
        this.pubSchema = PubSchema;
    }

    async createPubli(userName, user, productName, productLink, productDescription, imageUrl, productPrice) {
        
        try {
           const publicacao = await this.pubSchema.create({userName: userName,user: user, productName: productName,productLink: productLink, productDescription: productDescription, imageUrl: imageUrl, productPrice: productPrice})
           
           return publicacao
        } catch (error) {
            console.log('Erro ao criar publicação!');
            throw error;
        }
    }

    async selectPubli(productName) {
        try{
            const publicacao = await this.pubSchema.find(productName);
            return publicacao;
        }catch(error) {
            console.log("Publicação não encontrada", error);
            throw error;
        }
    }

    
    async deletePubli(id){
        try{
            const apagarpublicacao = await this.pubSchema.findByIdAndDelete(id);
            
            return apagarpublicacao
        }catch(error) {
            console.log("Erro ao apagar publicação", error);
            throw error;
        }
    }


    async selectPubliByUser(userId) {
        try {
          // Use o método find para buscar todas as publicações onde o campo "user" é igual ao ID do usuário
          const publicacoesDoUsuario = await Publi.find({ user: userId });
    
          return publicacoesDoUsuario;
        } catch (error) {
          throw error;
        }
      }
    
}

module.exports = publiServices;