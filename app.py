import dotenv
import os
from flask import Flask, render_template, request, jsonify
from pocketbase import PocketBase
from random import randint

dotenv.load_dotenv()

client = PocketBase('http://localhost:8090')

admin_data = client.admins.auth_with_password(os.getenv('POCKETBASE_EMAIL'), os.getenv('POCKETBASE_PWD'))


app = Flask(__name__)

@app.route('/ping')
def ping():
    return 'pong'

@app.route('/init')
def init():
    #TODO: Add init html page to create groups and dealers and the money of those with there passwords
    return render_template('init.html')

@app.route('/listGroups', methods=['GET','POST'])
def listGroups():
    # Get all Groups in one list with there names
    groups = client.collection("groups").get_full_list()
    group_names = [record.name for record in groups]
    return jsonify(group_names)

@app.route('/listDealers', methods=['GET','POST'])
def listDealers():
    # Get all Dealers in one list with there names
    dealers = client.collection("dealers").get_full_list()
    dealer_names = [record.name for record in dealers]
    return jsonify(dealer_names)

@app.route('/checkForPwd/groups', methods=['GET','POST'])
def checkForPwdGroups():
    # The id of the users sql will be passed in the request with the key 'id'
    # Do it like this in the request http://localhost:5000/checkForPwd/groups?id=1
    id = request.args.get('id')
    pwd = client.collection("groups").get_one(id).password
    return pwd

@app.route('/checkForPwd/dealers', methods=['GET','POST'])
def checkForPwdDealers():
    # The same just for dealers
    # Do it like this in the request http://localhost:5000/checkForPwd/dealers?id=1
    id = request.args.get('id')
    pwd = client.collection("dealers").get_one(id).password
    return pwd

@app.route('/openTrade', methods=['GET','POST'])
def openTrade():
    # Opens a trade that has to be accepted by the dealer
    # We take the deler id the materialSum, the blingSum, the transactionType(if its a sell or a buy from the group) and the material name(gold, wood, etc) as arguments
    # Do it like this in the request: http://localhost:5000/openTrade?dealer_id=1&materialSum=100&blingSum=100&transactionType=buy&material=gold
    dealer_id = request.args.get('dealer_id')
    materialSum = request.args.get('materialSum')
    blingSum = request.args.get('blingSum')
    transactionType = request.args.get('transactionType')
    material = request.args.get('material')

    client.collection("openTrades").create({
        "dealer": dealer_id,
        "materialSum": materialSum,
        "blingSum": blingSum,
        "transactionType": transactionType,
        "material": material
    })

    return "Trade opened"


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
