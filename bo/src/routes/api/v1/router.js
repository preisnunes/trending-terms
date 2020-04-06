import express from 'express';
import {getInterestOverTime} from '../../../controllers/TermsTrendingController.js';
import {getSupportedTimespans} from '../../../controllers/TimespansController.js';

const router = express.Router();

router.get('/trends', getInterestOverTime);

router.get('/timespans', getSupportedTimespans);

export default router;