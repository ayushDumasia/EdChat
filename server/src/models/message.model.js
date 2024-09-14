import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    // role: {
    //   type: String,
    //   enum: ['user', 'bot'],
    //   required: true,
    // },
    // message: {
    //   type: String,
    //   required: true,
    // },
    data: {
      type: Array,
    },
  },
  {
    timestamps: true,
  },
);

export const Message = mongoose.model('Message', messageSchema);
