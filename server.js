const express = require("express");
const fs = require("fs");

const app = express();
fs.readFile("./birds.js", "utf8", function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});

app.get('/getbirdname',(req,res)=>{
  res.status(400).send("Search for a bird name!")
})

app.get('/getbirdname/getallbirds',(req,res)=>{
  res.status(200).json({
    data:obj
  })
})

app.get("/getbirdname/:data", async (req, res) => {
  const data =  req.params.data;
  try {
    const birdDetail =  obj.filter((bird) => bird.scientific_name == data);
    res.status(200).json({
      data: `${birdDetail[0].English_name}`,
    });
  } catch (error) {
    res.status(400).json({
      data:[]
    })
  }
});

app.listen(3000, () => console.log("Listening to 3000"));
