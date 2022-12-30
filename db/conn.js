const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.API_APP_MONGOOSE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Conectado ao banco"))
    .catch((err) => console.log(err));
};

module.exports = connectDatabase;
