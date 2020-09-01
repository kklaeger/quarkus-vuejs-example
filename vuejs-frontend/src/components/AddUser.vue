<template>
  <div>
    <button class="button is-primary" @click="modalIsOpen = true">
      Add User
    </button>
    <div v-if="modalIsOpen">
      <b-modal active has-modal-card aria-role="dialog" aria-modal>
        <AddUserModal @close="modalIsOpen = false" />
      </b-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AddUserModal from "@/components/AddUserModal.vue";

@Component({
  components: { AddUserModal }
})
export default class AddUser extends Vue {
  private modalIsOpen = false;
}
</script>

<style scoped lang="scss"></style>
