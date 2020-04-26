<template>
  <div>
    <div v-if="errorMsg == 'Error: Request failed with status code 404'">
      <h1>Unable to find {{this.$route.params.name}} on server {{this.$route.params.platform}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: ['errorMsg'],
  name: 'ErrorHandle',
  data() {
    return {
      isHidden: true
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
</style>