import axios from 'axios';

export class MovieService {
    baseUrl = "http://localhost:8080/api/";

    getAll() {
        return axios.get(this.baseUrl + "movies").then(resp => resp.data);
    }
}