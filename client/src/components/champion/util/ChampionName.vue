<template>
  <div>
    <div>
      {{data}}
      <img :src="championImage" class="championImage" @click="sendUrl(getId)" />
    </div>
    <div>
      <h1>{{championName}}</h1>
    </div>
    <div>
      <h3>{{championTitle}}</h3>
    </div>
    <div>
      <h4>{{championBlurb}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChampionName',
  props: ['data'],
  computed: {
    championName() {
      return this.data ? this.data.name : '';
    },
    championTitle() {
      return this.data ? this.data.title : '';
    },
    championBlurb() {
      return this.data ? this.data.blurb : '';
    },
    championImage() {
      return this.data.id
        ? `https://cdn.communitydragon.org/latest/champion/${this.data.id}/square`
        : '';
    }
  }
};
</script>

<style>
</style>