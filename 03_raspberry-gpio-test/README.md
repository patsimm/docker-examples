# Raspberry GPIO Test

What this application basically does is serving a button in the internet that switches a LED in my room on and off.

## Prerequisites
In my setup I've two machines in the same network:
 - my raspberry pi (`192.168.255.14`)
 - and a small vServer (`192.168.255.6`)

The docker daemon on my raspberry pi is configured to have the label `architecture=arm` and the one running on the vServer has the label `webadress=example.com`.

On the vServer to get initialize everything head into the `master-machine/` folder and execute `docker-compose up -d`. Now cosul with the ui, the swarm master, a swarm client, dockerui and a docker registry will be started on the server. To do this you have to build the docker-consul image from [gliderlabs/docker-consul](https://github.com/gliderlabs/docker-consul).

Do the same for the raspberry pi in the `raspberry` folder.
