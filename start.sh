#!/bin/bash
shopt -s extglob
cp -r !(node_modules) /home/project
cd /home/project
npm install
npm start