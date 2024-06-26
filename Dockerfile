# Use an official Python runtime as a parent image
FROM python:3.12.3-slim

# Set the working directory in the container to /app
WORKDIR /app

# Add the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 and 8090 available to the world outside this container
EXPOSE 5000
EXPOSE 8090

RUN ./pb/pocketbase serve

# Run app.py when the container launches
CMD ["python", "app.py"]
