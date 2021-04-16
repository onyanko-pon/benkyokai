create table teams (
    id SERIAL,
    slack_id varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

create table users (
    id SERIAL,
    slack_id varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    team_id SERIAL NOT NULL REFERENCES teams(id),
    PRIMARY KEY (id)
);

create table events (
    id SERIAL,
    title varchar(255),
    description varchar(255),
    user_id SERIAL NOT NULL REFERENCES users(id),
    PRIMARY KEY (id)
);

