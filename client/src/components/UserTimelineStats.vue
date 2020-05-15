<template>
  <div  class="card timeline-stat-card">
    <div v-if="stats">
       <h1>{{getName}}</h1>
        <h2>{{getTitle}}</h2>
      <h1>{{getKills}} Kills {{getDeaths}} Deaths</h1>
    </div>
    <div v-if="getWin">
      <h1>Win</h1>
    </div>
    <div v-else>
      <h1>Loss</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserTimelineStats',
  props: ['stats', 'champ'],
  computed: {
    getWin() {
      return this.stats ? this.stats.win : '';
    },
    getKills() {
      return this.stats ? this.stats.kills : '';
    },
    getDeaths() {
      return this.stats ? this.stats.deaths : '';
    },
    getChampLevel() {
      return this.stats ? this.stats.champLevel : '';
    },
    getName() {
      return this.champ.data ? this.champ.data.alias : '';
    },
    getTitle() {
      return this.champ.data ? this.champ.data.title : '';
    }
  }
};
</script>

<style scoped>
.timeline-stat-card {
  width: 50%;
  margin: 0 auto;
  padding: 25px;
}

/* Small only */
@media screen and (max-width: 39.9375em) {
  .timeline-stat-card {
  width: 90%;
  margin: 0 auto;
  padding: 5px;
}
}

</style>