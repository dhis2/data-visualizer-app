# [101.3.0](https://github.com/dhis2/data-visualizer-app/compare/v101.2.4...v101.3.0) (2025-06-19)


### Features

* support xlsx downloads (DHIS2-19748) ([#3415](https://github.com/dhis2/data-visualizer-app/issues/3415)) ([581faef](https://github.com/dhis2/data-visualizer-app/commit/581faefae25a173284553098bdcd33d5a463742c))

## [101.2.4](https://github.com/dhis2/data-visualizer-app/compare/v101.2.3...v101.2.4) (2025-06-06)


### Bug Fixes

* avoid crash when switching vis type due to unsupported options (DHIS2-19611) ([#3396](https://github.com/dhis2/data-visualizer-app/issues/3396)) ([5a3837f](https://github.com/dhis2/data-visualizer-app/commit/5a3837f9b216eb086685b27d3049825762591168))

## [101.2.3](https://github.com/dhis2/data-visualizer-app/compare/v101.2.2...v101.2.3) (2025-06-02)


### Bug Fixes

* do not overwrite newer changes to a visualization by another user when renaming ([#3386](https://github.com/dhis2/data-visualizer-app/issues/3386)) ([3188154](https://github.com/dhis2/data-visualizer-app/commit/31881547540f23ccc1c7b5714ebbf789cb04554c))

## [101.2.2](https://github.com/dhis2/data-visualizer-app/compare/v101.2.1...v101.2.2) (2025-05-26)


### Bug Fixes

* enable PDF export in a LAN only setup ([#3402](https://github.com/dhis2/data-visualizer-app/issues/3402)) ([bd24ce2](https://github.com/dhis2/data-visualizer-app/commit/bd24ce2399189a4c3b95bc07ccde8d9529b80ca5))

## [101.2.1](https://github.com/dhis2/data-visualizer-app/compare/v101.2.0...v101.2.1) (2025-05-22)


### Bug Fixes

* prevent font files from being pre-cached ([#3401](https://github.com/dhis2/data-visualizer-app/issues/3401)) ([452e37e](https://github.com/dhis2/data-visualizer-app/commit/452e37e2639df88e15cc78cc862133cdcccd892c))

# [101.2.0](https://github.com/dhis2/data-visualizer-app/compare/v101.1.7...v101.2.0) (2025-05-20)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([#3394](https://github.com/dhis2/data-visualizer-app/issues/3394)) ([3f7d255](https://github.com/dhis2/data-visualizer-app/commit/3f7d255a101fabf3aaa1f8f5bbdd2498cbe5961a))


### Features

* improve chart export including support for exporting charts with non-latin characters to PDF ([#3288](https://github.com/dhis2/data-visualizer-app/issues/3288)) ([298f235](https://github.com/dhis2/data-visualizer-app/commit/298f235786f1cbd75393fb9422cc476fbeb0789e))

## [101.1.7](https://github.com/dhis2/data-visualizer-app/compare/v101.1.6...v101.1.7) (2025-04-30)


### Bug Fixes

* visualization canvas loading background (DHIS2-19533) ([#3387](https://github.com/dhis2/data-visualizer-app/issues/3387)) ([f2175ad](https://github.com/dhis2/data-visualizer-app/commit/f2175ad253e354273093d5b3c66e9462a51905d1))

## [101.1.6](https://github.com/dhis2/data-visualizer-app/compare/v101.1.5...v101.1.6) (2025-04-24)


### Bug Fixes

* fix sorting in PT when percentage of rows is used (DHIS2-5455) ([#3380](https://github.com/dhis2/data-visualizer-app/issues/3380)) ([d4ca11f](https://github.com/dhis2/data-visualizer-app/commit/d4ca11f57c861f3caa07ef375874c564ac21676c))

## [101.1.5](https://github.com/dhis2/data-visualizer-app/compare/v101.1.4...v101.1.5) (2025-04-22)


### Bug Fixes

* ensure error's title/description stay centred (DHIS2-19326) ([#3372](https://github.com/dhis2/data-visualizer-app/issues/3372)) ([69762ad](https://github.com/dhis2/data-visualizer-app/commit/69762adba0c2f01ef447634b4f9a46d78a4fa99e))

## [101.1.4](https://github.com/dhis2/data-visualizer-app/compare/v101.1.3...v101.1.4) (2025-04-22)


### Bug Fixes

* rename visualization fails when it contains data element or calculation [DHIS2-19433] ([#3377](https://github.com/dhis2/data-visualizer-app/issues/3377)) ([63d4562](https://github.com/dhis2/data-visualizer-app/commit/63d4562246d513c82c91e34e54ff415ef432c163))

## [101.1.3](https://github.com/dhis2/data-visualizer-app/compare/v101.1.2...v101.1.3) (2025-04-11)


### Bug Fixes

* print the name of relative periods instead of actual periods (DHIS2-19454) ([d2d55ca](https://github.com/dhis2/data-visualizer-app/commit/d2d55cae7f3197b1fbf6ec99bee2d16064b28596))

## [101.1.2](https://github.com/dhis2/data-visualizer-app/compare/v101.1.1...v101.1.2) (2025-04-04)


### Bug Fixes

* restore navigation between visualizations using the browser address bar [DHIS2-19387] ([#3375](https://github.com/dhis2/data-visualizer-app/issues/3375)) ([0826265](https://github.com/dhis2/data-visualizer-app/commit/08262659b305abb984f436e538ad737b7c8e44a3))

## [101.1.1](https://github.com/dhis2/data-visualizer-app/compare/v101.1.0...v101.1.1) (2025-04-02)


### Bug Fixes

* ensure hyperlinks work when using the upcoming global shell [DHIS2-19274] ([#3374](https://github.com/dhis2/data-visualizer-app/issues/3374)) ([331df17](https://github.com/dhis2/data-visualizer-app/commit/331df17ac47087f12fba83477a23297eda1c806c))

# [101.1.0](https://github.com/dhis2/data-visualizer-app/compare/v101.0.7...v101.1.0) (2025-03-18)


### Features

* implement option set selector in Data dimension modal (DHIS2-17872) ([#3344](https://github.com/dhis2/data-visualizer-app/issues/3344)) ([d09739d](https://github.com/dhis2/data-visualizer-app/commit/d09739da121d71d629465bd23166c3f6443f3e36))

## [101.0.7](https://github.com/dhis2/data-visualizer-app/compare/v101.0.6...v101.0.7) (2025-03-18)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([#3366](https://github.com/dhis2/data-visualizer-app/issues/3366)) ([3f5c32f](https://github.com/dhis2/data-visualizer-app/commit/3f5c32f4c9a6b72888df88de456537d3c114f64d))

## [101.0.6](https://github.com/dhis2/data-visualizer-app/compare/v101.0.5...v101.0.6) (2025-03-18)


### Bug Fixes

* add hash routing and plugin support for the upcoming global shell [DHIS2-19061] ([#3363](https://github.com/dhis2/data-visualizer-app/issues/3363)) ([4e710c2](https://github.com/dhis2/data-visualizer-app/commit/4e710c215bea9b853ad0b6f9ec214fbf72143565))

## [101.0.5](https://github.com/dhis2/data-visualizer-app/compare/v101.0.4...v101.0.5) (2025-03-13)


### Bug Fixes

* show error screen for not found visualizations (DHIS2-19187) ([#3362](https://github.com/dhis2/data-visualizer-app/issues/3362)) ([c7e9805](https://github.com/dhis2/data-visualizer-app/commit/c7e9805befcdb55569666ae3760cd16b7cac65c8))

## [101.0.4](https://github.com/dhis2/data-visualizer-app/compare/v101.0.3...v101.0.4) (2025-03-04)


### Bug Fixes

* fix styling on dimension items [DHIS2-17934] [DHIS2-19046] ([#3357](https://github.com/dhis2/data-visualizer-app/issues/3357)) ([8e0070b](https://github.com/dhis2/data-visualizer-app/commit/8e0070b3029b61e7a476e5fa1b0cc8f9712264bf))

## [101.0.3](https://github.com/dhis2/data-visualizer-app/compare/v101.0.2...v101.0.3) (2025-02-26)


### Bug Fixes

* allow blank cumulative values in charts ([#3352](https://github.com/dhis2/data-visualizer-app/issues/3352)) ([c663d96](https://github.com/dhis2/data-visualizer-app/commit/c663d96c00100ec523b81974c3d40feb50ee6f5b))

## [101.0.2](https://github.com/dhis2/data-visualizer-app/compare/v101.0.1...v101.0.2) (2025-02-24)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([#3348](https://github.com/dhis2/data-visualizer-app/issues/3348)) ([a642734](https://github.com/dhis2/data-visualizer-app/commit/a6427348ea634aa5e334ed5f3b5c6705dbece517))

## [101.0.1](https://github.com/dhis2/data-visualizer-app/compare/v101.0.0...v101.0.1) (2025-02-21)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([#3333](https://github.com/dhis2/data-visualizer-app/issues/3333)) ([8974db7](https://github.com/dhis2/data-visualizer-app/commit/8974db7a84b32f217c60198a2f49545bf9a5a883))

# [101.0.0](https://github.com/dhis2/data-visualizer-app/compare/v100.9.1...v101.0.0) (2025-02-14)


### Features

* support new dashboard plugin architecture (DHIS2-17283) ([1cad002](https://github.com/dhis2/data-visualizer-app/commit/1cad0026b59956382e948080e7c680008bb07c22))
* use custom error screens in plugin (DHIS2-18988) ([7c45053](https://github.com/dhis2/data-visualizer-app/commit/7c4505324382300f1299bd2318b1cb4c91136c24))


### BREAKING CHANGES

* this version is only compatible with Dashboard app >=101.0.0

## [100.9.1](https://github.com/dhis2/data-visualizer-app/compare/v100.9.0...v100.9.1) (2025-02-04)


### Bug Fixes

* pivot table crashes when hiding empty columns ([#3328](https://github.com/dhis2/data-visualizer-app/issues/3328)) ([54a18b6](https://github.com/dhis2/data-visualizer-app/commit/54a18b6b2353bba14bafc37478e2e1f227708c60))

# [100.9.0](https://github.com/dhis2/data-visualizer-app/compare/v100.8.8...v100.9.0) (2025-01-09)


### Features

* display type and definitions for data items in data selector (DHIS2-14774) ([#3274](https://github.com/dhis2/data-visualizer-app/issues/3274)) ([f44897a](https://github.com/dhis2/data-visualizer-app/commit/f44897a90c2ef47b478788a3336e983e991f6c52))

## [100.8.8](https://github.com/dhis2/data-visualizer-app/compare/v100.8.7...v100.8.8) (2024-12-22)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([157d99b](https://github.com/dhis2/data-visualizer-app/commit/157d99b0e1c84436ed5e8f0013290869ec4973d1))

## [100.8.7](https://github.com/dhis2/data-visualizer-app/compare/v100.8.6...v100.8.7) (2024-12-04)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([#3248](https://github.com/dhis2/data-visualizer-app/issues/3248)) ([a0d7c9c](https://github.com/dhis2/data-visualizer-app/commit/a0d7c9c09290349964167fe8658e4151c2a68d85))

## [100.8.6](https://github.com/dhis2/data-visualizer-app/compare/v100.8.5...v100.8.6) (2024-12-03)


### Bug Fixes

* enable ou tree and levels/groups with user orgunits and display translated title (DHIS2-18066) ([#3241](https://github.com/dhis2/data-visualizer-app/issues/3241)) ([ef314a5](https://github.com/dhis2/data-visualizer-app/commit/ef314a594ce9cb6146755c52291f72135052d397))

## [100.8.5](https://github.com/dhis2/data-visualizer-app/compare/v100.8.4...v100.8.5) (2024-11-13)


### Bug Fixes

* handle single value vis-type as highcharts chart instance ([#3289](https://github.com/dhis2/data-visualizer-app/issues/3289)) ([83d0e6c](https://github.com/dhis2/data-visualizer-app/commit/83d0e6c33ea5314e849fb1f5842d4b3b61e74c41))

## [100.8.4](https://github.com/dhis2/data-visualizer-app/compare/v100.8.3...v100.8.4) (2024-11-07)


### Bug Fixes

* infinite spinner when opening the interpretations modal while viewing a visualization ([#3283](https://github.com/dhis2/data-visualizer-app/issues/3283)) ([403adbc](https://github.com/dhis2/data-visualizer-app/commit/403adbc45f3d0f7983317eae4a6ccd44f970c428))

## [100.8.3](https://github.com/dhis2/data-visualizer-app/compare/v100.8.2...v100.8.3) (2024-10-24)


### Bug Fixes

* show error UI when plugin has no data [DHIS2-16793] ([#3131](https://github.com/dhis2/data-visualizer-app/issues/3131)) ([83f8a0a](https://github.com/dhis2/data-visualizer-app/commit/83f8a0a5a730272ffba796bb23ebf2686ea84b9e))

## [100.8.2](https://github.com/dhis2/data-visualizer-app/compare/v100.8.1...v100.8.2) (2024-10-22)


### Bug Fixes

* fetch icon with credentials ([#3264](https://github.com/dhis2/data-visualizer-app/issues/3264)) ([4fad945](https://github.com/dhis2/data-visualizer-app/commit/4fad9450e150b90a6976ad5919c214c1d953da6c))

## [100.8.1](https://github.com/dhis2/data-visualizer-app/compare/v100.8.0...v100.8.1) (2024-10-18)


### Bug Fixes

* compute subtotals/totals for boolean types (DHIS2-9155) ([#3194](https://github.com/dhis2/data-visualizer-app/issues/3194)) ([ebc0806](https://github.com/dhis2/data-visualizer-app/commit/ebc08061fe1d099f08bf2a07cfbf7d60b6615f56))

# [100.8.0](https://github.com/dhis2/data-visualizer-app/compare/v100.7.2...v100.8.0) (2024-10-07)


### Features

* improve support for right-to-left languages ([#3073](https://github.com/dhis2/data-visualizer-app/issues/3073)) ([777b36d](https://github.com/dhis2/data-visualizer-app/commit/777b36d454a8f029c8eea566e4f6954617398a6f)), closes [ui#1448](https://github.com/ui/issues/1448) [app-platform#825](https://github.com/app-platform/issues/825) [cli-style#464](https://github.com/cli-style/issues/464)

## [100.7.2](https://github.com/dhis2/data-visualizer-app/compare/v100.7.1...v100.7.2) (2024-09-25)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([#3200](https://github.com/dhis2/data-visualizer-app/issues/3200)) ([4f5635d](https://github.com/dhis2/data-visualizer-app/commit/4f5635dbdac8dc744d02f432dd5aa5cc9190388f))

## [100.7.1](https://github.com/dhis2/data-visualizer-app/compare/v100.7.0...v100.7.1) (2024-08-26)


### Bug Fixes

* display correct app version in dhis2 and updated workflows ([#3182](https://github.com/dhis2/data-visualizer-app/issues/3182)) ([39f9437](https://github.com/dhis2/data-visualizer-app/commit/39f9437b69b604994fa34fc5d18824374e0c91a7))
* install dependencies needed to release app with new workflow ([#3183](https://github.com/dhis2/data-visualizer-app/issues/3183)) ([f6b2670](https://github.com/dhis2/data-visualizer-app/commit/f6b267080010c4c51908aa2657acf7be77c96f11))

# [100.7.0](https://github.com/dhis2/data-visualizer-app/compare/v100.6.2...v100.7.0) (2024-08-21)


### Features

* add subtitle field to pivot table options [DHIS2-16158] ([#3178](https://github.com/dhis2/data-visualizer-app/issues/3178)) ([bec185e](https://github.com/dhis2/data-visualizer-app/commit/bec185e4d981fa70ab343757dc6250f31f090307))

## [100.6.2](https://github.com/dhis2/data-visualizer-app/compare/v100.6.1...v100.6.2) (2024-08-15)


### Bug Fixes

* apply grab cursor to assigned categories dimension item ([#3140](https://github.com/dhis2/data-visualizer-app/issues/3140)) ([437b8f1](https://github.com/dhis2/data-visualizer-app/commit/437b8f10b83c6643db6cee7caedb8774af9ae0f4))

## [100.6.1](https://github.com/dhis2/data-visualizer-app/compare/v100.6.0...v100.6.1) (2024-08-13)


### Bug Fixes

* sort analytics request params and items for cache hit optimization (analytics@26.8.1) ([#3166](https://github.com/dhis2/data-visualizer-app/issues/3166)) ([1a150e7](https://github.com/dhis2/data-visualizer-app/commit/1a150e76ae6896771339f1f6639177c1cfc05a09))

# [100.6.0](https://github.com/dhis2/data-visualizer-app/compare/v100.5.9...v100.6.0) (2024-08-08)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([4c08077](https://github.com/dhis2/data-visualizer-app/commit/4c08077fb9e23b93c2ab564d2bdf0366a0990b69))


### Features

* pivot table as default vis type in DV (DHIS2-15833) ([#3159](https://github.com/dhis2/data-visualizer-app/issues/3159)) ([0eccf93](https://github.com/dhis2/data-visualizer-app/commit/0eccf9372c6665ddc0f4bbaea460ad2d21723b2e))

## [100.5.9](https://github.com/dhis2/data-visualizer-app/compare/v100.5.8...v100.5.9) (2024-06-27)


### Bug Fixes

* analytics@26.7.6 apply legend to all numeric and boolean types ([#3128](https://github.com/dhis2/data-visualizer-app/issues/3128)) ([7ba8ae0](https://github.com/dhis2/data-visualizer-app/commit/7ba8ae01fc624bd769b82ac41e97b9bc6eeec916))

## [100.5.8](https://github.com/dhis2/data-visualizer-app/compare/v100.5.7...v100.5.8) (2024-06-25)


### Bug Fixes

* bump analytics with fix for DHIS2-16904 ([#3124](https://github.com/dhis2/data-visualizer-app/issues/3124)) ([4996f7a](https://github.com/dhis2/data-visualizer-app/commit/4996f7a194e4bbe77a50510dd000b21ac1c1b066))

## [100.5.7](https://github.com/dhis2/data-visualizer-app/compare/v100.5.6...v100.5.7) (2024-06-24)


### Bug Fixes

* use saved visualization in interpretation modal ([#3121](https://github.com/dhis2/data-visualizer-app/issues/3121)) ([1853a62](https://github.com/dhis2/data-visualizer-app/commit/1853a62d3eb3a744c4728491d624453cd6150d4e))

## [100.5.6](https://github.com/dhis2/data-visualizer-app/compare/v100.5.5...v100.5.6) (2024-06-17)


### Bug Fixes

* separator for hundreds, thousands and millions missing in Pie charts (DHIS2-16172) ([#3093](https://github.com/dhis2/data-visualizer-app/issues/3093)) ([286de25](https://github.com/dhis2/data-visualizer-app/commit/286de250ce4758e4387bc3f3bd8e497e6c407d97))
* use improved rich text editor from analytics (DHIS2-15522) ([03069f1](https://github.com/dhis2/data-visualizer-app/commit/03069f1128a9613f9db694c715f3c2e165b46e25))

## [100.5.5](https://github.com/dhis2/data-visualizer-app/compare/v100.5.4...v100.5.5) (2024-06-06)


### Bug Fixes

* dimension chip design updates (DHIS2-16272) ([#2934](https://github.com/dhis2/data-visualizer-app/issues/2934)) ([9b23fbd](https://github.com/dhis2/data-visualizer-app/commit/9b23fbd48a69ba52da6fcc219ea161eabd6540dd))
* non-existing AO blocks new AOs from being created (DHIS2-13167) ([#3056](https://github.com/dhis2/data-visualizer-app/issues/3056)) ([2bf0d53](https://github.com/dhis2/data-visualizer-app/commit/2bf0d53a855bd89b682abab60cda0f01b314a2f9))
* numbers are misaligned in pivot table (DHIS2-16900) ([#3072](https://github.com/dhis2/data-visualizer-app/issues/3072)) ([3ee3a83](https://github.com/dhis2/data-visualizer-app/commit/3ee3a83e9454d5d36ddd39e8eb59e7cf8dea1a41))
* **translations:** sync translations from transifex (dev) ([8dd390b](https://github.com/dhis2/data-visualizer-app/commit/8dd390b37d67093f1c18992514f933fc80b9ab8c))
* system / user setting for display name not respected in Org Unit tree (DHIS2-15000) ([#3051](https://github.com/dhis2/data-visualizer-app/issues/3051)) ([4a79d5b](https://github.com/dhis2/data-visualizer-app/commit/4a79d5be6e415c55828ad6abe99e450c1ff293dd))

## [100.5.4](https://github.com/dhis2/data-visualizer-app/compare/v100.5.3...v100.5.4) (2024-05-13)


### Bug Fixes

* avoid flashing when ou levels are used (DHIS2-17136) ([#3032](https://github.com/dhis2/data-visualizer-app/issues/3032)) ([b1b6148](https://github.com/dhis2/data-visualizer-app/commit/b1b614827bd5d14e2762a54463db52dbeb598683))
* fix a crash when row totals is enabled (DHIS2-17297) ([#3042](https://github.com/dhis2/data-visualizer-app/issues/3042)) ([4004455](https://github.com/dhis2/data-visualizer-app/commit/4004455a145df5f793f392a5910c084adb9688ef))
* **translations:** sync translations from transifex (dev) ([f1a14b8](https://github.com/dhis2/data-visualizer-app/commit/f1a14b82b75320d4e28af55eb1a11d483d07317b))

## [100.5.3](https://github.com/dhis2/data-visualizer-app/compare/v100.5.2...v100.5.3) (2024-04-25)


### Bug Fixes

* plugin flashes when interacting with Interpretations modal ([#3017](https://github.com/dhis2/data-visualizer-app/issues/3017)) ([827ef37](https://github.com/dhis2/data-visualizer-app/commit/827ef3712a5a83687451a5545bae475d02ce601a))
* **translations:** sync translations from transifex (dev) ([43f89be](https://github.com/dhis2/data-visualizer-app/commit/43f89bebd0786f088859766a391e98e9492696db))

## [100.5.2](https://github.com/dhis2/data-visualizer-app/compare/v100.5.1...v100.5.2) (2024-03-21)


### Bug Fixes

* add classnames and update json instructions file for outlier tables ([#3000](https://github.com/dhis2/data-visualizer-app/issues/3000)) ([bd95afe](https://github.com/dhis2/data-visualizer-app/commit/bd95afe3ce5ccc1d1e400d4a2531bfb8a9910ee2))

## [100.5.1](https://github.com/dhis2/data-visualizer-app/compare/v100.5.0...v100.5.1) (2024-03-21)


### Bug Fixes

* fix period filter and loading spinner when filtering in dashboard ([#3002](https://github.com/dhis2/data-visualizer-app/issues/3002)) ([8a54037](https://github.com/dhis2/data-visualizer-app/commit/8a5403754353d8531decc5cdf73129d38219e322))

# [100.5.0](https://github.com/dhis2/data-visualizer-app/compare/v100.4.0...v100.5.0) (2024-03-19)


### Bug Fixes

* **translations:** sync translations from transifex (dev) ([dbb683f](https://github.com/dhis2/data-visualizer-app/commit/dbb683fc66525a20d1831cfa5c0c70ff8e702bd5))
* fetch displayTitle and displaySubtitle for translations DHIS2-16216 ([#2929](https://github.com/dhis2/data-visualizer-app/issues/2929)) ([d6f327a](https://github.com/dhis2/data-visualizer-app/commit/d6f327ab0238e06527e2f07f78817b31c6522496))
* **push-analytics:** add push analytics instructions ([#2985](https://github.com/dhis2/data-visualizer-app/issues/2985)) ([77c5bcd](https://github.com/dhis2/data-visualizer-app/commit/77c5bcd3dcd4daed14e66a7dc7c20175ae4b86a0))
* **translations:** sync translations from transifex (dev) ([476e8a8](https://github.com/dhis2/data-visualizer-app/commit/476e8a8e0190731e81a32c00d7c620bc7c196b4e))
* **translations:** sync translations from transifex (dev) ([459c53c](https://github.com/dhis2/data-visualizer-app/commit/459c53c1b1d655596a7ccdaac99731b433ce5307))
* **translations:** sync translations from transifex (dev) ([2966187](https://github.com/dhis2/data-visualizer-app/commit/2966187e5fa05208836b6d7bb42529e14ede0440))
* add custom errors for analytics requests ([#2874](https://github.com/dhis2/data-visualizer-app/issues/2874)) ([cc3fcd1](https://github.com/dhis2/data-visualizer-app/commit/cc3fcd1cc61c6b08f84cb8954cbde3955499aa6a))


### Features

* add class-names for push-analytics ([#2966](https://github.com/dhis2/data-visualizer-app/issues/2966)) ([5872a5a](https://github.com/dhis2/data-visualizer-app/commit/5872a5a20e6c04642d2e3e6ea88210999a805235))
* support Outlier table visualization type (DHIS2-13858) ([#2942](https://github.com/dhis2/data-visualizer-app/issues/2942)) ([e9c31a7](https://github.com/dhis2/data-visualizer-app/commit/e9c31a7f2459c976f7d63860dd63cc97e3c8f09c))

# [100.4.0](https://github.com/dhis2/data-visualizer-app/compare/v100.3.1...v100.4.0) (2023-12-14)


### Bug Fixes

* **translations:** sync translations from transifex (dev) ([65441f2](https://github.com/dhis2/data-visualizer-app/commit/65441f2b454a6e0f74567b8b7107cad63d594a04))
* **translations:** sync translations from transifex (dev) ([005be59](https://github.com/dhis2/data-visualizer-app/commit/005be599f7dd4382f0086861d74064aedc49ac29))


### Features

* cumulative values in PT (DHIS2-5497) ([#2746](https://github.com/dhis2/data-visualizer-app/issues/2746)) ([bff69ab](https://github.com/dhis2/data-visualizer-app/commit/bff69ab9cec7685adad823197de8508e9ae83636)), closes [#1946](https://github.com/dhis2/data-visualizer-app/issues/1946)

## [100.3.1](https://github.com/dhis2/data-visualizer-app/compare/v100.3.0...v100.3.1) (2023-11-08)


### Bug Fixes

* color set update (DHIS2-16108) ([#2906](https://github.com/dhis2/data-visualizer-app/issues/2906)) ([276e741](https://github.com/dhis2/data-visualizer-app/commit/276e741aa3dbc40298155d4e93530a3e8495aaaf))
* legend sets fail to load in table with data dimension in the row (DHIS2-12830) ([#2753](https://github.com/dhis2/data-visualizer-app/issues/2753)) ([8666fbb](https://github.com/dhis2/data-visualizer-app/commit/8666fbb0cfed72a966db49cf7263f608b763795a))

# [100.3.0](https://github.com/dhis2/data-visualizer-app/compare/v100.2.0...v100.3.0) (2023-10-20)


### Bug Fixes

* allow closing the interpretations modal when accessed via URL (DHIS2-15721) ([#2748](https://github.com/dhis2/data-visualizer-app/issues/2748)) ([f1c9e18](https://github.com/dhis2/data-visualizer-app/commit/f1c9e1874ab85acc100528d03e753d727a5dd95d))
* change legend type description to fit SV (DHIS2-15120) ([#2757](https://github.com/dhis2/data-visualizer-app/issues/2757)) ([3828e46](https://github.com/dhis2/data-visualizer-app/commit/3828e46f968f6e623201b45e593599b153f016ff))
* disable Save when vis not in unsaved/dirty state DHIS2-15373 ([#2758](https://github.com/dhis2/data-visualizer-app/issues/2758)) ([db83177](https://github.com/dhis2/data-visualizer-app/commit/db831776d1498ced595fb8d7c2f1351ab74731f3))
* limit max value shifts to min value fields in PT (DHIS2-10235) ([#2756](https://github.com/dhis2/data-visualizer-app/issues/2756)) ([d4d634e](https://github.com/dhis2/data-visualizer-app/commit/d4d634ebedd7c714cb2beedaf9c25bbf6e3c901e))
* translate dimension labels in PT DHIS2-15750 ([#2783](https://github.com/dhis2/data-visualizer-app/issues/2783)) ([3b09b0c](https://github.com/dhis2/data-visualizer-app/commit/3b09b0c23b4c421a7bf9594e2813d1710488e1c5))
* visualization deleted when saving it after copy DHIS2-15722 ([#2778](https://github.com/dhis2/data-visualizer-app/issues/2778)) ([d9c1ed5](https://github.com/dhis2/data-visualizer-app/commit/d9c1ed53ce39556439e2dde5b7cdc16ef116421c))
* **translations:** sync translations from transifex (dev) ([841882f](https://github.com/dhis2/data-visualizer-app/commit/841882f471fc99492a5267b6c8dc1b4a8fe40f57))
* **translations:** sync translations from transifex (dev) ([7f611d5](https://github.com/dhis2/data-visualizer-app/commit/7f611d5c79d47fa5953f1e1d3e4877edc7d8397a))
* **translations:** sync translations from transifex (dev) ([9d475f6](https://github.com/dhis2/data-visualizer-app/commit/9d475f6eb95cebf927dd4601de95884e379855fa))


### Features

* **deps:** bump analytics to latest to benefit from fixes and features ([#2886](https://github.com/dhis2/data-visualizer-app/issues/2886)) ([f56fd15](https://github.com/dhis2/data-visualizer-app/commit/f56fd153ef9f539e7865e0f4a2c18d9e88888a6a))

# [100.2.0](https://github.com/dhis2/data-visualizer-app/compare/v100.1.4...v100.2.0) (2023-08-15)


### Features

* 100.2.0 ([#2741](https://github.com/dhis2/data-visualizer-app/issues/2741)) ([00b3636](https://github.com/dhis2/data-visualizer-app/commit/00b3636be221a50e0a77f688a51dcb48f4fd9e39)), closes [#2386](https://github.com/dhis2/data-visualizer-app/issues/2386) [#2372](https://github.com/dhis2/data-visualizer-app/issues/2372) [#2287](https://github.com/dhis2/data-visualizer-app/issues/2287) [#2435](https://github.com/dhis2/data-visualizer-app/issues/2435) [#2500](https://github.com/dhis2/data-visualizer-app/issues/2500) [#2499](https://github.com/dhis2/data-visualizer-app/issues/2499) [#2322](https://github.com/dhis2/data-visualizer-app/issues/2322)

## [100.1.4](https://github.com/dhis2/data-visualizer-app/compare/v100.1.3...v100.1.4) (2023-06-13)


### Bug Fixes

* **translations:** sync translations from transifex (dev) ([388259c](https://github.com/dhis2/data-visualizer-app/commit/388259cc26f5509bda59b0e81e9f3b2bcffdef60))

## [100.1.3](https://github.com/dhis2/data-visualizer-app/compare/v100.1.2...v100.1.3) (2023-05-31)


### Bug Fixes

* single value size and position issues (analytics@25.1.10) ([#2359](https://github.com/dhis2/data-visualizer-app/issues/2359)) ([5db256b](https://github.com/dhis2/data-visualizer-app/commit/5db256b092216c960278656c6127fdee3ea83d16))
* **deps:** platform deps for login redirect [DHIS2-15319] ([#2300](https://github.com/dhis2/data-visualizer-app/issues/2300)) ([6158202](https://github.com/dhis2/data-visualizer-app/commit/6158202cf31ee23d87c98227116be44c4fce2acd))
* bump cli-app-scripts to 10.3.8 for LIBS-499 fix ([#2285](https://github.com/dhis2/data-visualizer-app/issues/2285)) ([414051d](https://github.com/dhis2/data-visualizer-app/commit/414051d7b02a9480ed59040a3afd3f24ed9390f6))
* case E7113 throws same msg as E7114 ([#2278](https://github.com/dhis2/data-visualizer-app/issues/2278)) ([bcdfbb2](https://github.com/dhis2/data-visualizer-app/commit/bcdfbb2fa9025ca8c6e634705f9f8ee6f1e475ac))

## [100.1.2](https://github.com/dhis2/data-visualizer-app/compare/v100.1.1...v100.1.2) (2023-05-31)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([c38c223](https://github.com/dhis2/data-visualizer-app/commit/c38c2232cf66634eb20b4f6e7147d40a153b4758))

## [100.1.1](https://github.com/dhis2/data-visualizer-app/compare/v100.1.0...v100.1.1) (2023-05-27)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([de7b652](https://github.com/dhis2/data-visualizer-app/commit/de7b65222b4d389d2f707077d7f9da6d157b7b65))
* **translations:** sync translations from transifex (master) ([bc6ef52](https://github.com/dhis2/data-visualizer-app/commit/bc6ef52c6459d748bc2f558b5b1fb0a358b8f8a2))

# [100.1.0](https://github.com/dhis2/data-visualizer-app/compare/v100.0.3...v100.1.0) (2023-05-05)


### Features

* 100.1.0 ([#2286](https://github.com/dhis2/data-visualizer-app/issues/2286)) ([334b13d](https://github.com/dhis2/data-visualizer-app/commit/334b13de5ba2413295404cacd155b7467a91b548)), closes [#1946](https://github.com/dhis2/data-visualizer-app/issues/1946)

## [100.0.3](https://github.com/dhis2/data-visualizer-app/compare/v100.0.2...v100.0.3) (2023-05-03)


### Bug Fixes

* plugin sends installation status ([#2277](https://github.com/dhis2/data-visualizer-app/issues/2277)) ([de989c3](https://github.com/dhis2/data-visualizer-app/commit/de989c317dcf8fa1fad2d4240f3d0381f3273b5b))

## [100.0.2](https://github.com/dhis2/data-visualizer-app/compare/v100.0.1...v100.0.2) (2023-03-27)


### Bug Fixes

* remove translucent layer by using app-scripts 10.3.4 (DHIS2-15008) ([#2251](https://github.com/dhis2/data-visualizer-app/issues/2251)) ([9d62ca7](https://github.com/dhis2/data-visualizer-app/commit/9d62ca7f4946a9ec3c9db7a17cfea0f9055daeb7))

## [100.0.1](https://github.com/dhis2/data-visualizer-app/compare/v100.0.0...v100.0.1) (2023-03-23)


### Bug Fixes

* set height on chart container when not defined ([#2246](https://github.com/dhis2/data-visualizer-app/issues/2246)) ([#2250](https://github.com/dhis2/data-visualizer-app/issues/2250)) ([a922569](https://github.com/dhis2/data-visualizer-app/commit/a922569cb9ca8683e602bd070c1e45cd67c87049))

# [100.0.0](https://github.com/dhis2/data-visualizer-app/compare/v99.0.0...v100.0.0) (2023-02-27)


### chore

* prepare app for continuous delivery ([8db6c88](https://github.com/dhis2/data-visualizer-app/commit/8db6c88908fde153adc646cd1f13f25a55edf299))


### BREAKING CHANGES

* v100.0.0

## [39.2.15](https://github.com/dhis2/data-visualizer-app/compare/v39.2.14...v39.2.15) (2022-10-27)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([244568b](https://github.com/dhis2/data-visualizer-app/commit/244568bd5ab2ae6f942e260a020e6ac1e79b36c8))

## [39.2.14](https://github.com/dhis2/data-visualizer-app/compare/v39.2.13...v39.2.14) (2022-10-26)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([082ea80](https://github.com/dhis2/data-visualizer-app/commit/082ea808e2489bef14366b0a93cd1c3f09c0a5a4))

## [39.2.13](https://github.com/dhis2/data-visualizer-app/compare/v39.2.12...v39.2.13) (2022-10-11)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([b44c8c1](https://github.com/dhis2/data-visualizer-app/commit/b44c8c1842e4dd2d1656fb318d81b6856e8771ea))

## [39.2.12](https://github.com/dhis2/data-visualizer-app/compare/v39.2.11...v39.2.12) (2022-09-30)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([83809e3](https://github.com/dhis2/data-visualizer-app/commit/83809e3294d61a3d06491dc11d6d58387dc9b4c7))

## [39.2.11](https://github.com/dhis2/data-visualizer-app/compare/v39.2.10...v39.2.11) (2022-09-28)


### Bug Fixes

* pass correct prop for analytics breaking change ([#2151](https://github.com/dhis2/data-visualizer-app/issues/2151)) ([709449e](https://github.com/dhis2/data-visualizer-app/commit/709449e3e53b9bbb6ca40152d94a609342e0cf73))

## [39.2.10](https://github.com/dhis2/data-visualizer-app/compare/v39.2.9...v39.2.10) (2022-09-28)


### Bug Fixes

* do not override height if present in style object DHIS2-13812 ([#2158](https://github.com/dhis2/data-visualizer-app/issues/2158)) ([4b05f07](https://github.com/dhis2/data-visualizer-app/commit/4b05f077759cd1d07f9bb5df44efbe6f862829c9))

## [39.2.9](https://github.com/dhis2/data-visualizer-app/compare/v39.2.8...v39.2.9) (2022-09-12)


### Bug Fixes

* change default value for Save as (DHIS2-13328) [#2152](https://github.com/dhis2/data-visualizer-app/issues/2152) ([5beef61](https://github.com/dhis2/data-visualizer-app/commit/5beef61f94c3e2f3f75c4fd905703dde5c7a228d))

## [39.2.8](https://github.com/dhis2/data-visualizer-app/compare/v39.2.7...v39.2.8) (2022-08-31)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([85b5948](https://github.com/dhis2/data-visualizer-app/commit/85b59482d4e77a0cd12bc0d1143c19077e97a95f))

## [39.2.7](https://github.com/dhis2/data-visualizer-app/compare/v39.2.6...v39.2.7) (2022-08-30)


### Bug Fixes

* missing right margin after @dhis2/ui bump (DHIS2-13168) ([#2149](https://github.com/dhis2/data-visualizer-app/issues/2149)) ([ab84d13](https://github.com/dhis2/data-visualizer-app/commit/ab84d13b1817e6e1abf5ab78589beb689f696632))

## [39.2.6](https://github.com/dhis2/data-visualizer-app/compare/v39.2.5...v39.2.6) (2022-08-26)


### Bug Fixes

* bump internal deps (ui, analytics, cli-app-scripts) ([#2147](https://github.com/dhis2/data-visualizer-app/issues/2147)) ([9791cf8](https://github.com/dhis2/data-visualizer-app/commit/9791cf884d1268ac2aaac062aac3c2874c4607be))

## [39.2.5](https://github.com/dhis2/data-visualizer-app/compare/v39.2.4...v39.2.5) (2022-08-25)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([49c4c60](https://github.com/dhis2/data-visualizer-app/commit/49c4c60ee92eda7353745a8c73f2eaf0d04d2cb8))

## [39.2.4](https://github.com/dhis2/data-visualizer-app/compare/v39.2.3...v39.2.4) (2022-08-22)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([a50fd0a](https://github.com/dhis2/data-visualizer-app/commit/a50fd0acbbc5dc00f04b6d8306135bbd4f973e75))

## [39.2.3](https://github.com/dhis2/data-visualizer-app/compare/v39.2.2...v39.2.3) (2022-08-17)


### Bug Fixes

* await ou levels ([#2130](https://github.com/dhis2/data-visualizer-app/issues/2130)) ([66a267b](https://github.com/dhis2/data-visualizer-app/commit/66a267b83d6210b828268161ada165cbf35cfffe))

## [39.2.2](https://github.com/dhis2/data-visualizer-app/compare/v39.2.1...v39.2.2) (2022-08-08)


### Bug Fixes

* avoid encoding of visualization name in snackbar ([#2128](https://github.com/dhis2/data-visualizer-app/issues/2128)) ([d26faa9](https://github.com/dhis2/data-visualizer-app/commit/d26faa97049133ce67bdadb5278c1adda2d0ffe3))

## [39.2.1](https://github.com/dhis2/data-visualizer-app/compare/v39.2.0...v39.2.1) (2022-08-03)


### Bug Fixes

* bump Analytics to latest + Cypress changes + update history impl (DHIS2-12719) ([#2126](https://github.com/dhis2/data-visualizer-app/issues/2126)) ([d9791c3](https://github.com/dhis2/data-visualizer-app/commit/d9791c3fce15b32e1b9bb3dd3478c207332d0f61))

# [39.2.0](https://github.com/dhis2/data-visualizer-app/compare/v39.1.5...v39.2.0) (2022-07-20)


### Features

* use About and Interpretations components from analytics ([#2103](https://github.com/dhis2/data-visualizer-app/issues/2103)) ([4bbe760](https://github.com/dhis2/data-visualizer-app/commit/4bbe76078f5b2fd6b02aee007beb042cff6238a3))

## [39.1.5](https://github.com/dhis2/data-visualizer-app/compare/v39.1.4...v39.1.5) (2022-06-28)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([9c0887b](https://github.com/dhis2/data-visualizer-app/commit/9c0887b13f5446d72684f3398212f7aa50ec5b09))

## [39.1.4](https://github.com/dhis2/data-visualizer-app/compare/v39.1.3...v39.1.4) (2022-06-23)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([04e5779](https://github.com/dhis2/data-visualizer-app/commit/04e577900a6b5aa05952bdc2083c557ea1223382))

## [39.1.3](https://github.com/dhis2/data-visualizer-app/compare/v39.1.2...v39.1.3) (2022-06-21)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([#2112](https://github.com/dhis2/data-visualizer-app/issues/2112)) ([084d890](https://github.com/dhis2/data-visualizer-app/commit/084d890c90c76d261d02eced73938bf0b6814538))

## [39.1.2](https://github.com/dhis2/data-visualizer-app/compare/v39.1.1...v39.1.2) (2022-06-19)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([74aaebc](https://github.com/dhis2/data-visualizer-app/commit/74aaebcfc4c1ab6e14846176a5c2e180759cd942))

## [39.1.1](https://github.com/dhis2/data-visualizer-app/compare/v39.1.0...v39.1.1) (2022-06-10)


### Bug Fixes

* add border to legend key (DHIS2-75) ([#2096](https://github.com/dhis2/data-visualizer-app/issues/2096)) ([d458e4c](https://github.com/dhis2/data-visualizer-app/commit/d458e4c5660fb6d03af8aba8ee7509a2eb70567e))

# [39.1.0](https://github.com/dhis2/data-visualizer-app/compare/v39.0.12...v39.1.0) (2022-06-01)


### Features

* add basic and extended color sets ([#2075](https://github.com/dhis2/data-visualizer-app/issues/2075)) ([101644e](https://github.com/dhis2/data-visualizer-app/commit/101644e1d93b467a6d721a4cbac05bf1a3233b75))

## [39.0.12](https://github.com/dhis2/data-visualizer-app/compare/v39.0.11...v39.0.12) (2022-05-31)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([dac457d](https://github.com/dhis2/data-visualizer-app/commit/dac457d9d3e2a923813c86501555633243defdf2))

## [39.0.11](https://github.com/dhis2/data-visualizer-app/compare/v39.0.10...v39.0.11) (2022-05-27)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([850a90f](https://github.com/dhis2/data-visualizer-app/commit/850a90f8cc42355d79f4d99503a18a8f061c2be0))

## [39.0.10](https://github.com/dhis2/data-visualizer-app/compare/v39.0.9...v39.0.10) (2022-05-26)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([b20c2fa](https://github.com/dhis2/data-visualizer-app/commit/b20c2fa9d125fb10e1c3114aaa978b6c00fdb157))

## [39.0.9](https://github.com/dhis2/data-visualizer-app/compare/v39.0.8...v39.0.9) (2022-05-24)


### Bug Fixes

* use normal handling when WEEKS_THIS_YEAR is used in YoY DHIS2-12580 ([#2065](https://github.com/dhis2/data-visualizer-app/issues/2065)) ([e19d24a](https://github.com/dhis2/data-visualizer-app/commit/e19d24a30c263e8fcbbf7b8ad3595e8579b41b6a))

## [39.0.8](https://github.com/dhis2/data-visualizer-app/compare/v39.0.7...v39.0.8) (2022-05-24)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([9dc08f4](https://github.com/dhis2/data-visualizer-app/commit/9dc08f4099054f60187da1f9a587bc3180968238))

## [39.0.7](https://github.com/dhis2/data-visualizer-app/compare/v39.0.6...v39.0.7) (2022-05-19)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([eba0001](https://github.com/dhis2/data-visualizer-app/commit/eba0001a2b32c3eda4e3e27377b34c56413c4b76))

## [39.0.6](https://github.com/dhis2/data-visualizer-app/compare/v39.0.5...v39.0.6) (2022-05-12)


### Bug Fixes

* remove min-width from MenuBar buttons TECH-1145 ([#2049](https://github.com/dhis2/data-visualizer-app/issues/2049)) ([dd9b145](https://github.com/dhis2/data-visualizer-app/commit/dd9b145dbc8dedd5d75429668f7c286ac60ae6dc))

## [39.0.5](https://github.com/dhis2/data-visualizer-app/compare/v39.0.4...v39.0.5) (2022-04-26)


### Bug Fixes

* bump d2-ui-interpretation dependency for DHIS2-12617 ([#2046](https://github.com/dhis2/data-visualizer-app/issues/2046)) ([b466fe6](https://github.com/dhis2/data-visualizer-app/commit/b466fe62b49ed6dcee482515be8ce8052435cc97))

## [39.0.4](https://github.com/dhis2/data-visualizer-app/compare/v39.0.3...v39.0.4) (2022-04-22)


### Bug Fixes

* correct typo with display name property ([#2043](https://github.com/dhis2/data-visualizer-app/issues/2043)) ([ac3d36c](https://github.com/dhis2/data-visualizer-app/commit/ac3d36c2b0a6433bf054d34570040ea0a3121bb8))

## [39.0.3](https://github.com/dhis2/data-visualizer-app/compare/v39.0.2...v39.0.3) (2022-04-22)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([73a513f](https://github.com/dhis2/data-visualizer-app/commit/73a513f5ddef42f8c70a78b56f295c409ad60f5c))

## [39.0.2](https://github.com/dhis2/data-visualizer-app/compare/v39.0.1...v39.0.2) (2022-04-07)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([93b551f](https://github.com/dhis2/data-visualizer-app/commit/93b551fa19f5dd18dcc9607bb6758400c8f19c1d))

## [39.0.1](https://github.com/dhis2/data-visualizer-app/compare/v39.0.0...v39.0.1) (2022-04-06)


### Bug Fixes

* address analytics breaking changes ([#2026](https://github.com/dhis2/data-visualizer-app/issues/2026)) ([9c5e393](https://github.com/dhis2/data-visualizer-app/commit/9c5e3935b7c7b82b462baaa6bade378d573a1f31))

# [39.0.0](https://github.com/dhis2/data-visualizer-app/compare/v38.2.5...v39.0.0) (2022-04-05)


### Features

* bump to 39.0.0 ([e310390](https://github.com/dhis2/data-visualizer-app/commit/e310390c29758d12c0a563ce080d930268deef4f))


### BREAKING CHANGES

* 39.0.0

## [38.2.5](https://github.com/dhis2/data-visualizer-app/compare/v38.2.4...v38.2.5) (2022-04-04)


### Bug Fixes

* use translated name in title DHIS2-13015 ([#2017](https://github.com/dhis2/data-visualizer-app/issues/2017)) ([757444a](https://github.com/dhis2/data-visualizer-app/commit/757444aeb1b462e4fac8611b19965040598d701f))

## [38.2.4](https://github.com/dhis2/data-visualizer-app/compare/v38.2.3...v38.2.4) (2022-03-25)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([14e95f1](https://github.com/dhis2/data-visualizer-app/commit/14e95f18bda08be774074af70ac1955a1f25ad02))

## [38.2.3](https://github.com/dhis2/data-visualizer-app/compare/v38.2.2...v38.2.3) (2022-03-23)


### Bug Fixes

* adapt error message to specific dimension (DHIS2-12915) ([#2009](https://github.com/dhis2/data-visualizer-app/issues/2009)) ([a674a4c](https://github.com/dhis2/data-visualizer-app/commit/a674a4c410e2792fcf44d9510c45087957522554))

## [38.2.2](https://github.com/dhis2/data-visualizer-app/compare/v38.2.1...v38.2.2) (2022-03-15)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([#2008](https://github.com/dhis2/data-visualizer-app/issues/2008)) ([89265b0](https://github.com/dhis2/data-visualizer-app/commit/89265b0419eda73b5199434633f0542446328489))

## [38.2.1](https://github.com/dhis2/data-visualizer-app/compare/v38.2.0...v38.2.1) (2022-02-15)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([5357c20](https://github.com/dhis2/data-visualizer-app/commit/5357c205158dc48b0b9d7a4c243a48ccd3d84c26))

# [38.2.0](https://github.com/dhis2/data-visualizer-app/compare/v38.1.9...v38.2.0) (2022-01-20)


### Bug Fixes

* remove unused prop type ([b82e7a0](https://github.com/dhis2/data-visualizer-app/commit/b82e7a0032871becec7f8adf6bd11a9f0fa0a33b))


### Features

* add hover style to chip menu button ([b9cf758](https://github.com/dhis2/data-visualizer-app/commit/b9cf7583d037b1e28a042c6f77e65d5914465170))

## [38.1.9](https://github.com/dhis2/data-visualizer-app/compare/v38.1.8...v38.1.9) (2021-12-28)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([23f890e](https://github.com/dhis2/data-visualizer-app/commit/23f890e1a6bafe61a0d722277ff1c958dadc160c))

## [38.1.8](https://github.com/dhis2/data-visualizer-app/compare/v38.1.7...v38.1.8) (2021-12-24)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([e623e6d](https://github.com/dhis2/data-visualizer-app/commit/e623e6d03523d454c8c28d936316e2c05dd2b437))

## [38.1.7](https://github.com/dhis2/data-visualizer-app/compare/v38.1.6...v38.1.7) (2021-12-23)


### Bug Fixes

* PT fixed headers help text ([#1918](https://github.com/dhis2/data-visualizer-app/issues/1918)) ([276104f](https://github.com/dhis2/data-visualizer-app/commit/276104f06286248de501058ff313508e1e07bcf4))

## [38.1.6](https://github.com/dhis2/data-visualizer-app/compare/v38.1.5...v38.1.6) (2021-12-22)


### Bug Fixes

* make sure the legend set name is fetched DHIS2-12264 ([#1976](https://github.com/dhis2/data-visualizer-app/issues/1976)) ([4cef7ab](https://github.com/dhis2/data-visualizer-app/commit/4cef7ab7349cc67890b44369fb5ab645575dd965))

## [38.1.5](https://github.com/dhis2/data-visualizer-app/compare/v38.1.4...v38.1.5) (2021-12-22)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([d1cd1bd](https://github.com/dhis2/data-visualizer-app/commit/d1cd1bd3ba863418955360163d11472ed2c25c8c))

## [38.1.4](https://github.com/dhis2/data-visualizer-app/compare/v38.1.3...v38.1.4) (2021-12-03)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([0c55b44](https://github.com/dhis2/data-visualizer-app/commit/0c55b44d1a97de152f5f09caf9e7107c31fb10ff))

## [38.1.3](https://github.com/dhis2/data-visualizer-app/compare/v38.1.2...v38.1.3) (2021-11-26)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([3b6b8b2](https://github.com/dhis2/data-visualizer-app/commit/3b6b8b2d0e10b38643c0a6f67bd199f5f3a51790))

## [38.1.2](https://github.com/dhis2/data-visualizer-app/compare/v38.1.1...v38.1.2) (2021-11-25)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([1e8477d](https://github.com/dhis2/data-visualizer-app/commit/1e8477d17770d965bb5183fef57d6add432b8824))

## [38.1.1](https://github.com/dhis2/data-visualizer-app/compare/v38.1.0...v38.1.1) (2021-11-18)


### Bug Fixes

* UI tweaks ([#1949](https://github.com/dhis2/data-visualizer-app/issues/1949)) ([d6a7dad](https://github.com/dhis2/data-visualizer-app/commit/d6a7dade2eb3cb5e58cb0c07616b40af6446ed7d))

# [38.1.0](https://github.com/dhis2/data-visualizer-app/compare/v38.0.19...v38.1.0) (2021-11-17)


### Features

* new org unit dimension (TECH-707) ([#1939](https://github.com/dhis2/data-visualizer-app/issues/1939)) ([08486c0](https://github.com/dhis2/data-visualizer-app/commit/08486c0583b22a5eb8df021a58753d23387fc058))

## [38.0.19](https://github.com/dhis2/data-visualizer-app/compare/v38.0.18...v38.0.19) (2021-10-05)


### Bug Fixes

* use VisualizationOptions from Analytics ([#1907](https://github.com/dhis2/data-visualizer-app/issues/1907)) ([6446e2c](https://github.com/dhis2/data-visualizer-app/commit/6446e2cd4eb25432cff294eea3c176f297404897))

## [38.0.18](https://github.com/dhis2/data-visualizer-app/compare/v38.0.17...v38.0.18) (2021-10-01)


### Bug Fixes

* return a flat list of dimension items with multiple dimension on axis ([#1914](https://github.com/dhis2/data-visualizer-app/issues/1914)) ([48ebb23](https://github.com/dhis2/data-visualizer-app/commit/48ebb2323ded5250f37ffcaae26ce18fead27757))

## [38.0.17](https://github.com/dhis2/data-visualizer-app/compare/v38.0.16...v38.0.17) (2021-09-24)


### Bug Fixes

* scatter dx chip position ([#1901](https://github.com/dhis2/data-visualizer-app/issues/1901)) ([ba643fc](https://github.com/dhis2/data-visualizer-app/commit/ba643fc2e66aeeb3e5c14407eb2899de92326409))

## [38.0.16](https://github.com/dhis2/data-visualizer-app/compare/v38.0.15...v38.0.16) (2021-09-23)


### Bug Fixes

* update analytics with fix for PT fixed row headers ([#1898](https://github.com/dhis2/data-visualizer-app/issues/1898)) ([bcb99a3](https://github.com/dhis2/data-visualizer-app/commit/bcb99a3f9a4dbdf802430c260fb10916a5b1bdf9))

## [38.0.15](https://github.com/dhis2/data-visualizer-app/compare/v38.0.14...v38.0.15) (2021-09-21)


### Bug Fixes

* fix color for No data text in SV DHIS2-11810 ([#1896](https://github.com/dhis2/data-visualizer-app/issues/1896)) ([297da6d](https://github.com/dhis2/data-visualizer-app/commit/297da6d9bdb73eefc29cc277763b5debeb7bb486))

## [38.0.14](https://github.com/dhis2/data-visualizer-app/compare/v38.0.13...v38.0.14) (2021-09-20)


### Bug Fixes

* update analytics with SV no data fix ([#1892](https://github.com/dhis2/data-visualizer-app/issues/1892)) ([d320cff](https://github.com/dhis2/data-visualizer-app/commit/d320cffcd459f2e26edfb436079c6673f0cd6f1e))

## [38.0.13](https://github.com/dhis2/data-visualizer-app/compare/v38.0.12...v38.0.13) (2021-09-15)


### Bug Fixes

* @dhis2/analytics@20.4.7 ([#1884](https://github.com/dhis2/data-visualizer-app/issues/1884)) ([fbde19f](https://github.com/dhis2/data-visualizer-app/commit/fbde19f773b87fde13a01ad4ab73da8009e6909a))

## [38.0.12](https://github.com/dhis2/data-visualizer-app/compare/v38.0.11...v38.0.12) (2021-09-15)


### Bug Fixes

* bump analytics to latest ([#1880](https://github.com/dhis2/data-visualizer-app/issues/1880)) ([8c120be](https://github.com/dhis2/data-visualizer-app/commit/8c120be90e8f9f7fc41765c4e26c6600f55a3a3e))

## [38.0.11](https://github.com/dhis2/data-visualizer-app/compare/v38.0.10...v38.0.11) (2021-09-10)


### Bug Fixes

* prevent error from undefined series, downgrade app-runtime ([#1876](https://github.com/dhis2/data-visualizer-app/issues/1876)) ([d822607](https://github.com/dhis2/data-visualizer-app/commit/d82260743f4c3a55ea82343e22b1dbeff25f1e6a))

## [38.0.10](https://github.com/dhis2/data-visualizer-app/compare/v38.0.9...v38.0.10) (2021-09-08)


### Bug Fixes

* bump @dhis2/cli-app-scripts and @dhis2/app-runtime ([#1873](https://github.com/dhis2/data-visualizer-app/issues/1873)) ([ba731c6](https://github.com/dhis2/data-visualizer-app/commit/ba731c64edf0757168afeaef52c01749c7e2d404))

## [38.0.9](https://github.com/dhis2/data-visualizer-app/compare/v38.0.8...v38.0.9) (2021-09-08)


### Bug Fixes

* bump @dhis2/ui to latest ([#1868](https://github.com/dhis2/data-visualizer-app/issues/1868)) ([98355ec](https://github.com/dhis2/data-visualizer-app/commit/98355ec943cb5d41938910d2613d67f3d2b1720c))

## [38.0.8](https://github.com/dhis2/data-visualizer-app/compare/v38.0.7...v38.0.8) (2021-09-07)


### Bug Fixes

* fetch PT fix headers options ([#1871](https://github.com/dhis2/data-visualizer-app/issues/1871)) ([265aa7d](https://github.com/dhis2/data-visualizer-app/commit/265aa7d3ab86b1b1593b1fe70db993cd33d8ccd9))

## [38.0.7](https://github.com/dhis2/data-visualizer-app/compare/v38.0.6...v38.0.7) (2021-09-07)


### Bug Fixes

* bump analytics to latest ([#1870](https://github.com/dhis2/data-visualizer-app/issues/1870)) ([25dc572](https://github.com/dhis2/data-visualizer-app/commit/25dc57262061e68305a5cf5b585129713a87c42b))

## [38.0.6](https://github.com/dhis2/data-visualizer-app/compare/v38.0.5...v38.0.6) (2021-09-05)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([58f2d19](https://github.com/dhis2/data-visualizer-app/commit/58f2d19d22e42d5a92fb7ea52e17071b4b49c497))

## [38.0.5](https://github.com/dhis2/data-visualizer-app/compare/v38.0.4...v38.0.5) (2021-09-04)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([18a2957](https://github.com/dhis2/data-visualizer-app/commit/18a29571ffe2398bebba602b3a9f50fb23439955))

## [38.0.4](https://github.com/dhis2/data-visualizer-app/compare/v38.0.3...v38.0.4) (2021-09-03)


### Bug Fixes

* use layer component for backdrop and remove level overrides ([#1859](https://github.com/dhis2/data-visualizer-app/issues/1859)) ([927ab69](https://github.com/dhis2/data-visualizer-app/commit/927ab690302cbbaaadc222e6d5a66319adf2cf07))

## [38.0.3](https://github.com/dhis2/data-visualizer-app/compare/v38.0.2...v38.0.3) (2021-09-02)


### Bug Fixes

* fix issue with ui Modals and z-index on other elements ([#1857](https://github.com/dhis2/data-visualizer-app/issues/1857)) ([83285a2](https://github.com/dhis2/data-visualizer-app/commit/83285a2ae2f25937b2ebbe674a095aab98cd8344))

## [38.0.2](https://github.com/dhis2/data-visualizer-app/compare/v38.0.1...v38.0.2) (2021-09-02)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([592615c](https://github.com/dhis2/data-visualizer-app/commit/592615c94d4ae7de7875dc5413b8bc89c8322bd7))

## [38.0.1](https://github.com/dhis2/data-visualizer-app/compare/v38.0.0...v38.0.1) (2021-09-01)


### Bug Fixes

* bump @dhis2/analytics, @dhis2/ui, @dhis2/app-runtime to latest ([#1853](https://github.com/dhis2/data-visualizer-app/issues/1853)) ([51ea385](https://github.com/dhis2/data-visualizer-app/commit/51ea3853f2f8dc30839d251c4b769da6a808ec85))

# [38.0.0](https://github.com/dhis2/data-visualizer-app/compare/v37.9.0...v38.0.0) (2021-09-01)


### Features

* bump to 38.0.0 ([#1854](https://github.com/dhis2/data-visualizer-app/issues/1854)) ([92f43a8](https://github.com/dhis2/data-visualizer-app/commit/92f43a89cca2db406c3dee5cae8d6ad13d8c6deb))


### BREAKING CHANGES

* 38.0.0

# [37.9.0](https://github.com/dhis2/data-visualizer-app/compare/v37.8.4...v37.9.0) (2021-08-31)


### Features

* PT fixed headers (DHIS2-11057) ([#1797](https://github.com/dhis2/data-visualizer-app/issues/1797)) ([8fa77a3](https://github.com/dhis2/data-visualizer-app/commit/8fa77a32dc7d5261b600f8011ebb5cb7e9c13cb6))

## [37.8.4](https://github.com/dhis2/data-visualizer-app/compare/v37.8.3...v37.8.4) (2021-08-31)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([22040e9](https://github.com/dhis2/data-visualizer-app/commit/22040e97e02dc29005f2c284b280d87d6a3b3c0e))

## [37.8.3](https://github.com/dhis2/data-visualizer-app/compare/v37.8.2...v37.8.3) (2021-08-30)


### Bug Fixes

* only store auto and custom title options ([#1844](https://github.com/dhis2/data-visualizer-app/issues/1844)) ([af9874e](https://github.com/dhis2/data-visualizer-app/commit/af9874e79dd2ce4083d71b74300c6052baad2b58))

## [37.8.2](https://github.com/dhis2/data-visualizer-app/compare/v37.8.1...v37.8.2) (2021-08-27)


### Bug Fixes

* drill-down menu render side (DHIS2-11061) ([#1835](https://github.com/dhis2/data-visualizer-app/issues/1835)) ([3276d77](https://github.com/dhis2/data-visualizer-app/commit/3276d7713873e64781cd3e5157ba186523323d77))

## [37.8.1](https://github.com/dhis2/data-visualizer-app/compare/v37.8.0...v37.8.1) (2021-08-25)


### Bug Fixes

* plugin print style for legend key toggle ([#1840](https://github.com/dhis2/data-visualizer-app/issues/1840)) ([345d592](https://github.com/dhis2/data-visualizer-app/commit/345d5925d93e186656705f1ae285c256dfb7a44b))

# [37.8.0](https://github.com/dhis2/data-visualizer-app/compare/v37.7.2...v37.8.0) (2021-08-23)


### Features

* show indicator type in SV [#1830](https://github.com/dhis2/data-visualizer-app/issues/1830) ([bd1c132](https://github.com/dhis2/data-visualizer-app/commit/bd1c13272929e8c715fedbf15feb13bfb0300e61))

## [37.7.2](https://github.com/dhis2/data-visualizer-app/compare/v37.7.1...v37.7.2) (2021-08-20)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([eabc89c](https://github.com/dhis2/data-visualizer-app/commit/eabc89ca9cc08fcc6b89fd8be0ee365d4cacbb1e))

## [37.7.1](https://github.com/dhis2/data-visualizer-app/compare/v37.7.0...v37.7.1) (2021-08-17)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([1776b7e](https://github.com/dhis2/data-visualizer-app/commit/1776b7e3e8b3446428610a13156718bf11057553))

# [37.7.0](https://github.com/dhis2/data-visualizer-app/compare/v37.6.8...v37.7.0) (2021-08-16)


### Features

* all items option for dynamic dimension (DHIS2-9734) ([#1828](https://github.com/dhis2/data-visualizer-app/issues/1828)) ([b302276](https://github.com/dhis2/data-visualizer-app/commit/b3022761b6d6c46cde7605b71a2dfeb201c081bc))

## [37.6.8](https://github.com/dhis2/data-visualizer-app/compare/v37.6.7...v37.6.8) (2021-08-13)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([e9ceedb](https://github.com/dhis2/data-visualizer-app/commit/e9ceedb0c4bba4e0470cd4246d684269ec0bfc16))

## [37.6.7](https://github.com/dhis2/data-visualizer-app/compare/v37.6.6...v37.6.7) (2021-08-10)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([7b6a601](https://github.com/dhis2/data-visualizer-app/commit/7b6a60151099a02c1c938754081f29d433c596c4))

## [37.6.6](https://github.com/dhis2/data-visualizer-app/compare/v37.6.5...v37.6.6) (2021-08-09)


### Bug Fixes

* prevent outline clipping ([#1813](https://github.com/dhis2/data-visualizer-app/issues/1813)) ([d5bfc40](https://github.com/dhis2/data-visualizer-app/commit/d5bfc40f3be3ae7f38c4bb283486a3eb9097d348))

## [37.6.5](https://github.com/dhis2/data-visualizer-app/compare/v37.6.4...v37.6.5) (2021-07-14)


### Bug Fixes

* minor axis options changes (DHIS2-6672) ([#1803](https://github.com/dhis2/data-visualizer-app/issues/1803)) ([59504e1](https://github.com/dhis2/data-visualizer-app/commit/59504e127e93890127ad6035604bd405dd31b0b9))

## [37.6.4](https://github.com/dhis2/data-visualizer-app/compare/v37.6.3...v37.6.4) (2021-07-13)


### Bug Fixes

* legend key bugs (DHIS2-11239) ([#1801](https://github.com/dhis2/data-visualizer-app/issues/1801)) ([27aa8ab](https://github.com/dhis2/data-visualizer-app/commit/27aa8ab915b0f2b16cc7011091908c4f230d6a0a))

## [37.6.3](https://github.com/dhis2/data-visualizer-app/compare/v37.6.2...v37.6.3) (2021-07-13)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([60e7635](https://github.com/dhis2/data-visualizer-app/commit/60e76350baa072be46f72a8ccdaf0a732736bb09))

## [37.6.2](https://github.com/dhis2/data-visualizer-app/compare/v37.6.1...v37.6.2) (2021-07-08)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([#1782](https://github.com/dhis2/data-visualizer-app/issues/1782)) ([4003687](https://github.com/dhis2/data-visualizer-app/commit/40036872b6d4f405e0b68660e9dcf2477012e80f))
* cypress test user has different permissions and access ([#1793](https://github.com/dhis2/data-visualizer-app/issues/1793)) ([e02591b](https://github.com/dhis2/data-visualizer-app/commit/e02591b5ec87a2fccbed32c379a1c7b28eac0cab))

## [37.6.1](https://github.com/dhis2/data-visualizer-app/compare/v37.6.0...v37.6.1) (2021-07-06)


### Bug Fixes

* legend options bleed (DHIS2-11239) ([#1785](https://github.com/dhis2/data-visualizer-app/issues/1785)) ([041cd20](https://github.com/dhis2/data-visualizer-app/commit/041cd209a24b9e8acc640f7b37ec822768c08f61))

# [37.6.0](https://github.com/dhis2/data-visualizer-app/compare/v37.5.5...v37.6.0) (2021-07-05)


### Features

* legend key (DHIS2-11239) ([#1756](https://github.com/dhis2/data-visualizer-app/issues/1756)) ([2f1f0b2](https://github.com/dhis2/data-visualizer-app/commit/2f1f0b2713988d1b36032e2d54ca41eaeb23c208)), closes [analytics#951](https://github.com/analytics/issues/951)

## [37.5.5](https://github.com/dhis2/data-visualizer-app/compare/v37.5.4...v37.5.5) (2021-07-01)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([#1778](https://github.com/dhis2/data-visualizer-app/issues/1778)) ([a1a8433](https://github.com/dhis2/data-visualizer-app/commit/a1a84331b96196e1f098218668c94fda52354d90))

## [37.5.4](https://github.com/dhis2/data-visualizer-app/compare/v37.5.3...v37.5.4) (2021-06-25)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([1d165a3](https://github.com/dhis2/data-visualizer-app/commit/1d165a31f5da8d2daad1dcb65ccc520cdc2f8f8b))

## [37.5.3](https://github.com/dhis2/data-visualizer-app/compare/v37.5.2...v37.5.3) (2021-06-25)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([089bfa9](https://github.com/dhis2/data-visualizer-app/commit/089bfa90577b2986b6206a6ed23d052437307eb9))

## [37.5.2](https://github.com/dhis2/data-visualizer-app/compare/v37.5.1...v37.5.2) (2021-06-23)


### Bug Fixes

* fix locale format passed to Intl in interpretations ([#1760](https://github.com/dhis2/data-visualizer-app/issues/1760)) ([1a63b8b](https://github.com/dhis2/data-visualizer-app/commit/1a63b8b96e7d131400fcb3cdad548bf9c0bff409))

## [37.5.1](https://github.com/dhis2/data-visualizer-app/compare/v37.5.0...v37.5.1) (2021-06-22)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([c2e1f53](https://github.com/dhis2/data-visualizer-app/commit/c2e1f537ec6cb8e579815a049190f77e0285b1e3))
* **translations:** sync translations from transifex (master) ([d4b7536](https://github.com/dhis2/data-visualizer-app/commit/d4b753676dc35fbe86618a3f9ecad761d10dce65))

# [37.5.0](https://github.com/dhis2/data-visualizer-app/compare/v37.4.5...v37.5.0) (2021-06-14)


### Features

* use OpenFileDialog from analytics ([#1737](https://github.com/dhis2/data-visualizer-app/issues/1737)) ([81a2967](https://github.com/dhis2/data-visualizer-app/commit/81a296703274d2bbd6eb0c2c79e7dc40c587a624))

## [37.4.5](https://github.com/dhis2/data-visualizer-app/compare/v37.4.4...v37.4.5) (2021-06-11)


### Bug Fixes

* drill down bug fix (DHIS2-11061) ([#1744](https://github.com/dhis2/data-visualizer-app/issues/1744)) ([36982f8](https://github.com/dhis2/data-visualizer-app/commit/36982f887e32498c09f38dc336746d06b027b56a))

## [37.4.4](https://github.com/dhis2/data-visualizer-app/compare/v37.4.3...v37.4.4) (2021-06-10)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([1731c16](https://github.com/dhis2/data-visualizer-app/commit/1731c166222967b3b791e9a1494c2fc8afd36e01))

## [37.4.3](https://github.com/dhis2/data-visualizer-app/compare/v37.4.2...v37.4.3) (2021-06-04)


### Bug Fixes

* axis title bugs (DHIS2-10902) ([#1736](https://github.com/dhis2/data-visualizer-app/issues/1736)) ([084da30](https://github.com/dhis2/data-visualizer-app/commit/084da30a75dfb2d7a80262679ccd72676842d63f))

## [37.4.2](https://github.com/dhis2/data-visualizer-app/compare/v37.4.1...v37.4.2) (2021-06-04)


### Bug Fixes

* drill down bugs (DHIS2-11061) ([#1735](https://github.com/dhis2/data-visualizer-app/issues/1735)) ([92d90bb](https://github.com/dhis2/data-visualizer-app/commit/92d90bb9e858d5c151c6ba1d7408423042f972f1))

## [37.4.1](https://github.com/dhis2/data-visualizer-app/compare/v37.4.0...v37.4.1) (2021-06-01)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([ae5c82c](https://github.com/dhis2/data-visualizer-app/commit/ae5c82cf225e5c907c1e83756beefa618325c851))

# [37.4.0](https://github.com/dhis2/data-visualizer-app/compare/v37.3.1...v37.4.0) (2021-06-01)


### Features

* support options for multi axes (DHIS2-6672) ([#1692](https://github.com/dhis2/data-visualizer-app/issues/1692)) ([f535418](https://github.com/dhis2/data-visualizer-app/commit/f535418560664d9287835a10fa2b9a1bad84b7b3))

## [37.3.1](https://github.com/dhis2/data-visualizer-app/compare/v37.3.0...v37.3.1) (2021-05-28)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([65a16e7](https://github.com/dhis2/data-visualizer-app/commit/65a16e73e8f06d6f34f361243ea3a181429393dc))

# [37.3.0](https://github.com/dhis2/data-visualizer-app/compare/v37.2.0...v37.3.0) (2021-05-28)


### Features

* add last 10 years relative period (DHIS2-7029) ([#1722](https://github.com/dhis2/data-visualizer-app/issues/1722)) ([8448fa5](https://github.com/dhis2/data-visualizer-app/commit/8448fa5032aa89922e46089cbc1529758e05bf0a))

# [37.2.0](https://github.com/dhis2/data-visualizer-app/compare/v37.1.0...v37.2.0) (2021-05-28)


### Features

* hide periods based on system settings (DHIS2-11161) ([#1721](https://github.com/dhis2/data-visualizer-app/issues/1721)) ([fb0974c](https://github.com/dhis2/data-visualizer-app/commit/fb0974c323a62f2d34e6e2e36a57567590d42116))

# [37.1.0](https://github.com/dhis2/data-visualizer-app/compare/v37.0.10...v37.1.0) (2021-05-25)


### Features

* drill down org units in bar and column charts (DHIS2-11061) ([#1720](https://github.com/dhis2/data-visualizer-app/issues/1720)) ([ed09736](https://github.com/dhis2/data-visualizer-app/commit/ed0973676a114800f1f97dc08f53d928d21a17f7))

## [37.0.10](https://github.com/dhis2/data-visualizer-app/compare/v37.0.9...v37.0.10) (2021-05-18)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([a798681](https://github.com/dhis2/data-visualizer-app/commit/a798681c7ec8014682ae1006c4c15b63e3ab0b61))

## [37.0.9](https://github.com/dhis2/data-visualizer-app/compare/v37.0.8...v37.0.9) (2021-05-07)


### Bug Fixes

* await ou levels ([#1716](https://github.com/dhis2/data-visualizer-app/issues/1716)) ([94d241b](https://github.com/dhis2/data-visualizer-app/commit/94d241b1d66aefc48384540bbf4c18c1e1bbc725))

## [37.0.8](https://github.com/dhis2/data-visualizer-app/compare/v37.0.7...v37.0.8) (2021-05-05)


### Bug Fixes

* pass username to the favorites endpoint ([#1711](https://github.com/dhis2/data-visualizer-app/issues/1711)) ([be2ff21](https://github.com/dhis2/data-visualizer-app/commit/be2ff21c71172ce74554867a1282cdad8175ae2e))

## [37.0.7](https://github.com/dhis2/data-visualizer-app/compare/v37.0.6...v37.0.7) (2021-05-04)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([8348fd3](https://github.com/dhis2/data-visualizer-app/commit/8348fd36bcf15ff556f64f49af29e5807190ed8f))

## [37.0.6](https://github.com/dhis2/data-visualizer-app/compare/v37.0.5...v37.0.6) (2021-05-04)


### Bug Fixes

* new label for legend set options (DHIS2-11037) ([#1707](https://github.com/dhis2/data-visualizer-app/issues/1707)) ([580e7d4](https://github.com/dhis2/data-visualizer-app/commit/580e7d487ea6bc85a577e10ecf4b9c9bc45acd8b))

## [37.0.5](https://github.com/dhis2/data-visualizer-app/compare/v37.0.4...v37.0.5) (2021-05-03)


### Bug Fixes

* start screen vis type crash ([#1709](https://github.com/dhis2/data-visualizer-app/issues/1709)) ([f8c4303](https://github.com/dhis2/data-visualizer-app/commit/f8c43030eb167aa52a0e30d47eac699d6fdb5a05))

## [37.0.4](https://github.com/dhis2/data-visualizer-app/compare/v37.0.3...v37.0.4) (2021-04-30)


### Bug Fixes

* i18n folder and missing icons ([#1708](https://github.com/dhis2/data-visualizer-app/issues/1708)) ([0659202](https://github.com/dhis2/data-visualizer-app/commit/06592022d2eb53f723e7f3864bf676d56f386438))

## [37.0.3](https://github.com/dhis2/data-visualizer-app/compare/v37.0.2...v37.0.3) (2021-04-29)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([3ec10f0](https://github.com/dhis2/data-visualizer-app/commit/3ec10f0fbf174f987d47ab89c1a1ce3f7025a968))

## [37.0.2](https://github.com/dhis2/data-visualizer-app/compare/v37.0.1...v37.0.2) (2021-04-29)


### Bug Fixes

* convertOuLevelsToUids changes (DHIS2-11016) ([#1706](https://github.com/dhis2/data-visualizer-app/issues/1706)) ([7a3b18f](https://github.com/dhis2/data-visualizer-app/commit/7a3b18fee57ce233d9df71c885d399d5109b37a6))

## [37.0.1](https://github.com/dhis2/data-visualizer-app/compare/v37.0.0...v37.0.1) (2021-04-26)


### Bug Fixes

* custom error for mismatching org unit levels (DHIS2-10171) ([#1699](https://github.com/dhis2/data-visualizer-app/issues/1699)) ([a0ae250](https://github.com/dhis2/data-visualizer-app/commit/a0ae25093520f8b8b2384d5d1f4b57547ca7f37a))

# [37.0.0](https://github.com/dhis2/data-visualizer-app/compare/v36.0.0...v37.0.0) (2021-03-29)


### chore

* bump master to 37.0.0 ([#1679](https://github.com/dhis2/data-visualizer-app/issues/1679)) ([fddeae0](https://github.com/dhis2/data-visualizer-app/commit/fddeae0f150ea554e2b9d2a98894c9926dfb945e))


### BREAKING CHANGES

* release cut

# [36.0.0](https://github.com/dhis2/data-visualizer-app/compare/v35.20.23...v36.0.0) (2021-03-29)


### chore

* bump master to v36 ([#1678](https://github.com/dhis2/data-visualizer-app/issues/1678)) ([1c047a1](https://github.com/dhis2/data-visualizer-app/commit/1c047a1627c354e730e93e36582b8fe3feccafe0))


### BREAKING CHANGES

* no breaking change

## [35.20.23](https://github.com/dhis2/data-visualizer-app/compare/v35.20.22...v35.20.23) (2021-03-23)


### Bug Fixes

* avoid re-render after 1st resize ([#1669](https://github.com/dhis2/data-visualizer-app/issues/1669)) ([5fe6791](https://github.com/dhis2/data-visualizer-app/commit/5fe679155a6db7881963c2449de87078ec86bec2))

## [35.20.22](https://github.com/dhis2/data-visualizer-app/compare/v35.20.21...v35.20.22) (2021-03-22)


### Bug Fixes

* detect style changes from dashboard for re-rendering visualization ([#1667](https://github.com/dhis2/data-visualizer-app/issues/1667)) ([ee6a7d0](https://github.com/dhis2/data-visualizer-app/commit/ee6a7d0485c888bdc513e3a40306aed78230dfc5))

## [35.20.21](https://github.com/dhis2/data-visualizer-app/compare/v35.20.20...v35.20.21) (2021-03-20)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([eff50cc](https://github.com/dhis2/data-visualizer-app/commit/eff50cc4a7ac4f1a2180e271aaab9f3315725c22))

## [35.20.20](https://github.com/dhis2/data-visualizer-app/compare/v35.20.19...v35.20.20) (2021-03-19)


### Bug Fixes

* avoid visualization plugin double render ([#1665](https://github.com/dhis2/data-visualizer-app/issues/1665)) ([c6c348c](https://github.com/dhis2/data-visualizer-app/commit/c6c348c0b9d28757136be9e6bd125cfab44afd58))

## [35.20.19](https://github.com/dhis2/data-visualizer-app/compare/v35.20.18...v35.20.19) (2021-03-12)


### Bug Fixes

* use VISUALIZATION_VIEW ([#1662](https://github.com/dhis2/data-visualizer-app/issues/1662)) ([05e2798](https://github.com/dhis2/data-visualizer-app/commit/05e2798906c1d924e9ce09f96f9eca05a5b90191))

## [35.20.18](https://github.com/dhis2/data-visualizer-app/compare/v35.20.17...v35.20.18) (2021-03-12)


### Bug Fixes

* upgrade analytics ([#1659](https://github.com/dhis2/data-visualizer-app/issues/1659)) ([34f989e](https://github.com/dhis2/data-visualizer-app/commit/34f989ec03cb598770f8ff1c64e83cb6a276c015))

## [35.20.17](https://github.com/dhis2/data-visualizer-app/compare/v35.20.16...v35.20.17) (2021-03-11)


### Bug Fixes

* upgrade to @dhis2/cli-app-scripts@6 (DHIS2-9893) ([#1657](https://github.com/dhis2/data-visualizer-app/issues/1657)) ([0df0a93](https://github.com/dhis2/data-visualizer-app/commit/0df0a932680a26a943f0e36e85d9df29ff784a12))

## [35.20.16](https://github.com/dhis2/data-visualizer-app/compare/v35.20.15...v35.20.16) (2021-03-11)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([7f35b01](https://github.com/dhis2/data-visualizer-app/commit/7f35b0177259008099a52bacfc08ae9974ca8774))

## [35.20.15](https://github.com/dhis2/data-visualizer-app/compare/v35.20.14...v35.20.15) (2021-03-09)


### Bug Fixes

* @dhis2/analytics@16.0.11 ([#1651](https://github.com/dhis2/data-visualizer-app/issues/1651)) ([ab6adfd](https://github.com/dhis2/data-visualizer-app/commit/ab6adfdd0fc1bf4ad3716a86949ddda3cf22f67c))

## [35.20.14](https://github.com/dhis2/data-visualizer-app/compare/v35.20.13...v35.20.14) (2021-03-09)


### Bug Fixes

* @dhis2/analytics@16.0.9 ([#1650](https://github.com/dhis2/data-visualizer-app/issues/1650)) ([64191f1](https://github.com/dhis2/data-visualizer-app/commit/64191f1aa9e862095817afd7b067eb6cf0521db4))

## [35.20.13](https://github.com/dhis2/data-visualizer-app/compare/v35.20.12...v35.20.13) (2021-03-09)


### Bug Fixes

* prevent ghost items in itemsByDimension ([#1647](https://github.com/dhis2/data-visualizer-app/issues/1647)) ([caf5dfa](https://github.com/dhis2/data-visualizer-app/commit/caf5dfa87c8bceb9016e3b996f4237e5e3818167))

## [35.20.12](https://github.com/dhis2/data-visualizer-app/compare/v35.20.11...v35.20.12) (2021-03-09)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([6b1ac40](https://github.com/dhis2/data-visualizer-app/commit/6b1ac406eca2cc6f5c07f43b0bca371483ac3795))

## [35.20.11](https://github.com/dhis2/data-visualizer-app/compare/v35.20.10...v35.20.11) (2021-03-08)


### Bug Fixes

* fix double border in chip menu for scatter ([#1646](https://github.com/dhis2/data-visualizer-app/issues/1646)) ([39a5820](https://github.com/dhis2/data-visualizer-app/commit/39a582084f97fb195aa04339f7f0854e89e4b517))

## [35.20.10](https://github.com/dhis2/data-visualizer-app/compare/v35.20.9...v35.20.10) (2021-03-08)


### Bug Fixes

* set vertical before horizontal when swapping ([#1645](https://github.com/dhis2/data-visualizer-app/issues/1645)) ([9f4db3f](https://github.com/dhis2/data-visualizer-app/commit/9f4db3fa0398a56143c75c5e3ba82061626ae45f))

## [35.20.9](https://github.com/dhis2/data-visualizer-app/compare/v35.20.8...v35.20.9) (2021-03-08)


### Bug Fixes

* set outlier threshold min to 0 ([#1644](https://github.com/dhis2/data-visualizer-app/issues/1644)) ([45a8a51](https://github.com/dhis2/data-visualizer-app/commit/45a8a518d28ac0e26e11dda27afea9db162bd170))

## [35.20.8](https://github.com/dhis2/data-visualizer-app/compare/v35.20.7...v35.20.8) (2021-03-08)


### Bug Fixes

* @dhis2/analytics@16.0.8 ([#1643](https://github.com/dhis2/data-visualizer-app/issues/1643)) ([6758a06](https://github.com/dhis2/data-visualizer-app/commit/6758a0649888c6369db9319a913caf549f6e20f2))

## [35.20.7](https://github.com/dhis2/data-visualizer-app/compare/v35.20.6...v35.20.7) (2021-03-08)


### Bug Fixes

* include outlierAnalysis in AO request ([#1642](https://github.com/dhis2/data-visualizer-app/issues/1642)) ([47f6795](https://github.com/dhis2/data-visualizer-app/commit/47f67950f2537a1f9f0b8d56babdd236be8a49b2))

## [35.20.6](https://github.com/dhis2/data-visualizer-app/compare/v35.20.5...v35.20.6) (2021-03-05)


### Bug Fixes

* bump analytics and ui to latest ([#1640](https://github.com/dhis2/data-visualizer-app/issues/1640)) ([8f01ccf](https://github.com/dhis2/data-visualizer-app/commit/8f01ccf42c830b38bb82c5d5aa3473bc4be89bc9))

## [35.20.5](https://github.com/dhis2/data-visualizer-app/compare/v35.20.4...v35.20.5) (2021-03-05)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([#1626](https://github.com/dhis2/data-visualizer-app/issues/1626)) ([c7912af](https://github.com/dhis2/data-visualizer-app/commit/c7912af09b4b1541328f4c6c9933e5ee6503b7d9))

## [35.20.4](https://github.com/dhis2/data-visualizer-app/compare/v35.20.3...v35.20.4) (2021-03-04)


### Bug Fixes

* @dhis2/analytics@16.0.3 ([#1637](https://github.com/dhis2/data-visualizer-app/issues/1637)) ([7607231](https://github.com/dhis2/data-visualizer-app/commit/7607231e7ee25f42ee7f7f9edc354cb7acabb116))

## [35.20.3](https://github.com/dhis2/data-visualizer-app/compare/v35.20.2...v35.20.3) (2021-03-03)


### Bug Fixes

* minor tweaks for outlier options ([#1633](https://github.com/dhis2/data-visualizer-app/issues/1633)) ([4f70aa5](https://github.com/dhis2/data-visualizer-app/commit/4f70aa5a1b988fe815e4579f699aca5a9f2ed26d))

## [35.20.2](https://github.com/dhis2/data-visualizer-app/compare/v35.20.1...v35.20.2) (2021-03-03)


### Bug Fixes

* use nameprop for dynamic dimensions and /analytics ([#1634](https://github.com/dhis2/data-visualizer-app/issues/1634)) ([520be2b](https://github.com/dhis2/data-visualizer-app/commit/520be2b846f5e14c33e4bf923a0c258158d1def2))

## [35.20.1](https://github.com/dhis2/data-visualizer-app/compare/v35.20.0...v35.20.1) (2021-02-26)


### Bug Fixes

* min/step settings for outliers options ([#1627](https://github.com/dhis2/data-visualizer-app/issues/1627)) ([56ace8c](https://github.com/dhis2/data-visualizer-app/commit/56ace8c8ed6f355c2e3e40b912cd54b205137935))

# [35.20.0](https://github.com/dhis2/data-visualizer-app/compare/v35.19.3...v35.20.0) (2021-02-25)


### Features

* outlier options (DHIS2-1369) ([#1620](https://github.com/dhis2/data-visualizer-app/issues/1620)) ([b349a0a](https://github.com/dhis2/data-visualizer-app/commit/b349a0a91a6bd792bb573d1557bf9f9fa46ced29))

## [35.19.3](https://github.com/dhis2/data-visualizer-app/compare/v35.19.2...v35.19.3) (2021-02-25)


### Bug Fixes

* store metadata always, also when no data returned ([#1624](https://github.com/dhis2/data-visualizer-app/issues/1624)) ([053b5b5](https://github.com/dhis2/data-visualizer-app/commit/053b5b5bd88916867b2f1d6e6a6b3a1dfdb77955))

## [35.19.2](https://github.com/dhis2/data-visualizer-app/compare/v35.19.1...v35.19.2) (2021-02-25)


### Bug Fixes

* data dim selector improvements (DHIS2-7943) ([#1619](https://github.com/dhis2/data-visualizer-app/issues/1619)) ([cfee302](https://github.com/dhis2/data-visualizer-app/commit/cfee3023e8b225ddf3c468b2de5de8eac84c196c))

## [35.19.1](https://github.com/dhis2/data-visualizer-app/compare/v35.19.0...v35.19.1) (2021-02-22)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([#1617](https://github.com/dhis2/data-visualizer-app/issues/1617)) ([6f097a3](https://github.com/dhis2/data-visualizer-app/commit/6f097a35c4f9e6ecfcb7af1c22013555332d14dd))

# [35.19.0](https://github.com/dhis2/data-visualizer-app/compare/v35.18.12...v35.19.0) (2021-02-18)


### Features

* new data dim selector (DHIS2-7943) ([#1604](https://github.com/dhis2/data-visualizer-app/issues/1604)) ([de92dc9](https://github.com/dhis2/data-visualizer-app/commit/de92dc9f8c00f0940a5edaee8d8933607d1d89c4))

## [35.18.12](https://github.com/dhis2/data-visualizer-app/compare/v35.18.11...v35.18.12) (2021-02-18)


### Bug Fixes

* avoid double border in contextual menu DHIS2-10514 ([#1615](https://github.com/dhis2/data-visualizer-app/issues/1615)) ([04c8409](https://github.com/dhis2/data-visualizer-app/commit/04c8409a27c2842df1af3c57019972c409aa439c))

## [35.18.11](https://github.com/dhis2/data-visualizer-app/compare/v35.18.10...v35.18.11) (2021-02-18)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([4e02b37](https://github.com/dhis2/data-visualizer-app/commit/4e02b37d7059140e1a8988bb695a54f1796adcd0))

## [35.18.10](https://github.com/dhis2/data-visualizer-app/compare/v35.18.9...v35.18.10) (2021-02-17)


### Bug Fixes

* feb 29 in YOY with daily relative period (DHIS2-9729) ([#1590](https://github.com/dhis2/data-visualizer-app/issues/1590)) ([c1466d9](https://github.com/dhis2/data-visualizer-app/commit/c1466d96ba49b09562eabe702ec9b6d6eb504784))

## [35.18.9](https://github.com/dhis2/data-visualizer-app/compare/v35.18.8...v35.18.9) (2021-02-16)


### Bug Fixes

* YOY charts with relative week periods DHIS2-9729 ([#1560](https://github.com/dhis2/data-visualizer-app/issues/1560)) ([9cbf649](https://github.com/dhis2/data-visualizer-app/commit/9cbf649e7eaebe55ee595f97353415b88b795f60))

## [35.18.8](https://github.com/dhis2/data-visualizer-app/compare/v35.18.7...v35.18.8) (2021-02-16)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([9c43d97](https://github.com/dhis2/data-visualizer-app/commit/9c43d97df778e1c149877ba9d0288a4989461354))

## [35.18.7](https://github.com/dhis2/data-visualizer-app/compare/v35.18.6...v35.18.7) (2021-02-11)


### Bug Fixes

* bump Analytics to latest ([#1605](https://github.com/dhis2/data-visualizer-app/issues/1605)) ([7a0c8ff](https://github.com/dhis2/data-visualizer-app/commit/7a0c8ffe2288e8b7ef9c69b78ead2c977f316676))

## [35.18.6](https://github.com/dhis2/data-visualizer-app/compare/v35.18.5...v35.18.6) (2021-02-10)


### Bug Fixes

* get the errorCode for the analytics response in the right place ([#1603](https://github.com/dhis2/data-visualizer-app/issues/1603)) ([4a8a422](https://github.com/dhis2/data-visualizer-app/commit/4a8a422c217aeae0d9b361f1b19ba90e833a4b20))

## [35.18.5](https://github.com/dhis2/data-visualizer-app/compare/v35.18.4...v35.18.5) (2021-02-09)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([84dabd8](https://github.com/dhis2/data-visualizer-app/commit/84dabd83dae1d5147fb363587b863ffacda2a273))

## [35.18.4](https://github.com/dhis2/data-visualizer-app/compare/v35.18.3...v35.18.4) (2021-02-08)


### Bug Fixes

* download menu - double border, ui icons, esc for closing ([#1599](https://github.com/dhis2/data-visualizer-app/issues/1599)) ([1cb9949](https://github.com/dhis2/data-visualizer-app/commit/1cb99494c849fb9151a644a2287796cbc7009401))

## [35.18.3](https://github.com/dhis2/data-visualizer-app/compare/v35.18.2...v35.18.3) (2021-01-29)


### Bug Fixes

* add a warning in PT Parameters tab (DHIS2-10269) ([#1591](https://github.com/dhis2/data-visualizer-app/issues/1591)) ([5631105](https://github.com/dhis2/data-visualizer-app/commit/5631105975c68b01daa62bae8732a2abe9038841))

## [35.18.2](https://github.com/dhis2/data-visualizer-app/compare/v35.18.1...v35.18.2) (2021-01-28)


### Bug Fixes

* limit values (DHIS2-10249) and skip rounding (DHIS2-10251) ([#1559](https://github.com/dhis2/data-visualizer-app/issues/1559)) ([9a9e17e](https://github.com/dhis2/data-visualizer-app/commit/9a9e17e04b9d69c55a3b87cacaa80f4629f68471))

## [35.18.1](https://github.com/dhis2/data-visualizer-app/compare/v35.18.0...v35.18.1) (2021-01-28)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([120e9f5](https://github.com/dhis2/data-visualizer-app/commit/120e9f5b1bf0199bb04c87a83ca6cc5ae5248878))

# [35.18.0](https://github.com/dhis2/data-visualizer-app/compare/v35.17.1...v35.18.0) (2021-01-27)


### Features

* scatter options (DHIS2-10006) ([#1552](https://github.com/dhis2/data-visualizer-app/issues/1552)) ([9a4233e](https://github.com/dhis2/data-visualizer-app/commit/9a4233e55e619cf6a5eefe2689106732f0ea2027))

## [35.17.1](https://github.com/dhis2/data-visualizer-app/compare/v35.17.0...v35.17.1) (2021-01-27)


### Bug Fixes

* use the download links for dataValueSet via analytics DHIS2-9789 ([#1581](https://github.com/dhis2/data-visualizer-app/issues/1581)) ([cbd3e5c](https://github.com/dhis2/data-visualizer-app/commit/cbd3e5c0505452622e2b2067860865bf02132f95))

# [35.17.0](https://github.com/dhis2/data-visualizer-app/compare/v35.16.9...v35.17.0) (2021-01-21)


### Features

* paging of dynamic dimension items (DHIS2-9274) ([#1239](https://github.com/dhis2/data-visualizer-app/issues/1239)) ([8c5b893](https://github.com/dhis2/data-visualizer-app/commit/8c5b893d2b04fd61c23974a50418ed71efe17126))

## [35.16.9](https://github.com/dhis2/data-visualizer-app/compare/v35.16.8...v35.16.9) (2021-01-19)


### Bug Fixes

* ui resolution and analytics bump ([#1578](https://github.com/dhis2/data-visualizer-app/issues/1578)) ([0a9a02f](https://github.com/dhis2/data-visualizer-app/commit/0a9a02f98a74b5138d30fdf669a9b4f4dbad0e14))

## [35.16.8](https://github.com/dhis2/data-visualizer-app/compare/v35.16.7...v35.16.8) (2021-01-18)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([27683e6](https://github.com/dhis2/data-visualizer-app/commit/27683e6a0959176c0dd182fe2e39c6b9764bbf02))

## [35.16.7](https://github.com/dhis2/data-visualizer-app/compare/v35.16.6...v35.16.7) (2021-01-14)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([#1527](https://github.com/dhis2/data-visualizer-app/issues/1527)) ([d3a6ac5](https://github.com/dhis2/data-visualizer-app/commit/d3a6ac57d4fc22e5c182041827271b186f212ac2))

## [35.16.6](https://github.com/dhis2/data-visualizer-app/compare/v35.16.5...v35.16.6) (2021-01-14)


### Bug Fixes

* bump Analytics dep ([#1565](https://github.com/dhis2/data-visualizer-app/issues/1565)) ([46a1075](https://github.com/dhis2/data-visualizer-app/commit/46a1075302075292e4985a7dae477ed3382e9f38))

## [35.16.5](https://github.com/dhis2/data-visualizer-app/compare/v35.16.4...v35.16.5) (2021-01-13)


### Bug Fixes

* add missing name for legend sets ([#1561](https://github.com/dhis2/data-visualizer-app/issues/1561)) ([1c51726](https://github.com/dhis2/data-visualizer-app/commit/1c517261f65753a3c6f677898d4645bb93e3a7be))

## [35.16.4](https://github.com/dhis2/data-visualizer-app/compare/v35.16.3...v35.16.4) (2020-12-21)


### Bug Fixes

* change order of item attr when added ([#1542](https://github.com/dhis2/data-visualizer-app/issues/1542)) ([373808e](https://github.com/dhis2/data-visualizer-app/commit/373808e09489a88b2a0710e9f8dc1e9efb5f988b))

## [35.16.3](https://github.com/dhis2/data-visualizer-app/compare/v35.16.2...v35.16.3) (2020-12-21)


### Bug Fixes

* bump Analytics dep ([#1538](https://github.com/dhis2/data-visualizer-app/issues/1538)) ([2053a04](https://github.com/dhis2/data-visualizer-app/commit/2053a045ce7ae625f0c11dce67d6f3ca0a01c2c0))
* use config from window instead of from store ([#1532](https://github.com/dhis2/data-visualizer-app/issues/1532)) ([2bab417](https://github.com/dhis2/data-visualizer-app/commit/2bab417f15388d5fd8085eee9305030ed7eec907))

## [35.16.2](https://github.com/dhis2/data-visualizer-app/compare/v35.16.1...v35.16.2) (2020-12-16)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([#1521](https://github.com/dhis2/data-visualizer-app/issues/1521)) ([0d5bf3d](https://github.com/dhis2/data-visualizer-app/commit/0d5bf3df2085c5865512d664f1973e7f1d09e1b7))

## [35.16.1](https://github.com/dhis2/data-visualizer-app/compare/v35.16.0...v35.16.1) (2020-12-15)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([#1483](https://github.com/dhis2/data-visualizer-app/issues/1483)) ([ede1f20](https://github.com/dhis2/data-visualizer-app/commit/ede1f207c1940953e7dc3e37ab23e6a96756b99c))

# [35.16.0](https://github.com/dhis2/data-visualizer-app/compare/v35.15.0...v35.16.0) (2020-12-10)


### Features

* scatter layout pt2 ([#1501](https://github.com/dhis2/data-visualizer-app/issues/1501)) ([f1de13e](https://github.com/dhis2/data-visualizer-app/commit/f1de13e8e99f8954a491e840f7e252dd4334676c))

# [35.15.0](https://github.com/dhis2/data-visualizer-app/compare/v35.14.0...v35.15.0) (2020-12-08)


### Features

* scatter context menu + data tabs (DHIS2-10073) ([#1490](https://github.com/dhis2/data-visualizer-app/issues/1490)) ([c4aaf30](https://github.com/dhis2/data-visualizer-app/commit/c4aaf30a9d5997053e03db42e19e0bfd10f59435))

# [35.14.0](https://github.com/dhis2/data-visualizer-app/compare/v35.13.19...v35.14.0) (2020-12-04)


### Features

* implement scatter layout (DHIS2-10003) ([#1472](https://github.com/dhis2/data-visualizer-app/issues/1472)) ([65a1b8e](https://github.com/dhis2/data-visualizer-app/commit/65a1b8e0de277bade23813ca8863d3acc014ce64))

## [35.13.19](https://github.com/dhis2/data-visualizer-app/compare/v35.13.18...v35.13.19) (2020-11-19)


### Bug Fixes

* reset app when New is clicked (DHIS2-9876) ([#1406](https://github.com/dhis2/data-visualizer-app/issues/1406)) ([0dc16ed](https://github.com/dhis2/data-visualizer-app/commit/0dc16ed35c83cd4f558e982eb61bf10c67741127))

## [35.13.18](https://github.com/dhis2/data-visualizer-app/compare/v35.13.17...v35.13.18) (2020-11-15)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([b5e86f2](https://github.com/dhis2/data-visualizer-app/commit/b5e86f2314d75d11f7a4dc38c6d984a40f4589d8))

## [35.13.17](https://github.com/dhis2/data-visualizer-app/compare/v35.13.16...v35.13.17) (2020-11-13)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([c5e6b8f](https://github.com/dhis2/data-visualizer-app/commit/c5e6b8fea65b9d48b3364b9e8c564ff11c5f552e))

## [35.13.16](https://github.com/dhis2/data-visualizer-app/compare/v35.13.15...v35.13.16) (2020-11-12)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([35e57fd](https://github.com/dhis2/data-visualizer-app/commit/35e57fd5e8cdc07345325182c8af5528f3998e0b))

## [35.13.15](https://github.com/dhis2/data-visualizer-app/compare/v35.13.14...v35.13.15) (2020-11-11)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([f42149b](https://github.com/dhis2/data-visualizer-app/commit/f42149b2c859f7cd847e21873795470f589b5ee0))

## [35.13.14](https://github.com/dhis2/data-visualizer-app/compare/v35.13.13...v35.13.14) (2020-11-10)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([f886b66](https://github.com/dhis2/data-visualizer-app/commit/f886b66144467ae0367b14fe2f53613942c43267))

## [35.13.13](https://github.com/dhis2/data-visualizer-app/compare/v35.13.12...v35.13.13) (2020-11-09)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([fd2b341](https://github.com/dhis2/data-visualizer-app/commit/fd2b3418a8e301c3928a454c9a082facc1c1647a))

## [35.13.12](https://github.com/dhis2/data-visualizer-app/compare/v35.13.11...v35.13.12) (2020-11-08)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([1a00b5d](https://github.com/dhis2/data-visualizer-app/commit/1a00b5db0f36a47ec65f6f996aa7f9378477b9b1))

## [35.13.11](https://github.com/dhis2/data-visualizer-app/compare/v35.13.10...v35.13.11) (2020-11-02)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([a389ca1](https://github.com/dhis2/data-visualizer-app/commit/a389ca1f5d90d6a8eb26911000e09eb242d621e8))

## [35.13.10](https://github.com/dhis2/data-visualizer-app/compare/v35.13.9...v35.13.10) (2020-11-01)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([24f46ad](https://github.com/dhis2/data-visualizer-app/commit/24f46ad01e516e5276e46b4897f7999723abbe89))

## [35.13.9](https://github.com/dhis2/data-visualizer-app/compare/v35.13.8...v35.13.9) (2020-10-31)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([5fa415e](https://github.com/dhis2/data-visualizer-app/commit/5fa415ea889a9f54cc3749a4a5854e1432abd0ad))

## [35.13.8](https://github.com/dhis2/data-visualizer-app/compare/v35.13.7...v35.13.8) (2020-10-30)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([23eec44](https://github.com/dhis2/data-visualizer-app/commit/23eec4458bf66672e92cec2fa797839f3c26b549))

## [35.13.7](https://github.com/dhis2/data-visualizer-app/compare/v35.13.6...v35.13.7) (2020-10-29)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([615927e](https://github.com/dhis2/data-visualizer-app/commit/615927e0188fcb89db38f1d0fe1431ce5cc53622))

## [35.13.6](https://github.com/dhis2/data-visualizer-app/compare/v35.13.5...v35.13.6) (2020-10-28)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([44bb31b](https://github.com/dhis2/data-visualizer-app/commit/44bb31bfa0e7176cb81fa4ddb04395f1ec2e4653))

## [35.13.5](https://github.com/dhis2/data-visualizer-app/compare/v35.13.4...v35.13.5) (2020-10-27)


### Bug Fixes

* prevent options from crashing by filtering out empty objects (DHIS2-147) ([#1381](https://github.com/dhis2/data-visualizer-app/issues/1381)) ([9297b26](https://github.com/dhis2/data-visualizer-app/commit/9297b2671049cf2b3de1b5b0ad472385f2e494ca))

## [35.13.4](https://github.com/dhis2/data-visualizer-app/compare/v35.13.3...v35.13.4) (2020-10-27)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([e88a50c](https://github.com/dhis2/data-visualizer-app/commit/e88a50c57fe83af78ba2a42b98dff8ebb6e8e8a9))

## [35.13.3](https://github.com/dhis2/data-visualizer-app/compare/v35.13.2...v35.13.3) (2020-10-23)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([59152c2](https://github.com/dhis2/data-visualizer-app/commit/59152c269e646f0837b294b11809d4c06a526492))

## [35.13.2](https://github.com/dhis2/data-visualizer-app/compare/v35.13.1...v35.13.2) (2020-10-22)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([d0f9a59](https://github.com/dhis2/data-visualizer-app/commit/d0f9a59fd4577511b775b7e3e91bf31627375048))

## [35.13.1](https://github.com/dhis2/data-visualizer-app/compare/v35.13.0...v35.13.1) (2020-10-21)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([261a762](https://github.com/dhis2/data-visualizer-app/commit/261a76256063d08d46e93cbf2ec80b6d61879508))

# [35.13.0](https://github.com/dhis2/data-visualizer-app/compare/v35.12.34...v35.13.0) (2020-10-21)


### Features

* enable legend tab for column and bar (DHIS2-147) ([#1355](https://github.com/dhis2/data-visualizer-app/issues/1355)) ([04bb5a6](https://github.com/dhis2/data-visualizer-app/commit/04bb5a67b4b4507c26b8774221a9badb2faac267))

## [35.12.34](https://github.com/dhis2/data-visualizer-app/compare/v35.12.33...v35.12.34) (2020-10-20)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([2ccff4b](https://github.com/dhis2/data-visualizer-app/commit/2ccff4b9702f39a15e03c6c46d3e1f23dd70d6ff))

## [35.12.33](https://github.com/dhis2/data-visualizer-app/compare/v35.12.32...v35.12.33) (2020-10-16)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([4244b48](https://github.com/dhis2/data-visualizer-app/commit/4244b48e2f60c573e96d0523178ce415c09f715d))

## [35.12.32](https://github.com/dhis2/data-visualizer-app/compare/v35.12.31...v35.12.32) (2020-10-12)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([f73919c](https://github.com/dhis2/data-visualizer-app/commit/f73919cc088381439242da69cf2fbbbcfe176e6a))

## [35.12.31](https://github.com/dhis2/data-visualizer-app/compare/v35.12.30...v35.12.31) (2020-10-08)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([cc06fc0](https://github.com/dhis2/data-visualizer-app/commit/cc06fc0a6e9d7b4f69630cf7ce12f9951e34f15c))

## [35.12.30](https://github.com/dhis2/data-visualizer-app/compare/v35.12.29...v35.12.30) (2020-10-07)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([fa940d7](https://github.com/dhis2/data-visualizer-app/commit/fa940d7a5fd2e1f02dbe413a3b7818dde00725fe))

## [35.12.29](https://github.com/dhis2/data-visualizer-app/compare/v35.12.28...v35.12.29) (2020-09-29)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([af72777](https://github.com/dhis2/data-visualizer-app/commit/af72777e400bb8a2a8120024296144b19e3fea0e))

## [35.12.28](https://github.com/dhis2/data-visualizer-app/compare/v35.12.27...v35.12.28) (2020-09-28)


### Bug Fixes

* prevent empty content for ac with conditional rendering ([#1315](https://github.com/dhis2/data-visualizer-app/issues/1315)) ([dbe7b28](https://github.com/dhis2/data-visualizer-app/commit/dbe7b28252f37fd8c95fdae6fa38872fb05c5faa))

## [35.12.27](https://github.com/dhis2/data-visualizer-app/compare/v35.12.26...v35.12.27) (2020-09-25)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([2a8f987](https://github.com/dhis2/data-visualizer-app/commit/2a8f987dc7be4835877ff850ebfc363d1ada76c1))

## [35.12.26](https://github.com/dhis2/data-visualizer-app/compare/v35.12.25...v35.12.26) (2020-09-24)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([a6c1e2d](https://github.com/dhis2/data-visualizer-app/commit/a6c1e2d92e96987987976bfe8defaf75da926f35))

## [35.12.25](https://github.com/dhis2/data-visualizer-app/compare/v35.12.24...v35.12.25) (2020-09-23)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([042c1fb](https://github.com/dhis2/data-visualizer-app/commit/042c1fb47933b5a26c850cdc5e8c9e3a47a979e3))

## [35.12.24](https://github.com/dhis2/data-visualizer-app/compare/v35.12.23...v35.12.24) (2020-09-23)


### Bug Fixes

* upgrade analytics ([#1303](https://github.com/dhis2/data-visualizer-app/issues/1303)) ([66b1b9a](https://github.com/dhis2/data-visualizer-app/commit/66b1b9a159252e2d15718e31cfcd31c597ea4ed4))

## [35.12.23](https://github.com/dhis2/data-visualizer-app/compare/v35.12.22...v35.12.23) (2020-09-23)


### Bug Fixes

* layout width for pie layout ([#1302](https://github.com/dhis2/data-visualizer-app/issues/1302)) ([93e7eb8](https://github.com/dhis2/data-visualizer-app/commit/93e7eb84c13217ddb3bf60946db7be3719b00353))

## [35.12.22](https://github.com/dhis2/data-visualizer-app/compare/v35.12.21...v35.12.22) (2020-09-23)


### Bug Fixes

* legend type spacing in SV options ([#1298](https://github.com/dhis2/data-visualizer-app/issues/1298)) ([4477292](https://github.com/dhis2/data-visualizer-app/commit/44772924d013d5a05c2ab5e95a2e614bb9621a42))

## [35.12.21](https://github.com/dhis2/data-visualizer-app/compare/v35.12.20...v35.12.21) (2020-09-23)


### Bug Fixes

* modal is bumped up when the color picker is opened ([#1299](https://github.com/dhis2/data-visualizer-app/issues/1299)) ([e4d2b83](https://github.com/dhis2/data-visualizer-app/commit/e4d2b836b536cf97cf81bf3e1f44364120e231a4))

## [35.12.20](https://github.com/dhis2/data-visualizer-app/compare/v35.12.19...v35.12.20) (2020-09-22)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([963547e](https://github.com/dhis2/data-visualizer-app/commit/963547e3b56707b0391f002fba3b1f7b355ddfe0))

## [35.12.19](https://github.com/dhis2/data-visualizer-app/compare/v35.12.18...v35.12.19) (2020-09-22)


### Bug Fixes

* bump Analytics to v11.0.5 ([88b28fe](https://github.com/dhis2/data-visualizer-app/commit/88b28fe2e77b6c021d7e91189ca669bb6f5a8f64))

## [35.12.18](https://github.com/dhis2/data-visualizer-app/compare/v35.12.17...v35.12.18) (2020-09-21)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([c0125b2](https://github.com/dhis2/data-visualizer-app/commit/c0125b234f77bb57e0cf762cd7c8f4ff039d142f))

## [35.12.17](https://github.com/dhis2/data-visualizer-app/compare/v35.12.16...v35.12.17) (2020-09-21)


### Bug Fixes

* make series options unavailable for relative items ([#1280](https://github.com/dhis2/data-visualizer-app/issues/1280)) ([e8b7cad](https://github.com/dhis2/data-visualizer-app/commit/e8b7cad8f036da795de33afc9b14516003c9e23c))

## [35.12.16](https://github.com/dhis2/data-visualizer-app/compare/v35.12.15...v35.12.16) (2020-09-21)


### Bug Fixes

* keep the visualization name when re-saving after edit ([#1273](https://github.com/dhis2/data-visualizer-app/issues/1273)) ([0ad8768](https://github.com/dhis2/data-visualizer-app/commit/0ad8768a2b641e22cd09fed722d6d8f2437252c5))

## [35.12.15](https://github.com/dhis2/data-visualizer-app/compare/v35.12.14...v35.12.15) (2020-09-20)


### Bug Fixes

* org unit dialog zindex ([#1277](https://github.com/dhis2/data-visualizer-app/issues/1277)) ([f970122](https://github.com/dhis2/data-visualizer-app/commit/f970122cede02e7113c2d2e641394c65c5eb5f5e))

## [35.12.14](https://github.com/dhis2/data-visualizer-app/compare/v35.12.13...v35.12.14) (2020-09-19)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([a428cc4](https://github.com/dhis2/data-visualizer-app/commit/a428cc499c2653357919cba3a7eb8df7edcabbf6))

## [35.12.13](https://github.com/dhis2/data-visualizer-app/compare/v35.12.12...v35.12.13) (2020-09-18)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([8e92a8e](https://github.com/dhis2/data-visualizer-app/commit/8e92a8ee93f80074de5024b169e817447f5c1274))

## [35.12.12](https://github.com/dhis2/data-visualizer-app/compare/v35.12.11...v35.12.12) (2020-09-18)


### Bug Fixes

* solve font style related issues ([#1266](https://github.com/dhis2/data-visualizer-app/issues/1266)) ([4087c08](https://github.com/dhis2/data-visualizer-app/commit/4087c08e2f523fe63c9b01eafc6580508ea2ba6e))

## [35.12.11](https://github.com/dhis2/data-visualizer-app/compare/v35.12.10...v35.12.11) (2020-09-17)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([819bf40](https://github.com/dhis2/data-visualizer-app/commit/819bf400273b6779a294e2dc9eee07e2b36e6a38))

## [35.12.10](https://github.com/dhis2/data-visualizer-app/compare/v35.12.9...v35.12.10) (2020-09-08)


### Bug Fixes

* update d2-ui and analytics deps ([#1251](https://github.com/dhis2/data-visualizer-app/issues/1251)) ([8f37893](https://github.com/dhis2/data-visualizer-app/commit/8f37893827dd297e60ce3e77841461a57c2352b3))

## [35.12.9](https://github.com/dhis2/data-visualizer-app/compare/v35.12.8...v35.12.9) (2020-09-07)


### Bug Fixes

* bump Analytics to latest ([#1247](https://github.com/dhis2/data-visualizer-app/issues/1247)) ([3a2d667](https://github.com/dhis2/data-visualizer-app/commit/3a2d667abd9b0900e611290f547a0dcf4c8dcf0b))

## [35.12.8](https://github.com/dhis2/data-visualizer-app/compare/v35.12.7...v35.12.8) (2020-09-04)


### Bug Fixes

* DGS default from settings (DHIS2-9328) ([#1244](https://github.com/dhis2/data-visualizer-app/issues/1244)) ([33939bd](https://github.com/dhis2/data-visualizer-app/commit/33939bd9e7e5f5253aa5aa4188bc9602dd89225a))

## [35.12.7](https://github.com/dhis2/data-visualizer-app/compare/v35.12.6...v35.12.7) (2020-09-03)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([1d9bae4](https://github.com/dhis2/data-visualizer-app/commit/1d9bae4708f9d80a2bde1e62faebec961de761c6))

## [35.12.6](https://github.com/dhis2/data-visualizer-app/compare/v35.12.5...v35.12.6) (2020-09-03)


### Bug Fixes

* dimension context menu to use @dhis2/ui (DHIS2-9365) ([#1237](https://github.com/dhis2/data-visualizer-app/issues/1237)) ([e7d9d40](https://github.com/dhis2/data-visualizer-app/commit/e7d9d40601bce8ed95c0c5577fa084fd5951606d))

## [35.12.5](https://github.com/dhis2/data-visualizer-app/compare/v35.12.4...v35.12.5) (2020-09-03)


### Bug Fixes

* Custom error message for deleting an AO used in Dashboards (DHIS2-9310) ([#1231](https://github.com/dhis2/data-visualizer-app/issues/1231)) ([f909ae5](https://github.com/dhis2/data-visualizer-app/commit/f909ae51ecf3c7292c01e5f00cbefff44d7b924a))

## [35.12.4](https://github.com/dhis2/data-visualizer-app/compare/v35.12.3...v35.12.4) (2020-09-02)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([b3d3804](https://github.com/dhis2/data-visualizer-app/commit/b3d38044c592d8acdab302f5b98d9a864deaf729))

## [35.12.3](https://github.com/dhis2/data-visualizer-app/compare/v35.12.2...v35.12.3) (2020-08-31)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([2070ae6](https://github.com/dhis2/data-visualizer-app/commit/2070ae61292066bccd33ea1d9b89874d502333fd))

## [35.12.2](https://github.com/dhis2/data-visualizer-app/compare/v35.12.1...v35.12.2) (2020-08-31)


### Bug Fixes

* digit group separator default from system settings (DHIS2-6328) ([#1233](https://github.com/dhis2/data-visualizer-app/issues/1233)) ([d6d5d0a](https://github.com/dhis2/data-visualizer-app/commit/d6d5d0a839f52a2dfa83d9d0766a50fac2493610))

## [35.12.1](https://github.com/dhis2/data-visualizer-app/compare/v35.12.0...v35.12.1) (2020-08-31)


### Bug Fixes

* set a default name if saved vis is untitled (DHIS2-9360) ([#1232](https://github.com/dhis2/data-visualizer-app/issues/1232)) ([f9fc26b](https://github.com/dhis2/data-visualizer-app/commit/f9fc26b9b25dbf9f43a71d13cc67c257db213b1c))

# [35.12.0](https://github.com/dhis2/data-visualizer-app/compare/v35.11.1...v35.12.0) (2020-08-28)


### Features

* move dx to filter for YOY which allows for multiple dx items (DHIS2-8808) ([#1229](https://github.com/dhis2/data-visualizer-app/issues/1229)) ([9a4723c](https://github.com/dhis2/data-visualizer-app/commit/9a4723caac37019ba0d4be24d9059829f9a3543f))

## [35.11.1](https://github.com/dhis2/data-visualizer-app/compare/v35.11.0...v35.11.1) (2020-08-28)


### Bug Fixes

* enable skipRounding and digitGroupSeparator options for SV (DHIS2-9340) ([#1228](https://github.com/dhis2/data-visualizer-app/issues/1228)) ([b77a8b7](https://github.com/dhis2/data-visualizer-app/commit/b77a8b70ae28702f08e8f6cf888715a43ee8280f))

# [35.11.0](https://github.com/dhis2/data-visualizer-app/compare/v35.10.4...v35.11.0) (2020-08-28)


### Features

* allow YOY without dx ([#1230](https://github.com/dhis2/data-visualizer-app/issues/1230)) ([35de0fa](https://github.com/dhis2/data-visualizer-app/commit/35de0fa9911f2dc97f902a88fb2eeef635178bd7))

## [35.10.4](https://github.com/dhis2/data-visualizer-app/compare/v35.10.3...v35.10.4) (2020-08-25)


### Bug Fixes

* fix double bottom border in Download menu ([#1226](https://github.com/dhis2/data-visualizer-app/issues/1226)) ([1c05032](https://github.com/dhis2/data-visualizer-app/commit/1c050327d9cd302a9725199c1e8f5e614380f15e))

## [35.10.3](https://github.com/dhis2/data-visualizer-app/compare/v35.10.2...v35.10.3) (2020-08-24)


### Bug Fixes

* bump Analytics to get latest ui with fix for selected items style ([#1221](https://github.com/dhis2/data-visualizer-app/issues/1221)) ([86d7fc1](https://github.com/dhis2/data-visualizer-app/commit/86d7fc1bce97ba2ddcaebd5be3091b390a29ea0d))

## [35.10.2](https://github.com/dhis2/data-visualizer-app/compare/v35.10.1...v35.10.2) (2020-08-24)


### Bug Fixes

* prevent series from saving global vis type as custom type (DHIS2-6385) ([#1193](https://github.com/dhis2/data-visualizer-app/issues/1193)) ([317d25c](https://github.com/dhis2/data-visualizer-app/commit/317d25c15a6d3f377e335820198884f5a09f84de))

## [35.10.1](https://github.com/dhis2/data-visualizer-app/compare/v35.10.0...v35.10.1) (2020-08-21)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([9fbe412](https://github.com/dhis2/data-visualizer-app/commit/9fbe412e03df6ece541a1a1b0cf1cf50da5f4b70))

# [35.10.0](https://github.com/dhis2/data-visualizer-app/compare/v35.9.2...v35.10.0) (2020-08-21)


### Features

* handle 404 (DHIS2-9273) ([#1203](https://github.com/dhis2/data-visualizer-app/issues/1203)) ([89e3152](https://github.com/dhis2/data-visualizer-app/commit/89e3152ac09bbcc281ffe668385b9090642511ae))

## [35.9.2](https://github.com/dhis2/data-visualizer-app/compare/v35.9.1...v35.9.2) (2020-08-20)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([3534c29](https://github.com/dhis2/data-visualizer-app/commit/3534c2979af622280396fbbb8eb8983787bed916))

## [35.9.1](https://github.com/dhis2/data-visualizer-app/compare/v35.9.0...v35.9.1) (2020-08-19)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([8c1d5bd](https://github.com/dhis2/data-visualizer-app/commit/8c1d5bdb0cc47890029baea6ed7d2436fea6cb80))

# [35.9.0](https://github.com/dhis2/data-visualizer-app/compare/v35.8.1...v35.9.0) (2020-08-19)


### Features

* font styles for text options (DHIS2-8426) ([#1184](https://github.com/dhis2/data-visualizer-app/issues/1184)) ([1e0a474](https://github.com/dhis2/data-visualizer-app/commit/1e0a47486486984046c6d041f7e3e2795a5eb011))

## [35.8.1](https://github.com/dhis2/data-visualizer-app/compare/v35.8.0...v35.8.1) (2020-08-19)


### Bug Fixes

* option configs for various vis types ([#1192](https://github.com/dhis2/data-visualizer-app/issues/1192)) ([620ec92](https://github.com/dhis2/data-visualizer-app/commit/620ec92b97eb2d953d88e262a336ee6ee3f1de7c))

# [35.8.0](https://github.com/dhis2/data-visualizer-app/compare/v35.7.2...v35.8.0) (2020-08-17)


### Features

* bump cli-app-scripts, ui and analytics (TECH-397) ([#1197](https://github.com/dhis2/data-visualizer-app/issues/1197)) ([5c27fa0](https://github.com/dhis2/data-visualizer-app/commit/5c27fa03da0f6ab05f4573eaaf176d65f6c32a0e))

## [35.7.2](https://github.com/dhis2/data-visualizer-app/compare/v35.7.1...v35.7.2) (2020-08-14)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([0d6272d](https://github.com/dhis2/data-visualizer-app/commit/0d6272dfa98a7d7f000fa08473759ebe710c83e1))

## [35.7.1](https://github.com/dhis2/data-visualizer-app/compare/v35.7.0...v35.7.1) (2020-08-14)


### Bug Fixes

* Decimals and Steps options only allow positive values (DHIS2-9002, DHIS2-9194) ([#1161](https://github.com/dhis2/data-visualizer-app/issues/1161)) ([f29e13c](https://github.com/dhis2/data-visualizer-app/commit/f29e13c8b7e14ddc916a5d314a86704a8b61c4a2))

# [35.7.0](https://github.com/dhis2/data-visualizer-app/compare/v35.6.1...v35.7.0) (2020-08-14)


### Features

* support for two category charts [DHIS2-7876] ([#1164](https://github.com/dhis2/data-visualizer-app/issues/1164)) ([2aef8b1](https://github.com/dhis2/data-visualizer-app/commit/2aef8b1af3d05e9eb303730fd21fbf76aaf9892b))

## [35.6.1](https://github.com/dhis2/data-visualizer-app/compare/v35.6.0...v35.6.1) (2020-08-13)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([1ac0b22](https://github.com/dhis2/data-visualizer-app/commit/1ac0b2222645f1edd3777790057bf71cfb720ba6))

# [35.6.0](https://github.com/dhis2/data-visualizer-app/compare/v35.5.1...v35.6.0) (2020-08-13)


### Features

* implement colorSet option (DHIS2-670) ([#1177](https://github.com/dhis2/data-visualizer-app/issues/1177)) ([d855d0e](https://github.com/dhis2/data-visualizer-app/commit/d855d0e4e90df7f464ff2eeb071c2996b1c0b9b2))

## [35.5.1](https://github.com/dhis2/data-visualizer-app/compare/v35.5.0...v35.5.1) (2020-08-11)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([8e34d13](https://github.com/dhis2/data-visualizer-app/commit/8e34d13d50fd4dc5c570b0d7f004bf7d3ea0e21f))

# [35.5.0](https://github.com/dhis2/data-visualizer-app/compare/v35.4.0...v35.5.0) (2020-08-11)


### Features

* new vis type for stacked area (DHIS2-9217) ([#1185](https://github.com/dhis2/data-visualizer-app/issues/1185)) ([6fd734f](https://github.com/dhis2/data-visualizer-app/commit/6fd734f77b3c7b0832888e148f4c09552ecd199d))

# [35.4.0](https://github.com/dhis2/data-visualizer-app/compare/v35.3.5...v35.4.0) (2020-08-11)


### Features

* new vis type selector design (DHIS2-7855) ([#1169](https://github.com/dhis2/data-visualizer-app/issues/1169)) ([50939b5](https://github.com/dhis2/data-visualizer-app/commit/50939b5265385ff267cdc663cfaaf0aa07b22665))

## [35.3.5](https://github.com/dhis2/data-visualizer-app/compare/v35.3.4...v35.3.5) (2020-08-10)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([67a2386](https://github.com/dhis2/data-visualizer-app/commit/67a238637c9fcded38b92e99cd98cf98129ebbd9))

## [35.3.4](https://github.com/dhis2/data-visualizer-app/compare/v35.3.3...v35.3.4) (2020-08-07)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([db89052](https://github.com/dhis2/data-visualizer-app/commit/db890521eb081a47624784877677e11231c9ead2))

## [35.3.3](https://github.com/dhis2/data-visualizer-app/compare/v35.3.2...v35.3.3) (2020-08-07)


### Bug Fixes

* disable lines and vertical axis options for multi axes (DHIS2-9010, DHIS2-9013, DHIS2-9014) ([#1171](https://github.com/dhis2/data-visualizer-app/issues/1171)) ([7062fc5](https://github.com/dhis2/data-visualizer-app/commit/7062fc5a3d15175386158cd07ca799cbb9732a3f))

## [35.3.2](https://github.com/dhis2/data-visualizer-app/compare/v35.3.1...v35.3.2) (2020-07-31)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([2f234e6](https://github.com/dhis2/data-visualizer-app/commit/2f234e690aaba17049a6d9feaf380003f5644202))

## [35.3.1](https://github.com/dhis2/data-visualizer-app/compare/v35.3.0...v35.3.1) (2020-07-30)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([cf24d93](https://github.com/dhis2/data-visualizer-app/commit/cf24d934f3bbba662c01fe97b9f64620092969fa))

# [35.3.0](https://github.com/dhis2/data-visualizer-app/compare/v35.2.10...v35.3.0) (2020-07-30)


### Features

* column and line combined (DHIS2-9103, DHIS2-6385) ([#1143](https://github.com/dhis2/data-visualizer-app/issues/1143)) ([3928472](https://github.com/dhis2/data-visualizer-app/commit/39284723242a5fd5c91368fddc6f33e261d446bd))

## [35.2.10](https://github.com/dhis2/data-visualizer-app/compare/v35.2.9...v35.2.10) (2020-07-29)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([9aadda9](https://github.com/dhis2/data-visualizer-app/commit/9aadda9fb63b9e6561527cee757d2bff2a9dbfe9))

## [35.2.9](https://github.com/dhis2/data-visualizer-app/compare/v35.2.8...v35.2.9) (2020-07-28)


### Bug Fixes

* fix stuck tooltips in dimension chips DHIS2-9063 ([#1159](https://github.com/dhis2/data-visualizer-app/issues/1159)) ([16c0f5c](https://github.com/dhis2/data-visualizer-app/commit/16c0f5ca26e54fa198d591da7403fb522deb1e90))

## [35.2.8](https://github.com/dhis2/data-visualizer-app/compare/v35.2.7...v35.2.8) (2020-07-28)


### Bug Fixes

* set visualization type selector z-index ([#1150](https://github.com/dhis2/data-visualizer-app/issues/1150)) ([9af9bda](https://github.com/dhis2/data-visualizer-app/commit/9af9bdacd5184c161959f92de8924d2551967b1d))

## [35.2.7](https://github.com/dhis2/data-visualizer-app/compare/v35.2.6...v35.2.7) (2020-07-27)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([5c9fe2f](https://github.com/dhis2/data-visualizer-app/commit/5c9fe2f915c02981fe5a225abd3ce8246f8f61c9))

## [35.2.6](https://github.com/dhis2/data-visualizer-app/compare/v35.2.5...v35.2.6) (2020-07-27)


### Bug Fixes

* change help text for aggregation type ([#1151](https://github.com/dhis2/data-visualizer-app/issues/1151)) ([d321577](https://github.com/dhis2/data-visualizer-app/commit/d321577891b62381b8eb6aa28366d7afb5043fcf))

## [35.2.5](https://github.com/dhis2/data-visualizer-app/compare/v35.2.4...v35.2.5) (2020-07-27)


### Bug Fixes

* rename and invert the hide legend option ([#1152](https://github.com/dhis2/data-visualizer-app/issues/1152)) ([0d6e163](https://github.com/dhis2/data-visualizer-app/commit/0d6e163a2a5337b1c9652c4e3a5637653de485a3))

## [35.2.4](https://github.com/dhis2/data-visualizer-app/compare/v35.2.3...v35.2.4) (2020-07-27)


### Bug Fixes

* reorder options for consistency (DHIS2-9004) ([#1153](https://github.com/dhis2/data-visualizer-app/issues/1153)) ([519b0ba](https://github.com/dhis2/data-visualizer-app/commit/519b0bab3d0958649186073b249d05eb0fa7d85c))

## [35.2.3](https://github.com/dhis2/data-visualizer-app/compare/v35.2.2...v35.2.3) (2020-07-03)


### Bug Fixes

* avoid unnecessary rerender (TECH-412) ([#1138](https://github.com/dhis2/data-visualizer-app/issues/1138)) ([d4ff1cd](https://github.com/dhis2/data-visualizer-app/commit/d4ff1cd752365b413a82e6fab30244c71ae2a2bd))

## [35.2.2](https://github.com/dhis2/data-visualizer-app/compare/v35.2.1...v35.2.2) (2020-06-19)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([0998f1f](https://github.com/dhis2/data-visualizer-app/commit/0998f1f1be9ebf164462507e09598f85634ce1fb))

## [35.2.1](https://github.com/dhis2/data-visualizer-app/compare/v35.2.0...v35.2.1) (2020-06-16)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([9d79fce](https://github.com/dhis2/data-visualizer-app/commit/9d79fce4b9a2e346520cdedb8c42f02782370cde))

# [35.2.0](https://github.com/dhis2/data-visualizer-app/compare/v35.1.8...v35.2.0) (2020-06-15)


### Features

* upgrade to ui@5 (TECH-389) ([#1068](https://github.com/dhis2/data-visualizer-app/issues/1068)) ([2352d52](https://github.com/dhis2/data-visualizer-app/commit/2352d52c5c9755c6dc3fa14368e14c9a5d22d94e))

## [35.1.8](https://github.com/dhis2/data-visualizer-app/compare/v35.1.7...v35.1.8) (2020-06-14)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([2ad12df](https://github.com/dhis2/data-visualizer-app/commit/2ad12dfcb62a75e66e31512058cfc13ca634687e))

## [35.1.7](https://github.com/dhis2/data-visualizer-app/compare/v35.1.6...v35.1.7) (2020-06-12)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([a8fbfbe](https://github.com/dhis2/data-visualizer-app/commit/a8fbfbe0e3d78f20eaa5f0d3e2f79d059c3d688a))

## [35.1.6](https://github.com/dhis2/data-visualizer-app/compare/v35.1.5...v35.1.6) (2020-06-11)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([a93c48a](https://github.com/dhis2/data-visualizer-app/commit/a93c48a740f625225167d894aa4a19ad644ee0d0))

## [35.1.5](https://github.com/dhis2/data-visualizer-app/compare/v35.1.4...v35.1.5) (2020-06-11)


### Bug Fixes

* fix paging query parameter passed to data engine ([#1083](https://github.com/dhis2/data-visualizer-app/issues/1083)) ([df10e99](https://github.com/dhis2/data-visualizer-app/commit/df10e997c02d10261b1b468aabae67815650b341))

## [35.1.4](https://github.com/dhis2/data-visualizer-app/compare/v35.1.3...v35.1.4) (2020-06-10)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([387e0ed](https://github.com/dhis2/data-visualizer-app/commit/387e0ed5b7561d72fd1bbb200c671a211877c05d))

## [35.1.3](https://github.com/dhis2/data-visualizer-app/compare/v35.1.2...v35.1.3) (2020-06-10)


### Bug Fixes

* add deploy-build ([#1069](https://github.com/dhis2/data-visualizer-app/issues/1069)) ([c8b9170](https://github.com/dhis2/data-visualizer-app/commit/c8b91707b3c4231bd635d6b89c159c58c6c384c4))

## [35.1.2](https://github.com/dhis2/data-visualizer-app/compare/v35.1.1...v35.1.2) (2020-06-09)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([dc07163](https://github.com/dhis2/data-visualizer-app/commit/dc071634b5f08e358700cc5a21f9367f82b71c0b))

## [35.1.1](https://github.com/dhis2/data-visualizer-app/compare/v35.1.0...v35.1.1) (2020-06-09)


### Bug Fixes

* yoy chart mismatch between layout years, and chart years ([#1070](https://github.com/dhis2/data-visualizer-app/issues/1070)) ([4a18e56](https://github.com/dhis2/data-visualizer-app/commit/4a18e56d90704daa74873678545fe1646ad9f027))

# [35.1.0](https://github.com/dhis2/data-visualizer-app/compare/v35.0.5...v35.1.0) (2020-06-09)


### Features

* implements latest Dynamic Dimension selector from Analytics ([#1046](https://github.com/dhis2/data-visualizer-app/issues/1046)) ([8582d09](https://github.com/dhis2/data-visualizer-app/commit/8582d09b29d32002c04ac88a4007b51691c16cd3))

## [35.0.5](https://github.com/dhis2/data-visualizer-app/compare/v35.0.4...v35.0.5) (2020-06-07)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([669b40b](https://github.com/dhis2/data-visualizer-app/commit/669b40b94e91504c561f85439918fdee3e19ebb4))

## [35.0.4](https://github.com/dhis2/data-visualizer-app/compare/v35.0.3...v35.0.4) (2020-06-04)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([a608cdd](https://github.com/dhis2/data-visualizer-app/commit/a608cddf72ee5edb361cb40e3905eea547b94dd3))

## [35.0.3](https://github.com/dhis2/data-visualizer-app/compare/v35.0.2...v35.0.3) (2020-06-03)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([f399b38](https://github.com/dhis2/data-visualizer-app/commit/f399b38994f50c06f984eea0200b07c21910b2be))

## [35.0.2](https://github.com/dhis2/data-visualizer-app/compare/v35.0.1...v35.0.2) (2020-06-03)


### Bug Fixes

* complete translations master ([#1031](https://github.com/dhis2/data-visualizer-app/issues/1031)) ([d8ba752](https://github.com/dhis2/data-visualizer-app/commit/d8ba75229dc09c6cc15e3b3005660566ae42bcd1))

## [35.0.1](https://github.com/dhis2/data-visualizer-app/compare/v35.0.0...v35.0.1) (2020-06-02)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([86d75e9](https://github.com/dhis2/data-visualizer-app/commit/86d75e975c7efd11ac48e0c0b294284bf3804f8c))

# [35.0.0](https://github.com/dhis2/data-visualizer-app/compare/v34.5.0...v35.0.0) (2020-05-28)


### Bug Fixes

* yarn-deduplicate and remove unused d2-analysis ([#1027](https://github.com/dhis2/data-visualizer-app/issues/1027)) ([a48dd02](https://github.com/dhis2/data-visualizer-app/commit/a48dd02ca082daa6c882789f0fa9a093404c6d88))


### BREAKING CHANGES

* - Marked as a breaking change because we need to move to version 35 to follow the convention of major version matching DHIS2 version
- removed d2-analysis from plugin dependencies since it is not in use
- yarn-deduplicate

# [34.5.0](https://github.com/dhis2/data-visualizer-app/compare/v34.4.1...v34.5.0) (2020-05-28)


### Features

* implement latest Period Selector from Analytics (DHIS2-8807) ([#1026](https://github.com/dhis2/data-visualizer-app/issues/1026)) ([ee0cb75](https://github.com/dhis2/data-visualizer-app/commit/ee0cb7505b19b6c1af203ebf8feb912490e455a8))

## [34.4.1](https://github.com/dhis2/data-visualizer-app/compare/v34.4.0...v34.4.1) (2020-05-26)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([b0006e2](https://github.com/dhis2/data-visualizer-app/commit/b0006e250ae239ec8e51003d4a01a399649a8fb1))

# [34.4.0](https://github.com/dhis2/data-visualizer-app/compare/v34.3.49...v34.4.0) (2020-05-26)


### Features

* drill down/up for pivot tables ([#999](https://github.com/dhis2/data-visualizer-app/issues/999)) ([747e6f7](https://github.com/dhis2/data-visualizer-app/commit/747e6f74f6dd0a973ff2d1bef03ff6b26cd10cba))

## [34.3.49](https://github.com/dhis2/data-visualizer-app/compare/v34.3.48...v34.3.49) (2020-05-20)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([4266e2a](https://github.com/dhis2/data-visualizer-app/commit/4266e2a076e626e944bf0abe647d650ed9fe22cb))

## [34.3.48](https://github.com/dhis2/data-visualizer-app/compare/v34.3.47...v34.3.48) (2020-05-06)


### Bug Fixes

* dimension panel search field is missing the 'x' to clear (DHIS2-8790) ([#948](https://github.com/dhis2/data-visualizer-app/issues/948)) ([d8881aa](https://github.com/dhis2/data-visualizer-app/commit/d8881aa2be62e19af7d729355e7f99ed2125333d))

## [34.3.47](https://github.com/dhis2/data-visualizer-app/compare/v34.3.46...v34.3.47) (2020-04-30)


### Bug Fixes

* remove @material-ui/core dep ([#935](https://github.com/dhis2/data-visualizer-app/issues/935)) ([17d34a4](https://github.com/dhis2/data-visualizer-app/commit/17d34a4d1a946947f3547c75c815d281176865f9))

## [34.3.46](https://github.com/dhis2/data-visualizer-app/compare/v34.3.45...v34.3.46) (2020-04-29)


### Bug Fixes

* display 'and x others...' on tooltip (DHIS2-8753) ([#925](https://github.com/dhis2/data-visualizer-app/issues/925)) ([adaa485](https://github.com/dhis2/data-visualizer-app/commit/adaa4854fc00f76f0d413cab186b865293ebb6e2))

## [34.3.45](https://github.com/dhis2/data-visualizer-app/compare/v34.3.44...v34.3.45) (2020-04-27)


### Bug Fixes

* remove ui prop in axis setup ([#886](https://github.com/dhis2/data-visualizer-app/issues/886)) ([f68b9a6](https://github.com/dhis2/data-visualizer-app/commit/f68b9a609eacd4acf75d8e17ba715094b3ba5920))

## [34.3.44](https://github.com/dhis2/data-visualizer-app/compare/v34.3.43...v34.3.44) (2020-04-27)


### Bug Fixes

* auto merge semver:minor ([#903](https://github.com/dhis2/data-visualizer-app/issues/903)) ([1c68594](https://github.com/dhis2/data-visualizer-app/commit/1c685945f87e5e77875dc577bcacd6fb692d7dfa))

## [34.3.43](https://github.com/dhis2/data-visualizer-app/compare/v34.3.42...v34.3.43) (2020-04-23)


### Bug Fixes

* temporary fix for orgunit and period selector modals not showing ([#872](https://github.com/dhis2/data-visualizer-app/issues/872)) ([594e27e](https://github.com/dhis2/data-visualizer-app/commit/594e27e350b2aeae2b5f38dc5c751231f33ab5bb))

## [34.3.42](https://github.com/dhis2/data-visualizer-app/compare/v34.3.41...v34.3.42) (2020-04-22)


### Bug Fixes

* AxisSetup MUI -> ui-core (TECH-359) ([#876](https://github.com/dhis2/data-visualizer-app/issues/876)) ([36e4a79](https://github.com/dhis2/data-visualizer-app/commit/36e4a79c9d6135db4e4f5871adf066c3296a780f))

## [34.3.41](https://github.com/dhis2/data-visualizer-app/compare/v34.3.40...v34.3.41) (2020-04-21)


### Bug Fixes

* rewrite MenuBar buttons (TECH-320) ([#879](https://github.com/dhis2/data-visualizer-app/issues/879)) ([45b3adb](https://github.com/dhis2/data-visualizer-app/commit/45b3adb6b01b8ac95761650d603ff92cfda410d7))

## [34.3.40](https://github.com/dhis2/data-visualizer-app/compare/v34.3.39...v34.3.40) (2020-04-20)


### Bug Fixes

* consistent scrollbar style ([#877](https://github.com/dhis2/data-visualizer-app/issues/877)) ([622a6d8](https://github.com/dhis2/data-visualizer-app/commit/622a6d8921fa99c2cdd8344226857646a9c4f54a))

## [34.3.39](https://github.com/dhis2/data-visualizer-app/compare/v34.3.38...v34.3.39) (2020-04-20)


### Bug Fixes

* changed the text for a legend option to suit all vis types ([#873](https://github.com/dhis2/data-visualizer-app/issues/873)) ([92df843](https://github.com/dhis2/data-visualizer-app/commit/92df84385807d58249b358b41e7fac9143408aa2))

## [34.3.38](https://github.com/dhis2/data-visualizer-app/compare/v34.3.37...v34.3.38) (2020-04-15)


### Bug Fixes

* replace MUI with ui-core for dimension modals (TECH-318, TECH-319) ([#849](https://github.com/dhis2/data-visualizer-app/issues/849)) ([da42529](https://github.com/dhis2/data-visualizer-app/commit/da4252977e89618f966086992339efad43f1a137))

## [34.3.37](https://github.com/dhis2/data-visualizer-app/compare/v34.3.36...v34.3.37) (2020-04-14)


### Bug Fixes

* fix axes options for line and area vis types ([#857](https://github.com/dhis2/data-visualizer-app/issues/857)) ([9463ea3](https://github.com/dhis2/data-visualizer-app/commit/9463ea31d7c9ca941edf77a736307fb85a39936e))

## [34.3.36](https://github.com/dhis2/data-visualizer-app/compare/v34.3.35...v34.3.36) (2020-04-09)


### Bug Fixes

* display loading spinner on save (DHIS2-8434) ([#811](https://github.com/dhis2/data-visualizer-app/issues/811)) ([c287eee](https://github.com/dhis2/data-visualizer-app/commit/c287eee1a426e6d72b1bf6bb8e7da8dc12a23fe7))

## [34.3.35](https://github.com/dhis2/data-visualizer-app/compare/v34.3.34...v34.3.35) (2020-04-06)


### Bug Fixes

* pass dimensionItemType in current AO (DHIS2-8577) ([#859](https://github.com/dhis2/data-visualizer-app/issues/859)) ([a5e1430](https://github.com/dhis2/data-visualizer-app/commit/a5e1430c89922021686419aec191f92f110b4470))

## [34.3.34](https://github.com/dhis2/data-visualizer-app/compare/v34.3.33...v34.3.34) (2020-03-31)


### Bug Fixes

* @dhis2/analytics@4.3.25 ([#837](https://github.com/dhis2/data-visualizer-app/issues/837)) ([856fa8a](https://github.com/dhis2/data-visualizer-app/commit/856fa8ae145bfd700cb085dd094ed831753c6e85))

## [34.3.33](https://github.com/dhis2/data-visualizer-app/compare/v34.3.32...v34.3.33) (2020-03-31)


### Bug Fixes

* replace MUI with ui-core components - loading spinner (TECH-324) ([#814](https://github.com/dhis2/data-visualizer-app/issues/814)) ([8eeb16a](https://github.com/dhis2/data-visualizer-app/commit/8eeb16a59edd8cdb562797ddb0c380e04d99033c))

## [34.3.32](https://github.com/dhis2/data-visualizer-app/compare/v34.3.31...v34.3.32) (2020-03-20)


### Bug Fixes

* upgrade analytics for chart title fix [DHIS2-8473] ([#807](https://github.com/dhis2/data-visualizer-app/issues/807)) ([1a4955d](https://github.com/dhis2/data-visualizer-app/commit/1a4955d38bca6badd5a44815675c8a45dc188a93))

## [34.3.31](https://github.com/dhis2/data-visualizer-app/compare/v34.3.30...v34.3.31) (2020-03-18)


### Bug Fixes

* analytics@4.3.22 (DHIS2-8486) ([#805](https://github.com/dhis2/data-visualizer-app/issues/805)) ([490d8c7](https://github.com/dhis2/data-visualizer-app/commit/490d8c76af857b09ab51a84fa43069678bd9d3b9))

## [34.3.30](https://github.com/dhis2/data-visualizer-app/compare/v34.3.29...v34.3.30) (2020-03-16)


### Bug Fixes

* update analytics dep ([#802](https://github.com/dhis2/data-visualizer-app/issues/802)) ([1df988f](https://github.com/dhis2/data-visualizer-app/commit/1df988f9278ba3d2359af33e531bf5dcc3c63c58))

## [34.3.29](https://github.com/dhis2/data-visualizer-app/compare/v34.3.28...v34.3.29) (2020-03-16)


### Bug Fixes

* analytics@4.3.20 ([#801](https://github.com/dhis2/data-visualizer-app/issues/801)) ([87c6ca0](https://github.com/dhis2/data-visualizer-app/commit/87c6ca04ed02ef95f1c2c43e6d597f62c75d5e2f))

## [34.3.28](https://github.com/dhis2/data-visualizer-app/compare/v34.3.27...v34.3.28) (2020-03-11)


### Bug Fixes

* pivot table fixes, upgrade analytics, and fix en.pot ([#796](https://github.com/dhis2/data-visualizer-app/issues/796)) ([71c10ed](https://github.com/dhis2/data-visualizer-app/commit/71c10ed9c9fa4df02bd87ad76d36c806b2b5fac9))

## [34.3.27](https://github.com/dhis2/data-visualizer-app/compare/v34.3.26...v34.3.27) (2020-03-11)


### Bug Fixes

* only request numDen for pivot tables ([#793](https://github.com/dhis2/data-visualizer-app/issues/793)) [skip ci] ([83fd843](https://github.com/dhis2/data-visualizer-app/commit/83fd8438afbecedf5966510e58dbbff81aa79db0))
* upgrade d2 to latest ([#794](https://github.com/dhis2/data-visualizer-app/issues/794)) ([4cd9caf](https://github.com/dhis2/data-visualizer-app/commit/4cd9caf51ed0e60e1daeff546398d51d1433540e))

## [34.3.26](https://github.com/dhis2/data-visualizer-app/compare/v34.3.25...v34.3.26) (2020-03-10)


### Bug Fixes

* upgrade analytics 4.3.11 -> 4.3.15 ([c6ed440](https://github.com/dhis2/data-visualizer-app/commit/c6ed440bdb9d7ee05ceabea2d9297c47d9976861))

## [34.3.25](https://github.com/dhis2/data-visualizer-app/compare/v34.3.24...v34.3.25) (2020-03-10)


### Bug Fixes

* include numerator and denominator in analytics requests ([#787](https://github.com/dhis2/data-visualizer-app/issues/787)) ([56ee4e8](https://github.com/dhis2/data-visualizer-app/commit/56ee4e86dab56c4d89e0be2b8621a3625b0aead5))

## [34.3.24](https://github.com/dhis2/data-visualizer-app/compare/v34.3.23...v34.3.24) (2020-03-10)


### Bug Fixes

* show names for levels and groups in dimension chip tooltip ([#792](https://github.com/dhis2/data-visualizer-app/issues/792)) ([0e91268](https://github.com/dhis2/data-visualizer-app/commit/0e912686d64709f680520755ea573c283e363628))

## [34.3.23](https://github.com/dhis2/data-visualizer-app/compare/v34.3.22...v34.3.23) (2020-03-10)


### Bug Fixes

* saving incorrectly shows the confirmation  ([#791](https://github.com/dhis2/data-visualizer-app/issues/791)) ([b1d91ee](https://github.com/dhis2/data-visualizer-app/commit/b1d91ee04dac020aaa251f6918adf3b51b6e9b78))

## [34.3.22](https://github.com/dhis2/data-visualizer-app/compare/v34.3.21...v34.3.22) (2020-03-10)


### Bug Fixes

* Pivot Table allow empty col or row ([#789](https://github.com/dhis2/data-visualizer-app/issues/789)) ([ee337a5](https://github.com/dhis2/data-visualizer-app/commit/ee337a5181cd201d81c455734c826058bde2db13))

## [34.3.21](https://github.com/dhis2/data-visualizer-app/compare/v34.3.20...v34.3.21) (2020-03-10)


### Bug Fixes

* missing translation in sharing dialog (DHIS2-8249) ([#790](https://github.com/dhis2/data-visualizer-app/issues/790)) ([23a3cac](https://github.com/dhis2/data-visualizer-app/commit/23a3cacfa3844b1e212e89156774f80339ea7b16))

## [34.3.20](https://github.com/dhis2/data-visualizer-app/compare/v34.3.19...v34.3.20) (2020-03-10)


### Bug Fixes

* confirmation before navigating away from unsaved state (DHIS2-8432) ([#788](https://github.com/dhis2/data-visualizer-app/issues/788)) ([66e1dbc](https://github.com/dhis2/data-visualizer-app/commit/66e1dbc345d0681fd2512d82606b67199762e223))

## [34.3.19](https://github.com/dhis2/data-visualizer-app/compare/v34.3.18...v34.3.19) (2020-03-10)


### Bug Fixes

* fix loading translations for share/translate dialogs (DHIS2-8249) ([#785](https://github.com/dhis2/data-visualizer-app/issues/785)) ([6184770](https://github.com/dhis2/data-visualizer-app/commit/618477081c8c011165cdfd92c73d7639bb855274))

## [34.3.18](https://github.com/dhis2/data-visualizer-app/compare/v34.3.17...v34.3.18) (2020-03-06)


### Bug Fixes

* upgraded to d2-ui-file-menu v6.5.10, improved open dialog vis types ([#786](https://github.com/dhis2/data-visualizer-app/issues/786)) ([3c8f80c](https://github.com/dhis2/data-visualizer-app/commit/3c8f80c9e0922388efe9113d79a616ac65c52008)), closes [dhis2/d2-ui#574](https://github.com/dhis2/d2-ui/issues/574)

## [34.3.17](https://github.com/dhis2/data-visualizer-app/compare/v34.3.16...v34.3.17) (2020-03-06)


### Bug Fixes

* upgraded to Analytics v4.3.8 for title ellipsis ([#784](https://github.com/dhis2/data-visualizer-app/issues/784)) ([92fcbf5](https://github.com/dhis2/data-visualizer-app/commit/92fcbf56ec6ea26818816c97c8434140a95626ad))

## [34.3.16](https://github.com/dhis2/data-visualizer-app/compare/v34.3.15...v34.3.16) (2020-03-05)


### Bug Fixes

* do not pass options intended for download request DHIS2-8401 ([#783](https://github.com/dhis2/data-visualizer-app/issues/783)) ([a223011](https://github.com/dhis2/data-visualizer-app/commit/a2230119dd2a20e2c3cb9a176646af43122b7878))

## [34.3.15](https://github.com/dhis2/data-visualizer-app/compare/v34.3.14...v34.3.15) (2020-03-05)


### Bug Fixes

* updated the error and start page texts based on user feedback ([#781](https://github.com/dhis2/data-visualizer-app/issues/781)) ([a51b9e0](https://github.com/dhis2/data-visualizer-app/commit/a51b9e0100a2867ab7940e2e2a3d4fe642bea6fd))

## [34.3.14](https://github.com/dhis2/data-visualizer-app/compare/v34.3.13...v34.3.14) (2020-03-04)


### Bug Fixes

* support adaptive clipping for pivot tables ([#782](https://github.com/dhis2/data-visualizer-app/issues/782)) ([2b0cfa8](https://github.com/dhis2/data-visualizer-app/commit/2b0cfa81a8fc0befd9264ea48f7599d3af2c211b))

## [34.3.13](https://github.com/dhis2/data-visualizer-app/compare/v34.3.12...v34.3.13) (2020-03-04)


### Bug Fixes

* bump @dhis2/analytics@4.3.4 to fix DHIS2-6562 ([#780](https://github.com/dhis2/data-visualizer-app/issues/780)) ([c586e40](https://github.com/dhis2/data-visualizer-app/commit/c586e408f4414f759ad5706aff8c95f60fc53d2f))

## [34.3.12](https://github.com/dhis2/data-visualizer-app/compare/v34.3.11...v34.3.12) (2020-03-04)


### Bug Fixes

* load /#/currentAnalyticalObject crash ([#779](https://github.com/dhis2/data-visualizer-app/issues/779)) ([472dd54](https://github.com/dhis2/data-visualizer-app/commit/472dd54db3e2d9eb74e78ad9205e368fc521ef9e))

## [34.3.11](https://github.com/dhis2/data-visualizer-app/compare/v34.3.10...v34.3.11) (2020-03-04)


### Bug Fixes

* DEGS and RR combination error ([#758](https://github.com/dhis2/data-visualizer-app/issues/758)) ([8c4f11b](https://github.com/dhis2/data-visualizer-app/commit/8c4f11b2c797e7d928fb1c50873181f7bba026c5))

## [34.3.10](https://github.com/dhis2/data-visualizer-app/compare/v34.3.9...v34.3.10) (2020-03-03)


### Bug Fixes

* interpretations panel show for PT visualization type DHIS2-8300 ([#778](https://github.com/dhis2/data-visualizer-app/issues/778)) ([8cc1643](https://github.com/dhis2/data-visualizer-app/commit/8cc1643007a1cc847057ce1689a3f8e9b58bf3c0))

## [34.3.9](https://github.com/dhis2/data-visualizer-app/compare/v34.3.8...v34.3.9) (2020-03-02)


### Bug Fixes

* @dhis2/analytics@4.3.1 ([#759](https://github.com/dhis2/data-visualizer-app/issues/759)) ([9277236](https://github.com/dhis2/data-visualizer-app/commit/9277236d3a6cab7d10a78dc9dbe0f2e91bf8c61b))

## [34.3.8](https://github.com/dhis2/data-visualizer-app/compare/v34.3.7...v34.3.8) (2020-02-27)


### Bug Fixes

* remove data dimension validation ([#738](https://github.com/dhis2/data-visualizer-app/issues/738)) ([b26bb27](https://github.com/dhis2/data-visualizer-app/commit/b26bb27d2ab397cec4c3f54f35ea2be40c4013f9))

## [34.3.7](https://github.com/dhis2/data-visualizer-app/compare/v34.3.6...v34.3.7) (2020-02-27)


### Bug Fixes

* rephrase legend display strategy option ([#735](https://github.com/dhis2/data-visualizer-app/issues/735)) ([31a75fa](https://github.com/dhis2/data-visualizer-app/commit/31a75fa845788470748a467d413b8d62cb46f3d6))

## [34.3.6](https://github.com/dhis2/data-visualizer-app/compare/v34.3.5...v34.3.6) (2020-02-27)


### Bug Fixes

* avoid casting undefined to Number -> NaN ([#737](https://github.com/dhis2/data-visualizer-app/issues/737)) ([37120b3](https://github.com/dhis2/data-visualizer-app/commit/37120b34d3a40b9745ca6cd112e54fd793afc4a1))

## [34.3.5](https://github.com/dhis2/data-visualizer-app/compare/v34.3.4...v34.3.5) (2020-02-27)


### Bug Fixes

* support more pivot table features ([#739](https://github.com/dhis2/data-visualizer-app/issues/739)) ([c6f09a1](https://github.com/dhis2/data-visualizer-app/commit/c6f09a1e6039be1a47c1c8ac4cb582344a6d027e))

## [34.3.4](https://github.com/dhis2/data-visualizer-app/compare/v34.3.3...v34.3.4) (2020-02-26)


### Bug Fixes

* completed only all vis types ([#734](https://github.com/dhis2/data-visualizer-app/issues/734)) ([0dc37ce](https://github.com/dhis2/data-visualizer-app/commit/0dc37cea617b0c23a6bc5212790a4b838a3c5fe0))

## [34.3.3](https://github.com/dhis2/data-visualizer-app/compare/v34.3.2...v34.3.3) (2020-02-25)


### Bug Fixes

* gauge range bug ([#724](https://github.com/dhis2/data-visualizer-app/issues/724)) ([19a3983](https://github.com/dhis2/data-visualizer-app/commit/19a39836b606c81851f371c1edacdec2cc11528c)), closes [dhis2/analytics#321](https://github.com/dhis2/analytics/issues/321)

## [34.3.2](https://github.com/dhis2/data-visualizer-app/compare/v34.3.1...v34.3.2) (2020-02-25)


### Bug Fixes

* crash and warnings with empty db DHIS2-8335 ([#723](https://github.com/dhis2/data-visualizer-app/issues/723)) ([ec52553](https://github.com/dhis2/data-visualizer-app/commit/ec525532d17fb75040ac7507da5fe6280b1f39f0))

## [34.3.1](https://github.com/dhis2/data-visualizer-app/compare/v34.3.0...v34.3.1) (2020-02-25)


### Bug Fixes

* single value legend (DHIS2-8348) ([#722](https://github.com/dhis2/data-visualizer-app/issues/722)) ([ec78234](https://github.com/dhis2/data-visualizer-app/commit/ec78234470f7dd89613cc10b77d52fd52e12ff42))

# [34.3.0](https://github.com/dhis2/data-visualizer-app/compare/v34.2.7...v34.3.0) (2020-02-24)


### Features

* fetch all legend definitions for data items ([#703](https://github.com/dhis2/data-visualizer-app/issues/703)) ([64e6861](https://github.com/dhis2/data-visualizer-app/commit/64e6861432661c75390223d62864d3bae3bad1f4))

## [34.2.7](https://github.com/dhis2/data-visualizer-app/compare/v34.2.6...v34.2.7) (2020-02-24)


### Bug Fixes

* legends for gauge ([#702](https://github.com/dhis2/data-visualizer-app/issues/702)) ([7c29e47](https://github.com/dhis2/data-visualizer-app/commit/7c29e4793b0c1a553bdbc54d83e36bc5a3c8aa7e))

## [34.2.6](https://github.com/dhis2/data-visualizer-app/compare/v34.2.5...v34.2.6) (2020-02-21)


### Bug Fixes

* height in safari (DHIS2-8277) ([#704](https://github.com/dhis2/data-visualizer-app/issues/704)) ([75994b3](https://github.com/dhis2/data-visualizer-app/commit/75994b38cc70747869fe98dccc36f7167c0325c5)), closes [dhis2/app-platform#303](https://github.com/dhis2/app-platform/issues/303)

## [34.2.5](https://github.com/dhis2/data-visualizer-app/compare/v34.2.4...v34.2.5) (2020-02-20)


### Bug Fixes

* add pivot table legend support, upgrade to @dhis2/analytics@4.1.0 ([#701](https://github.com/dhis2/data-visualizer-app/issues/701)) ([cdf5934](https://github.com/dhis2/data-visualizer-app/commit/cdf593425baee8383a064af10ba871474a1687f3))

## [34.2.4](https://github.com/dhis2/data-visualizer-app/compare/v34.2.3...v34.2.4) (2020-02-20)


### Bug Fixes

* checks for data in all responses instead of in each individual one ([#699](https://github.com/dhis2/data-visualizer-app/issues/699)) ([ffbb54e](https://github.com/dhis2/data-visualizer-app/commit/ffbb54ea619674eb2a6adf154931c3e46e87aeb8))

## [34.2.3](https://github.com/dhis2/data-visualizer-app/compare/v34.2.2...v34.2.3) (2020-02-20)


### Bug Fixes

* fix filtering of non savable options ([#700](https://github.com/dhis2/data-visualizer-app/issues/700)) ([51138bb](https://github.com/dhis2/data-visualizer-app/commit/51138bbd0b5dafd44260fc4e422957ced866c55d))

## [34.2.2](https://github.com/dhis2/data-visualizer-app/compare/v34.2.1...v34.2.2) (2020-02-20)


### Bug Fixes

* missing PT download params ([#671](https://github.com/dhis2/data-visualizer-app/issues/671)) ([49669f0](https://github.com/dhis2/data-visualizer-app/commit/49669f0743fbe62324240c06a5485e07a5c11243))

## [34.2.1](https://github.com/dhis2/data-visualizer-app/compare/v34.2.0...v34.2.1) (2020-02-18)


### Bug Fixes

* dimensions modal to show only when dimension is added ([#655](https://github.com/dhis2/data-visualizer-app/issues/655)) ([b199e6e](https://github.com/dhis2/data-visualizer-app/commit/b199e6eab08de87f2b09429d9ac9329d8a091e68)), closes [dhis2/analytics#294](https://github.com/dhis2/analytics/issues/294)

# [34.2.0](https://github.com/dhis2/data-visualizer-app/compare/v34.1.0...v34.2.0) (2020-02-17)


### Features

* option for data approval level ([#657](https://github.com/dhis2/data-visualizer-app/issues/657)) ([3b7d274](https://github.com/dhis2/data-visualizer-app/commit/3b7d2744884c26ee7a21fbb88cb6a6ffc24a1f6e))

# [34.1.0](https://github.com/dhis2/data-visualizer-app/compare/v34.0.7...v34.1.0) (2020-02-17)


### Features

* fetch legendSet and pass as prop to plugins ([#666](https://github.com/dhis2/data-visualizer-app/issues/666)) ([180a82c](https://github.com/dhis2/data-visualizer-app/commit/180a82c2fd0b8a564e406f2c369827f03431c18e))

## [34.0.7](https://github.com/dhis2/data-visualizer-app/compare/v34.0.6...v34.0.7) (2020-02-17)


### Bug Fixes

* fix default state for LegendSet option ([#668](https://github.com/dhis2/data-visualizer-app/issues/668)) ([3bfda8c](https://github.com/dhis2/data-visualizer-app/commit/3bfda8cfbb4632c1ef93c56c553f56b9a928c741))

## [34.0.6](https://github.com/dhis2/data-visualizer-app/compare/v34.0.5...v34.0.6) (2020-02-17)


### Bug Fixes

* correct number parsing and rendering with @dhis2/analytics@3.3.3 ([#669](https://github.com/dhis2/data-visualizer-app/issues/669)) ([6943361](https://github.com/dhis2/data-visualizer-app/commit/69433610a84a6cbf5441e198bc880ad706fd1f0e))

## [34.0.5](https://github.com/dhis2/data-visualizer-app/compare/v34.0.4...v34.0.5) (2020-02-14)


### Bug Fixes

* minor ui glitches ([#667](https://github.com/dhis2/data-visualizer-app/issues/667)) ([d8e8e9e](https://github.com/dhis2/data-visualizer-app/commit/d8e8e9ef3492b7d070a74a6a2867e1afe1e9ad15))

## [34.0.4](https://github.com/dhis2/data-visualizer-app/compare/v34.0.3...v34.0.4) (2020-02-14)


### Bug Fixes

* owner filter label (DHIS2-8263) ([#659](https://github.com/dhis2/data-visualizer-app/issues/659)) ([591bbe5](https://github.com/dhis2/data-visualizer-app/commit/591bbe5474a118db27a9b45174dbc87a692f2df8))

## [34.0.3](https://github.com/dhis2/data-visualizer-app/compare/v34.0.2...v34.0.3) (2020-02-14)


### Bug Fixes

* data with multiple indicators error message ([#658](https://github.com/dhis2/data-visualizer-app/issues/658)) ([f200787](https://github.com/dhis2/data-visualizer-app/commit/f2007875125986c29c908c28b6b50c6f84c72852))

## [34.0.2](https://github.com/dhis2/data-visualizer-app/compare/v34.0.1...v34.0.2) (2020-02-13)


### Bug Fixes

* missing Pivot options ([#665](https://github.com/dhis2/data-visualizer-app/issues/665)) ([6aea633](https://github.com/dhis2/data-visualizer-app/commit/6aea6330ae370697a4c30418a50777d14c31e40f))

## [34.0.1](https://github.com/dhis2/data-visualizer-app/compare/v34.0.0...v34.0.1) (2020-02-13)


### Bug Fixes

* upgrade @dhis2/analytics for latest pivot table features ([#663](https://github.com/dhis2/data-visualizer-app/issues/663)) ([d35ddd9](https://github.com/dhis2/data-visualizer-app/commit/d35ddd9a9e452c9730a5d5c34f978e405bcb9b89))

# [34.0.0](https://github.com/dhis2/data-visualizer-app/compare/v33.0.0...v34.0.0) (2020-02-12)


### Bug Fixes

* correctly specify runtime and peer dependencieis ([#662](https://github.com/dhis2/data-visualizer-app/issues/662)) ([a2e3f60](https://github.com/dhis2/data-visualizer-app/commit/a2e3f60c5fc911f32f6a2e7576950a24df81c499))


### BREAKING CHANGES

* The Data Visualizer Plugin now requires react and react-dom to be provided by the consumer.

# [33.0.0](https://github.com/dhis2/data-visualizer-app/compare/v32.0.3...v33.0.0) (2020-02-12)


### Bug Fixes

* @dhis2/analytics 2.6.11 ([#448](https://github.com/dhis2/data-visualizer-app/issues/448)) ([231bcd8](https://github.com/dhis2/data-visualizer-app/commit/231bcd8af542e13a343f07886b2b675c6c997523))
* added icons to tooltip for warning and locked ([#447](https://github.com/dhis2/data-visualizer-app/issues/447)) ([26a95e8](https://github.com/dhis2/data-visualizer-app/commit/26a95e8fe73bdc20c45bd22394069214f723c9fa))
* added lint, commit message and test commit/push hooks ([#526](https://github.com/dhis2/data-visualizer-app/issues/526)) ([0292a63](https://github.com/dhis2/data-visualizer-app/commit/0292a63c5552349f77844e14c431ea8d9735d32d))
* adjust options dialog for easier scanning ([#580](https://github.com/dhis2/data-visualizer-app/issues/580)) ([b0393ff](https://github.com/dhis2/data-visualizer-app/commit/b0393ff2528fc38142fec7e2fadfd0fa64d402ba))
* assigned categories and new dimension types ([#576](https://github.com/dhis2/data-visualizer-app/issues/576)) ([2faae50](https://github.com/dhis2/data-visualizer-app/commit/2faae50e9d23494cdad8268e986c20890b20deca))
* avoid infinite loading and make chart plugin use hooks (DHIS2-8290) ([#653](https://github.com/dhis2/data-visualizer-app/issues/653)) ([9de60dd](https://github.com/dhis2/data-visualizer-app/commit/9de60dd2bea0f6fad1e2c4c32586f75782944dcf))
* avoid React warning about required proptype ([#311](https://github.com/dhis2/data-visualizer-app/issues/311)) ([5dda862](https://github.com/dhis2/data-visualizer-app/commit/5dda862cc28a9a0b0bdbb33a91c941cbe446e380))
* changed height to min-height for the axes area ([#361](https://github.com/dhis2/data-visualizer-app/issues/361)) ([8c0ed13](https://github.com/dhis2/data-visualizer-app/commit/8c0ed1324275082b7c171104196524f236bf5696))
* changed incorrect prop types and tests ([#372](https://github.com/dhis2/data-visualizer-app/issues/372)) ([c96ac09](https://github.com/dhis2/data-visualizer-app/commit/c96ac099af5854a1e8dd4c194a5c1c8be78b87cb))
* chip cursor ([#566](https://github.com/dhis2/data-visualizer-app/issues/566)) ([8701256](https://github.com/dhis2/data-visualizer-app/commit/8701256b69cb39a98ca3d14182c71585b531ac2d))
* convert numeric options to strings to silence ui-core warnings ([#617](https://github.com/dhis2/data-visualizer-app/issues/617)) ([c3fe18d](https://github.com/dhis2/data-visualizer-app/commit/c3fe18d169c66a81d51e9adb10e45cb1db690e44))
* correctly set showDimensionLabels option ([#621](https://github.com/dhis2/data-visualizer-app/issues/621)) ([01427ac](https://github.com/dhis2/data-visualizer-app/commit/01427acd1787bdbd190f32b043bada9e8a5d7f30))
* d2-ui-analytics 1.0.2 ([#277](https://github.com/dhis2/data-visualizer-app/issues/277)) ([62241f8](https://github.com/dhis2/data-visualizer-app/commit/62241f85c2c2cbf6f66df42927240b5fd82d18f4))
* dashboard items resize should trigger chart reload ([#282](https://github.com/dhis2/data-visualizer-app/issues/282)) ([86070ae](https://github.com/dhis2/data-visualizer-app/commit/86070ae9debd5abca40c023690df80cdda2aee9f))
* dimension dialog update validation ([#486](https://github.com/dhis2/data-visualizer-app/issues/486)) ([429c51e](https://github.com/dhis2/data-visualizer-app/commit/429c51eadb4927322b07a66974229722156e6e6d))
* dimensions panel divided in to sections ([#581](https://github.com/dhis2/data-visualizer-app/issues/581)) ([3a9627a](https://github.com/dhis2/data-visualizer-app/commit/3a9627a65ac730d000eb9727cd383f8e23e0e649))
* do not run default adapter for pivot tables ([#616](https://github.com/dhis2/data-visualizer-app/issues/616)) ([27d8ab7](https://github.com/dhis2/data-visualizer-app/commit/27d8ab7e2d08ebac5b084038674a5c28b9ee62da))
* don't render pivot table before data has loaded ([#635](https://github.com/dhis2/data-visualizer-app/issues/635)) ([844d989](https://github.com/dhis2/data-visualizer-app/commit/844d98973a77639c756f1bfdf61011dfdda559e5))
* download menu options for PT ([#624](https://github.com/dhis2/data-visualizer-app/issues/624)) ([c131970](https://github.com/dhis2/data-visualizer-app/commit/c1319705b6b817988840c5c2719f7198533d9fb2))
* dynamic axis names based on vis type ([#623](https://github.com/dhis2/data-visualizer-app/issues/623)) ([24510e0](https://github.com/dhis2/data-visualizer-app/commit/24510e0fcadf1a4f81e3532566b3df1811182446))
* equal padding for the AO title bar ([#567](https://github.com/dhis2/data-visualizer-app/issues/567)) ([17238ed](https://github.com/dhis2/data-visualizer-app/commit/17238ed30449b5aa7d7f6989602df96bc10585c5))
* Fetching analytics for analytical object with undefined aggregationType in plugin ([#232](https://github.com/dhis2/data-visualizer-app/issues/232)) ([bfe41b4](https://github.com/dhis2/data-visualizer-app/commit/bfe41b4eb2784bc2a5d854833510ad41e1ce0b14))
* Fetching analytics for year over year charts in plugin ([#231](https://github.com/dhis2/data-visualizer-app/issues/231)) ([16853ef](https://github.com/dhis2/data-visualizer-app/commit/16853ef7e205b89eb2072e860b1124ececdaa4c3))
* fix prop type for value in SortOrder option component ([#568](https://github.com/dhis2/data-visualizer-app/issues/568)) ([8379621](https://github.com/dhis2/data-visualizer-app/commit/8379621a179ce72c922c259beac5463f0a6529ac))
* fix styling issues in options ([#585](https://github.com/dhis2/data-visualizer-app/issues/585)) ([d4c5bc6](https://github.com/dhis2/data-visualizer-app/commit/d4c5bc674ec8b07208694ffd227f98ff3326d38d))
* fix values for topLimit option ([#579](https://github.com/dhis2/data-visualizer-app/issues/579)) ([3d249a6](https://github.com/dhis2/data-visualizer-app/commit/3d249a6e52348a06604a2b5b57df8f7dadf51f2e))
* fixes for DND between axes ([#554](https://github.com/dhis2/data-visualizer-app/issues/554)) ([886de23](https://github.com/dhis2/data-visualizer-app/commit/886de23efdb0d2b84043707d16316e38f813c945))
* fixes for options with numeric values and toggleable Select ([#583](https://github.com/dhis2/data-visualizer-app/issues/583)) ([8a40296](https://github.com/dhis2/data-visualizer-app/commit/8a40296e2d4e85e6af594989ba6869285bc32bb0))
* gauge now follows the behaviour of single value instead of pie ([#489](https://github.com/dhis2/data-visualizer-app/issues/489)) ([9969e61](https://github.com/dhis2/data-visualizer-app/commit/9969e61d806780724dce7804922c93ddb3d33552))
* gauge plot lines and range values in options ([#654](https://github.com/dhis2/data-visualizer-app/issues/654)) ([7736b29](https://github.com/dhis2/data-visualizer-app/commit/7736b2964eb6b460a51e19b0fde8ac5ff5786a2b))
* i18n merge conflict ([ac8c383](https://github.com/dhis2/data-visualizer-app/commit/ac8c383090975bfe8081b1109bcda7ec7d2b7758))
* impl max dims rule ([#517](https://github.com/dhis2/data-visualizer-app/issues/517)) ([241de69](https://github.com/dhis2/data-visualizer-app/commit/241de69704fffac551d902838986f1f0da9ed592))
* implemented the error code for assigned categories ([#557](https://github.com/dhis2/data-visualizer-app/issues/557)) ([7b9f52b](https://github.com/dhis2/data-visualizer-app/commit/7b9f52b96cd569e291a56c813d263674d6666b2a))
* layout for pivot tables ([#577](https://github.com/dhis2/data-visualizer-app/issues/577)) ([033be21](https://github.com/dhis2/data-visualizer-app/commit/033be21e108c7e80cfb0bd9e8258a339066bd8a5))
* loading spinner for plugins (DHIS2-8117) ([#587](https://github.com/dhis2/data-visualizer-app/issues/587)) ([f8be30b](https://github.com/dhis2/data-visualizer-app/commit/f8be30bfb59cee3f10ceb591311052134042b3d6))
* locked dims not array ([#491](https://github.com/dhis2/data-visualizer-app/issues/491)) ([15ae8a8](https://github.com/dhis2/data-visualizer-app/commit/15ae8a819604b3cc8acf8b66e9f824a962255673))
* long names for dimensions, chip and tooltip (DHIS2-7932) ([#556](https://github.com/dhis2/data-visualizer-app/issues/556)) ([2212398](https://github.com/dhis2/data-visualizer-app/commit/221239844319d2dc7ba3aa98636b057ebfef4ef2))
* manifest credentials bug in chrome ([#233](https://github.com/dhis2/data-visualizer-app/issues/233)) ([a0032e0](https://github.com/dhis2/data-visualizer-app/commit/a0032e00e1adbc597969a40d0d0c4184681e6f8e))
* map is not vis type ([#371](https://github.com/dhis2/data-visualizer-app/issues/371)) ([22c36e2](https://github.com/dhis2/data-visualizer-app/commit/22c36e27bc963ea13b6cc2af9765806ff14b339f))
* merge conflicts ([3eb1c77](https://github.com/dhis2/data-visualizer-app/commit/3eb1c77977b386bff1c55d6124b30c6dbb3258d6))
* only point series to axes for certain types ([#264](https://github.com/dhis2/data-visualizer-app/issues/264)) ([24b6ac0](https://github.com/dhis2/data-visualizer-app/commit/24b6ac0c3fa2086429d51bce3495c7cb728b559b))
* only run empty check after all values have been added ([#627](https://github.com/dhis2/data-visualizer-app/issues/627)) ([75b6ae4](https://github.com/dhis2/data-visualizer-app/commit/75b6ae4261fab93a9def58e248489dbe67174c4b))
* open modal for empty dims ([#625](https://github.com/dhis2/data-visualizer-app/issues/625)) ([e07d786](https://github.com/dhis2/data-visualizer-app/commit/e07d786b20a64dd88e1c96c6d8519044e4f56dec))
* options with numeric values (sortOrder) ([#564](https://github.com/dhis2/data-visualizer-app/issues/564)) ([94ad11d](https://github.com/dhis2/data-visualizer-app/commit/94ad11d642244cec1902c84df5cd0ec89e988bd4))
* org unit selector - only act on path if it exists ([#276](https://github.com/dhis2/data-visualizer-app/issues/276)) ([9299038](https://github.com/dhis2/data-visualizer-app/commit/92990383e69e6765c3eab8d8e0aa20c8e4c651b8))
* pie tooltip DHIS2-7532 ([#330](https://github.com/dhis2/data-visualizer-app/issues/330)) ([72eb5db](https://github.com/dhis2/data-visualizer-app/commit/72eb5db4d9f0ab2953ef7ee3ff71511622f454f4))
* pin to analytics@2.6.11 ([#495](https://github.com/dhis2/data-visualizer-app/issues/495)) ([5f21406](https://github.com/dhis2/data-visualizer-app/commit/5f21406aa3430c4db4e375bd28d18cd90797e022))
* pin to analytics@2.6.11 ([#495](https://github.com/dhis2/data-visualizer-app/issues/495)) ([25b4545](https://github.com/dhis2/data-visualizer-app/commit/25b454541658e69ca9ed197699f53bc811de5ad5))
* properly set layout on vis type change for all vis types ([#586](https://github.com/dhis2/data-visualizer-app/issues/586)) ([489fbf9](https://github.com/dhis2/data-visualizer-app/commit/489fbf923d38f95f2739927ffe545161fa04d13a))
* provide useful error messages (DHIS2-5029) ([#552](https://github.com/dhis2/data-visualizer-app/issues/552)) ([ef16c68](https://github.com/dhis2/data-visualizer-app/commit/ef16c687d02a8733a6a1768198a1879793fcd64a))
* remove api.baseUrl duplicate ([#573](https://github.com/dhis2/data-visualizer-app/issues/573)) ([ac05af6](https://github.com/dhis2/data-visualizer-app/commit/ac05af6c896b92e274fe0c35bfba0a55459734f9))
* remove code climate config for now ([80c891a](https://github.com/dhis2/data-visualizer-app/commit/80c891a852b756d230cdd114533e4e10f1756136))
* remove colon from chip if no selection ([#312](https://github.com/dhis2/data-visualizer-app/issues/312)) ([e667134](https://github.com/dhis2/data-visualizer-app/commit/e667134f73e858f379968e82b34321a3f88b2c6a))
* remove custom title when Auto is selected (DHIS2-8252) ([#636](https://github.com/dhis2/data-visualizer-app/issues/636)) ([44ed1a5](https://github.com/dhis2/data-visualizer-app/commit/44ed1a58513439dafbad51f0977b260a22b9c2f0))
* remove ripple effect in dimension list when drag starts/ends ([#584](https://github.com/dhis2/data-visualizer-app/issues/584)) ([c91ed3b](https://github.com/dhis2/data-visualizer-app/commit/c91ed3b85676291d3be13bc46d8ff07d6f2f7388))
* rename axis name constants ([#445](https://github.com/dhis2/data-visualizer-app/issues/445)) ([b75967a](https://github.com/dhis2/data-visualizer-app/commit/b75967a8fb5bd056ad6ebc0983ef422f6eefdcc3))
* rules dim handling ([#446](https://github.com/dhis2/data-visualizer-app/issues/446)) ([445f1d8](https://github.com/dhis2/data-visualizer-app/commit/445f1d840d3d5f8e7764869eb29c27a237ad30c7))
* single value without dx items ([#313](https://github.com/dhis2/data-visualizer-app/issues/313)) ([f1fbe22](https://github.com/dhis2/data-visualizer-app/commit/f1fbe22398e35210e0852e9a16424f9967794e72))
* start screen icons ([#558](https://github.com/dhis2/data-visualizer-app/issues/558)) ([841c9c7](https://github.com/dhis2/data-visualizer-app/commit/841c9c716ef361f42cbc4d49784483f0141d5ff6))
* swap full axis dims to filter ([#518](https://github.com/dhis2/data-visualizer-app/issues/518)) ([a79e329](https://github.com/dhis2/data-visualizer-app/commit/a79e3296c3adead801a22a437c76b2240a5ff3ab))
* tooltip message ([#449](https://github.com/dhis2/data-visualizer-app/issues/449)) ([ca55b7e](https://github.com/dhis2/data-visualizer-app/commit/ca55b7e7afc590f65229f23a9af01f617c04644f))
* turn class vars into functions ([#569](https://github.com/dhis2/data-visualizer-app/issues/569)) ([236885b](https://github.com/dhis2/data-visualizer-app/commit/236885bebfc96e85ac179418268cdce057684d7f))
* ui glitches ([#618](https://github.com/dhis2/data-visualizer-app/issues/618)) ([2788daf](https://github.com/dhis2/data-visualizer-app/commit/2788daf2e57968ceed670946cfa61361c956912d))
* ui updates to the start screen ([#548](https://github.com/dhis2/data-visualizer-app/issues/548)) ([20dd6ca](https://github.com/dhis2/data-visualizer-app/commit/20dd6ca4b1001a7b225205738ba74644af549ee9))
* ui updates to the start screen ([#548](https://github.com/dhis2/data-visualizer-app/issues/548)) ([fee2153](https://github.com/dhis2/data-visualizer-app/commit/fee2153fecdac157fdcefb6b5152bbaf0f3a9003))
* update @dhis2/analytics dependency ([#319](https://github.com/dhis2/data-visualizer-app/issues/319)) ([5752bea](https://github.com/dhis2/data-visualizer-app/commit/5752beab4290effd685cb661bc0d570db54d0a4d))
* update analytics and plugin dep ([#324](https://github.com/dhis2/data-visualizer-app/issues/324)) ([8bb0202](https://github.com/dhis2/data-visualizer-app/commit/8bb02023ede17970015f28eddb254ab73715a9be))
* update charts api dep ([#297](https://github.com/dhis2/data-visualizer-app/issues/297)) ([ab13e1c](https://github.com/dhis2/data-visualizer-app/commit/ab13e1c3177331f948a90f3eb5d4817ac989a57a))
* update gradient colors check ([#261](https://github.com/dhis2/data-visualizer-app/issues/261)) ([b39cec2](https://github.com/dhis2/data-visualizer-app/commit/b39cec22e96eef53dc122b19b8bad117fd6e93ba))
* update plugin dependency ([#318](https://github.com/dhis2/data-visualizer-app/issues/318)) ([452a287](https://github.com/dhis2/data-visualizer-app/commit/452a28775aa2d124afb9f453df24cace02ec68a2))
* update plugin version ([#320](https://github.com/dhis2/data-visualizer-app/issues/320)) ([3921334](https://github.com/dhis2/data-visualizer-app/commit/392133404d21d56704282f591e88d2edc1d8023e))
* update recuder to handle empty axes ([#630](https://github.com/dhis2/data-visualizer-app/issues/630)) ([077dd68](https://github.com/dhis2/data-visualizer-app/commit/077dd68229ac5166c8ae75a7912983c8649fe262))
* updated proptype for error ([#553](https://github.com/dhis2/data-visualizer-app/issues/553)) ([21a9b4a](https://github.com/dhis2/data-visualizer-app/commit/21a9b4a47b96baecd6273c72ebd92dcdf1770d8c))
* upgrade @dhis2/analytics to fix dimension dialog styling ([#551](https://github.com/dhis2/data-visualizer-app/issues/551)) ([c90f2b8](https://github.com/dhis2/data-visualizer-app/commit/c90f2b8556a9d4c05a6202430d81acad98db0d3e))
* upgrade @dhis2/cli-app-scripts and use platform-provided height ([#550](https://github.com/dhis2/data-visualizer-app/issues/550)) ([b6ffdfb](https://github.com/dhis2/data-visualizer-app/commit/b6ffdfb0bf754f2255312524dcbac911dd5c5351))
* upgrade cli-app-scripts to fix package resolution ([#540](https://github.com/dhis2/data-visualizer-app/issues/540)) ([a52f7f3](https://github.com/dhis2/data-visualizer-app/commit/a52f7f3df2af63cc67d1245e2a4e55a3f0b80eba))
* use a doc-like icon for PT downloads ([#626](https://github.com/dhis2/data-visualizer-app/issues/626)) ([a407372](https://github.com/dhis2/data-visualizer-app/commit/a4073729aab3a99980aab8957136a3412c032a4e))
* use axisName instead of axisKey ([204fe7a](https://github.com/dhis2/data-visualizer-app/commit/204fe7abc0b505ff0ff5a3de1368744cbecaf8f6))
* use layout type to get the right layout comp ([#563](https://github.com/dhis2/data-visualizer-app/issues/563)) ([17c26ba](https://github.com/dhis2/data-visualizer-app/commit/17c26bae480b59d0a76b9165e5fe5a71ac3d619d))
* use locked dimensions rule from analytics ([#444](https://github.com/dhis2/data-visualizer-app/issues/444)) ([883304f](https://github.com/dhis2/data-visualizer-app/commit/883304f7b8e83570c2ba7cfa97129c85d39fe835))
* use max items rule ([#373](https://github.com/dhis2/data-visualizer-app/issues/373)) ([ded0ee9](https://github.com/dhis2/data-visualizer-app/commit/ded0ee9836c98bdb7565c909a57aa0faa1d63c28))
* use shared vis types ([#368](https://github.com/dhis2/data-visualizer-app/issues/368)) ([26d12c6](https://github.com/dhis2/data-visualizer-app/commit/26d12c61d35feb148c65cc67b4bb3250d35b3c79))
* viewport layout with visible interpretations panel ([#323](https://github.com/dhis2/data-visualizer-app/issues/323)) ([2e2803b](https://github.com/dhis2/data-visualizer-app/commit/2e2803b7e26880e97b3ea9cf67b48fe8582900ff))
* vis type imports ([#496](https://github.com/dhis2/data-visualizer-app/issues/496)) ([2a1daaf](https://github.com/dhis2/data-visualizer-app/commit/2a1daaf0fbadfe2dbd7896db6f273e07bb63cc91))


### chore

* **github-actions:** add workflows for lint and publish ([#638](https://github.com/dhis2/data-visualizer-app/issues/638)) ([739bb13](https://github.com/dhis2/data-visualizer-app/commit/739bb132cd4e58505d13fbfda045f9d69f9feed5))


### Features

* add dnd from dimensions to specific position in layout axis ([#575](https://github.com/dhis2/data-visualizer-app/issues/575)) ([7c573b7](https://github.com/dhis2/data-visualizer-app/commit/7c573b7d8e9fced8b97c86f6c8167a424f10ab4d))
* assigned categories DHIS2-7701 ([#539](https://github.com/dhis2/data-visualizer-app/issues/539)) ([636b365](https://github.com/dhis2/data-visualizer-app/commit/636b36597aeff3ad037ffca687d7bfce5473b762))
* drag 'n drop for reordering dimension items in layout ([#519](https://github.com/dhis2/data-visualizer-app/issues/519)) ([efd4acb](https://github.com/dhis2/data-visualizer-app/commit/efd4acbf6d6d3c1a5e19c4aa6e8d7b99417cc308))
* dual axis support ([#239](https://github.com/dhis2/data-visualizer-app/issues/239)) ([a50075c](https://github.com/dhis2/data-visualizer-app/commit/a50075c70540fa5167f4b39dfced7e4a233e0f51))
* multiple orgunit roots support ([#328](https://github.com/dhis2/data-visualizer-app/issues/328)) ([e85668f](https://github.com/dhis2/data-visualizer-app/commit/e85668ff7c24bff00e26b20107211cccd9f73666))
* show most viewed saved AO (DHIS2-7835) ([#547](https://github.com/dhis2/data-visualizer-app/issues/547)) ([97b0622](https://github.com/dhis2/data-visualizer-app/commit/97b06221e606b683d8a36e86bbd30226f05e44c9))
* summarize chart filters that have orgunit levels and/or groups ([#298](https://github.com/dhis2/data-visualizer-app/issues/298)) ([e5e0a7b](https://github.com/dhis2/data-visualizer-app/commit/e5e0a7bba3b718a1d5adf8607a86009e7dc462be))
* use layout rules for add-to-layout ui ([#362](https://github.com/dhis2/data-visualizer-app/issues/362)) ([a3dbb9f](https://github.com/dhis2/data-visualizer-app/commit/a3dbb9fb20356b3aa303155de98e16795dcffaf6))
* use new pivot engine ([#574](https://github.com/dhis2/data-visualizer-app/issues/574)) ([f4ccef1](https://github.com/dhis2/data-visualizer-app/commit/f4ccef104605eb7ae91a87ef57604fdc1664ff3e))
* WIP pivot table type ([#335](https://github.com/dhis2/data-visualizer-app/issues/335)) ([626f447](https://github.com/dhis2/data-visualizer-app/commit/626f447cf99ee47ee76ccf4f8938cc96efb4f641))


### Reverts

* Revert "fix: use lerna to share code instead of copying resources (#214)" (#216) ([de00b4f](https://github.com/dhis2/data-visualizer-app/commit/de00b4fad47369e396ca0c1d43fe5bbf138ed59f)), closes [#214](https://github.com/dhis2/data-visualizer-app/issues/214) [#216](https://github.com/dhis2/data-visualizer-app/issues/216)


### BREAKING CHANGES

* **github-actions:** Ensure that the plugin and app versions are locked to each other.
