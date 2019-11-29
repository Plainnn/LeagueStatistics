<template>
  <section class="container">
    <div v-if="loading" class="loading-search text-center">
      <v-progress-circular
        :size="100"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

    <userName></userName>
    <userMostWins></userMostWins>
    <userMostLoss></userMostLoss>
  </section>
</template>

<script>
import userMostWins from '../components/userMostWins';
import userMostLoss from '../components/userMostLoss';
import userName from '../components/userName';

export default {
  components: {
    userMostWins,
    userMostLoss,
    userName
  },
  name: 'userProfile',
  data() {
    return {
      loading: false,
      error: false
    };
  },
  beforeCreate() {},
  async created() {
    try {
      this.loading = true;

      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = true;
    }
  }
};
</script>

<style scoped>
.loading-search {
  margin-top: 50px;
}

.container {
  padding: 50px;
}
</style>
