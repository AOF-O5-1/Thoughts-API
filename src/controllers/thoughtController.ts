import { Request, Response } from 'express';
import Thought from '../models/thoughts';
import User from '../models/users';

export const thoughtController = {
  // Get all thoughts
  async getThoughts(_req: Request, res: Response): Promise<void> {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get thought by ID
  async getThoughtById(req: Request, res: Response): Promise<void> {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create thought
  async createThought(req: Request, res: Response): Promise<void> {
    try {
      const thought = await Thought.create(req.body);
      await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update thought
  async updateThought(req: Request, res: Response): Promise<void> {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete thought
  async deleteThought(req: Request, res: Response): Promise<void> {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: req.params.thoughtId } }
      );
      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add reaction
  async addReaction(req: Request, res: Response): Promise<void> {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove reaction
  async removeReaction(req: Request, res: Response): Promise<void> {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
