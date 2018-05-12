import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import PlayerPreview from './PlayerPreview'


class PlayerInput extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired
    }
    static defaultProps = {
        label: 'Username' 
    }

    state = {
        username: ''
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.setState(() => ({ username : value }));
    }

    handleSubmit = (event) => {
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


class Battle extends React.Component {

    static propTypes = {
        match: PropTypes.object.isRequired
    }

    state = {
        playerOneName: '',
        playerTwoName: '',
        playerOneImage: null,
        playerTwoImage: null
    }

    handleChildSubmit = (id, username) =>  {
        this.setState(() => ({
            [`${id}Name`]: username,
            [`${id}Image`]: `https://github.com/${username}.png?size200`
        }))
    }

    handleChildReset = (id) => {
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


export default Battle; 