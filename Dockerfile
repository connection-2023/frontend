FROM node:18-alpine
# set working directory
WORKDIR /app
# install app dependencies
#copies package.json and package-lock.json to Docker environment
# COPY package-lock.json ./
# 명령어 실행 (의존성 설치)
COPY package.json package-lock.json ./

RUN npm ci
# 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사한다.

EXPOSE 3000
CMD ["npm", "run", "dev"]