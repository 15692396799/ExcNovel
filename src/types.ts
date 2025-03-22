interface Story {
    id: number;
    title: string;
    image: string;
    description: string;
    type: string;
    rating: number;
    likes: number;
    hotReview: string;
}

interface Category {
    id: number;
    name: string;
    type: string;
}
export type {Story, Category};