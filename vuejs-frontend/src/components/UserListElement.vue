<template>
  <div class="columns is-mobile">
    <div class="column is-3-mobile is-2-tablet is-1-desktop is-2-widescreen">
      <b-icon pack="fas" icon="user" size="is-medium"> </b-icon>
    </div>
    <div class="column name-column">{{ user.name }}</div>
    <div class="column is-3-mobile is-2-tablet is-1-desktop is-2-widescreen">
      <b-button rounded type="is-text"
        ><b-icon pack="fas" icon="trash" size="is-medium"> </b-icon
      ></b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { User } from "@/models/User";

@Component({
  components: {}
})
export default class UserListElement extends Vue {
  @Prop({ required: true }) user!: User;
}
</script>

<style scoped lang="scss">
.name-column {
  text-align: left;
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>
