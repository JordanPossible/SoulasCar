var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection('trajets').aggregate([
    { $lookup:
       {
         from: 'trajetTypes',
         localField: 'trajet_id',
         foreignField: '_id',
         as: 'caca'
       }
     }
    ], function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
}); 
