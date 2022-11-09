<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article
    class="freet"
  >
    <header>
      <section class="top">
        <font-awesome-icon icon="fa-solid fa-user" />
        <div class="author">
          @{{ freet.author }}
        </div>
        <div
          v-if="freet.source"
          class="source"
        >
          <a :href="freet.source"><font-awesome-icon icon="fa-solid fa-link" />
          </a>
        </div>
        <div class="info">
          {{ freet.dateModified }}
          <i v-if="freet.edited">(edited)</i>
        </div>
      </section>
    </header>
    <textarea
      v-if="editing"
      class="content"
      :value="draft"
      @input="draft = $event.target.value"
    />
    <p
      v-else
      class="content"
    >
      {{ freet.content }}
    </p>

    <div
      v-if="$store.state.username === freet.author"
      class="actions"
    >
      <font-awesome-icon
        v-if="editing"
        icon="fa-solid fa-floppy-disk"
        @click="submitEdit"
      />
      <font-awesome-icon
        v-if="editing"
        icon="fa-solid fa-delete-left"
        @click="stopEditing"
      />
      <font-awesome-icon
        v-if="!editing"
        icon="fa-solid fa-pen-to-square"
        @click="startEditing"
      />
      <font-awesome-icon
        icon="fa-solid fa-trash"
        @click="deleteFreet"
      />
      <font-awesome-icon
        icon="fa-solid fa-star"
        @click="toggleHOF"
      />
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </article>
</template>

<script>
export default {
  name: 'FreetComponent',
  props: {
    // Data from the stored freet
    freet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false, // Whether or not this freet is in edit mode
      draft: this.freet.content, // Potentially-new content for this freet
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  methods: {
    startEditing() {
      /**
       * Enables edit mode on this freet.
       */
      this.editing = true; // Keeps track of if a freet is being edited
      this.draft = this.freet.content; // The content of our current "draft" while being edited
    },
    stopEditing() {
      /**
       * Disables edit mode on this freet.
       */
      this.editing = false;
      this.draft = this.freet.content;
    },
    deleteFreet() {
      /**
       * Deletes this freet.
       */
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted freet!', status: 'success'
          });
        }
      };
      this.request(params);
    },
    async toggleHOF() {
        const url = this.$store.state.userId ? `/api/halloffame/freets?userId=${this.$store.state.userId}` : '/api/freets';
                try {
                const r = await fetch(url);
                const res = await r.json();
                if (res.error || res.length === 0) {
                    const options = {
                                method: "POST",
                                headers: {'Content-Type': 'application/json'},
                            };

                    await fetch("/api/halloffame", options);

                    const updateOptions = {
                                method: "PUT",
                                headers: {'Content-Type': 'application/json'},
                    };

                    updateOptions.body = JSON.stringify({ freetId: this.freet._id })
                    const newResult = await fetch("/api/halloffame/freets", updateOptions);
                    this.$store.commit('updateHOFFreets', newResult.freets);
                } else {
                    if (res) {

                    const options = {
                                method: "PUT",
                                headers: {'Content-Type': 'application/json'},
                            };

                    options.body = JSON.stringify({ freetId: this.freet._id })
                    const result = await fetch("/api/halloffame/freets", options);

                  this.$store.commit('updateHOFFreets', result.freets);
                }
                this.$set(this.alerts, "Successfully toggled this freet to/from the Hall of Fame!", 'success')
              }

             } catch (e) {
            console.warn(e)
             }
    },
    submitEdit() {
      /**
       * Updates freet to have the submitted draft content.
       */
      if (this.freet.content === this.draft) {
        const error = 'Error: Edited freet content should be different than current freet content.';
        this.$set(this.alerts, error, 'error'); // Set an alert to be the error text, timeout of 3000 ms
        setTimeout(() => this.$delete(this.alerts, error), 3000);
        return;
      }

      const params = {
        method: 'PUT',
        message: 'Successfully edited freet!',
        body: JSON.stringify({content: this.draft}),
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.request(params);
    },
    async request(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(`/api/freets/${this.freet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.editing = false;
        this.$store.commit('refreshFreets');

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
.freet {
    border: 1px solid #111;
    padding: 20px;
    position: relative;
}

.top {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    column-gap: 50px;
    align: center;
    align-content: center;
}

.author {
font-weight: bold;
}

.source {
  align: right;
}

.info {
font-size: 15px;
}

.actions {
  display: flex;
  flex-direction: row;
}
</style>
