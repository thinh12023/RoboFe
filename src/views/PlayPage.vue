<template>
  <div>
    <h2 v-on:Click="oclick()">This is play audio page</h2>
    <!-- <div v-on:Change="changezz">{{ messages }}</div> -->
    <div v-on:Change="changezz">{{ messages }}</div>
    <audio
      id="myDiv"
      ref="myDiv"
      controls
      autoplay
      :src="changezz()"
      type="audio/mp3"
    ></audio>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      messages: "hello_jp.mp3",
      currentTime: 0,
    };
  },
  methods: {
    oclick() {
      console.log(this.$refs.myDiv.currentTime);
      this.$refs.myDiv.currentTime = 0.0;
    },
    changezz() {
      return `${process.env.VUE_APP_URL_API_TEST}/send/${this.messages}`;
      // return require(`@/assets/${this.messages}.mp3`);
      // if (this.messages == "children") {
      //   setTimeout(function () {
      //     return this.hello_eng;
      //   }, 2000);
      // }
      // if (this.messages == "adult") {
      //   setTimeout(function () {
      //     return this.hello_eng;
      //   }, 2000);
      // }
    },
  },

  mounted() {
    this.socketInstance = io(process.env.VUE_APP_URL_API);
    console.log(process.env.VUE_APP_URL_API);
    this.socketInstance.on("message:received", (data) => {
      console.log(data);
      this.messages = data;
      // this.$refs.myDiv.load();
      if (
        this.$refs.myDiv.paused == false &&
        (this.messages == "adult" || this.messages == "children")
      ) {
        setTimeout(function () {
          this.$refs.myDiv.load();
        }, 2000);
      } else {
        this.$refs.myDiv.load();
      }
    });
  },
  name: "PlayPage",
};
</script>

<style scoped></style>
