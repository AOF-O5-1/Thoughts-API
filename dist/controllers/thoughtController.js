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
exports.thoughtController = void 0;
const thoughts_1 = __importDefault(require("../models/thoughts"));
const users_1 = __importDefault(require("../models/users"));
exports.thoughtController = {
    // Get all thoughts
    getThoughts(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thoughts = yield thoughts_1.default.find();
                res.json(thoughts);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Get thought by ID
    getThoughtById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield thoughts_1.default.findOne({ _id: req.params.thoughtId });
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thought);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Create thought
    createThought(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield thoughts_1.default.create(req.body);
                yield users_1.default.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: thought._id } }, { new: true });
                res.json(thought);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Update thought
    updateThought(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield thoughts_1.default.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thought);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Delete thought
    deleteThought(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield thoughts_1.default.findOneAndDelete({ _id: req.params.thoughtId });
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                yield users_1.default.findOneAndUpdate({ username: thought.username }, { $pull: { thoughts: req.params.thoughtId } });
                res.json({ message: 'Thought deleted!' });
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Add reaction
    addReaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield thoughts_1.default.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } }, { runValidators: true, new: true });
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thought);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    // Remove reaction
    removeReaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield thoughts_1.default.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thought);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
};
