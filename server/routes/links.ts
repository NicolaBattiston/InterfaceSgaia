import express from 'express';
import { createLink, getLinkById } from '../controllers/linkController.js';

const router = express.Router();

// Create a new link
router.post('/', createLink);

// Get a link by ID
router.get('/:id', getLinkById);

export default router;