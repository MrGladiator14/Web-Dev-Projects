const express = require("express");
const https =require("https")
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    // 
    // https.get(url, function(response){
    //     console.log(response.statusCode);
    //     response.on("data",function(data){
    //         const weatherData= JSON.parse(data);
    //         const temp= weatherData.main.temp;
    //         const weatherDescription = weatherData.weather[0].description;
    //         console.log(weatherDescription);
    //         res.write("<p> Weather description:  "+weatherDescription+"</p>");
    //         var src= "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png"
    //         res.write("<img src=" +src +">")
    //         res.write("<h1> The temperature in "+query+" is "+ temp+" degrees </h1>");
    //         

    //     })
    // })
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    console.log(req);
    const query = req.body.cityName;
    const apiKey = "8e1c8de1e3ff923e010a81287937bdad";
    const unit = "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData= JSON.parse(data);
            const temp= weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);
            res.write("<p> Weather description:  "+weatherDescription+"</p>");
            var src= "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png"
            res.write("<img src=" +src +">")
            res.write("<h1> The temperature in "+query+" is "+ temp+" degrees </h1>");
            res.send();
        });
    });
})

app.listen(3000, function () {
    console.log("port opened on port 3000");
});
