<template>
  <main>
    <EnemiesComponent />
  </main>
</template>

<script>
import EnemiesComponent from '@/components/Enemies/EnemiesComponent.vue';

export default {
  name: 'ManageEnemies',
  components: {
    EnemiesComponent
  }
};
</script>