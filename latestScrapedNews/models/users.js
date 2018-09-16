var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comments"
    }]
});

var Users = mongoose.model("Users", UsersSchema);

module.exports = Users;