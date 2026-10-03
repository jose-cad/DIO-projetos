# Cluster Docker Swarm local com Vagrant

Cluster Docker Swarm com 4 VMs criadas e configuradas automaticamente pelo Vagrant (VirtualBox).

| VM     | IP            | Papel   |
|--------|---------------|---------|
| master | 10.10.10.100  | Manager |
| node01 | 10.10.10.101  | Worker  |
| node02 | 10.10.10.102  | Worker  |
| node03 | 10.10.10.103  | Worker  |

## Arquivos

- `Vagrantfile`: define as 4 VMs (Ubuntu 24.04 LTS, 1 GB RAM, 1 CPU, IP fixo na rede privada `10.10.10.0/24`).
- `docker.sh`: instala o Docker Engine, Buildx e Compose v2 pelo repositório apt oficial, em todas as VMs.
- `master.sh`: roda `docker swarm init` e gera o `worker.sh` com o token de join.
- `worker.sh`: executado pelos nodes para entrar no cluster como workers. É sobrescrito pelo master a cada `vagrant up`.
- `stack.yml`: stack de teste (nginx com 4 réplicas).

O Vagrant sobe as VMs na ordem do Vagrantfile, então o master já gerou o `worker.sh` quando os nodes são provisionados. Os scripts são idempotentes: rodar `vagrant provision` de novo não quebra o cluster.

## Requisitos

- [VirtualBox](https://www.virtualbox.org/) 7.x
- [Vagrant](https://developer.hashicorp.com/vagrant) 2.4+
- ~4 GB de RAM livres

## Uso

```bash
vagrant up                  # cria e provisiona as 4 VMs
vagrant ssh master
docker node ls              # 1 manager (Leader) + 3 workers

# teste
docker stack deploy -c /vagrant/stack.yml teste
docker service ps teste_web # réplicas distribuídas entre os nós

# limpeza
exit
vagrant destroy -f
```

## Observação

Projeto para fins de estudo. O `worker.sh` contém o token de join do cluster local, que deixa de valer quando as VMs são destruídas.
