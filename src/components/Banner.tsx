import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Banner.css';
import { Story } from '../types/story';
import BannerList from './BannerList';
import { ExecException } from 'child_process';


interface BannerProps {}

const Banner: React.FC<BannerProps> = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUrl = 'http://localhost:5000/api/stories/recommend';

    const settings = {
        dots: true, // 显示分页点
        infinite: true, // 无限循环
        speed: 500, // 切换速度
        slidesToShow: 1, // 每次显示一张
        slidesToScroll: 1, // 每次滚动一张
        autoplay: true, // 自动播放
        autoplaySpeed: 3000, // 自动播放间隔
        arrows: true, // 显示左右箭头
    };

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchData = async () => {
            try {
                const response = await fetch(fetchUrl, { signal });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setStories(data);
                setLoading(false);
                console.log("Successfully!");
            } catch (error: any) {
                if (error.name === 'AbortError') {
                    console.log("Fetch aborted");
                } else {
                    console.error("Fetch error:", error);
                    setError(error.message);
                    setLoading(false);
                }
            }
        };

        // const timeout = 5000; // 5 seconds
        // const timeoutId = setTimeout(() => {
        //     if (!signal.aborted) {
        //         abortController.abort();
        //         console.log("Fetch timeout");
        //         setError("Request timed out");
        //         setLoading(false);
        //     }
        // }, timeout);

        fetchData();

        // Cleanup function
        return () => {
            // clearTimeout(timeoutId); // Clear the timeout
            if (!signal.aborted) {
                abortController.abort(); // Abort the fetch request
            }
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='banner-container'>
            <div className='banner-header'>
                <h2 className='header-title'>热门小说推荐</h2>
            </div>
            <div className='banner'>
                <BannerList banners={stories.slice(0, 5)} />
            </div>
        </div>
    );
};

export default Banner;