const express = require('express')
const router = express.Router()
const Person = require ('../models/Schema')


//create and save a Record of a model
router.post("/newperson",(req,res)=>{
    const newperson = new Person(req.body);
    newperson.save((err)=>{
        err ? console.log(err): res.send("person was created");
    })
})
//create many Recordswith model.create()
const arryOfPerson=[
    {name:"ahmed",age:50,favoiriteFoods:["tacos","pizza"]},
    {name:"ali",age:20,favoiriteFoods:["lablabi","pizza"]},
    {name:"salma",age:30,favoiriteFoods:["sandwich","pizza"]}
]

const createManyPerson =(arryOfPerson,done)=>{
    Person.create(arryOfPerson,(err,persons)=>{
        err ? console.log(err) :done(null,persons)
    })
}
router.post("/manyperson",(req,res)=>{
    createManyPerson(req.body,(err)=>{
        err ? console.log(err) : res.send("many person was created");
    })
})
//Use mode.find() to search your database
router.get("/:name",(req,res)=>{
    Person.find({name: req.params.name}, (req,res)=>{
        err ? console.log(err) : res.json(data);
    })
})
// use model.findone() to return a single matching document from your database
router.get("/getfavorite/:favoritefoods",(res,req)=>{
    Person.findOne(
        {favoiriteFoods:{$elMatch:{$eq:req.params.favoiriteFoods}}},
        (req,res)=>{
            err ? console.log(err) : res.json(data);
        }
    )
})

//use model.findID() to search by _ID
router.get("/:id",(req,res)=>{
    Person.findById({_id:req.params.id},(req,res)=>{
        err ? console.log(err):res.json(data);
    })
})

// Perform classic Uptade by ruunning Find , Edit , the save
router.put("/:id ",async(res,req)=>{
    try{
        const foodToAdd = "kaftagi";
        data.favoiriteFoods=[...data.favoiriteFoods,foodToAdd];
        const result=await data.save();
        res.statusCode(200).json(result)
    }catch(err){
        res.statusCode(400).json({error : err});
    }
})
// Perform New Uptade on a Document using model.findone and update()
router.put("/update/:name",(res,req)=>{
    const ageToSet = 30;
Person.findByIdAndUpdate(
    {name:req.params.name},
    {$set :{age:ageToSet}},
    {returnNewDocument:true},
    (err,doc)=>{
        err ? console.log("Something wrong when update record") : res.json(doc)

    }
)
})
//delete one document using model.findbyid and remove
router.delete("/:id",(res,req)=>{
    Person.findByIdAndRemove({_id:req.params.id},(err,data)=>{
        err ? console.log(err) : res.json(data)
    })
})

//MongoDB and Mongoose -Delete many document with model.remove()
router.delete("/deletename/:name",(req,res)=>{
    Person.remove({name:req.params.name},(err)=>{
        err ? console.log(err) : res.send(`all person named ${this.name} were` )
    })
})
//Chain Search Query Helpers to Narrow Search Results
router.get("/", (req, res) => {
  const foodToSearch = "Burritos";
  Person.find({ favoriteFoods: { $elMatch: { $eq: foodToSearch } } })
    .sort({ name: "desc" })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      err ? console.log(err) : res.json(data);
    });
});


module.exports = router