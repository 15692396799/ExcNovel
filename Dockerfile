# stage1: use node to build app
FROM node:latest AS builder
WORKDIR /portal
COPY . .


# use proxy or not
ARG proxy=""
RUN if ["proxy" != ""]; \
    then npm config set proxy "proxy" && npm config set https-proxy "proxy"; \
    else echo Do not set proxy; \
    fi
RUN npm install

# set tsc(typescript) and vite excute permission
RUN chmod +x node_modules/.bin/tsc
RUN chmod +x node_modules/.bin/vite

RUN npm run build


#stage2: use nginx images
FROM nginx:latest
WORKDIR /portal
#copy from build stage
COPY --from=builder /portal/dist /usr/share/nginx/html
##### need to learn about 
#delete default conf
RUN rm -rf /etc/nginx/conf.d/default.conf
#copy custom nginx conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
#copy default configure template file
COPY nginx/default.conf.template /etc/nginx/conf.d
#active
CMD /bin/sh -c "envsubst '80' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g "daemon off;"
