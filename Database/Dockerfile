# Inherit from an image containing Linux Debian OS + MySQL:
FROM mysql:8

# Environment variable to set the root password
ENV MYSQL_ROOT_PASSWORD="Farout1982"

# it's better to just run the command in the terminal: 
# docker run -d --name like-a-flight-db -e MYSQL_ROOT_PASSWORD=? mysql:8

# Expose port 3306
EXPOSE 3306

# Copy the sql file into the init folder for running it once:
COPY ./like-a-flight.sql /docker-entrypoint-initdb.d