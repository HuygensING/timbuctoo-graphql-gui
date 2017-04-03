#!/bin/bash

function launchTs() {
  rm -r ./src/configs/gemini/tsc-output
  if [ "$1" == "watch" ]; then
    /node_modules/.bin/tsc -p ./src/configs/gemini/tsconfig.json --watch &> tsc.log &
    tsPid=$!
    while ! grep -vq "Compilation complete" tsc.log; do 
      sleep 1;
    done
  else 
    /node_modules/.bin/tsc -p ./src/configs/gemini/tsconfig.json
  fi
}


function launchServer() {
  node ./fileserver/index.js $1 &> server.log &
  serverPid=$!
  while ! grep -vq "Server available" server.log; do 
    sleep 1;
  done
}

function launchGeminiAndWait() {
  cd ./src/configs/gemini
  if [ $1 = "development" ]; then
    /node_modules/.bin/gemini-gui -c ./gemini.yml --root-url http://localhost:8081 -p 8083 -h 0.0.0.0 ./suite.js &
    geminiPid=$!
    wait $tsPid $serverPid $geminiPid
  else
    /node_modules/.bin/gemini -c ./gemini.yml --root-url http://localhost:8080 test ./suite.js
  fi
}

function killBackgroundJobs() {
  kill -TERM $tsPid $serverPid $geminiPid
  wait $tsPid $serverPid $geminiPid
}

trap 'killBackgroundJobs' TERM INT

if [ "$1" = "development" ]; then
  launchTs watch
  launchServer development
  launchGeminiAndWait development
elif [ "$1" = "dockerbuild" ]; then
  launchTs
  launchServer
  launchGeminiAndWait
  killBackgroundJobs
else
  echo "you should specifiy development or dockerbuild as the first argument instead of '$1'"
  exit 1
fi