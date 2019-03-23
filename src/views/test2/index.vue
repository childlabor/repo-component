<template>
  <div>
    <p @click="toTest1">2</p>
    <p>{{ extra }}</p>
    <input type="text" v-model="newName" placeholder="name">
    <input type="text" v-model="newAge"  placeholder="age">
    <input type="text" v-model="newWeight"  placeholder="weight">
    <p>{{ name }}</p>
    <p>{{ phone }}</p>
    <p>{{ age }}</p>
    <p>{{ weight }}</p>
    <p>{{ merge }}</p>
    <p @click="setSDKData">click</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: "test2",

  data() {
    return {
      newName: '',
      newAge: '',
      newWeight: '',
    }
  },
  mounted() {

  },

  computed: {
    extra() {
      return '组件局部计算属性1'
    },

    ...mapState([
      'name',
      'phone',
      'age',
      'weight'
    ]),

    ...mapGetters([
      'merge'
    ])
  },

  methods: {
    ...mapMutations([
      'setData'
    ]),

    ...mapActions({
      actionsSetSDKData: 'setData'
    }),

    toTest1() {
      this.$router.push({name: 'test1'})
    },

    setSDKData() {
      let data = {
        name: this.newName,
        age: this.newAge,
        weight: this.newWeight
      }
      this.setData(data);
    }
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

