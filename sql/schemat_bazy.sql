create table user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login VARCHAR(60) not null,
    pass VARCHAR(120) not null, /* hasło zahashowane */
    admin BOOLEAN not null default FALSE,

    first_name NVARCHAR(60),
    last_name NVARCHAR(60),
    email VARCHAR(120) not null,

    started_exam BOOLEAN not null default FALSE, /* czy rozpoczął egzamin */
    ended_exam BOOLEAN not null default FALSE /* czy zakończył egzamin */
);

create table question(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    q_text TEXT NOT NULL, /* tekst pytania */
    q_type INTEGER NOT NULL
    /* typ pytania, 0-jednokrotnego wyboru,  1-wielokrotnego wyboru,
    możliwość dodania kolejnych na przyszłość*/
);

create table question_option(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL, /* id pytania */
    o_text TEXT NOT NULL, /* tekst możliwej opcji */
    correct BOOLEAN NOT NULL, /* czy opcja poprawna */

    CONSTRAINT fk_question
        FOREIGN KEY(question_id)
        REFERENCES question(id)
        ON DELETE CASCADE
);

create table answear(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL, /* id użytkownika */
    question_id INTEGER NOT NULL, /* id pytania */
    option_id INTEGER NOT NULL, /* id wybranej przez użytkownika opcji */

    CONSTRAINT fk_option
        FOREIGN KEY(user_id)
        REFERENCES user(id)
        ON DELETE CASCADE

    CONSTRAINT fk_option
        FOREIGN KEY(option_id)
        REFERENCES question_option(id)
        ON DELETE CASCADE
);

