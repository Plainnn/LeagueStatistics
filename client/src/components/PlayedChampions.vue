<template>
  <v-row align="center" justify="center">
    <ChampionStatOrb
      v-for="(champions, index) in this.data"
      :key="index"
      :data="data[index]"
    ></ChampionStatOrb>
  </v-row>
</template>

<script>
import ChampionStatOrb from './ChampionStatOrb';

export default {
  name: 'PlayedChampions',
  props: ['data'],
  components: {
    ChampionStatOrb
  }
};
</script>

<style scoped></style>
