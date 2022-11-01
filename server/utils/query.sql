-- CREATE TABLE public.users
-- (
--   _id SERIAL PRIMARY KEY NOT NULL,
--   username varchar(255) UNIQUE NOT NULL,
--   password varchar(255) NOT NULL
-- );

-- CREATE TABLE public.jobs
-- (
--   _id SERIAL PRIMARY KEY NOT NULL,
--   jobId varchar(255) UNIQUE NOT NULL,
--   status varchar(255) NOT NULL,
--   timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--   FOREIGN KEY ("user_id") REFERENCES public.users("_id")
-- )

-- this creates a function to update timestamp each time the row is updated
-- CREATE OR REPLACE FUNCTION update_timestamp()
-- RETURNS TRIGGER AS $$
-- BEGIN
--    NEW.timestamp = now(); 
--    RETURN NEW;
-- END;
-- $$ language 'plpgsql';

-- Trigger is like an event listener that runs our function every update
-- CREATE TRIGGER update_ab_changetimestamp BEFORE UPDATE
--   ON public.jobs FOR EACH ROW EXECUTE PROCEDURE 
--   update_timestamp();