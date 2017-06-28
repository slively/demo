CREATE SEQUENCE todo_id_seq START 101;
CREATE TABLE public.todos
(
  id BIGINT NOT NULL DEFAULT nextval('todo_id_seq'),
  text VARCHAR(100) NOT NULL
)
WITH (
OIDS=FALSE
);
ALTER TABLE public.todos
  OWNER TO postgres;
