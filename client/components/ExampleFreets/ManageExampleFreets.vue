<template>
  <main>
    <section>
      <form @submit.prevent="submit">
        <div class="container">
          <textarea
            :name="exampleFreet"
            :value="content"
            placeholder="Enter A Custom Example Freet"
            @input="content = $event.target.value"
          />
        </div>
        <button
          type="submit"
        >
          Add Example Freet
        </button>
      </form>
    </section>
  </main>
</template>

<script>

export default {

        components: {
        },
        data() {
          return {
            content: ""
          }
        },
        methods: {
        async submit() {
            const url = this.$store.state.username ? `/api/exampleFreets?author=${this.$store.state.username}` : '/api/freets';
            try {
                const r = await fetch(url);
                const res = await r.json();
                if (res.error || res.length === 0) {
                    const options = {
                                method: "POST",
                                headers: {'Content-Type': 'application/json'},
                            };

                    options.body = JSON.stringify({ content: "Hello Fritter!" })
                    await fetch("/api/exampleFreets", options);
                    this.$store.commit('updateExampleFreets', [{ name: "Hello Fritter!" }]);
                } else {
                    if (res) {
                    const options = {
                                method: "POST",
                                headers: {'Content-Type': 'application/json'},
                    };
                    options.body = JSON.stringify({content: this.content})
                    await fetch("/api/exampleFreets", options);

                    const dropdownOptions = []
                    // eslint-disable-next-line no-unused-labels
                    for(const elt of res) {
                        dropdownOptions.push({name: elt.content})
                    }
                    dropdownOptions.push({name: this.content})
                    this.$store.commit('updateExampleFreets', dropdownOptions);
                    }
                }
              this.$store.commit('alert', {
                message: 'Example Freet Successfully Added!', status: 'success'
              });

            this.$router.push({name: 'Home'});
            } catch (e) {
            console.warn(e)
            }
        }
        }
    }
</script>

<style>

textarea {
  font-family: inherit;
  font-size: inherit;
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
}

.container {
padding-top: 30px;
}
</style>