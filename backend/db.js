const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://shelljamittal2:nK5S0Y2OV01kmdiw@cluster0.cgvr1wc.mongodb.net/PizzaMania?retryWrites=true&w=majority&appName=Cluster0';

mongoose.set('strictQuery', false);

const mongoDB = () => {
    mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("connected");
            const fetched_data = mongoose.connection.db.collection("Food_items");
            fetched_data.find({}).toArray(function (err, data) {
                const foodCat = mongoose.connection.db.collection("Food_category");
                foodCat.find({}).toArray(function (err, dataCat) {
                    if (err) {
                        console.error("Error fetching data:", err);
                    }
                    else{ global.Food_items = data;
                        global.Food_category = dataCat;
                    }  //    console.log(global.Food_items);
                   
                    
                })

            });
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err);
        });
};

module.exports = mongoDB;
