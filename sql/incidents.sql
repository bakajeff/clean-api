CREATE TABLE incidents (
  id VARCHAR PRIMARY KEY,
  title VARCHAR,
  description VARCHAR,
  value DECIMAL,
  ong_id VARCHAR,
  CONSTRAINT ong_id_fk FOREIGN KEY (ong_id) REFERENCES ongs(id)
);
