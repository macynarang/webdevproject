import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const API_URL1="http://shibe.online/api/";

const API_URL2="?count=10&urls=true&httpsUrls=true"

app.use(express.urlencoded({ extended: true }));

//to get get css file to work
app.use(express.static(__dirname));

//make api request immediately
app.get("/", async (req,res)=>{
    //var birds=await axios.get("http://shibe.online/api/birds?count=10&urls=true&httpsUrls=true");
    //var cats=await axios.get("http://shibe.online/api/cats?count=10&urls=true&httpsUrls=true");
    //var shibes=await axios.get("http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true");
    //var imgs2=JSON.parse(imgs);
    //console.log(typeof(imgs));
    //console.log(imgs.data[1]);
    //res.render(__dirname+"/views/index.ejs", {bird:birds.data[1], name:cats.data[1]});
    res.render(__dirname+"/views/index.ejs");
});
var imgs1;
app.post("/images", async (req,res)=>{
    var API_URL=API_URL1+req.body.choice+API_URL2;
    console.log(API_URL);
    var imgs=await axios.get(API_URL);
    imgs1=imgs;
    res.render(__dirname+"/views/images.ejs", {name: imgs.data[0]});
});
var imgcounter=0;
app.post("/nextimage", (req,res)=>{
    if(imgcounter==9){imgcounter=0;}
    imgcounter++;
    if(imgs1.data[imgcounter]=="https://cdn.shibe.online/shibes/e13120bfb8ce893b6bded316a13dd8bcacf4d129.jpg"){
        imgs1.data[imgcounter]="https://cdn.shibe.online/shibes/3c054ee177f986758c9662c5241445af839fcf59.jpg";
    }
    res.render(__dirname+"/views/images.ejs", {name: imgs1.data[imgcounter]});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
