# Sample Queries

from Nexmark

## Usage (run query5 as an example)

### compile

`mvn clean package`

### submit job

#### 0. start kafka

- Suppose Kafka Server is `192.168.1.180`. Download zookeeper and kafka on the server.
- set `dataDir` in `apache-zookeeper-3.8.0-bin/conf/zoo.cfg`
- set `listeners` and `log.dirs` in `kafka_2.12-3.3.1/config/server.properties`
- start server

```
./apache-zookeeper-3.8.0-bin/bin/zkServer.sh start

./kafka_2.12-3.3.1/bin/kafka-server-start.sh ./kafka_2.12-3.3.1/config/server.properties
```

#### 1. delete previous Kafka topic

- show all kafka topics

`./kafka_2.12-3.3.1/bin/kafka-topics.sh --bootstrap-server 192.168.1.180:9092 --list`

- delete existing one

`./kafka_2.12-3.3.1/bin/kafka-topics.sh --delete --bootstrap-server 192.168.1.180:9092 --topic query5_sink`

`./kafka_2.12-3.3.1/bin/kafka-topics.sh --delete --bootstrap-server 192.168.1.180:9092 --topic query5_src`

#### 2. create Kafka topic

`./kafka_2.12-3.3.1/bin/kafka-topics.sh --create --bootstrap-server 192.168.1.180:9092 --topic query5_src`

`./kafka_2.12-3.3.1/bin/kafka-topics.sh --create --bootstrap-server 192.168.1.180:9092 --topic query5_sink`

#### 3. Run Flink Cluster.

#### 4. Submit job `KafkaSourceBid-jar-with-dependencies.jar` with the following Program Arguments:

`--broker 192.168.1.180:9092 --kafka-topic query5_src  --ratelist 25000_900000`

so it will write source events to kafka.

#### 5. Then Submit job `Query5-jar-with-dependencies.jar*` with the following Program Arguments:

`--broker 192.168.1.180:9092 --src-topic query5_src --sink-topic query5_sink --kafka-group 0`
