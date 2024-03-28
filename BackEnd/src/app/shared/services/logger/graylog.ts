import graylog from 'graylog2';

const graylogInstance = new graylog.graylog({
  servers: [
    { host: 'graylog', port: 12201 },
  ],
  facility: 'Reactive-backend',
  bufferSize: 1350,
});

export default graylogInstance;