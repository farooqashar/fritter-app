<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <center>
          <h2>Account Settings For @{{ $store.state.username }} (ID: {{ $store.state.userId }})</h2>
          <h3>Relationship Status: {{ $store.state.curRelationshipStatus.name.name }}</h3>
          <h3>Friends: {{ $store.state.bff }}</h3>
          <h3>Enemies: {{ $store.state.enemies }}</h3>
          <CredComponent />
        </center>
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
      </header>
      <ChangeUsernameForm />
      <ChangePasswordForm />
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
import LogoutForm from '@/components/Account/LogoutForm.vue';
import CredComponent from '/Users/asharfarooq/Downloads/6.1040/Assignments/fritter-app/client/components/CredibilityCredits.vue/CredComponent.vue';


export default {
  name: 'AccountPage',
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    LogoutForm,
    CredComponent
    }
};
</script>
