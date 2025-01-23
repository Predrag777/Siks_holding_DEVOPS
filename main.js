/*require('dotenv').config(); // load environment variables from .env file
const { error } = require("console");
const express=require("express")
const mysql=require("mysql")

const port = process.env.PORT || 3000;


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
try{
    conn.connect()
    app.get('/', (req, res)=>{
        res.render("index.html")

        conn.query("SELECT IP FROM visitors", (err, rows, fields)=>{
            if(err) throw err
            for(let i=0;i<rows.length;i++){
                
                if(rows[i].IP==req.ip){
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
            }
        })




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
*/


/////Kopirani kod:

require('dotenv').config(); // load environment variables from .env file
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // default port is 3000

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Hello World'
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
