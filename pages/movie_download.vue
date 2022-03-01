<template>
  <div>
    <navbar />
    <div class="movie">
        <div class="left">
            <div class="left-1">
                <img class="m-image" :src="movie_data.image_url" alt="">
            </div>
            <div class="left-2">
                <h2 class="m-title">{{ movie_data.name }}</h2>
                <h6>IMDB Rating: {{ movie_data.rating }}</h6>
                <p>{{ movie_data.description }}</p>
            </div>
            <br>
            <iframe class="m-video" width="95%" height="300" :src="movie_data.yt"></iframe>
        </div>
        <div class="left">
            <div style="text-align: center;" v-for="link in movie_data.links" v-bind:key="link.url">
                <button class="button" @click.prevent="download(link.url)">{{ link.type.toUpperCase() + " " +link.quality.toUpperCase() }}</button>
                <h5 class="hide">Size: {{ link.size }} </h5>
            </div>
        </div>
    </div>
  </div>
</template>


<script>
import navbar from "../components/navbar.vue";
export default {
  components: {
    navbar,
  },
  data() {
    return{
        movie_data: {}
    }
  },
  async created() {
    await this.$store.dispatch("search_movie", this.$store.state.movie_id).then(() => {
            this.movie_data = {
                id: this.$store.state.movie.id,
                name: this.$store.state.movie.name,
                rating: this.$store.state.movie.rating,
                image_url: this.$store.state.movie.image_url,
                yt: this.$store.state.movie.yt,
                links: this.$store.state.movie.links,
                description: this.$store.state.movie.description
            }
        });
    },
    methods: {
        download(url) {
            window.location.href = url
        }
    }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
    .movie{
        padding: 10px;
    }
    .left{
        float: left;
        width: 50%;
        padding: 3px;
    }
    .left-1{
        float: left;
        width: 40%;
        padding: 3px;
    }
    .button{
        background: rgb(0, 255, 0);
        border: none;
        border-radius: 10px;
        color: white;
        width: 400px;
        font-weight: 900;
        padding: 20px;
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
    .hide{
        margin: 0px;
        color: red;
        font-weight: 700;
        padding: 20px;
        font-size: 1.5em;
        display: none;
        cursor: pointer;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .button:hover + .hide {
        display: block;
        cursor: pointer;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .left-2{
        float: left;
        width: 60%;
        text-align: center;
        padding: 3px;
        transform: translate(-100px, 0px);
    }
    .m-image{
        width: 45%;
        margin: 5px;
        height: 45%;
    }
    .m-video{
        margin: 5px;
    }
    .m-title{
        font-family: 'lobster', cursive;
    }
</style>