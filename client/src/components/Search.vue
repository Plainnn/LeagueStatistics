<template>
  <section class="search pa-12">
    <h1>Check Your Statistics</h1>
    <form v-on:submit.prevent="onSubmit">
      <select name id="region" v-model="region" class="dropdown-region px-4 ">
        <option selected style="color: white">Region</option>
        <option value="euw">EUW</option>
        <option value="na">NA</option>
        <option value="kr">KR</option>
      </select>
      <label for="sumName"></label>
      <input
        type="text"
        name="text"
        v-model="sumName"
        class="sumName pa-6"
        id="sumName"
        placeholder="Dyrus"
      />
      <v-btn type="submit" value="Submit" class="mt-8 button" color="primary">
        <v-icon class="mr-2">mdi-account-search</v-icon>Search
      </v-btn>
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
  color: #fff;
}

@media screen and (max-width: 39.9375em) {
  .search {
    width: 90%;
  }

  .search .sumName {
    width: 100%;
  }

  .dropdown-region {
    margin-left: 0 !important;
  }
}


.search .sumName {
  width: 75%;
  margin: 0 auto;
}

.dropdown-region {
  border-radius: 13px;
  height: 3em;
  margin-left: 48px;
}

.search .sumName,
.search select {
  height: 3.25em;
  margin: 5px 5px;
  background: #252246 !important;
}
.search .sumName {
  border-radius: 10px;
}

.button {
  display: block;
  margin: 0 auto;
}
</style>