\echo 'Delete and recreate esthetician_store db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE esthetician_store;
CREATE DATABASE esthetician_store;
\connect esthetician_store

\i esthetician-store-schema.sql
\i esthetician-store-seed.pg.sql

\echo 'Delete and recreate esthetician_store_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE esthetician_store_test;
CREATE DATABASE esthetician_store_test;
\connect esthetician_store_test

\i esthetician-store-schema.sql