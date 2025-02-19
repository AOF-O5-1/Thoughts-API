"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thoughtController_1 = require("../../controllers/thoughtController");
const router = (0, express_1.Router)();
router.route('/')
    .get(thoughtController_1.thoughtController.getThoughts)
    .post(thoughtController_1.thoughtController.createThought);
router.route('/:thoughtId')
    .get(thoughtController_1.thoughtController.getThoughtById)
    .put(thoughtController_1.thoughtController.updateThought)
    .delete(thoughtController_1.thoughtController.deleteThought);
router.route('/:thoughtId/reactions')
    .post(thoughtController_1.thoughtController.addReaction);
router.route('/:thoughtId/reactions/:reactionId')
    .delete(thoughtController_1.thoughtController.removeReaction);
exports.default = router;
