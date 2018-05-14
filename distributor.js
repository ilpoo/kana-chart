var fs = require('fs-extra');
var data = require("./data");

[
  "hiragana.min.svg",
  "katakana.min.svg",
  "Kyoukasho.subset.kana.ttf",
  "Kyoukasho.subset.kana.woff",
  "Kyoukasho.subset.kana.woff2",
].forEach(file => fs.copySync(
  `./media_assets/${file}`,
  `./dist/media/${file}`)
);

const faviconDescription = {
  "masterPicture": "./media_assets/kana-chart.svg",
  "iconsPath": "/dist",
  "design": {
    "ios": {
      "masterPicture": "./media_assets/kana-chart-plain.svg",
      "pictureAspect": "backgroundAndMargin",
      "backgroundColor": data.background_color,
      "margin": "0%",
      "assets": {
        "ios6AndPriorIcons": false,
        "ios7AndLaterIcons": false,
        "precomposedIcons": false,
        "declareOnlyDefaultIcon": true
      },
      "appName": data.name,
    },
    "desktopBrowser": {},
    "windows": {
      "pictureAspect": "noChange",
      "backgroundColor": data.theme_color,
      "onConflict": "override",
      "assets": {
        "windows80Ie10Tile": false,
        "windows10Ie11EdgeTiles": {
          "small": false,
          "medium": true,
          "big": false,
          "rectangle": false,
        }
      },
      "appName": data.name,
    },
    "androidChrome": {
      "pictureAspect": "shadow",
      "themeColor": data.theme_color,
      "manifest": {
        "name": data.name,
        "display": "standalone",
        "orientation": "notSet",
        "onConflict": "override",
        "declared": true,
        "existing_manifest": JSON.stringify({
            name: data.name,
            short_name: data.name,
            description: data.description,
            start_url: data.url,
            theme_color: data.theme_color,
            background_color: data.background_color,
            display: "standalone",
            default_locale: data.locale,
            author: data.author,
            offline_enabled: true,
            version: data.version,
            app: {
              background: {},
            },
            manifest_version: 2,
          }),
      },
      "assets": {
        "legacyIcon": false,
        "lowResolutionIcons": false,
      },
    },
    "safariPinnedTab": {
      "masterPicture": "./media_assets/kana-chart-plain.svg",
      "pictureAspect": "silhouette",
      "themeColor": data.theme_color,
    },
  },
  "settings": {
    "compression": 1,
    "scalingAlgorithm": "Mitchell",
    "errorOnImageTooSmall": false,
    "readmeFile": false,
    "htmlCodeFile": false,
    "usePathAsIs": false,
  },
  "versioning": {
    "paramName": "v",
    "paramValue": Math.random().toString(36).substr(2, 17),
  },
};

fs.writeFileSync(`dist/faviconDescription.json`, JSON.stringify(faviconDescription));


module.exports = {};
