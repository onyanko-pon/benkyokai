## Postgres 接続

```bash
#　Dockerの中から
$ docker exec -it <container-id> /bin/bash 
$ psql -p 5432 -U postgres -d postgres

# Postgres Clientから
$ psql -h localhost -p 5432 -U postgres -d postgres
```
