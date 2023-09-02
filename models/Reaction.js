const {Schema}=require('mongoose');

//schema only
const reactionSchema=new Schema(
    {
        reactionId: {
            type:  Schema.Types.ObjectId,
            default: new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username:{
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                if (date) return date.toISOString().split("T") [0];
              }, 
        }
    },
    {
        timestamps: true,
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false,
    },

);

module.exports=Reaction;