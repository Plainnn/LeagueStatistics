<template>
  <section class="search">
    <h1>Check Your Statistics</h1>
    <form v-on:submit.prevent="onSubmit">
      <label for="region"></label>
      <select name id="region" v-model="region">
        <option value="EUW">EUW</option>
        <option value="NA">NA</option>
        <option value="KR">KR</option>
      </select>
      <label for="sumName"></label>
      <input
        type="text"
        name="text"
        v-model="sumName"
        class="sumName"
        id="sumName"
        placeholder="Dyrus"
      />
      <input type="submit" value="Submit" class="btn" />
    </form>
  </section>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      region: 'euw',
      sumName: ''
    };
  },
  methods: {
    onSubmit() {
      if (!this.sumName) {
        return false;
      } else {
        this.$router.push(`/${this.region}/${this.sumName}`);
      }
    }
  }
};
</script>

<style scoped>
.search {
  background: #0d0920;
  width: 65%;
  text-align: center;
  border-radius: 38px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.search .btn {
  display: block;
  margin: 25px auto;
  background: #ffd046;
  border: 0;
  padding: 15px;
  border-radius: 13px;
}

.search .sumName,
.search select {
  height: 2.25em;
  margin: 5px 25px;
  background: #fff;
}
.search .sumName {
  border-radius: 10px;
}
</style>