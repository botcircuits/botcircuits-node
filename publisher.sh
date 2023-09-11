#!/usr/bin/env sh
npm run build
cp package.json dist/package.json
cd dist
npm publish --access public --force