import React, { Component } from 'react';
import Silder from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Banner.css';
import { Story } from '../types';

import StoryList  from './StoryList';

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


    constructor(props:any) {
        super(props);
        this.state = {
            stories: [
                {
                  id: 1,
                  image: 'https://via.placeholder.com/800x400?text=Cover+1',
                  title: '故事标题 1',
                  description: '这是第一个故事的简介，内容非常精彩。',
                },
                {
                  id: 2,
                  image: 'https://via.placeholder.com/800x400?text=Cover+2',
                  title: '故事标题 2',
                  description: '这是第二个故事的简介，内容非常精彩。',
                },
                {
                  id: 3,
                  image: 'https://via.placeholder.com/800x400?text=Cover+3',
                  title: '故事标题 3',
                  description: '这是第三个故事的简介，内容非常精彩。',
                },
              ]
            ,
            loading: true,
            error: null
        }

        this.fetchUrl =  'https://15692396799.github.io/stories-api/stories.json';
        this.setting =  {    
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
                this.setState({...this.state, stories: data, loading: false});  
                console.log("Successfully!");
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log("Interrupted");
                } else {
                    console.log(error);
                }
                this.setState({...this.state, loading: false, error: error.message});
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
                    <Silder className='silder' {...this.setting}>
                        {stories.map((story) => (
                            <div key={story.id} className='banner-item'>
                                <img src={story.image+'?v1'} alt={story.title} className="banner-cover" />
                                <div className="banner-content">
                                    <h3 className="banner-title">{story.title}</h3>
                                    <p className="banner-description">{story.description}</p>
                                </div>
                            </div>
                        ))}
                        {/*use public component to replace it*/}
                        {/* <StoryList stories={stories} layout='banner' /> */}
                        {/* {stories.map((story) => (
                            <div key={story.id}>
                                <StoryList stories={[story]} layout='banner' />
                            </div>
                        ))} */}
                    </Silder>
                </div>                
            </div>

        );
    }
}