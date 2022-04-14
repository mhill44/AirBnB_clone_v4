#!/usr/bin/python3
"""
Flask App that integrates with the AirBnB static HTML
"""
from flask import Flask, render_template, url_for
from models import storage
import uuid;

# sets up flask
app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'


# starts rendering flask page
@app.teardown_appcontext
def teardown_db(exception):
    """
    after each request processed, this method calls .close() on
    the current SQLAlchemy Session
    """
    storage.close()


@app.route('/4-hbnb')
def hbnb_filters(the_id=None):
    """
    handles requests for custom template with the states, cities & amentities
    """
    state_objs = storage.all('State').values()
    states = dict([state.name, state] for state in state_objs)
    amens = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    return render_template('4-hbnb.html',
                           cache_id=uuid.uuid4(),
                           states=states,
                           amens=amens,
                           places=places,
                           users=users)

if __name__ == "__main__":
    """
    Main Flask App
    """
    app.run(host=host, port=port)
