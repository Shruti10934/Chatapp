import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachment,
} from "../controllers/chat.controllers.js";
import { attachmentsMulter } from "../middlewares/multer.middleware.js";
import {
  addMemberValidator,
  chatIdValidator,
  newGroupValidator,
  removeMemberValidator,
  sendAttachmentValidator,
  validateHandler,
  renameGroupValidator,
} from "../lib/validators.js";

const app = express.Router();

// authorized routes
app.use(isAuthenticated);

app.post("/new", newGroupValidator(), validateHandler, newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);
app.put("/addmembers", addMemberValidator(), validateHandler, addMembers);
app.put(
  "/removemember",
  removeMemberValidator(),
  validateHandler,
  removeMember
);
app.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);
app.post(
  "/message",
  attachmentsMulter,
  sendAttachmentValidator(),
  validateHandler,
  sendAttachment
);
app.get("/message/:id", chatIdValidator(), validateHandler, getMessages);
app
  .route("/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameGroupValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat);

export default app;
