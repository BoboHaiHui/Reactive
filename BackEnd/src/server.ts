import express from 'express';

let app = express();

//create server
const port:number = 4000;
app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`);
})
app.get('/', (req, res)=>{
  res.status(200).json({"status":"Success", "data":"Hello there"})
})