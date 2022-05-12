#!/usr/bin/python3
import requests

BASE_URL = "http://localhost:3002"

session = requests.Session()
session.auth = ("czesiek_programista", "czesiek987")


def get_json(url):
    full_url = BASE_URL + url
    print("GET "+full_url)

    r = session.get(full_url)
    print(r.status_code)

    r_json = r.json()
    print(r_json)
    print()

    return (r.status_code, r_json)



#Wszystkie egzaminy
get_json("/api/admin/exams")

#Egzamin o id 1
get_json("/api/admin/exams/1")

#Egzamin o id 1 z pytaniami
get_json("/api/admin/exams/1?include_questions=true")