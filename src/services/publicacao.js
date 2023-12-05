class publiServices {
    constructor(PubSchema){
        this.pubSchema = PubSchema;
    }

    async createPubli(user, productName, productLink, productDescription, imageUrl) {
        
        try {
           const publicacao = await this.pubSchema.create({user: user, productName: productName,productLink: productLink, productDescription: productDescription, imageUrl: imageUrl})
           
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

}

module.exports = publiServices;