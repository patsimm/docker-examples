# docker-examples
examples I write to learn docker 

## 00_compose-test
This is just a small test of sinlge-host docker-compose. It starts two containers one running redis and the other running a small python flask webserver. The webserver uses the database to count all visitors.

## 01_load-balancing-static
Using haproxy for loadbalancing the app from 'compose test'. Three containers running the python webserver are started as well as redis and haproxy.

## 02_load-balancing-dynamic
Dynamic loadbalancing using the [tutum/haproxy](https://github.com/tutumcloud/haproxy) image. 

## 03_raspberry-gpio-test
The first multi-host docker-compose test. Uses docker's networking to connect the containers. This application basically provides a button in the web that turns a GPIO Pin on my Raspberry Pi on and of. Visit the [03_raspberry-gpio-test](https://github.com/patsimm/docker-examples/tree/master/03_raspberry-gpio-test) directory for further explanation.
