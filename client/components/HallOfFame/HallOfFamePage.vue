<!-- Page for user Hall of Fame Page -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <Ribbon
      text="Hall of Fame!"
      position="left-top"
    />
    <section>
      <header>
        <h2>@{{ $store.state.username }}'s Hall of Fame</h2>
      </header>
    </section>
    <section
      v-if="$store.state.HOFfreets.length"
    >
      <FreetComponent
        v-for="freet in actualFreets"
        :key="freet.freet.id"
        :freet="freet.freet"
      />
    </section>
    <article
      v-else
    >
      <h3>No Hall of Fame Freets found.</h3>
    </article>
    <CelebrationConfetti />
    <h3>Game? Game!</h3>
    <Maze />
  </main>
</template>

<script>
import CelebrationConfetti from '@/components/Celebrations/CelebrationConfetti.vue';
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import Ribbon from 'vue-ribbon';
import Maze from 'vue-maze'


export default {
  name: 'HallOfFamePage',
  components: {
    CelebrationConfetti,
    FreetComponent,
    Ribbon,
    Maze
    }, 
  data() {
  return {
    actualFreets: []
    }
  }, 
  mounted() {
  this.getHOFFreets()
  },
  methods: {
  async getHOFFreets() {
      const url = this.$store.state.userId ? `/api/halloffame/freets?userId=${this.$store.state.userId}` : '/api/freets';
                try {
                const r = await fetch(url);
                const res = await r.json();
                if (res.error || res.freets.length === 0) {
                    const options = {
                                method: "POST",
                                headers: {'Content-Type': 'application/json'},
                            };

                    await fetch("/api/halloffame", options);

                    this.$store.commit('updateHOFFreets', []);
                } else {
                  
                if (res) {
                  this.$store.commit('updateHOFFreets', res.freets);
                }
              }

             } catch (e) {
            console.warn(e)
             }
      this.getActualFreets()
  },
  async getActualFreets() {
    if (this.$store.state.HOFfreets.length) {
      const fullFreets = []
        for (const id of this.$store.state.HOFfreets) {
            const url = this.$store.state.userId ? `/api/freets/${id}` : '/api/freets';
                const r = await fetch(url);
                const res = await r.json();
                fullFreets.push(res)
        }
       this.actualFreets = fullFreets
      }
    }
  }
};
</script>