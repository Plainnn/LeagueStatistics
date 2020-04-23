<template>
  <div class="info-flex-container d-flex justify-center text-center">
    <div class="mb-12">
      <h2>Attack</h2>
      <v-progress-circular
        v-model="attack"
        :rotate="0"
        :size="100"
        :width="10"
        value="attack"
        color="red"
      >{{attack / 10}}</v-progress-circular>
    </div>
    <div>
      <h2>Defence</h2>
      <v-progress-circular
        v-model="defense"
        :rotate="0"
        :size="100"
        :width="10"
        value="defense"
        color="green accent-4"
      >{{defense / 10}}</v-progress-circular>
    </div>
    <div>
      <h2>Magic</h2>
      <v-progress-circular
        :rotate="0"
        v-model="magic"
        :size="100"
        :width="10"
        value="magic"
        color="blue accent-4"
      >{{magic / 10}}</v-progress-circular>
    </div>
    <div>
      <h2>Difficulty</h2>
      <v-progress-circular
        v-model="difficulty"
        :rotate="0"
        :size="100"
        :width="10"
        value="difficulty"
        color="amber accent-4"
      >{{difficulty / 10}}</v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChampionInfo',
  props: ['data'],
  data() {
    return {
      interval: {},
      value: 0
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 360) {
        return (this.value = 0);
      }
      this.value += 10;
    }, 50);
  },
  computed: {
    attack() {
      return parseInt(this.data ? this.data.attack : '') * 10;
    },
    defense() {
      return parseInt(this.data ? this.data.defense : '') * 10;
    },
    magic() {
      return parseInt(this.data ? this.data.magic : '') * 10;
    },
    difficulty() {
      return parseInt(this.data ? this.data.difficulty : '') * 10;
    }
  }
};
</script>

<style scoped>
.info-flex-container div {
  margin: 0em 2em;
}

.v-progress-circular {
  margin: 1em;
}

h2 {
  margin: 0.5em 0em 1em 0;
}
</style>