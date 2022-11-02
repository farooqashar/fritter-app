<!-- Page for user Hall of Fame Page -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>@{{ $store.state.username }}'s Hall of Fame</h2>
      </header>
      <CelebrationConfetti />
    </section>
    <section>
      <header>
        <h2>Hall of Fame</h2>
      </header>
    </section>
  </main>
</template>

<script>
import CelebrationConfetti from '@/components/Celebrations/CelebrationConfetti.vue';

export default {
  name: 'HallOfFamePage',
  components: {
    CelebrationConfetti
    }
};
</script>