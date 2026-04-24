app.get('/ai-advanced', auth, async (req,res)=>{
  let data = expenses[req.user.username] || [];

  let r = await fetch("http://localhost:5000/analyze",{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({expenses:data})
  });

  let result = await r.json();
  res.json(result);
});