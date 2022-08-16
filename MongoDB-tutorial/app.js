const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
    name: String,
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});



const Fruit = mongoose.model("Fruit", fruitSchema);
// 'Fruit' is converted to 'fruits' collection
const fruit = new Fruit ({
    name: "Apple",
    rating: 23,
    review: "Pretty solid as a fruit"
})

// use this to save over & over again
// fruit.save();


const kiwi = new Fruit ({
    name: "Kiwi",
    rating: 10,
    review: "the best fruit!"
})

const banana = new Fruit ({
    name: "Banana",
    rating: 9,
    review: "yummy!"
})

// Fruit.insertMany([kiwi, banana], function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Succesfully saved all the fruits to fruitsDB");
//     }
// });

Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    }else{
    //     console.log(fruits);
    // }
    // mongoose.connection.close(); //closes mongoose after 
    fruits.forEach(function(fruit){
        console.log(fruit.name);
    })
}

});

Fruit.updateOne({_id: "62f78f73bec3bdbde166be5f"}, {name:
"Peach", review:"decent!"},function(err){
    if(err){
        console.log(err);
    }else{
        console.log("succesfully updated the document.");
    }
});

Fruit.deleteOne({_id:"62f78e290d3122c4789b747e"},function(err){
    if(err){
        console.log(err);
    }else{
        console.log("succesfully deleted.");
    }
});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person =  mongoose.model("Person", personSchema);

const person = new Person({
    name: "John",
    age: 14,
    favouriteFruit: kiwi
});

person.save();
// use this to save over & over again
// fruit.save();

// mongoDB in node.js
// const insertDocuments = function(db, callback){
//     const collection = db.collection('fruitsDB');
//     collection.insertMany([
//         {
//             name : "apple",
//             score : 8,
//             review : "great fruit"
//         },
//         {
//             name : "orange",
//             score : 6,
//             review : "kinda sour"
//         }
//     ], function(err, result){
//         // non fatal assertion, alerts if something has failed
//         assert.equal(err,null);
//         assert.equal(3,result.result.n);
//         assert.equal(3, result.ops.length);
//         console.log("inserted 3 documents into collection");
//         callback(result);
//     });
// };

// const findDocuments = function(db, callback){
//     const collection = db.collection('documents');
//     collection.find({}).toArray(function(err, docs){
//         assert.equal(err,null);
//         console.log("found the following records");
//         console.log(docs)
//         callback(docs);
//     });
// }

 