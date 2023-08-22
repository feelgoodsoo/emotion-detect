# #base image 설정(as build로 이미지 이름 설정)
# FROM node:14-alpine as build

# #컨테이너 내부 작업 디렉토리 설정
# WORKDIR /app

# #app dependencies
# #컨테이너 내부로 package.json 파일들 복사
# COPY package*.json ./

# #package.json 및 package-lock.json 설치
# RUN npm install

# #호스트 머신의 현재 디렉토리 파일들을 컨테이너 내부로 복사
# COPY . .

# #react file build
# RUN npm run build

# 위에서 만든 컨테이너 이미지를 이용해 nginx 이미지 생성
FROM nginx:stable-alpine

# build 이미지에서 빌드한 결과물을 복사
# COPY --from=build /app/build /usr/share/nginx/html
# 로컬에서 만든 build 폴더를 컨테이너 내부로 복사
COPY  build/ /usr/share/nginx/html

# 기본 nginx 설정 파일 삭제
RUN rm /etc/nginx/conf.d/default.conf

# custom 설정 파일을 컨테이너 내부로 복사
COPY nginx/nginx.conf /etc/nginx/conf.d

# 컨테이너 80번 port open
EXPOSE 80

# nginx 서버 실행 및 백그라운드 동작
CMD ["nginx", "-g", "daemon off;"]