create table teams (
    id SERIAL,
    slack_id varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    PRIMARY KEY (id)
);

create table users (
    id SERIAL,
    slack_id varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    team_id SERIAL NOT NULL REFERENCES teams(id),
    PRIMARY KEY (id)
);

create table events (
    id SERIAL,
    title varchar(255),
    description varchar(255),
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    user_id SERIAL NOT NULL REFERENCES users(id),
    PRIMARY KEY (id)
);

