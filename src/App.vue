<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
	<haerderView></haerderView>
	
	<!-- <leftView></leftView> -->
    <router-view/>
	
	<footerView></footerView>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import haerderView from '@/views/common/header.vue'; // @ is an alias to /src
import footerView from '@/views/common/footer.vue'; // @ is an alias to /src
import leftView from '@/views/common/left.vue'; // @ is an alias to /src

@Component({
  components: {
    haerderView,
	footerView,
	leftView
  },
})
export default class app extends Vue {
	
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  background: #f5f5f5;
}

#nav {
  padding: 30px;
	display: none;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
