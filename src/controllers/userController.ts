import { Request, Response } from 'express';
import Thought from '../models/thoughts';
import User from '../models/users';

export const userController = {
  // Get all users
  async getUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find()
        .populate('thoughts')
        .populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get single user by ID
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends');
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update user by ID
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete user and associated thoughts
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      await Thought.deleteMany({ username: user.username });
      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add friend
  async addFriend(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove friend
  async removeFriend(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};