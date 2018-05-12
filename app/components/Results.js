import React from 'react'
import queryString from 'query-string'
import { battle } from '../utils/api'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import PlayerPreview from './PlayerPreview'
import Loading from './Loading'
import * as log from 'loglevel';




function Profile ({ info }) {
    
    log.info(info);
    return (
        <PlayerPreview avatar={info.avatar_url} username={info.login}>
            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
            </ul>
        </PlayerPreview>
    )
}

Profile.propTypes = {
    info: PropTypes.object.isRequired    
}

function Player({ label, score, profile }) {
    return (
        <div>
            <h1 className='header'>{label}</h1>
            <h3 style={{textAlign: 'center'}}>Score: {score}</h3>
            <Profile info={profile}/>
        </div>
    )
}

Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired
}

class Results extends React.Component {

    static propTypes = {
        location: PropTypes.object.isRequired
    }

    state = {
        winner: null,
        loser: null,
        error: null,
        loading: true
    }

    componentDidMount() {
        const {playerOneName, playerTwoName}  = queryString.parse(this.props.location.search);
        battle([ playerOneName, playerTwoName])
        .then( (result) => {
            
            if (result === null) {
                return this.setState( () => ({
                    error: 'Looks like there was an error. Check that both users exist on GitHub',
                    loading: false
                }))
            }

            this.setState( () => ({
                error: null,
                winner: result[0],
                loser: result[1],
                loading: false
            }));
        });

    }

    render() {
        var error = this.state.error;
        var winner = this.state.winner;
        var loser = this.state.loser;
        var loading = this.state.loading;
       
        if (loading === true) {
            return <Loading />
        }

        if (error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            )
        }

        return (
            <div className='row'>
                <Player
                    label='Winner'       
                    score={winner.score}
                    profile={winner.profile}
                />
                <Player
                    label='Loser'       
                    score={loser.score}
                    profile={loser.profile}
                />
            </div>
        )
    }
}



export default Results;