import express from 'express';
import {getInterestOverTime} from '../../../controllers/TermsTrendingController.js';

const router = express.Router();

router.get('/trends', getInterestOverTime);

export default router;