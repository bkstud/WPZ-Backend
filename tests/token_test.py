#!/usr/bin/python3
import requests

BASE_URL = "http://localhost:3002"

session = requests.Session()

def post_json(url, json_data):
    full_url = BASE_URL + url
    print("POST "+full_url)

    r = session.post(full_url, json=json_data)
    print(r.status_code)

    r_json = r.json()
    print(r_json)
    print()

    return (r.status_code, r_json)


# Logowanie, uzyskiwanie tokenu

status, json_r = post_json("/api/auth/login", {
    "username": "janusz_nosacz",
    "password": "janusz123"
})

if status!=200:
    exit(0)

myToken = json_r["token"]

head = {'Authorization': 'token {}'.format(myToken)}

# Autoryzacja tokenem
r = session.get(BASE_URL+"/api/hello",  headers=head)
print(r.status_code)
print(r.content.decode("utf-8"))