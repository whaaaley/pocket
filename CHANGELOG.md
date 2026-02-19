# Changelog

## February 19, 2026 — Code hygiene and documentation fixes

Cleaned up all linting errors across the project. Stylelint and ESLint both pass with zero errors and zero warnings.

Fixed typos and errors in the intro guide: "managment" to "management", "paramters" to "parameters", "globaly" to "globally", corrected awkward phrasing, and fixed the router example to import `router` instead of `pocket`.

## February 18, 2026 — Lock all dependency versions

Locked every dependency to an exact version to freeze the project and ensure reproducible builds.

### dependencies

| Package | Published | Version | Notes |
|---|---|---|---|
| classcat | April 2, 2024 | 5.0.5 | Latest 5.x |
| superfine | February 8, 2021 | 8.2.0 | Only 8.x release |

### devDependencies

| Package | Published | Version | Notes |
|---|---|---|---|
| @babel/core | January 31, 2026 | 7.29.0 | Latest 7.x |
| @babel/plugin-syntax-jsx | January 12, 2026 | 7.28.6 | Latest 7.x |
| @mapbox/rehype-prism | November 1, 2023 | 0.9.0 | Latest 0.x |
| @mdx-js/esbuild | February 9, 2023 | 2.3.0 | Latest 2.x; v3+ requires ESM-only |
| @tabler/icons | December 29, 2022 | 1.119.0 | Latest 1.x; v2+ breaks SVG directory structure used by toolchain |
| babel-plugin-preval | February 2, 2022 | 5.1.0 | Only 5.x release |
| clean-css | November 30, 2023 | 5.3.3 | Latest 5.x |
| culori | February 21, 2023 | 2.1.1 | Latest 2.x; v3+ has breaking CSS parsing and function renames |
| esbuild | August 8, 2022 | 0.14.54 | Latest 0.14.x; 0.15+ breaks serve and incremental APIs used by toolchain |
| escape-html | September 1, 2015 | 1.0.3 | Only release |
| fast-glob | January 5, 2025 | 3.3.3 | Latest 3.x |
| mini-svg-data-uri | March 9, 2022 | 1.4.4 | Only 1.x release |
| sass | September 3, 2024 | 1.78.0 | Latest before color-4-api breaking change; 1.79+ conflicts with custom color() function |
| svgo | November 2, 2021 | 2.8.0 | Latest 2.x; v3+ is a breaking change |
| typescript | January 30, 2023 | 4.9.5 | Latest 4.x; v5+ has breaking decorator and module resolution changes |
| uglify-js | August 29, 2024 | 3.19.3 | Latest 3.x |

### optionalDependencies (linters)

| Package | Published | Version | Notes |
|---|---|---|---|
| eslint | September 16, 2024 | 8.57.1 | Latest 8.x; v9 requires flat config migration |
| eslint-config-standard | May 29, 2023 | 17.1.0 | Latest 17.x; requires eslint 8 |
| eslint-plugin-import | June 20, 2025 | 2.32.0 | Latest 2.x |
| eslint-plugin-n | January 9, 2024 | 16.6.2 | Latest compatible with eslint-config-standard@17 |
| eslint-plugin-promise | July 21, 2024 | 6.6.0 | Latest 6.x |
| eslint-plugin-react | April 3, 2025 | 7.37.5 | Latest 7.x |
| stylelint | December 29, 2022 | 14.16.1 | Latest 14.x; v15+ drops Node 14 support |
| stylelint-config-clean-order | July 3, 2024 | 6.1.0 | Latest compatible with stylelint 14; v7+ requires stylelint 16 |
| stylelint-config-standard-scss | November 4, 2022 | 6.1.0 | Latest compatible with stylelint 14; v7+ requires stylelint 15 |
