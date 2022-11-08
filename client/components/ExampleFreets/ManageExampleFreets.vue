<template>
  <main>
    <section>
      <form @submit.prevent="submit">
        <label :for="exampleFreet">Example Freet:</label>
        <textarea
          :name="exampleFreet"
          :value="content"
          @input="content = $event.target.value"
        />
        <button
          type="submit"
        >
          Create Example Freet
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

            } catch (e) {
            console.warn(e)
            }
        }
        }
    }
</script>