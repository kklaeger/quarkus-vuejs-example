<template>
  <form @submit.prevent="saveUser" class="cardwidth">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Add User</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input type="text" v-model="name" placeholder="Name" required />
        </b-field>
        <div v-if="this.$store.state.addUserIsLoading" class="loading">
          <LoadingIcon />
        </div>
        <div v-if="this.$store.state.addUserHasError" class="error">
          Unable to add user: {{ this.$store.state.addUserErrorMsg }}
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$emit('close')">
          Close
        </button>
        <button class="button is-primary" type="submit">
          Save
        </button>
      </footer>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoadingIcon from "@/components/LoadingIcon.vue";
@Component({
  components: { LoadingIcon }
})
export default class AddUserModal extends Vue {
  private name = "";

  private saveUser(): void {
    this.$store.dispatch("addUser", this.name).then(res => {
      if (res) this.$emit("close");
    });
  }
}
</script>

<style scoped lang="scss">
@import "./../styles/variables.scss";
.cardwidth {
  width: 20rem;
}
@media screen and (max-width: $tablet) {
  .cardwidth {
    width: 100%;
  }
}
.error {
  color: $error-message;
}
</style>
