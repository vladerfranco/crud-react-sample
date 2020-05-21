import React, {Component} from "react";
import Table from "reactstrap/lib/Table";
import Breadcrumb from "reactstrap/lib/Breadcrumb";
import Form from "reactstrap/lib/Form";
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";
import Input from "reactstrap/lib/Input";
import Button from "reactstrap/lib/Button";

class FormRating extends Component {
    state = {
        model: {
            id: 0,
            rater: '',
            comment: '',
            note: 0.0
        }
    };

    setValues = (e, field) => {
        const {model} = this.state;
        model[field] = e.target.value;
        this.setState({model});
    }

    create = () => {
        this.setState({model: {id: 0, rater: '', comment: '', note: 0.0}});
        this.props.ratingCreate(this.state.model);
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <div className="form-row">
                        <div className="col-md-8">
                            <Label for="rater">Avaliador:</Label>
                            <Input id="rater" type="text" value={this.state.model.rater} placeholder="Nome do Avaliador"
                                   onChange={e => this.setValues(e, 'rater')}/>
                        </div>
                        <div className="col-md-4">
                            <Label for="note">Nota:</Label>
                            <Input id="note" type="text" value={this.state.model.note} placeholder="Nota do Avaliador"
                                   onChange={e => this.setValues(e, 'note')}/>
                        </div>
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label for="comment">Comentário:</Label>
                    <Input id="comment" type="textarea" value={this.state.model.comment} placeholder="Comentário do Avaliador"
                           onChange={e => this.setValues(e, 'comment')}/>
                </FormGroup>
                <Button color="primary" block onClick={this.create}> Salvar </Button>
            </Form>
        );
    }
}

class ListRating extends Component {
    render() {
        const {ratings} = this.props;
        return (
            <Table className="table-bordered text-center" >
                <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Avaliador</th>
                    <th>Comentário</th>
                    <th>Nota</th>
                </tr>
                </thead>
                <tbody>
                {
                    ratings?.map(rating => (
                        <tr key={rating.id}>
                            <td>{rating.id}</td>
                            <td>{rating.rater}</td>
                            <td>{rating.comment}</td>
                            <td>{rating.note}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>

        );
    }
}

class MovieInfo extends Component {

    Url = 'http://localhost:8080/api/movies/';

    state = {
        ratings: []
    }

    save = (rating) => {
        let data = {
            id: parseInt(rating.id),
            rater: rating.rater,
            comment: rating.comment,
            note: parseFloat(rating.note)
        }

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }

        fetch(this.Url + this.props.movie.id + '/ratings',requestInfo)
            .then(response => response.json())
            .then(newRating => {
                let ratingsTemp = this.props.movie.ratings;
                ratingsTemp.push(newRating);
                this.setState({ratings: ratingsTemp});
            })
    }

    render() {
        const {movie} = this.props;
        return(
            <div>
                <div>
                    <Breadcrumb>
                        <label><b>Título:&nbsp;</b></label>
                        <span>{movie?.title}</span>
                    </Breadcrumb>
                    <Breadcrumb>
                        <label><b>Sinopse:&nbsp;</b></label>
                        <span>{movie?.synopsis}</span>
                    </Breadcrumb>
                    <Breadcrumb>
                        <label><b>Lançamento:&nbsp;</b></label>
                        <span>{movie?.releaseYear}</span>
                    </Breadcrumb>
                    <Breadcrumb>
                        <label><b>Produtor(es):&nbsp;</b></label>
                        <span>{movie?.producerName}</span>
                    </Breadcrumb>
                    <Breadcrumb>
                        <label><b>Ator(es):&nbsp;</b></label>
                        <span>{movie?.protagonistName}</span>
                    </Breadcrumb>
                </div>
                <div>
                    <h4 className="font-weight-bold text-center">Avaliar</h4>
                    <FormRating ratingCreate={this.save}/>
                </div>
                <br/>
                <div>
                    <ListRating ratings={movie?.ratings}/>
                </div>
            </div>
        )
    }
}

class ListMovies extends Component {

    onSelectedRow = (id) => {
        this.props.onSelectedMovie(id);
    }

    render() {
        const {movies} = this.props;
        return (
            <Table className="table-bordered text-center" >
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Título</th>
                        <th>Lançamento</th>
                        <th>Média</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        movies.map(movie => (
                            <tr key={movie.id} onClick={e => this.onSelectedRow(movie.id)} >
                                <td>{movie.id}</td>
                                <td>{movie.title}</td>
                                <td>{movie.releaseYear}</td>
                                <td>{movie.average}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }
}

export default class MovieBox extends Component {

    Url = 'http://localhost:8080/api/movies/';

    state = {
        movies: [],
        selectedMovie: null
    }

    componentDidMount() {
        fetch(this.Url)
            .then(response => response.json())
            .then(movies => this.setState({movies}))
            .catch(e => console.log(e));
    }

    onSelected = (id) => {
        fetch(this.Url+id)
            .then(response => response.json())
            .then(selectedMovie => this.setState({selectedMovie}))
            .catch(e => console.log(e));
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 my-3">
                    <h2 className="font-weight-bold text-center">Lista de Filmes</h2>
                    <ListMovies movies={this.state.movies} onSelectedMovie={this.onSelected}/>
                </div>
                <div hidden={!this.state.selectedMovie} className="col-md-6 my-3">
                    <h2 className="font-weight-bold text-center">Informações do Filme</h2>
                    <MovieInfo movie={this.state.selectedMovie}/>
                </div>
            </div>
        )
    }
}