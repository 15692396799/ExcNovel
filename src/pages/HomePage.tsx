import React from 'react';

import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import Banner from '../components/Banner.tsx';
import PopularStories from '../components/PopularStories.tsx';
import Categories from '../components/Categories.tsx';

export default function HomePage() {
    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the Home Page</p>
            <Header/>
            <Banner/>
            <Categories/>            
            <PopularStories/>
            <Footer/>
        </div>
    );
}