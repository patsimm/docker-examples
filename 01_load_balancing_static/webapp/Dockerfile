FROM python
MAINTAINER patsimm "patrick.simmelbauer@gmail.com"

COPY . /app
WORKDIR /app

RUN pip install -r requirements.txt

EXPOSE 80

ENTRYPOINT ["python"]
CMD ["helloworld.py"]

