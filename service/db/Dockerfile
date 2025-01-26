FROM mysql:8

# register schema and data initialization script to be executed on container startup
ADD scripts/01-isusosdown-initialize-schema.sql /docker-entrypoint-initdb.d
ADD scripts/02-isusosdown-initialize-data.sql /docker-entrypoint-initdb.d

# expose container's port
EXPOSE 3308