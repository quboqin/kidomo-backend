# Use the official MongoDB base image
FROM mongo:3.7

# Copy the initialization scripts from the host to the container
COPY ./init/ /docker-entrypoint-initdb.d/

# Expose the MongoDB port
EXPOSE 27017

# Use the default entrypoint provided by the MongoDB image
ENTRYPOINT ["docker-entrypoint.sh"]

# Set the default command to run MongoDB
CMD ["mongod"]