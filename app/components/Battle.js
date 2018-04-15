import React from 'react';
var PropTypes = require('prop-types');
import { Link } from 'react-router-dom';
var PlayerPreview = require('./PlayerPreview');


class PlayerInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState(() => ({ username : value }));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(
            this.props.id,
            this.state.username
        )
    }

    render() {

        const { username } = this.state;
        const { label } = this.props;

        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>
                    {label}
                </label>
                <input
                    id='username'
                    placeholder='github username'
                    type='text'
                    autoComplete='off'
                    value={username}
                    onChange={this.handleChange}
                />
                <button
                    className='button'
                    type='submit'
                    disabled={!username}>
                    Submit
                </button>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null
        }

        this.handleChildSubmit = this.handleChildSubmit.bind(this);
        this.handleChildReset = this.handleChildReset.bind(this);
    }

    handleChildSubmit(id, username) {
        this.setState(() => ({
            [`${id}Name`]: username,
            [`${id}Image`]: `https://github.com/${username}.png?size200`
        }))
    }

    handleChildReset(id) {
        this.setState(() => ({
            [`${id}Name`]: '',
            [`${id}Image`]: null
        }))
    }


    render() {
        const { match } = this.props;
        const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;
        
        return (
            <div>
                <div className="row">

                    {!playerOneName && 
                        <PlayerInput 
                            id='playerOne' 
                            label='Player One' 
                            onSubmit={this.handleChildSubmit}/>}

                    {playerOneImage !== null && 
                        <PlayerPreview 
                            avatar={playerOneImage}
                            username={playerOneName}>
                            <button
                                className='reset'
                                onClick={() => this.handleChildReset('playerOne')}>
                                Reset
                            </button>
                        </PlayerPreview>
                        }                    
                    

                    {!playerTwoName && 
                        <PlayerInput 
                            id='playerTwo' 
                            label='Player Two' 
                            onSubmit={this.handleChildSubmit}/>}  

                    {playerTwoImage !== null && 
                        <PlayerPreview 
                            avatar={playerTwoImage}
                            username={playerTwoName}>
                            <button
                                className='reset'
                                onClick={() => this.handleChildReset('playerTwo')}>
                                Reset
                            </button>    
                        </PlayerPreview>
                        } 

                </div> 

                {playerOneImage && playerTwoImage && 
                    <Link
                        className='button'
                        to={{
                            pathname: match.url + '/results',
                            search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
                        }}>
                        Battle
                    </Link>
                }
                
            </div>

        );
    }
}

Battle.propTypes = {
    match: PropTypes.object.isRequired
}

module.exports = Battle; 