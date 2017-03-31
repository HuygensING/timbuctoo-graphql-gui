########################################################################################################################
# The following is copied from Dockerfile.buildbase
# these files need to be kept in sync manually!
# 
# Copying the statements here allows us to do a `docker build --squash` that results in a much smaller executable 
# container
#
# if a build does not work, you might want to try to replace these lines with
#
#     FROM huygensing/scaffold:buildbase
#
# this results in a *much* bigger container, but this build is also *much* more likely to succeed
########################################################################################################################
FROM node:7.7.4-alpine
########################################################################################################################
# Don't forget to update the Dockerfile as well!
########################################################################################################################

WORKDIR /
COPY ./package.json /package.json
COPY ./yarn.lock /yarn.lock
#store all packages locally so we have a bigger chance of having a reproducable build
RUN yarn install


WORKDIR /app
#expects to be called with . mounted under /app
CMD ["node", "./fileserver/index.js", "development"]

########################################################################################################################
# End of Dockerfile.buildbase copy
########################################################################################################################
COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./tslint.json /app/tslint.json

RUN /node_modules/.bin/tslint -t codeFrame -c tslint.json --project tsconfig.json --type-check
RUN /node_modules/.bin/webpack -p --config /app/src/configs/webpack/webpack.config.js

#this image is built using --squash so this will reduce the size of the image by removing all dependencies
#that are only needed at build time
RUN rm -r /node_modules
RUN rm -r /app/src

#install the modules needed during a prod run
#putting them in the prod dependencies doesn't work yarn install --production will install a lot of packages that
#are not needed (and will not be installed when we call yarn add like below)
RUN rm package.json
RUN yarn add \
  express@4.15.2 \
  # serve-static@1.12.1 \
  # morgan@1.8.1 \
  # static-expiry@0.0.11 \
  # hogan.js@3.0.2 \
  # finalhandler@1.0.1 \
  --exact

RUN yarn cache clean
RUN yarn clean

COPY ./src/static /app/static
COPY ./fileserver /app/fileserver

CMD ["node", "./fileserver/index.js"]
