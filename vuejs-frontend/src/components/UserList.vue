<template>
  <section class="section">
    <div v-if="this.$store.state.isLoading" class="loading">
      <LoadingIcon />
    </div>
    <div v-if="this.$store.state.isError" class="error">
      Unable to load users: {{ this.$store.state.error }}
    </div>
    <div
      v-if="!this.$store.state.isLoading && !this.$store.state.isError"
      class="container user-list"
    >
      <div v-if="this.$store.state.users.length == 0">
        No users available :)
      </div>
      <div v-else>
        <ul>
          <UserListElement
            v-for="user in this.$store.state.users"
            :key="user.id"
            :user="user"
          />
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserListElement from "@/components/UserListElement.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";

@Component({
  components: { UserListElement, LoadingIcon }
})
export default class UserList extends Vue {
  mounted() {
    this.$store.dispatch("fetchUsers");
  }
}
</script>

<style scoped lang="scss"></style>
