############################################
# State and District Information Dashboard #
# main application & backend               #
############################################
# author:   jbetley (https://github.com/jbetley)
# version:  0.9  # noqa: ERA001
# date:     03/27/25

# NOTE: Do a global replace "app" with "application" before loading
# to server. also rename app.py to application.py

import os

import bcrypt
from dotenv import load_dotenv
from flask import Flask, render_template, request, session

from load_data import (
    get_all_district_data,
    get_single_district_data,
    get_state_data,
    get_state_dropdown,
)

app = Flask(__name__, static_folder="./modules")

load_dotenv()
app.secret_key = os.environ.get('SECRET_KEY')
PASSWORD_HASH = os.environ.get('PASSWORD_HASH')

# if not PASSWORD_HASH:
#     password = "oroonoko"
#     hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
#     PASSWORD_HASH = hashed_password.decode('utf-8')


def check_auth(password):
    """Checks if the provided password matches the stored hash."""
    return bcrypt.checkpw(password.encode('utf-8'), PASSWORD_HASH.encode('utf-8'))


@app.route('/form_login', methods=['POST', 'GET'])
def login():
    usr = ""
    pwd = request.form['password']
    
    if not pwd or not check_auth(pwd):
        if 'first_load' not in session:
            session['first_load'] = True
            return render_template('login.html')
        else:
            return render_template('login.html', info='Invalid Password.')
    else:
        return render_template('index.html', name=usr)

 
@app.route("/")
def index():
    return render_template("login.html")


# school dropdown list
@app.route("/load", methods=["GET"])
def load_state_dropdown():

    state_df = get_state_dropdown()

    return [
        {k: v for k, v in m.items() if v == v and v is not None}
        for m in state_df.to_dict(orient="records")
    ]


@app.route("/districts", methods=["post"])
def load_all_district_data():
    
    data = request.get_json()

    district_data = get_all_district_data(data)

    return [
        {k: v for k, v in m.items() if v == v and v is not None}
        for m in district_data.to_dict(orient="records")
    ]


@app.route("/district", methods=["post"])
def load_single_district_data():
    
    data = request.get_json()

    district_data = get_single_district_data(data)

    return [
        {k: v for k, v in m.items() if v == v and v is not None}
        for m in district_data.to_dict(orient="records")
    ]


@app.route("/states", methods=["post"])
def load_state_data():

    data = request.get_json()

    state_data = get_state_data(data)

    # NOTE: For some reason the district_data conversion causes this
    # dataset to drop some records (with same First name)
    return state_data.to_dict('records')
 
    # return [
    #     {k: v for k, v in m.items() if v == v and v is not None}
    #     for m in state_data.to_dict(orient="records")
    # ]

if __name__ == "__main__":
    app.run(host="127.0.0.1", port="8001")
