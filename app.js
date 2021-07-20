const express=require("express");
const https =require("https");  //we can use 4 more methods but they are not native to express
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended: true}));
app.get("/",function(req,reS){
//  res.send("chal rha h");
reS.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
   console.log("mil gya");
   const query = req.body.cityName;
   const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=096ed835c70d8adf862b37d74caee416&units=metric";
   https.get(url,function(response){
      console.log(response.statusCode);   //status code eg 404;;200 is perfect
      response.on("data",function(data){
     //   console.log(data);                //give us data in hexadecimal code;
       const weatherData=JSON.parse(data);
     //  console.log(weatherData);        give us data in JSON
       const temperature=weatherData.main.temp;//temperature-=273.16;
       var t=temperature;   //created var earlier just because temp from source was in kelvin
       const weatherCondition=weatherData.weather[0].description;
       const icon=weatherData.weather[0].icon;
       const urL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
       console.log(temperature);
       console.log(weatherCondition);
       res.write("<p>The weather is currently "+ weatherCondition+"</p>");
       res.write("<h1>The temperature in "+ query +" is " + t + " degree Celsius</h1>");
       res.write("<img src="+urL+">");
       res.send();
     });
   });

});




app.listen(3000,function()
{
  console.log("Server is running on port 3000");
});
