<!-- Page for user Game Page -->
<template>
  <main>
    <Ribbon
      text="Games!"
      position="left-top"
    />
    <center>
    <section>
      <header>
        <h2>Games? Games!</h2>
      </header>
    </section>
    
    <Maze />
    <chessboard />
    </center>
  </main>
</template>

<script>
import CelebrationConfetti from '@/components/Celebrations/CelebrationConfetti.vue';
import Ribbon from 'vue-ribbon';
import Maze from 'vue-maze'
import {chessboard} from 'vue-chessboard'
import 'vue-chessboard/dist/vue-chessboard.css'


export default {
  name: 'Game',
  components: {
    CelebrationConfetti,
    Ribbon,
    Maze,
    chessboard
    }, 
};
</script>