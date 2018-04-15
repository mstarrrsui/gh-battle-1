//var React = require('react');
import React from 'react';
const PropTypes = require('prop-types');
const api = require('../utils/api');
const Loading = require('./Loading');
const log = require("loglevel");

function SelectLanguage({ selectedLanguage, onSelect }) {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (

        <ul className="languages">
            {languages.map(lang => (
                <li
                    style={lang === selectedLanguage ? { color: '#d0021b' } : null}
                    onClick={e => onSelect(lang,e)}
                    key={lang}>
                    {lang}
                </li>
            ))}
        </ul>
    )
}

function RepoGrid({ repos }) {
    return (
        <ul className='popular-list'>
            { repos.map(({ name, owner, html_url, stargazers_count },index) => (
                <li key={name} className='popular-item'>
                    <div className='popular-rank'>#{index + 1}</div>
                    <ul className='space-list-items'>
                    <li>
                        <img className='avatar'
                            src={owner.avatar_url}
                            alt={'Avatar for ' + owner.login} />
                    </li> 
                    <li>
                        <a href={html_url}>{name}</a>
                    </li>
                    <li>@{owner.login}</li>
                    <li>{stargazers_count} stars</li>
                    </ul>
                </li>
            ))}
        </ul>
    );
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}


SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        }

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {

        var level = log.getLevel();
        log.warn("Popular:" + level)

        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang) {
        
        this.setState(() => ({
            selectedLanguage: lang,
            repos: null
        }));

        api.fetchPopularRepos(lang)
            .then( (repos) => this.setState( () => ( { repos })));
    }

    render() {

        const { selectedLanguage, repos } = this.state;
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                { !this.state.repos
                ? <Loading speed={90} text='DOWNLOADING'/>
                : <RepoGrid repos={repos} /> }
                
            </div>
            
        )
    }
}

module.exports = Popular;