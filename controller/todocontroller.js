var mongoose = require('mongoose')
var bodyParser = require('body-parser')
//db connection
mongoose.connect('mongodb://test:tu01sh04ar1998@ds052978.mlab.com:52978/todo1')
//schema

var todoSchema = new mongoose.Schema({
    item : String,
})
var Todo =mongoose.model('Todo',todoSchema)

var urlencodeParser= bodyParser.urlencoded({extended :false});
module.exports = function(app){

    app.get('/todo',function(req,res){
        Todo.find({},function(err,data){
            if(err)throw err;
            res.render('todo',{todos:data})
        })

    })
    app.post('/todo',urlencodeParser,function(req,res){
    
        //get data from view add to db
        var newTodo=Todo(req.body).save(function(err,data){
            if(err)throw err;
            res.json(data);
        })

    })
    app.delete('/todo',function(req,res){
     
        //delete the requested item from mongodb

        Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){

            if(err)throw err;
            res.json(data);
        })

    })

}