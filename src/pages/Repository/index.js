import React, { Component } from 'react';
import api from '../../services/api';
import Proptypes from 'prop-types';
// import { Container } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: Proptypes.shape({
      params: Proptypes.shape({
        repository: Proptypes.string,
      })
    }).isRequired,

  };

  state = {
    repository: {},
    issues: [],
    loading: true,
  }

  async componentWillMount() {
    const { match } = this.props;



    const repoName = decodeURIComponent(match.params.repository);

    // api.github.com/repos/rocketseat/unform
    //api.github.com/repos/rocketseat/unform/usses

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5
        }
      })
    ])

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    })
  }


  render () {
    const { repository, issues, loading} = this.state;
    return <h1>Repository:</h1>;
  }
}
