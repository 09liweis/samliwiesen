<template>
  <div class="container">
    <div class="languages">
      <a v-on:click="changeLang('en')">English</a>
      <a v-on:click="changeLang('zh')">中文</a>
    </div>
    <h1 class="title">{{this.$store.state.languages[this.$store.state.lang].title}}</h1>
    <div class="layout">
      <router-link to="/">Visuals</router-link>
      <router-link to="/add">Add</router-link>
      <router-view></router-view>
    </div>
    <!--<MusicPlayer></MusicPlayer>-->
  </div>
</template>
<script>
// import MusicPlayer from './views/MusicPlayer.vue';
export default {
  components: {
    // MusicPlayer
  },
  data() {
    return {
    };
  },
  methods: {
    changeLang(lang) {
      this.$store.commit('changeLang', lang);		
    }
  }
};
</script>
<style type="text/css">
html, body{
  font-family: 'Dosis';
}
.container {
  background-color: #ffffff;
  margin: auto;
  width: 100%;
  padding: 20px;
}
.languages {
  float: right;
}
.title {
  text-align: center;
}
</style>