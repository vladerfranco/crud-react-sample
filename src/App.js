import React, {Component} from 'react';
import './App.css';
import {MovieService} from "./service/MovieService";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Panel} from "primereact/panel";
import {Dialog} from "primereact/dialog";

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


export default class App extends Component {
  constructor() {
    super();
    this.state = {};

    this.movieService = new MovieService();
    this.showMovieSelected = this.showMovieSelected.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  componentDidMount() {
    this.movieService.getAll().then(data => this.setState({movies: data}));
  }

  showMovieSelected() {
    this.setState({
        visible: true
    });
  }

  onHide() {
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <div style={{width: '80%', margin: '0 auto', marginTop: '20px'}}>
        <Panel header="Lista de Filmes">
          <DataTable selectionMode="single" value={this.state.movies}
            onSelectionChange={e => this.showMovieSelected()}>
            <Column field="id" header="Código"></Column>
            <Column field="title" header="Título"></Column>
            <Column field="releaseYear" header="Lançamento"></Column>
            <Column field="average" header="Média"></Column>
          </DataTable>
        </Panel>
        <Dialog header="Informações do Filme" visible={this.state.visible} modal={true}
                style={{width: '50vw'}} onHide={() => this.setState({visible: false})}>
        </Dialog>
      </div>
    )
  }
}
