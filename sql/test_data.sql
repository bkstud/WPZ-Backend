/*
Testowe dane
*/

/* przykładowi użytkownicy */
INSERT INTO user(login, pass, email) VALUES ('czesio', 'hashed_pass1', 'czesio@example.com');
INSERT INTO user(login, pass, email) VALUES ('misiek', 'hashed_pass2', 'misiek@example.com');

/* przykładowe pytania (odpowiadające przykładom z JSONów)
ID będą o 1 większę niż w przykładach, bo sqlite3 numeruje od 1 a nie od zera*/

INSERT INTO question(q_text, q_type)
VALUES ('Co to jeste HTML?', 0);

INSERT INTO question_option(question_id, o_text, correct)
VALUES (1, 'język programowania', FALSE);

INSERT INTO question_option(question_id, o_text, correct)
VALUES (1, 'język znaczników', TRUE);

INSERT INTO question_option(question_id, o_text, correct)
VALUES (1, 'baza danych', FALSE);

INSERT INTO question(q_text, q_type)
VALUES ('Kim jest Władmir Putin?', 1);

INSERT INTO question_option(question_id, o_text, correct)
VALUES (2, 'zbrodniarzem wojennym', TRUE);

INSERT INTO question_option(question_id, o_text, correct)
VALUES (2, 'dyktatorem', TRUE);

INSERT INTO question_option(question_id, o_text, correct)
VALUES (2, 'szefem Micro$oftu xD', FALSE);

/* Przykładowe odpowiedzi użytkownika */

INSERT INTO answear(user_id, question_id, option_id) VALUES (1, 1, 2);
INSERT INTO answear(user_id, question_id, option_id) VALUES (1, 2, 4);
INSERT INTO answear(user_id, question_id, option_id) VALUES (1, 2, 5);