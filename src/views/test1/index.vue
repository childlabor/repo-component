<template>
  <div>
    <p @click="toTest2">1</p>
    <p>{{ extra }}</p>
    <input type="text" v-model="input">
    <p>{{ name }}</p>
    <p>{{ phone }}</p>
    <p>{{ age }}</p>
    <p>{{ weight }}</p>
    <p>{{ height }}</p>
    <p>{{ merge }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: "test1",

  data() {
    return {
      input: 'abc'
    }
  },
  mounted() {
    let data = {
      name: 'labor',
      phone: '18612345621',
      age: '18',
      weight: '',
      height: '178'
    }

    this.initSDKData(data);
  },

  computed: {
    extra() {
      return '组件局部计算属性1'
    },

    ...mapState([
      'name',
      'phone',
      'age',
      'weight',
      'height'
    ]),

    ...mapGetters([
      'merge'
    ])
  },

  methods: {
    ...mapMutations({
      initSDKData: 'initData',
      getSDKData: 'getData',
      setSDKData: 'setData',
    }),

    ...mapActions({
      actionsSetSDKData: 'setData'
    }),

    toTest2() {
      this.$router.push({name: 'test2'})
    },

    // setSDKData(data) {
    //   this.$store.commit('setData', data)
    // }
  }
};
</script>
<style lang="scss">
input {
  display: block;
  margin-left: 24px;
  width: 700px;
  height: 88px;
  border: 1px solid #999;
}
</style>
