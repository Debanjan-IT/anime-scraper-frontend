<template>
  <div>
    <navbar />
    <movies
      v-for="movie in movies_data"
      :key="movie.id"
      :yt="movie.yt"
      :id="movie.id"
      :title="movie.name"
      :image_url="movie.image_url"
      :rating="movie.rating"
    />
    <div class="prvnxt">
      <button @click.prevent="previous()">Prev</button>
      <button @click.prevent="next()">Next</button>
    </div>
  </div>
</template>

<script>
import navbar from "../components/navbar.vue";
import movies from "../components/movies.vue";
export default {
  data() {
    return {
      movies_data: [],
    };
  },
  components: {
    navbar,
    movies,
  },
  async created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.movies_data = this.$store.state.movies;
    },
    async previous() {
      if (this.$store.state.movie_page > 1) {
        this.$store.state.movie_page = this.$store.state.movie_page - 1;
        await this.$store.dispatch("search_movies_by_name", this.$store.state.movie_name).then(() => {
            this.loadData()
        })
      } else {
        alert("No more pages.");
      }
    },
    async next() {
      if (this.$store.state.movie_page < this.$store.state.movie_count / 16) {
        this.$store.state.movie_page = this.$store.state.movie_page + 1;
        await this.$store.dispatch("search_movies_by_name", this.$store.state.movie_name).then(() => {
            this.loadData()
        })
      } else {
        alert("No more pages.");
      }
    },
  },
};
</script>

<style scoped>
button {
  background: rgb(0, 255, 0);
  border: none;
  border-radius: 10px;
  color: white;
  width: 150px;
  font-weight: 900;
  padding: 8px;
  font-size: 1.5em;
  margin: 5px;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.prvnxt {
  text-align: center;
}
</style>