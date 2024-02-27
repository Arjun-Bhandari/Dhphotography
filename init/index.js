const mongoose = require("mongoose");
const initData = require("./data.js");
const Image = require("../models/image.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/Dhphotography'
main().then(() => {
    console.log("DB connected");
    
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    try {
      console.log("Deleting existing documents...");
      await Image.deleteMany({});
      
      const clonedData = initData.data.map((obj) => ({ ...obj }));
      console.log("Cloned Data:", clonedData);
      
      await Image.insertMany(clonedData);
      console.log("Data was initialized");
    } catch (error) {
      console.error("Error initializing data:", error);
    }
  };
   initDB();
// const initDB = async () => {
//     await Image.deleteMany({});
//     initData.data = initData.data.map((obj)=>({...obj}));
//     console.log("Cloned Data:", initData.data);
//     await Image.insertMany(initData.data);
//     console.log("data was initialised");
// };

