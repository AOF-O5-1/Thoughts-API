"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thoughtController_1 = require("../controllers/thoughtController");
const thoughtRoutes = (0, express_1.Router)();
thoughtRoutes.route('/')
    .get(thoughtController_1.thoughtController.getThoughts)
    .post(thoughtController_1.thoughtController.createThought);
thoughtRoutes.route('/:thoughtId')
    .get(thoughtController_1.thoughtController.getThoughtById)
    .put(thoughtController_1.thoughtController.updateThought)
    .delete(thoughtController_1.thoughtController.deleteThought);
thoughtRoutes.route('/:thoughtId/reactions')
    .post(thoughtController_1.thoughtController.addReaction);
thoughtRoutes.route('/:thoughtId/reactions/:reactionId')
    .delete(thoughtController_1.thoughtController.removeReaction);
exports.default = thoughtRoutes;
