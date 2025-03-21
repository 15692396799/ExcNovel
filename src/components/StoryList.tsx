import React, {Component} from 'react';
import { Story } from '../types';

interface StoryListState {
    stories: Story[];
    layout: 'grid' | 'banner';
}

interface StoryListProps {
    stories: Story[];
    layout?: 'grid' | 'banner'|'category';
}

export default class StoryList extends Component<StoryListProps, {}> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            <div className={`story-list ${this.props.layout}`}>
                {this.props.stories.map((story) => (
                    <div key={story.id} className='story-item'>
                        <img className='story-cover' src={story.image} alt={story.title} />
                        <div className='story-content'>
                            <h3 className='story-title'>{story.title}</h3>
                            <p className='story-description'>{story.description}</p>                            
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

