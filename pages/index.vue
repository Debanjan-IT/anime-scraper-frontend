<template>
  <div class="container">
    <div class="search-box">
      <b-input-group prepend="Enter the gogoanime season url" class="mt-3">
        <b-form-input v-model="url"></b-form-input>
        <b-input-group-append>
          <b-button variant="outline-success" @click.prevent="search"
            >Search</b-button
          >
        </b-input-group-append>
      </b-input-group>
    </div>
    <div class="response-container">
      <div v-if="search_status == 0">
        <h1 style="text-align: center">Search some anime.</h1>
      </div>
      <div v-else-if="search_status == 1">
        <h1 style="text-align: center">Please wait. Searching in progress.</h1>
      </div>
      <div v-else-if="search_status == 2">
        <div class="card">
          <h1>Episode {{ index + 1 }}</h1>
          <iframe
            :src="video_link"
            id="video"
            width="950"
            height="362"
            allowfullscreen
            class="player"
          ></iframe>
        </div><br>
        <div class="button-group">
          <b-button variant="success" @click.prevent="prev()"
            >Previous Episode</b-button
          >
          <b-form-select style="width: max-content;" v-model="selected" :options="options"></b-form-select>
          <b-button variant="success" @click.prevent="next()"
            >Next Episode</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  
  watch: {
    selected(value) {
      this.index = value
    },
  },
  data() {
    return {
      index: 0,
      video_link: '',
      url: "",
      selected: 0,
      options: [],
      anime_data: [],
      search_status: 0,
    };
  },
  methods: {
    async load(link) {
      const axios = require("axios");
      const episode = await axios.post(`${process.env.API_URL}get_episode`,{
        url: link,
      })
      console.log(episode);
      this.video_link = episode.data.video_link
      let audio_iframe = document.getElementById('video');
      audio_iframe.volume=0.2;
    },
    async search() {
      const axios = require("axios");
      this.search_status = 1;
      try {
        const response = await axios.post(`${process.env.API_URL}get_data`, {
          url: this.url,
        });
        console.log(response);
        this.anime_data = response.data;
        const data = response.data.map((element, index) => {
          return {
            value: index,
            text: `Episode ${index+1}`
          }
        })
        const pro_data = await Promise.all(data)
        this.options = pro_data
        this.search_status = 2;
        this.load(this.anime_data[0].link)
      } catch (error) {
        console.log(error);
      }
    },
    prev() {
      if (this.index > 0) {
        this.index = this.index - 1;
        this.selected = this.index
        this.load(this.anime_data[this.index].link)
      } else {
        alert("This is the first episode.");
      }
    },
    next() {
      if (this.index < this.anime_data.length - 1) {
        this.index = this.index + 1;
        this.selected = this.index
        this.load(this.anime_data[this.index].link)
      } else {
        alert("This is the last episode.");
      }
    },
  },
};
</script>


<style scoped>
.card {
  width: 100%;
  height: max-content;
  text-align: center;
}
.player{
  margin-left: 50%;
  border:1px solid black;
  transform: translate(-50%,0%);
}
.button-group {
  margin-left: 50%;
  transform: translate(-50%,0%);
}

</style>