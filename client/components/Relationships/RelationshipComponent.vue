<template>
  <main>
    <form @submit.prevent="submit">
      <section>
        <label>Relationship Status: </label>
        <dropdown
          class="my-dropdown-toggle"
          :options="relationshipStatuses"
          :selected="{name:$store.state.curRelationshipStatus}" 
          :placeholder="'Select Relationship Status'" 
          :close-on-outside-click="boolean"
          @updateOption="methodToRunOnSelect"
        />
      </section>
      <section>
        <label :for="bestFriendsList">Best Friends:</label>
        <textarea
          :name="bestFriendsList"
          :value="$store.state.bff"
          @input="bestFriends = $event.target.value"
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
import dropdown from 'vue-dropdowns';

export default {

        components: {
            'dropdown': dropdown,
        },
        data() {
          return {
            object: {
            name: "Select Relationship Status"
            }, 
            relationshipStatuses: [{name: "Single"}, {name: "Married"}, {name: "Complicated"}], 
            bestFriends: []
          }
        },
       mounted() {
         this.getRelationships()
      },
        methods: {
        methodToRunOnSelect(payload) {
        this.$store.commit('updateCurRelationshipStatus', payload.name);
          },
        async submit() {
            const url = this.$store.state.userId ? `/api/users/relationships?userId=${this.$store.state.userId}` : '/api/freets';
                        try {
                const r = await fetch(url);
                const res = await r.json();
                if (res.error || res.length === 0) {
                    const options = {
                                method: "POST",
                                headers: {'Content-Type': 'application/json'},
                            };

                    options.body = JSON.stringify({ relationshipStatus: "Single", bestFriends: [" "] })
                    await fetch("/api/users/relationships", options);
                    this.$store.commit('updateCurRelationshipStatus', "Single");
                    this.$store.commit('updateBestFriends', [" "]);
                } else {
                    if (res) {

                    const options = {
                                method: "PUT",
                                headers: {'Content-Type': 'application/json'},
                            };

                    options.body = JSON.stringify({ relationshipStatus: this.$store.state.curRelationshipStatus, bestFriends: this.bestFriends })
                    await fetch("/api/users/relationships", options);

                      this.$store.commit('updateCurRelationshipStatus', this.$store.state.curRelationshipStatus);
                      this.$store.commit('updateBestFriends', [this.bestFriends]);
                    }
                }

             } catch (e) {
            console.warn(e)
             }
        this.$router.push({name: 'Account'}); 
        this.$store.commit('alert', {
          message: 'Your Relationships Have Been Updated!', status: 'success'
        });
        },
        async getRelationships() {
            const url = this.$store.state.userId ? `/api/users/relationships?userId=${this.$store.state.userId}` : '/api/freets';
            try {
                const r = await fetch(url);
                const res = await r.json();
                if (res.error || res.length === 0) {
                    const options = {
                                method: "POST",
                                headers: {'Content-Type': 'application/json'},
                            };

                    options.body = JSON.stringify({ relationshipStatus: "Single", bestFriends: [" "] })
                    await fetch("/api/users/relationships", options);
                    this.$store.commit('updateCurRelationshipStatus', "Single");
                    this.$store.commit('updateBestFriends', [" "]);
                } else {
                    if (res) {
                      this.$store.commit('updateCurRelationshipStatus', res.relationshipStatus);
                      if (res.bestFriends) {
                        this.$store.commit('updateBestFriends', [res.bestFriends]);
                      } else {
                      this.$store.commit('updateBestFriends', [" "]);
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

<style scoped>
.my-dropdown-toggle {
  border-radius: 5px;

  ::v-deep .dropdown-toggle {
    color: tomato;
    font-size: 25px;
    font-weight: 800;
  }

  ::v-deep .dropdown-toggle-placeholder {
    color: #c4c4c4;
  }
}
</style>