<template>
  <!--    <img class="red" :class="{ blue: true, green: false, yellow: 1 > 0 }" />-->
  <table class="relative">
    <thead class="pt-20 min-w-full">
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }">
          <span class="underline cursor-pointer" @click="changeSortOrder"
            >Ranking</span
          >
        </th>
        <th>Name</th>
        <th>Price</th>
        <th>Market capacity</th>
        <th>Variance 24hs</th>
        <td class="">
          <input
            class="
              bg-gray-100
              focus:outline-none
              border-b border-gray-400
              py-2
              px-4
              block
              w-full
              appearance-none
              leading-normal
              hidden
              md:block
            "
            id="filter"
            placeholder="Search..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="a in filteredAssets"
        :key="a.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-pink-100"
      >
        <td>
          <img
            class="w-6 h-6"
            :src="
              `https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`
            "
            :alt="a.name"
          />
        </td>
        <td>
          <b> {{ a.rank }}</b>
        </td>
        <td>
          <router-link
            class="hover:underline text-green-700"
            :to="{ name: 'coin-detail', params: { id: a.id } }"
            >{{ a.name }}</router-link
          >
          <small class="ml-1 block md:inline text-gray-500">{{
            a.symbol
          }}</small>
        </td>
        <td>{{ a.priceUsd | dollar }}</td>
        <td>{{ a.marketCapUsd | dollar }}</td>
        <td
          :class="
            a.changePercent24Hr.includes('-')
              ? 'text-red-700'
              : 'text-green-700'
          "
        >
          {{ a.changePercent24Hr | percent }}
        </td>
        <td class="hidden sm:block">
          <px-button @custom-click="goToCoin(a.id)">
            <span>Detail</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PxButton from "@/components/PxButton";

export default {
  name: "PxAssetsTable",

  components: { PxButton },

  data() {
    return {
      filter: "",
      sortOrder: 1
    };
  },

  props: {
    assets: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    filteredAssets() {
      const altOrder = this.sortOrder === 1 ? -1 : 1;

      return this.assets
        .filter(
          a =>
            a.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
            a.name.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((a, b) => {
          if (parseInt(a.rank) > parseInt(b.rank)) {
            return this.sortOrder;
          }

          return altOrder;
        });
    }
  },

  methods: {
    goToCoin(id) {
      this.$router.push({ name: "coin-detail", params: { id } });
    },

    changeSortOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    }
  }
};
</script>

<style scoped>
.down,
.up {
  --icon-size: 1rem;
  position: relative;
}
.up::before,
.down::before {
  width: var(--icon-size);
  height: var(--icon-size);
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  left: -16px;
}
.up::before {
  content: url("../assets/arrow_upward.svg");
  /* color: red; */
}

.down::before {
  content: url("../assets/arrow_downward.svg");
}
table {
  min-width: 100%;
  width: max-content;
  min-height: 3rem;
}
td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}
thead > tr {
  /* display: flex;
  width: 100%; */
}
@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th,
  thead > tr > td {
    padding: 12px;
  }
}
</style>
