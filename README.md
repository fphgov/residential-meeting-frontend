# Residential Meeting

Build Docker image

```
docker build --no-cache --pull --tag residential-meeting-frontend:latest .
```

Run docker image with console (development in Linux/MacOS)

```
docker run -it --name residential_meeting_frontend --rm -v $(pwd):/app -p 8080:8080 residential-meeting-frontend:latest sh
```

Run inside Docker image with console

```
npm install
npm run dev
```
