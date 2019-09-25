# cexweb
frontend web dev

## Build docker image at project root
docker build -t cexweb-build-env .

## Build project in docker container
docker run -itd --rm --name cexweb-build-env cexweb-build-env /bin/bash

docker cp . cexweb-build-env:/usr/src/cexweb

docker exec -it -w /usr/src/cexweb cexweb-build-env npm install

docker exec -it -w /usr/src/cexweb cexweb-build-env npm run build

docker cp cexweb-build-env:/usr/src/cexweb/dist .

docker stop cexweb-build-env

## Host static pages as a local server on port 43001
docker run -d -p 43001:8080 --rm --name cexweb-build-env cexweb-build-env http-server /usr/src/cexweb/dist