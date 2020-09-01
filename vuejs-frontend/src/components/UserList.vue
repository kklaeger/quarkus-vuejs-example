<template>
  <div>
    <div v-if="this.users.length == 0">
      No users available :)
    </div>
    <div v-else>
      <ul>
        <UserListElement
          v-for="user in this.users"
          :key="user.id"
          :user="user"
        />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import UserListElement from "@/components/UserListElement.vue";
import { User } from "@/models/User";

@Component({
  components: { UserListElement }
})
export default class UserList extends Vue {
  @Prop({ required: true }) users!: User[];
}
</script>

<style scoped lang="scss"></style>
