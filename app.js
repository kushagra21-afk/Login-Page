const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.post("/", function(req,res){
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                Fname: firstName,
                Lname: lastName,
            }
         }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us11.api.mailchimp.com/3.0/lists/9cc77b498f"
    const options = {
        method : "POST",
        auth: "kush:cb06ad8fd429f5a18e3aa6c141f5ee74-us11"
    }

    const request = https.request(url, options, function(response){
        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/faliure.html")}
        response.on("data", function(data){
            console.log(JSON.parse(data));
            
        })
     
    })
    
    request.write(jsonData);
    request.end();
});
app.post("/faliure", function(req,res){
    res.redirect("/")
})
app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})
app.listen(process.env.port || 3000, function(){
    console.log("i am on")
})

// 9cc77b498f
// cb06ad8fd429f5a18e3aa6c141f5ee74-us11