FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt requirements.txt

# RUN pip install --upgrade pip && install -r requirements.txt

# run this command to install all dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY . . 

EXPOSE 8000

CMD [ "gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000" ]