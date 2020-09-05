import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Proptypes from 'prop-types';

import Container from '../../components/Container';

import { Loading, Owner } from './styles';

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

    if (loading) {
      return <Loading>Carregando</Loading>
    }

    return (
      <Container>
        <Link to="/">Voltar aos repositórios</Link>
        <Owner>
          <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
      </Container>
    );
  }
}
