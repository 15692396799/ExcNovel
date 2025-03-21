interface Story {
    id: number;
    title: string;
    image: string;
    description: string;
    type: string;
    rating: number;
}

interface Category {
    id: number;
    name: string;
    type: string;
}
export type {Story, Category};