FROM node:20 AS build-env

ADD package.json /app/
ADD package-lock.json /app/
ADD server.js /app/
ADD public/ /app/public/

RUN cd /app; npm ci --only=production

FROM gcr.io/distroless/nodejs20
COPY --from=build-env /app /app
WORKDIR /app
ENV PORT 8080
EXPOSE 8080
CMD [ "server.js" ]