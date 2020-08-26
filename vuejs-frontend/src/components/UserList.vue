<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class UserList extends Vue {
  private title = "User List";
}
</script>

<style scoped lang="scss"></style>
