"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRoutes = (0, express_1.Router)();
userRoutes.route('/')
    .get(userController_1.userController.getUsers)
    .post(userController_1.userController.createUser);
userRoutes.route('/:userId')
    .get(userController_1.userController.getUserById)
    .put(userController_1.userController.updateUser)
    .delete(userController_1.userController.deleteUser);
userRoutes.route('/:userId/friends/:friendId')
    .post(userController_1.userController.addFriend)
    .delete(userController_1.userController.removeFriend);
exports.default = userRoutes;
