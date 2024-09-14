import { Conversation } from '../models/conversation.model.js';
import { Message } from '../models/message.model.js';
import { ApiResponse } from '../utils/ApiResponse.utils.js';
import { AsyncHandler } from '../utils/AsyncHandler.utils.js';

export const createMessage = AsyncHandler(async (req, res) => {
  const data = req?.body;
  const user = req?.user;
  console.log('User', req.user);
  console.log('Data : ', data);

  const newMessage = await Message.create({
    data,
  });

  const conversation = await Conversation.create({
    user: user?.id,
  });
  conversation.chats.push(newMessage);
  console.log(conversation);
  res.json(new ApiResponse(newMessage, 'New Message Created'));
});

export const deleteMessage = AsyncHandler(async (req, res) => {
  await Message.deleteMany();
});
