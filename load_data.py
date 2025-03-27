############################################
# State and District Information Dashboard #
# Database Queries (SQLite)                #
############################################
# author:   jbetley (https://github.com/jbetley)
# version:  0.9  # noqa: ERA001
# date:     03/22/25

import pandas as pd
from sqlalchemy import create_engine, text

engine = create_engine("sqlite:///data/statedata.db")

print("Database Engine Created . . .")  # noqa: T201


def run_query(q, *args):
    """
    Takes sql text query, gets query as a dataframe (read_sql is a convenience function
    wrapper around read_sql_query), and perform a variety of basic clean up functions
    If no data matches the query, an empty df is returned

    Args:
        q (string): a sqlalchemy "text" query
        args (dict): a dict of query parameters
    Returns:
        pd.DataFrame: pandas dataframe of the query results
    """
    conditions = None

    with engine.connect() as conn:
        if args:
            conditions = args[0]

        df = pd.read_sql_query(q, conn, params=conditions)

        # sqlite column headers do not have spaces between words. But we need to
        # display the column names, so we have to do a bunch of str.replace to
        # account for all conditions. May be a better way, but this is pretty fast.
        # Adding a space between any lowercase character and any uppercase/number
        # character takes care of most of it. The other replace functions catch
        # edge cases.
        df.columns = df.columns.str.replace(r"([a-z])([A-Z1-9%])", r"\1 \2", regex=True)
        df.columns = df.columns.str.replace(r"([SA])([PEDI])", r"\1 \2", regex=True)
        df.columns = df.columns.str.replace(r"([1-9])([A-Z])", r"\1 \2", regex=True)

        # pesky Title Allocation strings
        df.columns = df.columns.str.replace("IA", "I A", regex=False)
        df.columns = df.columns.str.replace("IS", "I S", regex=False)

        df.columns = df.columns.astype(str)

        return df


def get_state_dropdown():
    params = {"id": ""}
    q = text(
        """
        SELECT StateAbbreviation, StateFull, StateDistrictName
            FROM districts
        """,
    )

    return run_query(q, params)


def get_all_district_data(state_id):

    params = {"id": state_id}

    w = text(
        """
        SELECT *
            FROM districts
            WHERE StateAbbreviation = :id
        """,
    )

    district_data = run_query(w, params)

    district_data = district_data.sort_values(by="Title I Allocation", ascending=False)

    return district_data.reset_index(drop=True)


def get_single_district_data(school_name):

    params = {"id": school_name}

    w = text(
        """
        SELECT *
            FROM districts
            WHERE StateDistrictName = :id
        """,
    )

    district_data = run_query(w, params)

    district_data = district_data.sort_values(by="Title I Allocation", ascending=False)

    return district_data.reset_index(drop=True)


def get_state_data(state_id):

    params = {"id": state_id}

    # School demographic and attendance data
    w = text(
        """
        SELECT *
            FROM states
            WHERE StateAbbreviation = :id
        """,
    )

    state_data = run_query(w, params)

    state_data = state_data.sort_values(by="2024 Title I Allocation", ascending=False)

    return state_data.reset_index(drop=True)
