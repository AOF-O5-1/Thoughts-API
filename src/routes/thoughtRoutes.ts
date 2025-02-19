import { Router } from 'express';
import { thoughtController } from '../controllers/thoughtController';

const thoughtRoutes = Router();

thoughtRoutes.route('/')
  .get(thoughtController.getThoughts)
  .post(thoughtController.createThought);

  thoughtRoutes.route('/:thoughtId')
  .get(thoughtController.getThoughtById)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

  thoughtRoutes.route('/:thoughtId/reactions')
  .post(thoughtController.addReaction);

  thoughtRoutes.route('/:thoughtId/reactions/:reactionId')
  .delete(thoughtController.removeReaction);

export default thoughtRoutes;