<template>
  <div>
    <div v-if="errorMsg == 'Error: Request failed with status code 404'">
      <h1>Unable to find {{this.$route.params.name}} on server {{this.$route.params.platform}}</h1>
      <form v-on:submit.prevent="onSubmit">
        <select
          name
          id="region-dropdown"
          v-model="region"
          class="dropdown-region px-4 ml-3"
          @change="getData()"
        >
          <option selected value="euw">EUW</option>
          <option value="na">NA</option>
          <option value="kr">KR</option>
        </select>

        <label for="sumName"></label>
        <input
          type="text"
          name="text"
          v-model="sumName"
          class="sumName px-4 ml-3"
          id="sumName"
          placeholder="Dyrus"
        />
        <v-btn type="submit" value="Submit" class="btn button ml-3">Submit</v-btn>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['errorMsg'],
  name: 'ErrorHandle',
  data() {
    return {
      isHidden: true,
      region: 'euw'
    };
  },
  computed: {
    statusCode() {
      return parseFloat(this.errorMsg) != null ? parseFloat(this.errorMsg) : '';
    }
  },
  methods: {
    onClick() {
      this.isHidden = true;
    }
  }
};
</script>

<style scoped>
.card {
  text-align: center;
  color: #fff;
  padding: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  text-align: center;
  border-radius: 38px;
  margin: 0;
  transform: translateX(-50%) translateY(calc(-50% - 0.5px));
  display: block;
}

.close:before {
  content: '✕';
}
.close {
  position: absolute;
  top: 20px;
  right: 25px;
  cursor: pointer;
  padding: 5px;
  background-color: #ff5252 !important;
  border-color: #ff5252 !important;
}

.error-bar h5,
.error-bar h4 {
  padding: 10px 0px;
}

.errors {
  position: relative;
  display: inline-block;
  margin: 50px;
}

.errors .img-top {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
.card:hover .img-top {
  display: inline;
}

#sumName {
  width: 50%;
}

#region,
#sumName {
  background: #252246 !important;
  color: #fff !important;
  border-radius: 5px;
  padding: 20px;
}
</style>