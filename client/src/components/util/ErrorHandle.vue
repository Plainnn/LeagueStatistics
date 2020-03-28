<template>
  <div>
    <div v-if="isHidden && statusCode == 404" class="card">
      <span class="close" v-on:click="isHidden = !isHidden;"></span>

      <div class="errors">
        <img
          src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-replays/global/default/btn_replay_error.png"
        />
        <img
          src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-replays/global/default/btn_replay_error_hover.png"
          class="img-top"
        />
      </div>
      <div class="error-bar">
        <h5>We Couldn't Find This User</h5>
        <h4>Try checking the spelling</h4>
      </div>
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