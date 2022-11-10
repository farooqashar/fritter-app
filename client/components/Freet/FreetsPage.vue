<!-- Default page that also displays freets -->

<template>
  <main>
    <br>
    <center class="time">
      <digital-clock
        blink="true"
        display-seconds="true"
        twelve-hour="true"
      />
    </center>
    <kinesis-container>
      <section v-if="$store.state.username">
        <center>
          <h2>
            <kinesis-element strength="20">
              How are you doing today, {{ $store.state.username }} ?
            </kinesis-element>
          </h2>
        </center>
        <section>
          <ExampleFreet />
          <center>
            <h3>
              <kinesis-element strength="20">
                Start out by freeting today by selecting an example Freet above!
              </kinesis-element>
            </h3>
          </center>
        </section>
        <CreateFreetForm :current-freet="$store.state.selectExampleFreet.name" />
      </section>
      <section v-else>
        <header>
          <h2>Welcome to Fritter!</h2>
        </header>
        <article>
          <h3>
            <router-link to="/login">
              Sign in
            </router-link>
            to create, edit, and delete freets.
          </h3>
        </article>
      </section>
    </kinesis-container>
    <section>
      <header>
        <div class="left">
          <h2>
            Explore
            <span v-if="$store.state.filter">
              by @{{ $store.state.filter }}
            </span>
          </h2>
        </div>
        <div class="right">
          <GetFreetsForm
            ref="getFreetsForm"
            value="author"
            placeholder="🔍 Filter By Author (optional)"
            button="🔄 Get Freets"
          />
        </div>
      </header>
      <section
        v-if="$store.state.freets.length"
      >
        <FreetComponent
          v-for="freet in $store.state.freets"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article
        v-else
      >
        <h3>No freets found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import ExampleFreet from '@/components/ExampleFreets/ExampleFreet.vue';
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';
import GetFreetsForm from '@/components/Freet/GetFreetsForm.vue';
import DigitalClock from "vue-digital-clock";
import { KinesisContainer,KinesisElement } from 'vue-kinesis'


export default {
  name: 'FreetPage',
  components: {FreetComponent, GetFreetsForm, CreateFreetForm, ExampleFreet, DigitalClock, KinesisContainer,KinesisElement },
  mounted() {
    this.$refs.getFreetsForm.submit();
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}

.time {
  font-weight: bold;
  color: darkblue;
  font-size: 40px;
}

</style>
