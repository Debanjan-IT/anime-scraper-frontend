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
          <h1>Episode {{ anime_data[index].episode_number }}</h1>
          <iframe
            :src="anime_data[index].video_link"
            width="760"
            height="400"
            class="player"
          ></iframe>
        </div><br>
        <div style="text_align: center">
          <b-button variant="success" @click.prevent="prev()"
            >Previous Episode</b-button
          >
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
  data() {
    return {
      index: 0,
      url: "",
      anime_data: [],
      search_status: 0,
    };
  },
  methods: {
    async search() {
      const axios = require("axios");
      this.search_status = 1;
      try {
        const response = await axios.post(`${process.env.API_URL}/get_data`, {
          url: this.url,
        });
        this.anime_data = response.data;
        this.search_status = 2;
      } catch (error) {
        console.log(error);
      }
    },
    prev() {
      if (this.index > 0) {
        this.index = this.index - 1;
      } else {
        alert("This is the first episode.");
      }
    },
    next() {
      if (this.index < this.anime_data.length - 1) {
        this.index = this.index + 1;
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
  height: 50%;
  text-align: center;
}

</style>