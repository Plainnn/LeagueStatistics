<template>
  <div class="flex-wrapper">
    <ChampionStatOrb v-for="(champions, index) in this.data" :key="index" :data="data[index]"></ChampionStatOrb>
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

<style scoped>
.flex-wrapper {
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  padding: 50pxc;
}
</style>
