<template>
  <div>
    <div class="columns is-mobile">
      <div class="column is-3-mobile is-2-tablet is-1-desktop is-2-widescreen">
        <b-icon pack="fas" icon="user" size="is-medium"> </b-icon>
      </div>
      <div class="column name-column">{{ user.name }}</div>
      <div class="column is-3-mobile is-2-tablet is-1-desktop is-2-widescreen">
        <b-button rounded type="is-text" @click="deleteUser">
          <b-icon pack="fas" icon="trash" size="is-medium"> </b-icon>
        </b-button>
      </div>
      <div v-if="isLoading" class="loading">
        <LoadingIcon />
      </div>
    </div>
    <div v-if="hasError" class="error">
      Unable to delete user: {{ errorMsg }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { User } from "@/models/User";
import LoadingIcon from "@/components/LoadingIcon.vue";

@Component({
  components: { LoadingIcon }
})
export default class UserListElement extends Vue {
  @Prop({ required: true }) user!: User;

  get isLoading() {
    return (this.$store.state.deleteUserIsLoading as string[]).includes(
      this.user.id
    );
  }

  get hasError() {
    return (this.$store.state.deleteUserHasError as string[]).includes(
      this.user.id
    );
  }

  get errorMsg() {
    return (this.$store.state.deleteUserErrorMsg as { [id: string]: string })[
      this.user.id
    ];
  }

  deleteUser(): void {
    this.$store.dispatch("deleteUser", this.user.id);
  }
}
</script>

<style scoped lang="scss">
@import "./../styles/variables.scss";
.name-column {
  text-align: left;
  padding-top: 15px;
  padding-bottom: 15px;
}

.error {
  padding-bottom: 15px;
  color: $error-message;
}
</style>
