var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
    username: {
        type: String
    },
    message: {
        type: String
    },
    news: [{
        type: Schema.Types.ObjectId,
        ref: "News"
    }]
});

var Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;