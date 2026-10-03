#!/bin/bash
# Instala o Docker Engine (+ Buildx e Compose v2) pelo repositório apt oficial.
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

if command -v docker >/dev/null 2>&1; then
  echo "Docker já instalado, nada a fazer."
  exit 0
fi

apt-get update -qq
apt-get install -y -qq ca-certificates curl

install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

. /etc/os-release
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu ${UBUNTU_CODENAME:-$VERSION_CODENAME} stable" \
  > /etc/apt/sources.list.d/docker.list

apt-get update -qq
apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# usar docker sem sudo com o usuário vagrant
usermod -aG docker vagrant
systemctl enable --now docker
