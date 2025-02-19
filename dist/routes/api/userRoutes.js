"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../controllers/userController");
const router = (0, express_1.Router)();
router.route('/')
    .get(userController_1.userController.getUsers)
    .post(userController_1.userController.createUser);
router.route('/:userId')
    .get(userController_1.userController.getUserById)
    .put(userController_1.userController.updateUser)
    .delete(userController_1.userController.deleteUser);
router.route('/:userId/friends/:friendId')
    .post(userController_1.userController.addFriend)
    .delete(userController_1.userController.removeFriend);
exports.default = router;
