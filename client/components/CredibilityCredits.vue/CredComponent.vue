<template>
  <section class="card">
    <info-card
      id="info-card"
      front-type="text"
      back-type="text"
      front-title="Your Credibility Credits"
      :front-data="$store.state.creds"
      back-title="Your Credibility Credits"
      back-data="<i>Credibility Credits are accumulated when your freets contain sources in order to create a better user experience.</i>"
    />
  </section>
</template>

<script>
import InfoCard from 'vue-info-card';


export default {

  components: {
        InfoCard
        },
    mounted() {
         this.getCredibilityCredit()
      },
        methods: {
        async getCredibilityCredit() {
            const url = this.$store.state.userId ? `/api/users/credibilitycredits?userId=${this.$store.state.userId}` : '/api/freets';
            try {
                const r = await fetch(url);
                const res = await r.json();
                if (res.error || res === 0) {
                    const options = {
                                method: "PUT",
                                headers: {'Content-Type': 'application/json'},
                            };

                    // options.body = JSON.stringify({ username: this.$store.state.username })
                    const response = await fetch("/api/users/credibilitycredits", options);
                    this.$store.commit('updateCreds', response.score);
                } else {
                    if (res) {
                    this.$store.commit('updateCreds', res.score);
                    }
                }

            } catch (e) {
            console.warn(e)
            }
        }
        }
    }

</script>

<style scoped>
.card {
width:97%;
}
</style>