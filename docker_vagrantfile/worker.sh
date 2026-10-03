#!/bin/bash
# Este arquivo é sobrescrito pelo master.sh durante o "vagrant up",
# com o comando "docker swarm join" e o token real do cluster.
echo "worker.sh ainda não foi gerado pelo master" >&2
exit 1
