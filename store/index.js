import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);
export default () => {
    return new Vuex.Store({
        state: {
            movies: [],
            movie: {},
            movie_id: 0,
            movie_name: '',
            movie_page: 1,
            movie_count: 0,
        },
        getters: {
            getMovies(state) {
                return state.movies
            }
        },
        actions: {
            async search_movies({ commit }, page) {
                try {
                    const url = "https://yts.mx/api/v2/list_movies.json?page="+page+"&sort_by=rating&limit=16"
                    const response = await this.$axios.get(url);
                    commit("setMovies", response.data.data)
                } catch (err) {
                    console.log(err)
                }
            },
            async search_movie({ commit }, id) {
                try {
                    const response = await this.$axios.get(
                        "https://yts.mx/api/v2/movie_details.json?movie_id="+id
                    );
                    commit("setMovie", response.data.data.movie)
                } catch (err) {
                    console.log(err)
                }
            },
            async search_movies_by_name({ commit }, query) {
                try {
                    const url = "https://yts.mx/api/v2/list_movies.json?page="+this.state.movie_page.toString()+"&query_term="+query+"&limit=16"
                    const response = await this.$axios.get(url);
                    commit("setMovies", response.data.data)
                } catch (err) {
                    console.log(err)
                }
            },
            async filter_movies({ commit }, data) {
                try {
                    const url = "https://yts.mx/api/v2/list_movies.json?page="+this.state.movie_page.toString()+"&sort_by="+data+"&limit=16"
                    const response = await this.$axios.get(url);
                    commit("setMovies", response.data.data)
                } catch (err) {
                    console.log(err)
                }
            },
        },
        mutations: {
            async setMovies(state, value) {
                state.movie_count = value.movie_count
                state.movies = await value.movies.map(movie => {
                    return {
                        id: movie.id,
                        name: movie.title,
                        rating: movie.rating,
                        image_url: movie.large_cover_image,
                        yt: "https://www.youtube.com/watch?v="+movie.yt_trailer_code
                    };
                })
            },
            async setMovie(state, value) {
                state.movie = {
                    id: value.id,
                    name: value.title,
                    rating: value.rating,
                    image_url: value.medium_cover_image,
                    yt: "https://www.youtube.com/embed/" + value.yt_trailer_code,
                    links: value.torrents,
                    description: value.description_full
                }
            }
        }
    });
}
