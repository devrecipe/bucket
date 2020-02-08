# Bucket

![Travis CI build status](https://img.shields.io/travis/devrecipe/bucket.svg)
![Docker build status](https://img.shields.io/docker/build/devrecipe/bucket.svg)
![Docker pulls count](https://img.shields.io/docker/pulls/devrecipe/bucket.svg)
![Docker stars count](https://img.shields.io/docker/stars/devrecipe/bucket.svg)
![License](https://img.shields.io/github/license/devrecipe/bucket.svg)

Bucket is an objects storage server built in NodeJS to serve apps as a standalone microservice via RESTful API.

The bucket supports Gzip compression for static content and access logs.

### How to deploy using Docker

In your docker host, run a new container

`docker run -d --name my-bucket devrecipe/bucket`

And retrieve the container's IP address

`docker inspect --format '{{.NetworkSettings.IPAddress}}' my-bucket`

### How to use the API

1.  Retrieve an object from the bucket

    Send a GET request `/oject/*` where `*` is the object id, the output should be the file from server.

2.  Add a new object to the bucket

    Send a POST request `/upload` where `*` is the object id. request content-type should be `multipart form data` with a field named `file`.

    Output should be a JSON with the object id (`filename`) and its mime type, encoding and size.

3.  Delete existin object from the bucket
    
    Send a DELETE request `/object/*` where `*` is the object id, the output should be a json with this message `The requested object is deleted`.

In case of an error, (like the requested object doesn't exist) a JSON error will be returned

```
{
    result: 404,
    message: "The requested object doesn't exist"
}
```

### Securing the bucket

Coming soon, meanwhile we'd be happy to hear from you some feedbacks

### Contributors

* Mohamed Anas Ben Othman
* Zied Guetari

### License

&copy; 2017 - MIT License
