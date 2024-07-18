const express = require('express');
const cors = require("cors");
const {generateFile} = require("./generateFile");
const {executeCpp} = require('./executeCpp');
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get("/" ,(req, res) => {
    res.send("welcome to my oc" );
});

app.post("/run" ,async(req,res) => {
    const {language = 'cpp' , code} = req.body;
    
    if(code === undefined){
        return res.status(500).json({"success": false , message: "empty code body!"});
    }

    try {
       const filePath = await generateFile(language , code);
       const output = await executeCpp(filePath);
       res.json({filePath , output});
    } catch(error) {
        res.status(500).json({"success": false , message: error.message});
    }
    
});
app.listen(5001 , () => {
    console.log("server is listening on port 5001");
});