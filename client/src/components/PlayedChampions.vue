<template>
  <div>
    <v-row class="text-center my-12" justify="center" data-aos="fade-down">
      <hr />
      <h1 class="text-center my-6">{{ this.$route.params.name }}'s Played Champions</h1>
      <hr />
    </v-row>
    <v-row align="center" justify="center">
      <ChampionStatOrb
        v-for="(champions, index) in this.data"
        :key="index"
        :data="data[index]"
        data-aos="fade-down"
        data-aos-delay="950"
      ></ChampionStatOrb>
    </v-row>
  </div>
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
