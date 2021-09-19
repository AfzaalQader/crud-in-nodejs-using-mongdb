const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String
    },
    father_name: {
        type: String
    },
    student_class: {
        type: String,
        default: "matic"
    },
});

userSchema.set("timestamps", true);
module.exports = mongoose.model("users", userSchema);
