sydneyip="$1"
perthip="$2"

eval $(docker-machine env perth)

echo "Stopping all from perth"
docker stop $(docker ps -q)
docker rm $(docker ps -aq)

echo "Removing current perth machine"
docker-machine rm perth -y

eval $(docker-machine env sydney)

echo "Stopping all from sydney"
docker stop $(docker ps -q)
docker rm $(docker ps -aq)

echo "Starting consul"
docker run -d \
  -p "8500:8500" \
  -h "consul" \
  gliderlabs/consul-agent -dev -client 0.0.0.0

echo "Removing current sydney machine"
docker-machine rm sydney -y

echo "Create new sydney machine"
docker-machine create -d generic \
  --swarm --swarm-master \
  --swarm-discovery="consul://$sydneyip:8500" \
  --engine-opt="cluster-store=consul://$sydneyip:8500" \
  --engine-opt="cluster-advertise=$sydneyip:2376" \
  --generic-ip-address=$sydneyip \
  --generic-ssh-key ~/.ssh/id_rsa \
  --generic-ssh-user patsimm \
  --engine-label="com.patsimm.architecture=amd64" \
  sydney

echo "Create new perth machine"
docker-machine create -d generic \
  --engine-storage-driver=overlay \
  --swarm --swarm-image hypriot/rpi-swarm:latest \
  --swarm-discovery="consul://$(docker-machine ip sydney):8500" \
  --engine-opt="cluster-store=consul://$(docker-machine ip sydney):8500" \
  --engine-opt="cluster-advertise=$perthip:2376" \
  --generic-ip-address=$perthip \
  --generic-ssh-key ~/.ssh/id_rsa \
  --generic-ssh-user=patsimm \
  --engine-label="com.patsimm.architecture=arm" \
  perth
