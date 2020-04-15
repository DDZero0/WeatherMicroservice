const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');

module.export = function(app){

app.get('/',(req,res)=>{
  res.send("hello");
})

}
