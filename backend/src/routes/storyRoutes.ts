import express from 'express';
import {
    getAllStories,
    getTopStories,
    getStoriesByType,
    getStoriesByRating,
    getPopularStories,
} from '../controllers/storyController';

const router = express.Router();

router.get('/stories', getAllStories);
router.get('/stories/recommend', getTopStories);
router.get('/stories/type/:type?', getStoriesByType);
router.get('/stories/rating/:rating', getStoriesByRating);
router.get('/stories/popular', getPopularStories);

export default router;