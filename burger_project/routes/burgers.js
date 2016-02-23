'use strict'
var express = require('express');
var burgers = express.Router();
var burgersData = [ "dummy burger" ];

burgers.route('/')
.get((req,res)=>{
    // res.render('pages/burger_all',{data:burgerData })
    res.send( burgersData );
  })
.post( (req,res)=>{
  // insert our new burger into the collection
  burgersData.push(req.body)
// redirect to the new item (in a db, you'd return the new id)
var newID = burgersData.length-1;
res.redirect('./'+ newID)
})

burgers.route('/new')
.get( (req,res)=>{
    res.send('this will render my form ');
})


burgers.route('/:burgerID')
.get((req,res)=>{
  var burgID = req.params.burgerID
      if(!(burgID in burgersData)){
        res.sendStatus(404);
        return;
      }
     res.send( burgersData[burgID] )
    })
.put((req,res)=>{
    var burgID = req.params.burgerID;
    console.log("PUUUUUUUT", req.body)
        // if we don't have a burger there, let's
   if(!(burgID in burgersData)){
        res.sendStatus(404);
        return;
     }

        //replace the burger at :burgerID position
        burgersData[burgID] = req.body;

        //redirect to the new burger
        res.redirect('./' + burgID)
      })
  .delete( (req,res)=>{
      var burgID = req.params.burgerID;
      console.log("deleteee")
      // if we don't have a burger there, let's
      if(!(burgID in burgersData)){
        res.sendStatus(404);
        return;
      }

      //replace the burger at :burgerID position
      burgersData[burgID] = " ";

      //redirect to the new burger
      res.redirect('/burgers')
    })



burgers.route('/:burgerID/edit')
.get( (req,res)=>{
  var burgID = req.params.burgerID;
  console.log("change", req.body)
      // if we don't have a burger there, let's
 if(!(burgID in burgersData)){
      res.sendStatus(404);
      return;
   }

      //replace the burger at :burgerID position
      burgersData[burgID] = req.body;

      //redirect to the new burger
      res.redirect('./' + burgID)
})








module.exports = burgers;
