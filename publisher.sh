#!/usr/bin/env sh
npm run build
cp package.json dist/package.json
cp README.md dist/README.md
cd dist
npm publish --access public --force