const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "fintechsecret";

// fake database
let users = [];
let expenses = {};

/* REGISTER */
app.post('/register', (req,res)=>{
  const {username,password} = req.body;
  users.push({username,password});
  res.json({msg:"registered"});
});

/* LOGIN */
app.post('/login',(req,res)=>{
  const {username,password} = req.body;
  let user = users.find(u=>u.username===username && u.password===password);

  if(!user) return res.status(401).json({msg:"invalid"});

  let token = jwt.sign({username},SECRET);
  res.json({token});
});

/* AUTH MIDDLEWARE */
function auth(req,res,next){
  let token = req.headers.authorization;
  if(!token) return res.sendStatus(403);

  try{
    req.user = jwt.verify(token,SECRET);
    next();
  }catch{
    res.sendStatus(403);
  }
}

/* ADD EXPENSE */
app.post('/expense',auth,(req,res)=>{
  let user = req.user.username;
  if(!expenses[user]) expenses[user]=[];
  expenses[user].push(req.body.amount);
  res.json({msg:"added"});
});

/* GET EXPENSE */
app.get('/expense',auth,(req,res)=>{
  res.json(expenses[req.user.username] || []);
});

/* KURS API */
app.get('/rates', async (req,res)=>{
  let r = await fetch("https://api.exchangerate-api.com/v4/latest/IDR");
  let d = await r.json();
  res.json(d);
});

/* AI SIMPLE */
app.get('/ai',auth,(req,res)=>{
  let data = expenses[req.user.username] || [];
  let total = data.reduce((a,b)=>a+b,0);

  let status = "Hemat";
  if(total>5000000) status="Boros";
  else if(total>2000000) status="Normal";

  res.json({total,status});
});

app.listen(3000,()=>console.log("Server running"));