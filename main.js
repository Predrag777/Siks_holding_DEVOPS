//require('dotenv').config(); // load environment variables from .env file
const { error } = require("console");
const express=require("express")
const mysql=require("mysql")
const cors=require('cors')

const port = 3307;


var whitelist=["::ffff:127.0.0.12"]


const app=express()


app.set('views', __dirname + '/Frontend');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.set('json')


var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'X'
});
var log=false
try{
    conn.connect()
    app.get('/', (req, res)=>{
        for(let i in whitelist){
            if(whitelist[i]==req.ip){
                log=true
            }
        }
        if(!log){
            console.log("You are blocked")
        }else{
            console.log("Prosao")
        }
        res.render("index.html")
        var found=false
       conn.query("SELECT IP FROM visitors", (err, rows, fields)=>{
            if(err) throw err
            for(let i=0;i<rows.length;i++){
                
                if(rows[i].IP==req.ip){
                    found=true
                    
                }
            }
        })

        if(found){
            conn.query(`UPDATE visitors SET num_of_visiting=num_of_visiting+1 WHERE IP='${req.ip}'`, (err)=>{
                if(err) throw err
                console.log(rows[i].IP+"    "+req.ip+"   "+(rows[i].IP==req.ip))
                console.log("Postoji, pa povecaj brojac posjeta")
            })
        }else{
            conn.query(`INSERT INTO visitors VALUES(NULL, '${req.ip}', 1)`, (err)=>{
                if(err) throw err
                console.log("Dodata ip addresa")
            })
        }




        app.get("/api", (req, res)=>{
            var request = require('request')
            request("https://api.spacexdata.com/v3/ships/", function(err, body){
                console.log(body.body)
                res.json(body)
            })
            
        })

        app.get("/api2", (req, res)=>{
            var request=require('request')
            //var ship_name=req.params[0]
            console.log(req.params)
            request(`https://api.spacexdata.com/v3/ships/${ship_name}`, function(err, body){
                console.log(body.body)
                res.json(body)
            })
        })
})

}catch(error){
    res.send("<h1>Error!!!</h1>")
    throw(error)
    
}


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



/////Kopirani kod:


