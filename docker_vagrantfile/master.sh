#!/bin/bash
# Inicia o Swarm (esta VM vira o manager) e gera o worker.sh com o comando de join.
# Uso: master.sh <IP_DO_MASTER>
set -euo pipefail

MASTER_IP="${1:-10.10.10.100}"

if [ "$(docker info --format '{{.Swarm.LocalNodeState}}')" != "active" ]; then
  docker swarm init --advertise-addr="$MASTER_IP"
fi

TOKEN="$(docker swarm join-token -q worker)"

# /vagrant é a pasta do projeto, compartilhada com todas as VMs
cat > /vagrant/worker.sh <<WORKER
#!/bin/bash
# Gerado automaticamente pelo master.sh - não editar.
set -e
if [ "\$(docker info --format '{{.Swarm.LocalNodeState}}')" != "active" ]; then
  docker swarm join --token ${TOKEN} ${MASTER_IP}:2377
fi
WORKER
chmod +x /vagrant/worker.sh
