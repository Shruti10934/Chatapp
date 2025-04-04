import { faker, simpleFaker } from "@faker-js/faker";
import { Chat } from "../models/chat.models.js";
import { Message } from "../models/message.models.js";
import { User } from "../models/user.models.js";

const createSingleChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");

    const chatPromise = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < users.length; j++) {
        chatPromise.push(
          Chat.create({
            name: faker.lorem.words(2),
            members: [users[i], users[j]],
          })
        );
      }
    }

    await Promise.all(chatPromise);
    console.log("chat created successfully");
    process.exit(1);
  } catch (error) {
    console.log("error while creating sample chats", error);
    process.exit(1);
  }
};

const createGroupChat = async (numChats) => {
  try {
    const users = await User.find().select("_id");

    const chatsPromise = [];

    for (let i = 0; i < numChats; i++) {
      const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
      const members = [];
      for (let j = 0; j < numMembers; j++) {
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];
        if (!members.includes(randomUser)) {
          members.push(randomUser);
        }
      }
      const chat = Chat.create({
        groupChat: true,
        name: faker.lorem.words(1),
        members,
        creator: members[0],
      });
      chatsPromise.push(chat);
    }

    await Promise.all(chatsPromise);

    console.log("group chat created successfully");
    process.exit(1);
  } catch (error) {
    console.log("error while creating sample chats", error);
    process.exit(1);
  }
};

const createMessages = async (numMessages) => {
  try {
    const users = await User.find().select("_id");
    const chats = await Chat.find().select("_id");

    const messagePromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomChat = chats[Math.floor(Math.random() * chats.length)];

      messagePromise.push(
        Message.create({
          chat: randomChat,
          sender: randomUser,
          content: faker.lorem.sentence(),
        })
      );
    }

    await Promise.all(messagePromise);

    console.log("Messages created successfully");
    process.exit(1);
  } catch (error) {
    console.log("error while creating sample messages", error);
    process.exit(1);
  }
};


const createMessagesInChat = async (chatId, numMessages) => {
  try {
    const users = await User.find().select("_id");
    
    const messagePromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      

      messagePromise.push(
        Message.create({
          chat: chatId,
          sender: randomUser,
          content: faker.lorem.sentence(),
        })
      );
    }

    await Promise.all(messagePromise);

    console.log("Messages created successfully");
    process.exit(1);
  } catch (error) {
    console.log("error while creating sample messages", error);
    process.exit(1);
  }
};

export { createGroupChat, createMessages, createMessagesInChat, createSingleChats };

