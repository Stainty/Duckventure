(function () {
  'use strict';

  const CDN_BASE = 'https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/';

  const ASSETS = {
    cdnBase: CDN_BASE,
    props: {
      skovoroda: CDN_BASE + 'props/skovoroda.png',
      stove: CDN_BASE + 'props/stove.png',
      fridge: CDN_BASE + 'props/fridge.png',
      dichlofos: CDN_BASE + 'props/dichlofos.png',
      key: CDN_BASE + 'props/key.png',
      lamp: CDN_BASE + 'props/lamp.png',
      clock: CDN_BASE + 'props/clock.png',
      knife: CDN_BASE + 'props/knife.png',
      tape: CDN_BASE + 'props/tape.png',
      trashcan: CDN_BASE + 'props/trashcan.png',
      incubator: CDN_BASE + 'props/incubator.png',
      cuttingBoard: CDN_BASE + 'props/cutting-board.png',
      dirtBag: CDN_BASE + 'props/dirt-bag.png',
      flowerSeeds: CDN_BASE + 'props/flower-seeds.png',
      potEmpty: CDN_BASE + 'props/pot-empty.png',
      potDirt: CDN_BASE + 'props/pot-dirt.png',
      potFlower: CDN_BASE + 'props/pot-flower.png',
      honey: CDN_BASE + 'props/honey.png',
      pixelMap: CDN_BASE + 'props/pixel-map.png' 
    },
    food: {
      saladPlate: CDN_BASE + 'food/salad-plate.png',
      veggieSet: CDN_BASE + 'food/veggie-set.png',
      cucumber: CDN_BASE + 'food/cucumber.png',
      tomato: CDN_BASE + 'food/tomato.png',
      lettuce: CDN_BASE + 'food/lettuce.png',
      birdFeed: CDN_BASE + 'food/chicken-feed.png',
      duckFeedAlpha: CDN_BASE + 'food/duck-feed-alpha.png',
      duckFeedBeta: CDN_BASE + 'food/duck-feed-beta.png'
    },
    characters: {
      susDuck: CDN_BASE + 'characters/sus-duck.png',
      susDuckBoss: CDN_BASE + 'characters/sus-duck-boss.png'
    },
    pixelmap: {
      map: CDN_BASE + 'pixelmap/map.jfif',
      exit: CDN_BASE + 'pixelmap/exit.png',
      back: CDN_BASE + 'pixelmap/back.png',
      forest: CDN_BASE + 'pixelmap/forest.jfif',
      cave: CDN_BASE + 'pixelmap/cave.jfif',
      lake: CDN_BASE + 'pixelmap/lake.jfif',
      polyana: CDN_BASE + 'pixelmap/polyana.jfif',
      village: CDN_BASE + 'pixelmap/village.jfif',
      prud: CDN_BASE + 'pixelmap/prud.jfif',
      market: CDN_BASE + 'pixelmap/market.jfif',
      blacksmith: CDN_BASE + 'pixelmap/blacksmith.jfif',
      mushrooms: CDN_BASE + 'pixelmap/mushrooms.png',
      wood: CDN_BASE + 'pixelmap/wood.png',
      tree: CDN_BASE + 'pixelmap/tree.png',
      axe: CDN_BASE + 'pixelmap/axe.png',
      energyIcon: CDN_BASE + 'pixelmap/energy-icon.png',
      rock: CDN_BASE + 'pixelmap/rock.png'
    },
    skins: {
      default: CDN_BASE + 'skins/duck-default.png',
      argo: {
        icon: CDN_BASE + 'skins/argo-icon.png',
        img: CDN_BASE + 'skins/argo-duck.png'
      },
      mafioznik: {
        icon: CDN_BASE + 'skins/mafioznik-icon.png',
        img: CDN_BASE + 'skins/mafioznik-duck.png'
      },
      rocker: {
        icon: CDN_BASE + 'skins/rocker-icon.png',
        img: CDN_BASE + 'skins/rocker-duck.png'
      },
      bikini: {
        icon: CDN_BASE + 'skins/bikini-icon.png',
        img: CDN_BASE + 'skins/bikini-duck.png'
      },
      tie: {
        icon: CDN_BASE + 'skins/tie-icon.png',
        img: CDN_BASE + 'skins/tie-duck.png'
      },
      agent47: {
        icon: CDN_BASE + 'skins/agent47-icon.png',
        img: CDN_BASE + 'skins/agent47-duck.png'
      },
      jojo: {
        icon: CDN_BASE + 'skins/jojo-icon.png',
        img: CDN_BASE + 'skins/jojo-duck.png'
      },
      glasses: {
        icon: CDN_BASE + 'skins/glasses-icon.png',
        img: CDN_BASE + 'skins/glasses-duck.png'
      },
      wig_goose: {
        icon: CDN_BASE + 'skins/wig-icon.png',
        img: CDN_BASE + 'skins/wig-duck.png'
      },
      vape: {
        icon: CDN_BASE + 'skins/vape-icon.png',
        img: CDN_BASE + 'skins/vape-duck.png'
      },
      doshirak: {
        icon: CDN_BASE + 'skins/doshirak-icon.png',
        img: CDN_BASE + 'skins/doshirak-duck.png'
      },
      patched: {
        icon: CDN_BASE + 'skins/patched-duck.png',
        img: CDN_BASE + 'skins/patched-duck.png'
      }
    }
  };

  window.ASSETS = ASSETS;
})();
