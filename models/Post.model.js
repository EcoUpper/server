const {Schema, model} = require ('mongoose');

const postSchema = new Schema(
    {
        content:{
            type: String,
            required: [true, "Content is required"]
        },
        created_by: [{ type: Schema.Types.ObjectId, ref: "User" }],
        image_url:  {type: String},
        },
        {
            timestamps: true,
        }

);

const Post = model("Post", postSchema);
module.exports = Post;