# WPZ-Backend
To start app:
> npm start

## To start in docker container:
In the root directory:
```
Interactive:
> docker run --network host -it -v $(pwd):/app bkstud/wpzbackend:latest
```
```
Noninteractive:
> docker run -d --network host -v $/home/bazyli/gitworkspace/WPZ/WPZ-Backend:/app bkstud/wpzbackend:latest
```

```
To test if works curl should show Express aplication
> curl -v localhost:3002/api
```