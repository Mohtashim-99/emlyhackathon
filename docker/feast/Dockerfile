# FROM node:22-alpine as builder 

# WORKDIR /app    

# COPY package.json yarn.lock ./
# COPY apps/feast/package.json ./apps/feast/

# RUN  rm -rf node_modules && yarn install

# COPY . .

# EXPOSE 3000



FROM node:22-alpine AS base

RUN apk --no-cache add yarn
RUN yarn set version berry

FROM base AS development

WORKDIR /app

COPY package.json yarn.lock ./
COPY .yarn ./.yarn
COPY .yarnrc.yml ./.yarnrc.yml

COPY apps/feast/package.json ./apps/feast/package.json

RUN rm -rf node_modules && yarn install

COPY . .

EXPOSE 3000 3001