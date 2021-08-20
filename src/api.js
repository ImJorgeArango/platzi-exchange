// import { reject } from "core-js/fn/promise";

const url = "https://api.coincap.io/v2";
// const awaitTime = 2000;
var callsCounter = 0;
// function recursiveFetch(url) {
//   return new Promise((resolve) => {
//     fetch(`${url}`, { mode: "cors" })
//       .then(async (res) => {
//         if (res.ok) {
//           resolve(res);
//         } else {
//           console.log("false but inside ok");
//           await recursiveFetch(url);
//         }
//       })
//       .catch(async () => {
//         console.log("false but inside carch");
//         await recursiveFetch(url);
//       });
//   });
// }

function recursiveFetch(url) {
  return fetch(`${url}`, { mode: "cors" }).then(async res => {
    if (res.status !== 429) {
      return res;
    } else {
      // console.log("false but inside ok");
      return await recursiveFetch(url);
    }
  });
  // .catch(async () => {
  //   console.log("false but inside carch");
  //   await recursiveFetch(url);
  // });
}
async function delayedFetch(url) {
  callsCounter = callsCounter + 1;
  console.log(callsCounter);
  let data;
  // try {
  data = await recursiveFetch(`${url}`)
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(res => {
      // console.log(res.data);
      return res.data;
    })
    .catch(() => {
      console.log("error whit: ", url);
    });
  console.log(2 - 3);
  return data;
}
async function getAssets() {
  let data;
  data = await delayedFetch(`${url}/assets`);

  // try {
  //   data = fetch(`${url}/assets?limit=20`)
  //     .then((res) => res.json())
  //     .then((res) => res.data);
  // } catch (err) {
  //   console.log(err);
  //   setInterval(() => {
  //     data = fetch(`${url}/assets?limit=20`)
  //       .then((res) => res.json())
  //       .then((res) => res.data);
  //   }, awaitTime);
  // }
  return data;
}

async function getAsset(coin) {
  let data;
  data = await delayedFetch(`${url}/assets/${coin}`);
  // try {
  //   data = fetch(`${url}/assets/${coin}?limit=20`)
  //     .then((res) => res.json())
  //     .then((res) => res.data);
  // } catch (err) {
  //   console.log(err);
  //   setInterval(() => {
  //     data = fetch(`${url}/assets?limit=20`)
  //       .then((res) => res.json())
  //       .then((res) => res.data);
  //   }, awaitTime);
  // }
  return data;
}

async function getAssetHistory(coin) {
  const now = new Date();
  const end = now.getTime();
  now.setDate(now.getDate() - 1 / 2);
  const start = now.getTime();
  let data;
  data = await delayedFetch(
    `${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`
  );
  // try {
  //   data = fetch(
  //     `${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}&?limit=20`
  //   )
  //     .then((res) => res.json())
  //     .then((res) => res.data);
  // } catch (err) {
  //   console.log(err);
  //   setInterval(() => {
  //     data = fetch(`${url}/assets?limit=20`)
  //       .then((res) => res.json())
  //       .then((res) => res.data);
  //   }, awaitTime);
  // }
  return data;
}

async function getMarkets(coin) {
  let data;

  data = await delayedFetch(`${url}/assets/${coin}/markets?limit=5`);
  // try {
  //   data = fetch(`${url}/assets/${coin}/markets?limit=5`)
  //     .then((res) => res.json())
  //     .then((res) => res.data);
  // } catch (err) {
  //   console.log(err);
  //   setInterval(() => {
  //     data = fetch(`${url}/assets?limit=20`)
  //       .then((res) => res.json())
  //       .then((res) => res.data);
  //   }, awaitTime);
  // }
  return data;
}

async function getExchange(id) {
  let data;
  data = await delayedFetch(`${url}/exchanges/${id}?limit=20`);
  // try {
  //   data = fetch(`${url}/exchanges/${id}?limit=20`)
  //     .then((res) => res.json())
  //     .then((res) => res.data);
  // } catch (err) {
  //   console.log(err);
  //   setInterval(() => {
  //     data = fetch(`${url}/exchanges/${id}?limit=20`)
  //       .then((res) => res.json())
  //       .then((res) => res.data);
  //   }, awaitTime);
  // }
  return data;
}

export default {
  getAssets,
  getAsset,
  getMarkets,
  getExchange,
  getAssetHistory
};
