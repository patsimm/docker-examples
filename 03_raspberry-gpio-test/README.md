# Raspberry GPIO Test

What this application basically does is serving a button in the internet that switches a LED in my room on and off.

## Prerequisites
In my setup I've two machines in the same network:
 - my Raspberry Pi (`192.168.255.10`)
 - and a small vServer (`192.168.255.6`)

The docker daemon on my raspberry pi is configured to have the label `com.pastimm.architecture=arm` and the one running on the vServer has the label `com.patsimm.architecture=amd64`.

On the vServer the `swarm master` container is running and a `swarm join` container is running on both, my vServer and and my raspberry pi. So they build a small swarm cluster. Docker compose files to build the swarm cluster are located in the folders `raspberry` and `master_machine`.

## Running the application

In my example the swarm master runs on `192.168.255.6:4000` so the first thing to do is to direct the docker client to the swarm master by calling

    export DOCKER_HOST=192.168.255.6:4000

Now we can head into the `swarm` directory and call 

    docker-compose up
    
The app should start now and you should be able to switch on and off the specified PIN on your Raspberry PI.

## How it works

The app is running in 3 different containers running on 2 different machines.

 - nginx (on the vServer)
 - webinterface (on the vServer, this could also run on the Raspberry Pi)
 - led_switch (on the Raspberry Pi)

The led_switch is a small python app running on a Raspberry Pi that basically provides a web API to turn on and off a GPIO-PIN. The API has 3 functions: `/led/on`, `/led/off` and `/led/state`. Every function returns the actual state in JSON-format. Example: `{state: "ON}`. 

The webinterface is written in Node using React. It consists of one Button and desplays the current state. The one Button turns the led on or off.

The nginx container connects the other two apps. All the containers are in the same docker overlay network called 'led_overlay'. The webinterface's container name is `ui` and the led_switches is `led`. So that has to be done in the `nginx.conf` is 

 - to forward the root directory `/` to `http://ui:80`
 - and to forward the api directory `/led` to `http://led:8080`.
