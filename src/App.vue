<template>
  <div>
    <px-header :links="links" />
    <main>
      <router-view class="container px-2 sm:px-5 py-20 flex justify-center" />
    </main>
  </div>
</template>

<script>
import PxHeader from "@/components/PxHeader";
import api from "@/api.js";
export default {
  name: "app",
  components: { PxHeader },

  data() {
    return {
      links: [
        {
          title: "BTC",
          to: { name: "coin-detail", params: { id: "bitcoin" } }
        },
        {
          title: "ETH",
          to: { name: "coin-detail", params: { id: "ethereum" } }
        },
        {
          title: "XRP",
          to: { name: "coin-detail", params: { id: "ripple" } }
        }
      ],
      assets: []
    };
  },
  created() {
    this.isLoading = true;

    api
      .getAssets()
      .then(assets => (this.assets = assets))
      .then(() => {
        for (let i = 0; i < 3; i++) {
          this.$set(this.links, i, {
            title: this.assets[i].symbol,
            to: { name: "coin-detail", params: { id: this.assets[i].id } }
          });

          // this.links[i] = {
          //   title: this.assets[i].symbol,
          //   to: { name: "coin-detail", params: { id: this.assets[i].id } },
          // };
        }
        // console.log(this.assets);
      });
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
