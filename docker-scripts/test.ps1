docker exec -it -w /usr/src/cexweb cexweb-build-env rm -rfd dist
docker exec -it -w /usr/src/cexweb cexweb-build-env rm -rfd src
docker cp ../. cexweb-build-env:/usr/src/cexweb
#docker exec -it -w /usr/src/cexweb cexweb-build-env ls -al
docker exec -it -w /usr/src/cexweb cexweb-build-env npm run build
docker exec -it -w /usr/src/cexweb cexweb-build-env http-server /usr/src/cexweb/dist