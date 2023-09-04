const {Schema, Types, ObjectId}=require('mongoose');

//schema only
const reactionSchema=new Schema(
    {
        
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

module.exports=reactionSchema;