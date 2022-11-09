import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    filter: null, // Username to filter shown freets by (null = show all)
    freets: [], // All freets created in the app
    exampleFreets: [],
    selectExampleFreet: {name: ""},
    curRelationshipStatus: "",
    bff: [],
    bio: "",
    enemies: [],
    HOFfreets: [],
    creds: 0,
    username: null, // Username of the logged in user
    userId: null, // id of the logged in user
    alerts: {} // global success/error messages encountered during submissions to non-visible forms
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    setUserId(state, userId) {
      /**
       * Update the stored id to the specified one.
       * @param id - new id to set
       */
      state.userId = userId;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.filter = filter;
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    },
    updateExampleFreets(state, exampleFreets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.exampleFreets = exampleFreets;
    },
    updateSelectedExampleFreet(state, selectExampleFreet) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.selectExampleFreet = selectExampleFreet;
    },
    updateCurRelationshipStatus(state, curRelationshipStatus) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.curRelationshipStatus = curRelationshipStatus;
    },
    updateBestFriends(state, bff) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.bff = bff;
    },
    updateEnemies(state, enemies) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.enemies = enemies;
    },
    updateHOFFreets(state, HOFfreets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.HOFfreets = HOFfreets;
    },
    updateCreds(state, creds) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.creds = creds;
    },
    updateBio(state, bio) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.bio = bio;
    },
    async refreshFreets(state) {
      /**
       * Request the server for the currently available freets.
       */
      const url = state.filter ? `/api/users/${state.filter}/freets` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;
    }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
