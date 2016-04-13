FROM hypriot/rpi-python
MAINTAINER patsimm "patrick.simmelbauer@gmail.com"

RUN apt-get update && apt-get install -y gcc \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 80

ENTRYPOINT ["python"]
CMD ["led_api.py"]

COPY . /app
WORKDIR /app

RUN pip install -r requirements.txt
