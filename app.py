############################################
# State and District Information Dashboard #
# main application & backend               #
############################################
# author:   jbetley (https://github.com/jbetley)
# version:  0.9  # noqa: ERA001
# date:     03/22/25

from flask import (
    Flask,
    render_template,
    request,
)

# local imports
from load_data import (
    get_district_data,
    get_state_data,
    get_state_dropdown,
)

app = Flask(__name__, static_folder="./modules")

@app.route("/")
def index():
    return render_template("index.html")


# school dropdown list
@app.route("/load", methods=["GET"])
def load_state_dropdown():

    state_df = get_state_dropdown()

    return [
        {k: v for k, v in m.items() if v == v and v is not None}
        for m in state_df.to_dict(orient="records")
    ]


@app.route("/districts", methods=["post"])
def load_district_data():

    data = request.get_json()

    district_data = get_district_data(data)

    return [
        {k: v for k, v in m.items() if v == v and v is not None}
        for m in district_data.to_dict(orient="records")
    ]


@app.route("/states", methods=["post"])
def load_state_data():

    data = request.get_json()

    state_data = get_state_data(data)

    return [
        {k: v for k, v in m.items() if v == v and v is not None}
        for m in state_data.to_dict(orient="records")
    ]

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)  # noqa: S104, S201
