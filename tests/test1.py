#!/usr/bin/python3
from cgi import test
import requests

BASE_URL = "http://localhost:3002"

session = requests.Session()
session.auth = ('janusz_nosacz', "janusz123")

r = session.get(BASE_URL + "/api/hello")
print(r.status_code)
print(r.content.decode("utf-8"))

def test_get(url):
    full_url = BASE_URL + url
    print("GET "+full_url)

    r = session.get(full_url)
    print(r.status_code)

    r_json = r.json()
    print(r_json)
    print()

    return (r.status_code, r_json)


def test_empty_post(url):
    full_url = BASE_URL + url
    print("POST "+full_url)

    r = session.post(full_url)
    print(r.status_code)

    r_json = r.json()
    print(r_json)
    print()

    return (r.status_code, r_json)


def test_post(url, json_data):
    full_url = BASE_URL + url
    print("POST "+full_url)

    r = session.post(full_url, json=json_data)
    print(r.status_code)

    r_json = r.json()
    print(r_json)
    print()

    return (r.status_code, r_json)


#Wszystkie egzaminy (do podejścia)
test_get("/api/exam")

#Jak wyżej, tylko egzamin o id 1
test_get("/api/exam/1")
test_get("/api/exam/2")


print()

#Rozpoczynanie egzaminu o id 1
status, r_json = test_empty_post("/api/exam/1/start")

if status!=200:
    exit(0)

approach_id = r_json["approach_id"]
questions = r_json["questions"]


#Odpowiadamy na 1. pytanie, jednokrotnego wyboru, (questions[0]["type"] == 0)
#Wybieramy 1. opcję

status, r_json = test_post("/api/answer", json_data = {
    "approach_id": approach_id,
    "question_id": questions[0]["id"],
    "chosen_options": [ questions[0]["options"][1]["id"], ]
})

if status!=201:
    exit(0)

#Odpowiadamy na 2. pytanie, wielokrotnego wyboru, (questions[1]["type"] == 1)
#Wybieramy 1. i 2. opcję

status, r_json = test_post("/api/answer", json_data={
    "approach_id": approach_id,
    "question_id": questions[1]["id"],
    "chosen_options": [ questions[1]["options"][0]["id"], questions[1]["options"][1]["id"] ]
})

if status!=201:
    exit(0)

# 3. pytanie pozostawiamy bez odpowiedzi

# Endpoint do "odzyskiwania" pytań z trwającego podejścia
# Na przykład po niechcącemu zamknięciu przegląrki
test_get("/api/exam/approach/{}/questions".format(approach_id))


#Kończymy podejście
status, r_json = test_empty_post("/api/exam/approach/{}/end".format(approach_id))

if status!=200:
    exit(0)


#Wynik podejścia
status, r_json = test_get("/api/score/approach/{}".format(approach_id))

if status!=200:
    exit(0)


#Wynik podejścia szczegółowy
status, r_json = test_get("/api/score/approach/{}/detailed".format(approach_id))


