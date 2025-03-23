import { Request, Response } from 'express';
import Story from '../models/Story';

export const getAllStories = async (req: Request, res: Response) => {
    try {
        const stories = await Story.find();
        res.json(stories);
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
};

export const getTopStories = async (req: Request, res: Response) => {
    try {
        const topStories = await Story.find().sort({ rating: -1 }).limit(5);
        res.json(topStories);
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
};

export const getStoriesByType = async (req: Request, res: Response) => {
    try {
        if (req.params.type === 'default') {
            const stories = await Story.find().sort({ rating: -1 }).limit(100);
            res.json(stories);
        } else {
            const stories = await Story.find({ type: req.params.type }).sort({ rating: -1 });
            res.json(stories);
        }
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
};

export const getStoriesByRating = async (req: Request, res: Response) => {
    try {
        const stories = await Story.find({ rating: { $gte: parseFloat(req.params.rating) } });
        res.json(stories);
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
};

export const getPopularStories = async (req: Request, res: Response) => {
    try {
        const stories = await Story.find({ likes: { $gte: 500 } });
        res.json(stories);
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
};