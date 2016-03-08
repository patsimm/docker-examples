#!/usr/bin/python

from flask import Flask
import redis

app = Flask(__name__)
r = redis.StrictRedis(host='redis', port='6379', db=0)

@app.route("/")
def hello():
    visitor = r.incr('visitor')
    return "<html><body>Hello World!</br>You are visitor #{}<body></html>".format(visitor)

if __name__ == "__main__":
    app.run(port=80, host='0.0.0.0')

