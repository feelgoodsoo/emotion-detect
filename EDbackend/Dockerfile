FROM python:latest

WORKDIR /django

COPY . .

RUN pip3 install -r requirements.txt

#CMD ["gunicorn", "--bind", "0.0.0.0:8000", "EDbackend.wsgi:application"]

# EXPOSE 8000