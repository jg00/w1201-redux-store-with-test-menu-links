/*
create db bookbarn

create table books (
	bookid serial PRIMARY KEY,
	title varchar(50),
	genre varchar(50),
	publisher varchar(50),
	year date,
	imageurl varchar(250)
)

create table users (
	userid serial PRIMARY KEY,
	username varchar(50),
	password varchar(1000)
)


select * from books
-- delete from books

select * from users
-- delete from users

*/
