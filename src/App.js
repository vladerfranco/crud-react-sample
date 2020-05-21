import React, {Component} from "react";

import Header from './components/Header';
import MovieBox from './components/Movie';

class App extends Component {
    render() {
        return (
            <div className="container">
                <Header title="Avaliação de Filmes" />
                <br/>
                <MovieBox />
            </div>
        );
    }
}

export default App;