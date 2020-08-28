<template>
  <div id="app">
    <div class="container is-desktop">
      <Header></Header>
      <UserList></UserList>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserList from "./components/UserList.vue";
import Header from "./components/Header.vue";

@Component({
  components: {
    UserList,
    Header
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "./styles/variables.scss";

#app {
  text-align: center;
}

@media screen and (min-width: $widescreen) {
  #app {
    margin: 0 25rem;
  }
}

@media screen and (min-width: $desktop) and (max-width: $widescreen) {
  #app {
    margin: 0 15rem;
  }
}

@media screen and (min-width: $tablet) and (max-width: $desktop) {
  #app {
    margin: 0 5rem;
  }
}

@media screen and (max-width: $tablet) {
  #app {
    margin: 0 2rem;
  }
}
</style>
