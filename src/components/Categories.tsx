import React, {Component} from 'react';
import {Story, Category} from '../types';
import StoryList from './StoryList';
import '../styles/Categories.css';

interface CategoriesState {
    selectedType: string;
    stories: Story[];
    categories: Category[];
    loading: boolean;
    error: any;
}

export default class Categories extends Component<{}, CategoriesState> {
    fecthCategoryUrl: string;
    fetchTypeUrl: string;
    constructor(props:any) {
        super(props);
        this.state ={
            selectedType : '',
            stories:[],
            categories:[],
            loading: true,
            error: null
        }
        this.fecthCategoryUrl = 'http://localhost:5000/api/categories';
        this.fetchTypeUrl = 'http://localhost:5000/api/stories/type';
    }

    //load categories data
    componentDidMount() {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const timeout = 5000;

        const fetchPromise = fetch(this.fecthCategoryUrl, {signal})
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            this.setState({categories: data, loading: false});
            console.log('Fecth Category Data Successfully!');
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                console.log('Fetch Category aborted');
            }
            else {
                console.error('Error:', error);
            }
            this.setState({loading: false, error: error});
        }
        );

        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                abortController.abort();
                reject('Request timed out');
            }, timeout)
        });

        Promise.race([fetchPromise, timeoutPromise])
        .catch(error => {
            if (error === 'Request timed out') {
                console.log('Request Category Data timed out');
            }
        });
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.selectedType !== this.state.selectedType) {
            const abortController = new AbortController();
            const signal = abortController.signal;
            const timeout = 5000;

            const fetchPromise = fetch(`${this.fetchTypeUrl}/${encodeURIComponent(this.state.selectedType)}`, {signal})
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.setState({stories: data, loading: false});
                console.log(`Fetch ${this.state.selectedType} Story Data Successfully!`);
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log(`Fetch ${this.state.selectedType} Story Data aborted`);
                }
                else {
                    console.error('Error:', error);
                }
                this.setState({loading: false, error: error});
            }
            );

            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => {
                    abortController.abort();
                    reject('Request timed out');
                }, timeout)
            }
            );

            Promise.race([fetchPromise, timeoutPromise])
            .catch(error => {
                if (error === 'Request timed out') {
                    console.log(`Request ${this.state.selectedType} Story Data timed out`);
                }
            });

        }
    }

    handleCategoryClick = (type: string) => {
        this.setState({selectedType: type});
    };


    render() {
        const {categories, stories, selectedType, loading, error} = this.state;
        //print the stories
        for (let i = 0; i < stories.length; i++) {
            console.log(stories[i].id, stories[i].type);
        }
        return (
            <div className='categories-container'>
                <h2 className='header-title'>小说分类</h2> 
                {/*type filter*/}
                <div className='categories-tags'>
                    {categories.map(tag => (
                        <button key={tag.id} className={`tag ${selectedType==tag.type ? 'active' : ''}`} 
                        onClick={() => this.handleCategoryClick(tag.type)}>
                        {tag.name}</button>
                    ))}
                </div>
                {/*loading*/}
                {loading && <div className='loading'>Loading...</div>}
                {/*error*/}
                {error && <div className='error'>Error: {error}</div>}
                {/*stories*/}
                <div className='categories'>
                    {/* {stories.map(story => (
                        <div key={story.id} className='category-item'>
                            <img className='category-image' src={story.image} alt={story.title}/>
                            <div className='category-title'>{story.title}</div>
                            <div className='category-description'>{story.description}</div>
                        </div>
                    ))}

                 */}
                    <StoryList stories={stories} layout='grid' />
                </div>
                {/*no data*/}
                {!loading && stories.length === 0 && <div className='no-data'>暂无数据</div>}

            </div>
        );
    }
}