<template>
  <section id="dropdown">
    <center>
      <dropdown
        :options="$store.state.exampleFreets" 
        :selected="$store.state.selectExampleFreet" 
        :placeholder="'Select an Item'" 
        :close-on-outside-click="boolean"
        @updateOption="methodToRunOnSelect"
      />
      <a href="#/manageExampleFreets"><font-awesome-icon icon="fa-solid fa-plus" /></a>
    </center>
  </section>
</template>

<script>
import dropdown from 'vue-dropdowns';

export default {

        components: {
            'dropdown': dropdown,
        },
        data() {
          return {
            object: {
            name: "Select an Example Freet"
            }, 
          }
        },
         mounted() {
         this.getExampleFreets()
      },
        methods: {
        methodToRunOnSelect(payload) {
            this.$store.commit('updateSelectedExampleFreet', payload);
          },
        async getExampleFreets() {
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
                    const dropdownOptions = []
                    // eslint-disable-next-line no-unused-labels
                    for(const elt of res) {
                        dropdownOptions.push({name: elt.content})
                    }
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