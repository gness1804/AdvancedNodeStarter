#!/bin/bash

sed -i -e 's/\/\/ browser.close();/browser.close();/g' tests/header.test.js
sed -i -e "s/\/\/ exec('npm run test:kill');/exec('npm run test:kill');/g" tests/header.test.js

rm tests/*-e
