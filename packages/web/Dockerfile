FROM node:20.18-alpine as build
# Set Path to where the files to be copied are located
ARG FOLDER_PATH=.

WORKDIR /app

COPY package.json ./
# RUN corepack use pnpm@10.0.0
# RUN corepack enable
RUN npm i -g pnpm@10.0.0
RUN pnpm i

COPY "${FOLDER_PATH}" ./

RUN pnpm run build

# Step 2 - Setup NGINX
FROM nginx:alpine

# Copy the built React app to Nginx's web server directory
COPY --from=build /app/dist /usr/share/nginx/html 

# Remove the default NGINX configuration (if any) and copy custom NGINX config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]