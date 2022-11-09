<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Account Settings For @{{ $store.state.username }} (ID: {{ $store.state.userId }})</h2>
        <center><p>{{ $store.state.bio ? $store.state.bio : " " }}</p></center>
        <div class="top">
          <router-link
            to="/editProfile"
            tag="button"
          >
            Edit Profile
          </router-link>
          <br>
          <router-link
            to="/manageEnemies"
            tag="button"
          >
            Manage Enemies
          </router-link>
        </div>
        <br>
        <br>
        <center>
          <CredComponent />
          <vue-flashcard 
            front="Relationship Status" 
            :back="$store.state.curRelationshipStatus"
            color-back="#72A0C1"
            color-text-back="blue"
            header-front=""
            header-back="Relationship Status"
            footer-front="Click To Reveal"
            footer-back="Click To Go Back"
          />
          <vue-flashcard 
            front="Best Friends" 
            :back="$store.state.bff[0]"
            color-back="#72A0C1"
            color-text-back="blue"
            header-front=""
            header-back="Best Friends"
            footer-front="Click To Reveal"
            footer-back="Click To Go Back"
          />
          <vue-flashcard 
            front="Enemies" 
            :back="$store.state.enemies[0]"
            color-back="#72A0C1"
            color-text-back="blue"
            header-front=""
            header-back="Enemies"
            footer-front="Click To Reveal"
            footer-back="Click To Go Back"
          />
        </center>
      </header>
      <ChangeUsernameForm />
      <ChangePasswordForm />
      <ChangeBio />
    </section>
    <section>
      <header>
        <h2>Account Management</h2>
      </header>
      <LogoutForm />
      <DeleteAccountForm />
    </section>
  </main>
</template>

<script>
import ChangeUsernameForm from '@/components/Account/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/Account/ChangePasswordForm.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';
import ChangeBio from '@/components/Account/ChangeBio.vue';
import LogoutForm from '@/components/Account/LogoutForm.vue';
import CredComponent from '/Users/asharfarooq/Downloads/6.1040/Assignments/fritter-app/client/components/CredibilityCredits.vue/CredComponent.vue';
import vueFlashcard from 'vue-flashcard';



export default {
  name: 'AccountPage',
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    LogoutForm,
    CredComponent,
    vueFlashcard,
    ChangeBio
    }
};
</script>

<style scoped>

 .top {   
    display: flex;
    flex-direction: row;
    justify-content: center;
    column-gap: 50px;
    align: center;
    align-content: center;
}
</style>