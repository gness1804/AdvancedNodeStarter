#!/bin/bash

sed -i -e 's/\/\/ browser.close();/browser.close();/g' tests/header.test.js
sed -i -e "s/\/\/ exec('npm run test:killall');/exec('npm run test:killall');/g" tests/header.test.js

rm tests/*-e
