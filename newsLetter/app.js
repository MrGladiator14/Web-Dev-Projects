const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app=express();

app.use(express.static("Public")); //in order to load local files on website
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signUp.html")
})

app.post("/",function(req,res){
    var firstName= req.body.firstName;
    var lastName= req.body.lastName;
    var email = req.body.email;
    var data  ={
        members:[{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }]
    }
    var jsonData = JSON.stringify(data);

    const url =  "https://us13.api.mailchimp.com/3.0/lists/37c08f70df";
    const options = { //from https post requirement
        method: "POST",
        auth: "bryson14:fa4bb8c8c12e0c03bb0b7a3f795a0c82-us13"
    }

    const request = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
    
});

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("port opened on port 3000");
});


//api key fa4bb8c8c12e0c03bb0b7a3f795a0c82-us13
// audience id/list id  37c08f70df