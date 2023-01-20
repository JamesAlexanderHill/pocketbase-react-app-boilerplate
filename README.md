# Tech stack
1. Vite - Build tool
2. Docker - Infrastructure
3. PocketBase - backend
4. ReactJS - Frontend framework
5. React-Router - Frontend routing
6. TailwindCSS - Frontend styles


# Docker in development
1. Create a .env file with the following environment variables:
    - APP_PORT - 3000
2. run docker commands
    - start - `docker compose up`
    - stop - `docker compose down`

# Docker in production
1. Have a VPS running nginxproxy docker container + acme-companion
2. Copy production `docker-compose.yml` and save to a directory on VPS
3. Create an named external network
4. Create a .env file with the following environment variables:
    - PB_ENCRYPTION - a 32 char string
    - PB_URL - the URL pocketbase will be served at
    - APP_URL - the URL the app will be served at
    - APP_PORT - the port that the application is serving to
5. Run `docker compose up -d`
