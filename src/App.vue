<template>
  <div>
    <h1>Hello,world</h1>
    <h1>Hello, {{ msg }}</h1>
    <ul>
      <li>
        <router-link to="/">
          页面1
        </router-link>
      </li>
      <li>
        <router-link to="/2">
          页面2
        </router-link>
      </li>
    </ul>
    <router-view />
    <h1>{{ storeMsg }}</h1>
    <JsxComponent />
  </div>
</template>

<script>
import JsxComponent from 'components/Jsx';
export default {
  components: {
    JsxComponent
  },
  data() {
    return {
      msg: 'Orion'
    };
  },
  computed: {
    storeMsg() {
      return this.$store.getters['demo/msgUpperCase'];
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
</style>
