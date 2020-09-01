<template>
  <section class="section">
    <div v-if="isLoading" class="loading">
      <LoadingIcon />
    </div>
    <div v-if="hasError" class="error">
      Unable to load users: {{ errorMsg }}
    </div>
    <div v-if="!isLoading && !hasError" class="container user-list">
      <AddUser class="addUser" />
      <UserList :users="users" />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserList from "@/components/UserList.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";
import AddUser from "@/components/AddUser.vue";

@Component({
  components: { UserList, LoadingIcon, AddUser }
})
export default class MainPage extends Vue {
  mounted() {
    this.$store.dispatch("fetchUsers");
  }

  get users() {
    return this.$store.state.users;
  }

  get isLoading() {
    return this.$store.state.fetchUsersIsLoading;
  }

  get hasError() {
    return this.$store.state.fetchUsersHasError;
  }

  get errorMsg() {
    return this.$store.state.fetchUsersErrorMsg;
  }
}
</script>

<style scoped lang="scss">
@import "./../styles/variables.scss";
.loading {
  margin-bottom: 2rem;
}
.error {
  color: $error-message;
}
.addUser {
  margin-bottom: 3rem;
}
</style>
