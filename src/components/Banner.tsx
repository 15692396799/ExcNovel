import React, { Component } from 'react';
import Silder from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Banner.css';
import { Story } from '../types';

import StoryList from './StoryList';
import { Carousel } from 'react-bootstrap';
import BannerList from './BannerList.jsx';

// import dotenv from 'dotenv';
// dotenv.config();
// how to load .env file in tsx file?

// interface Story {
//     id: number;
//     image: string;
//     title: string;
//     description: string;
//     // add more properites to recommand
// }

interface BannerState {
    stories: Story[];//define the type of stories
    loading: boolean;
    error: any;
}

export default class Banner extends Component<{}, BannerState> {
    setting: {
        dots: boolean; // 显示分页点
        infinite: boolean; // 无限循环
        speed: number; // 切换速度
        slidesToShow: number; // 每次显示一张
        slidesToScroll: number; // 每次滚动一张
        autoplay: boolean; // 自动播放
        autoplaySpeed: number; // 自动播放间隔
        arrows: boolean;
    };
    fetchUrl: string;


    constructor(props: any) {
        super(props);
        this.state = {
            stories: [],
            loading: true,
            error: null
        }

        // this.fetchUrl =  'https://15692396799.github.io/stories-api/stories.json';
        //change the fecthUrl to local mongodb
        this.fetchUrl = 'http://localhost:5000/api/stories/recommend';

        // this.fetchUrl = process.env.REACT_APP_DB_DOMAIN+ '/api/stories'
        // use in cjs file not in tsx file
        this.setting = {
            dots: true, // 显示分页点
            infinite: true, // 无限循环
            speed: 500, // 切换速度
            slidesToShow: 1, // 每次显示一张
            slidesToScroll: 1, // 每次滚动一张
            autoplay: true, // 自动播放
            autoplaySpeed: 3000, // 自动播放间隔
            arrows: true, // 显示左右箭头
        };
    }
    //fetch the data from the API
    componentDidMount() {
        const abortController = new AbortController();
        const signal = abortController.signal;

        // Set a timeout for the fetch request
        const timeout = 5000; // 5 seconds

        const fetchPromise = fetch(this.fetchUrl, { signal })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.setState({ stories: data, loading: false });
                console.log("Successfully!");
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log("Interrupted");
                } else {
                    console.log(error);
                }
                this.setState({ loading: false, error: error.message });
            });

        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                abortController.abort(); // Abort the fetch request
                reject(new Error("Timeout"));
            }, timeout);
        });

        Promise.race([fetchPromise, timeoutPromise])
            .catch(error => {
                if (error.message === "Timeout") {
                    console.log("Timeout");
                }
            });
    }

    render() {
        const { stories, loading, error } = this.state;
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
                    <BannerList banners={stories.slice(0,5)} />
                    {/* <Carousel>
                        {stories.map((story, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={story.image + '?v1'}
                                    alt={story.title}
                                    style={{ height: '400px', objectFit: 'cover' }} // 统一封面尺寸
                                />
                                <Carousel.Caption>
                                    <h3>{story.title}</h3>
                                    <p>{story.description}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel> */}
                    {/* <Silder className='silder' {...this.setting}>
                        {stories.map((story) => (
                            <div key={story.id} className='banner-item'>
                                <img src={story.image+'?v1'} alt={story.title} className="banner-cover" />
                                <div className="banner-content">
                                    <h3 className="banner-title">{story.title}</h3>
                                    <p className="banner-description">{story.description}</p>
                                </div>
                            </div>
                        ))}
                        use public component to replace it
                        <StoryList stories={stories} layout='banner' />
                        {stories.map((story) => (
                            <div key={story.id}>
                                <StoryList stories={[story]} layout='banner' />
                            </div>
                        ))}
                    </Silder> */}
                </div>
            </div>

        );
    }
}