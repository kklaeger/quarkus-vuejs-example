<template>
  <b-loading :is-full-page="false" v-model="isLoading"></b-loading>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class LoadingIcon extends Vue {
  private isLoading = true;
}
</script>

<style scoped lang="scss"></style>
