<template>
  <div>
    <bounce-loader
      :loading="isLoading"
      :color="'#22543D'"
      :size="100"
      class="mt-20"
    />
    <px-assets-table v-if="!isLoading" :assets="assets" />
  </div>
</template>

<script>
import api from "@/api";
import PxAssetsTable from "@/components/PxAssetsTable";

export default {
  name: "Home",

  components: { PxAssetsTable },

  data() {
    return {
      isLoading: false,
      assets: []
    };
  },

  created() {
    this.isLoading = true;

    api
      .getAssets()
      .then(assets => (this.assets = assets))
      .finally(() => (this.isLoading = false));
  },
  metaInfo: {
    title: "Your Crypto Exchange",
    link: [{ rel: "favicon", href: "favicon.ico" }]
  }
};
</script>
