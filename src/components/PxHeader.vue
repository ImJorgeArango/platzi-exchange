<template>
  <header class="shadow w-screen fixed top-0 z-10">
    <nav class="flex items-center justify-between flex-wrap bg-green-900 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <px-icon class="mr-2" />
        <router-link
          :to="{ name: 'home' }"
          class="font-semibold text-xl tracking-tight"
          >Your Crypto Exchange</router-link
        >
      </div>
      <div
        class="
          hidden
          sm:block
          block
          flex-grow
          lg:flex
          lg:items-center
          lg:w-auto
        "
      >
        <div class="text-sm lg:flex-grow">
          <router-link
            v-for="l in links"
            :key="l.title"
            :to="l.to"
            class="
              mt-4
              lg:inline-block
              lg:mt-0
              text-pink-100
              hover:underline
              mr-4
            "
            >{{ l.title }}</router-link
          >
        </div>
      </div>
      <!-- <div class="back-button">
        <button type="button">
          <img src="../assets/arrow_back.svg" alt="" />
        </button>
      </div> -->
    </nav>
  </header>
</template>

<script>
import PxIcon from "@/components/PxIcon";

export default {
  name: "PxHeader",
  components: { PxIcon },

  props: {
    links: {
      type: Array,
      default: () => []
    }
  }
};
</script>
