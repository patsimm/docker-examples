# Raspberry GPIO Test

What this application basically does is serving a button in the internet that switches a LED in my room on and off.

## Prerequisites
In my setup I've two machines in the same network:
 - my raspberry pi (`10.0.0.1`)
 - and a small vServer (`10.0.0.8`)

The docker daemon on my raspberry pi is configured to have the label `architecture=arm` and the one running on the vServer has the label `webadress=example.com`.

On the vServer to get initialize everything head into the `master-machine/` folder and execute `docker-compose up -d`. Now cosul with the ui, the swarm master, a swarm client, dockerui and a docker registry will be started on the server. Then do the same for the raspberry pi but in the `raspberry/` folder for it to join the swarm cluster.




