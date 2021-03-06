#!/usr/bin/python3
import requests

BASE_URL = "http://localhost:3002"

session = requests.Session()
session.auth = ('janusz_nosacz', "janusz123")

r = session.get(BASE_URL + "/api/hello")
print(r.status_code)
print(r.content.decode("utf-8"))

def get_json(url):
    full_url = BASE_URL + url
    print("GET "+full_url)

    r = session.get(full_url)
    print(r.status_code)

    r_json = r.json()
    print(r_json)
    print()

    return (r.status_code, r_json)


def post_json_empty(url):
    full_url = BASE_URL + url
    print("POST "+full_url)

    r = session.post(full_url)
    print(r.status_code)

    r_json = r.json()
    print(r_json)
    print()

    return (r.status_code, r_json)


def post_json(url, json_data):
    full_url = BASE_URL + url
    print("POST "+full_url)

    r = session.post(full_url, json=json_data)
    print(r.status_code)

    r_json = r.json()
    print(r_json)
    print()

    return (r.status_code, r_json)


#Wszystkie egzaminy (do podejścia)
get_json("/api/exams")

#Jak wyżej, tylko egzamin o id 1
get_json("/api/exams/1")
get_json("/api/exams/2")


print()

#Rozpoczynanie egzaminu o id 1
status, r_json = post_json_empty("/api/exams/1/start")

if status!=200:
    exit(0)

approach_id = r_json["approach_id"]
questions = r_json["questions"]


#Odpowiadamy na 1. pytanie, jednokrotnego wyboru, (questions[0]["type"] == 0)
#Wybieramy 1. opcję

status, r_json = post_json("/api/answers", json_data = {
    "approach_id": approach_id,
    "question_id": questions[0]["id"],
    "chosen_options": [ questions[0]["options"][1]["id"], ]
})

if status!=201:
    exit(0)

#Odpowiadamy na 2. pytanie, wielokrotnego wyboru, (questions[1]["type"] == 1)
#Wybieramy 1. i 2. opcję

status, r_json = post_json("/api/answers", json_data={
    "approach_id": approach_id,
    "question_id": questions[1]["id"],
    "chosen_options": [ questions[1]["options"][0]["id"], questions[1]["options"][1]["id"] ]
})

if status!=201:
    exit(0)

# 3. pytanie pozostawiamy bez odpowiedzi

# Endpoint do "odzyskiwania" pytań z trwającego podejścia
# Na przykład po niechcącemu zamknięciu przegląrki
get_json("/api/exams/approaches/{}/questions".format(approach_id))


#Kończymy podejście
status, r_json = post_json_empty("/api/exams/approaches/{}/end".format(approach_id))

if status!=200:
    exit(0)


#Wynik podejścia
status, r_json = get_json("/api/exams/approaches/{}/score".format(approach_id))

if status!=200:
    exit(0)


#Wynik podejścia szczegółowy
status, r_json = get_json("/api/exams/approaches/{}/detailed_score".format(approach_id))


