const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
    },
    image: {
        type: String
    },
    text: {
        type: String
    },
   user_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "users"
   } 
});

postSchema.set("timestamps", true);
module.exports = mongoose.model("posts", postSchema);
