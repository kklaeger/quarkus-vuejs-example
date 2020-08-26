<template>
  <div id="app"><UserList></UserList></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserList from "./components/UserList.vue";

@Component({
  components: {
    UserList
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
html,
body {
  margin: 0;
}

#app {
  text-align: center;
}
</style>
