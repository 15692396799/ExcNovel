import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import '../styles/Header.css';

interface HeaderState {
    content: string;
    inputValue: string; 
}

interface HeaderProps {
    // category: string;
    inputValue: string; 
}

export default class Header extends Component<{}, HeaderState> {
    constructor(props:any){ {/*define props category*/}
        super(props);
        this.state = {
            content: '',
            inputValue:''
        };

        
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, inputValue: e.target.value});
    }

    handleButtonClick = ()=> {
        this.setState({...this.state, content: this.state.inputValue});
        console.log(this.state.content);
    }

    render() {
        return (
            <header className='header'>
                <div className="logo">
                    <Link to="/">Short Story Hub</Link> {/*add a logo picture*/ }

                    
                </div>
                <nav className='nav'>
                    <Link to="/">首页</Link>
                    <Link to="/categories">分类</Link>
                    <Link to="/subscription">订阅</Link>
                    <Link to="/about">关于</Link>
                </nav>
                <div className="search">
                    <input onChange={this.handleInputChange} type="text" defaultValue={this.state.content} placeholder="Search..." />
                    <button onClick={this.handleButtonClick}>Search</button> {/*submit button*/}
                </div>
                <div className="user">
                    <Link to="/profile">登录/注册</Link>
                </div>

            </header>            
        );
    }
}