"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const thoughts_1 = __importDefault(require("../models/thoughts"));
const users_1 = __importDefault(require("../models/users"));
exports.userController = {
    // Get all users
    getUsers(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield users_1.default.find()
                    .populate('thoughts')
                    .populate('friends');
                res.json(users);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Get single user by ID
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_1.default.findOne({ _id: req.params.userId })
                    .populate('thoughts')
                    .populate('friends');
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(user);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Create a new user
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_1.default.create(req.body);
                res.json(user);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Update user by ID
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_1.default.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(user);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Delete user and associated thoughts
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_1.default.findOneAndDelete({ _id: req.params.userId });
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                yield thoughts_1.default.deleteMany({ username: user.username });
                res.json({ message: 'User and associated thoughts deleted!' });
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Add friend
    addFriend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_1.default.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(user);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Remove friend
    removeFriend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_1.default.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(user);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
};
