var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to database"))

app.post("/sign_up",(req,res) => {
    var firstname =req.body.firstname
    var lastname =req.body.lastname
    var date=req.body.date
    var branch=req.body.brach
    var email=req.body.email
    var phno=req.body.phno
    var gender=req.body.gender
    var address=req.body.address
    var password=req.body.password
    var confirmpassword=req.body.confirmpassword

    var data={
        "firstname":firstname,
        "lastname":lastname,
        "date":date,
        "branch":branch,
        "email":email,
        "phno":phno,
        "gender":gender,
        "address":address,
        "password":password,
        "confirmpassword":confirmpassword
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")
    })
    return res.redirect('signup_successful.html')
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);
console.log("Listening on port 3000")