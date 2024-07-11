# Inherit from an image containing Linux Debian OS + MySQL:
FROM mysql:8

# Environment variable to set the root password
# ENV MYSQL_ROOT_PASSWORD=?

# Copy the sql file into the init folder for running it once:
COPY ./like-a-flight.sql /docker-entrypoint-initdb.d