<template>
  <main>
    <form @submit.prevent="submit">
      <br>
      <section>
        <label :for="enemiList">Enemies:</label>
        <textarea
          :name="enemiList"
          :value="$store.state.enemies[0]"
          @input="ene = $event.target.value"
        />
      </section>
      <button
        type="submit"
      >
        Save
      </button>
    </form>
  </main>
</template>

<script>

export default {

        components: {
        },
        data() {
          return {
            ene: []
          }
        },
       mounted() {
         this.getEnemies()
      },
        methods: {
        async submit() {
            const url = this.$store.state.userId ? `/api/users/enemies?userId=${this.$store.state.userId}` : '/api/freets';
                        try {
                const r = await fetch(url);
                const res = await r.json();
                if (res.error || res.length === 0) {
                    const options = {
                                method: "POST",
                                headers: {'Content-Type': 'application/json'},
                            };

                    options.body = JSON.stringify({ enemies: [" "] })
                    await fetch("/api/users/enemies", options);
                    this.$store.commit('updateEnemies', [" "]);
                } else {
                    if (res) {

                    const options = {
                                method: "PUT",
                                headers: {'Content-Type': 'application/json'},
                            };

                    options.body = JSON.stringify({ enemies: this.ene })
                    await fetch("/api/users/enemies", options);

                    this.$store.commit('updateEnemies', [this.ene]);
                    }
                }

             } catch (e) {
            console.warn(e)
             }
        this.$router.push({name: 'Account'}); 
        this.$store.commit('alert', {
          message: 'Your Enemies Have Been Updated!', status: 'success'
        });
        },
        async getEnemies() {
            const url = this.$store.state.userId ? `/api/users/enemies?userId=${this.$store.state.userId}` : '/api/freets';
            try {
                const r = await fetch(url);
                const res = await r.json();
                if (res.error || res.length === 0) {
                    const options = {
                                method: "POST",
                                headers: {'Content-Type': 'application/json'},
                            };

                    options.body = JSON.stringify({ enemies: [" "] })
                    await fetch("/api/users/enemies", options);
                    this.$store.commit('updateEnemies', [" "]);
                } else {
                
                    if (res) {
                    
                      if (res.enemies) {
                        this.$store.commit('updateEnemies', [res.enemies]);
                      } else {
                      this.$store.commit('updateEnemies', [" "]);
                      }
                    }
                }

             } catch (e) {
            console.warn(e)
             }
        }
        }
    }
</script>