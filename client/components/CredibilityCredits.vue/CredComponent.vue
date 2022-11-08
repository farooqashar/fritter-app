<template>
  <main>
    <section>
      User Credibility Credit: {{ $store.state.creds }}
    </section>
  </main>
</template>

<script>
export default {

  components: {
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