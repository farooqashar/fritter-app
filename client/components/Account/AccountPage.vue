<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Account settings for @{{ $store.state.username }}</h2>
        <a href="#/editProfile">Edit Profile</a>
        <br>
        <a href="#/manageEnemies">Manage Enemies</a>
      </header>
      <ChangeUsernameForm />
      <ChangePasswordForm />
      <CredComponent />
    </section>
    <section>
      <header>
        <h2>Account management</h2>
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
