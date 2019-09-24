const mongoose = require('mongoose'),
  config = require('config'),
  db = config.get('mongoURI');
const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('connected to database');
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};
module.exports = connectDb;
