const express = require('express');
const authController = require("./controllers/authController");
const AdminController = require("./controllers/AdminController");
const PostController = require("./controllers/PostController");
const FavController = require("./controllers/FavController");
const swagger = require('swagger-ui-express');
const swaggerDocs = require("./swagger.json");
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');




const port = process.env.PORT || 3000;
const authenticateMiddleware = require ("./middlewares/authenticate")
const app = express();
/*app.use(cors({
    origin: 'https://2153-2804-5fb8-c00a-6e00-9cff-c660-eae8-e3bb.ngrok.io/', 
    methods: ["GET", "POST"],
    cabeçalhos: {"Content-Type": "Authorization", 'access-type': 'application/json'}
    }));*/
app.use(express.json());
    app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers","Content-Type");
        app.use(cors());
        next();
    })

app.use(express.json());

app.use("/api-document",swaggerUi.serve, swaggerUi.setup(swaggerDocs ) );


app.get("/termos", (req, res) => {
    return res.json ({
        message: "Termos de serviço",
    });
});
app.use("/auth", authController)
app.use("/admin", authenticateMiddleware, AdminController)
app.use("/post",PostController); 
app.use("/fav",FavController);

  
app.listen(port, () => {
    console.log('Server is running at port 3000!');
});