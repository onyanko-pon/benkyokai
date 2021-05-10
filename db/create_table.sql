create table workspaces (
    id SERIAL,
    slack_id varchar(255) NOT NULL UNIQUE,
    name varchar(255) NOT NULL,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    PRIMARY KEY (id)
);

create table users (
    id SERIAL,
    slack_id varchar(255) NOT NULL UNIQUE,
    name varchar(255) NOT NULL,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    workspace_id SERIAL NOT NULL REFERENCES workspaces(id),
    PRIMARY KEY (id)
);

create table events (
    id SERIAL,
    title varchar(255),
    description varchar(255),
    date date,
    status SERIAL,
    start_time time,
    end_time time,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    user_id SERIAL NOT NULL REFERENCES users(id),
    workspace_id SERIAL NOT NULL REFERENCES workspaces(id),
    PRIMARY KEY (id)
);

create table events_users (
    id SERIAL,
    user_id SERIAL NOT NULL REFERENCES users(id),
    event_id SERIAL NOT NULL REFERENCES events(id),
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    PRIMARY KEY (id)
);
