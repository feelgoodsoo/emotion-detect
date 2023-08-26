# This is Demo

### To start, 1. add .env

- add .env in front folder. write REACT_APP_SERVER_URL.  ex -> REACT_APP_SERVER_URL=http://127.0.0.1:8000
- add .env in EDbackend folder.write OPENAI_API_KEY. (see more about in EDbackend/api/viws.py.
now i do hard coding response. change it.)

### 2. handle your cors origin issue

- by filling CORS_ORIGIN_WHITELIST, ALLOWED_HOSTS in EDbackend/EDbackend/settings.py

### 3. RUN

- try this command for run.

```bash
docker-compose up -d
```

### error handling

- check out nginx/nginx-setup.conf
- check out EDbackend/EDbackend/settings.py

### if you wanna know more about this project, check out project-introduce.pdf

<img src="./project-capture/facedetect1.png" height="250"/>
<img src="./project-capture/facedetect2.png" height="250"/>
<img src="./project-capture/chat.png" height="250"/>
