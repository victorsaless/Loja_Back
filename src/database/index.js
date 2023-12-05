const mongoose = require("mongoose");
require("dotenv").config();

const DB_PASS = process.env.DB_PASS
const PORT = process.env.PORT || 3000

//Use a Promise para conectar ao MongoDB

mongoose.set("strictQuery", true)
mongoose
.connect("mongodb+srv://iago:iago1234@backavisai.tau1fbg.mongodb.net/?retryWrites=true&w=majority", {})  
//.connect("mongodb+srv://Admindatabase01:${DB_PASS}@avsdatebase.z4al7nb.mongodb.net/?retryWrites=true&w=majority",{} )
  .then(() => {
    console.log("Conexão com MongoDB estabelecida com sucesso");
  })
  .catch((error) => {
    console.error("Falha ao executar a conexão com o MongoDB");
    console.error(error);
  });

mongoose.Promise = global.Promise;

module.exports = mongoose;
