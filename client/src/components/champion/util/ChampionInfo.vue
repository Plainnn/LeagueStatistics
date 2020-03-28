<template>
  <div>
    {{data}}
    <h2>Attack</h2>
    <v-progress-linear v-model="attack" color="amber accent-4"></v-progress-linear>
    <h2>Defence</h2>
    <v-progress-linear v-model="defense" color="amber accent-4"></v-progress-linear>
    <h2>Magic</h2>
    <v-progress-linear v-model="magic" color="amber accent-4"></v-progress-linear>
    <h2>Difficulty</h2>
    <v-progress-linear v-model="difficulty" color="amber accent-4"></v-progress-linear>
  </div>
</template>

<script>
export default {
  name: 'ChampionInfo',
  props: ['data'],
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

<style>
</style>