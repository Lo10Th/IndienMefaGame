import dotenv
import os
import json
from flask import Flask, render_template, request, jsonify
from pocketbase import PocketBase
from random import randint
import requests

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

@app.route('/getDealerPrices', methods=['GET','POST'])
def getDealerPrices():
    # Get the dealer prices of the materials for each dealer
    # We take the dealer id as an argument and will create a json with the prices of the materials for every dealer exept the one with the id that we passed
    # Do it like this in the request: http://localhost:5000/getDealerPrices?id=1

    id = request.args.get('id')

    dealers = client.collection("dealers").get_full_list()
    dealer_data = {}

    for dealer in dealers:
        if dealer.id != id:
            prices_id = dealer.prices
            prices = client.collection("prices").get_one(prices_id)
            if hasattr(prices, 'gold') and hasattr(prices, 'wood'):
                dealer_data[dealer.name] = {"gold": prices.gold, "wood": prices.wood}
            else:
                print(f"Prices record {prices_id} does not have 'gold' or 'wood' attributes")

    return jsonify(dealer_data)

@app.route('/getOwnPrices', methods=['GET','POST'])
def getOwnPrices():
    # Get the dealer prices of the materials for the dealer with the id that we pass
    # We take the dealer id as an argument and will create a json with the prices of the materials for the dealer with the id that we passed
    # Do it like this in the request: http://localhost:5000/getOwnPrices?id=1

    id = request.args.get('id')

    dealer = client.collection("dealers").get_one(id)
    prices_id = dealer.prices
    prices = client.collection("prices").get_one(prices_id)

    return jsonify({"gold": prices.gold, "wood": prices.wood})

@app.route('/updatePrices', methods=['GET','POST'])
def updatePrices():
    # Update the prices of the materials for the dealer with the id that we pass
    # We take the dealer id as an argument and the new prices for the materials
    # Do it like this in the request: http://localhost:5000/updatePrices?id=1&gold=100&wood=100

    id = request.args.get('id')
    gold = request.args.get('gold')
    wood = request.args.get('wood')

    dealer = client.collection("dealers").get_one(id)
    prices_id = dealer.prices
    client.collection("prices").update(prices_id, {"gold": gold, "wood": wood})

    return "Prices updated"


@app.route('/listGroups', methods=['GET','POST'])
def listGroups():
    # Get all Groups in one list with their names and ids
    groups = client.collection("groups").get_full_list()
    group_data = [{"id": record.id, "name": record.name} for record in groups]
    return jsonify(group_data)

@app.route('/listDealers', methods=['GET','POST'])
def listDealers():
    # Get all Dealers in one list with their names and ids
    dealers = client.collection("dealers").get_full_list()
    dealer_data = [{"id": record.id, "name": record.name} for record in dealers]
    return jsonify(dealer_data)

@app.route('/checkForPwd/groups', methods=['GET','POST'])
def checkForPwdGroups():
    # The id of the group sql will be passed in the request with the key 'id'
    # And the password that the group had entered
    # Do it like this in the request http://localhost:5000/checkForPwd/groups?id=1&password=1234

    id = request.args.get('id')
    pwd = client.collection("groups").get_one(id).password
    if pwd == int(request.args.get('password')):
        return 'true'
    else:
        return 'false'

@app.route('/checkForPwd/dealers', methods=['GET','POST'])
def checkForPwdDealers():
    # The id of the dealer sql will be passed in the request with the key 'id'
    # And the password that the dealer had entered
    # Do it like this in the request http://localhost:5000/checkForPwd/dealers?id=1&password=1234

    id = request.args.get('id')
    pwd = client.collection("dealers").get_one(id).password
    if pwd == int(request.args.get('password')):
        return 'true'
    return 'false'

@app.route('/openTrade', methods=['GET','POST'])
def openTrade():
    # Opens a trade that has to be accepted by the dealer
    # We take the dealer id the materialSum, the blingSum, the transactionType(if its a sell or a buy from the group) and the material name(gold, wood, etc) as arguments
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

@app.route('/listDealersClosedTrades', methods=['GET','POST'])
def listDealersTrades():
    # Get all the trades that the dealer has opened
    # We take the dealer id as an argument
    # Do it like this in the request: http://localhost:5000/listDealersClosedTrades?id=1

    dealer_id = request.args.get('id')
    trades = client.collection("closedTrades").get_full_list()
    trades_data = [{"id": record.id, "created": record.created, "dealer": record.dealer, "materialSum": record.materialsum, "blingSum": record.blingsum, "transactionType": record.transactiontype, "material": record.material} for record in trades if record.dealer == dealer_id ]

    return jsonify(trades_data)

@app.route('/listDealerOpenTrades', methods=['GET','POST'])
def listDealerOpenTrades():
    # Get all the trades that the dealer has opened
    # We take the dealer id as an argument
    # Do it like this in the request: http://localhost:5000/listDealerOpenTrades?id=1

    dealer_id = request.args.get('id')
    trades = client.collection("openTrades").get_full_list()
    trades_data = [{"id": record.id, "created": record.created, "dealer": record.dealer, "materialSum": record.materialsum, "blingSum": record.blingsum, "transactionType": record.transactiontype, "material": record.material} for record in trades if record.dealer == dealer_id ]

    return jsonify(trades_data)

@app.route('/getPortfolio', methods=['GET','POST'])
def getPortfolio():
    # Get the portfolio of a group or a dealer
    # We take the id of the group or dealer as an argument
    # And the type of the portfolio, if its a group or a dealer
    # And the resource that we want to get(gold, wood, bling)
    # Do it like this in the request: http://localhost:5000/getPortfolio?id=1&type=group&resource=gold

    id = request.args.get('id')
    type = request.args.get('type')
    resource = request.args.get('resource')

    if type == "dealer":
        getportfolio = client.collection("dealers").get_one(id).portfolio
        if resource == "gold":
            getgold = client.collection("portfolio").get_one(getportfolio).gold
            return str(getgold)
        if resource == "wood":
            getwood = client.collection("portfolio").get_one(getportfolio).wood
            return str(getwood)
        if resource == "bling":
            getbling = client.collection("portfolio").get_one(getportfolio).bling
            return str(getbling)
    if type == "group":
        getportfolio = client.collection("groups").get_one(id).portfolio
        if resource == "gold":
            getgold = client.collection("portfolio").get_one(getportfolio).gold
            return str(getgold)
        if resource == "wood":
            getwood = client.collection("portfolio").get_one(getportfolio).wood
            return str(getwood)
        if resource == "bling":
            getbling = client.collection("portfolio").get_one(getportfolio).bling
            return str(getbling)
    
    return "Error"

@app.route('/getPortfolioAll', methods=['GET','POST'])
def getPortfolioAll():
    # Get the portfolio of a group or a dealer
    # We take the id of the group or dealer as an argument
    # And the type of the portfolio, if its a group or a dealer
    # Do it like this in the request: http://localhost:5000/getPortfolioAll?id=1&type=group

    id = request.args.get('id')
    type = request.args.get('type')

    if type == "dealer":
        getportfolio = client.collection("dealers").get_one(id).portfolio
        getgold = client.collection("portfolio").get_one(getportfolio).gold
        getwood = client.collection("portfolio").get_one(getportfolio).wood
        getbling = client.collection("portfolio").get_one(getportfolio).bling
        return jsonify({"gold": getgold, "wood": getwood, "bling": getbling})
    if type == "group":
        getportfolio = client.collection("groups").get_one(id).portfolio
        getgold = client.collection("portfolio").get_one(getportfolio).gold
        getwood = client.collection("portfolio").get_one(getportfolio).wood
        getbling = client.collection("portfolio").get_one(getportfolio).bling
        return jsonify({"gold": getgold, "wood": getwood, "bling": getbling})
    
    return "Error"



    
@app.route('/updatePortfolio', methods=['GET','POST'])
def updatePortfolio():
    # Update the portfolio of a group or a dealer
    # We take the id of the group or dealer as an argument
    # And the type of the portfolio, if its a group or a dealer
    # And the resource that we want to update(gold, wood, bling)
    # And the value that we want to update it with
    # Do it like this in the request: http://localhost:5000/updatePortfolio?id=1&type=group&resource=gold&value=100

    id = request.args.get('id')
    type = request.args.get('type')
    resource = request.args.get('resource')
    value = request.args.get('value')

    if type == "dealer":
        getportfolio = client.collection("dealers").get_one(id).portfolio
        if resource == "gold":
            client.collection("portfolio").update(getportfolio, {"gold": value})
        if resource == "wood":
            client.collection("portfolio").update(getportfolio, {"wood": value})
        if resource == "bling":
            client.collection("portfolio").update(getportfolio, {"bling": value})
    if type == "group":
        getportfolio = client.collection("groups").get_one(id).portfolio
        if resource == "gold":
            client.collection("portfolio").update(getportfolio, {"gold": value})
        if resource == "wood":
            client.collection("portfolio").update(getportfolio, {"wood": value})
        if resource == "bling":
            client.collection("portfolio").update(getportfolio, {"bling": value})
    
    return "Portfolio updated"


@app.route('/closeTrade', methods=['GET','POST'])
def closeTrade():
    # Closes a trade that has been created by the dealer
    # We take the openTrade id and the id of the group that wants to close the trade
    # Do it like this in the request: http://localhost:5000/closeTrade?id=1&groupId=1

    closeTradeId = request.args.get('id')
    groupId = request.args.get('groupId')

    # lets save the open trades informations in a variable

    get = client.collection("OpenTrades").get_one(closeTradeId)

    closeTradeMaterialSum = get.materialsum
    closeTradeBlingSum = get.blingsum
    closeTradeTransactionType = get.transactiontype
    closeTradeMaterial = get.material
    closedTradeDealerId = get.dealer

    # lets transact the material and the bling
    # before we do that we need to check if the group has enough material and bling to transact

    if closeTradeTransactionType == "buy":
        # check if the group has enough bling
        urlGroup = "http://localhost:5000/getPortfolio?id=" + str(groupId) + "&type=group&resource=bling"
        getbling = int(requests.get(urlGroup).text)
        if getbling < closeTradeBlingSum:
            return "Not enough bling"
        # check if the dealer has enough material
        urlDealer = "http://localhost:5000/getPortfolio?id=" + str(closedTradeDealerId) + "&type=dealer&resource=" + closeTradeMaterial
        getmaterial = int(requests.get(urlDealer).text)
        if getmaterial < closeTradeMaterialSum:
            return "Not enough material"
        
        # update the portfolio of the group
        urlGroup = "http://localhost:5000/updatePortfolio?id=" + str(groupId) + "&type=group&resource=bling&value=" + str(getbling - closeTradeBlingSum)
        requests.get(urlGroup)
        # get the info about the material of the group
        materialgroup = int(requests.get("http://localhost:5000/getPortfolio?id=" + str(groupId) + "&type=group&resource=" + closeTradeMaterial).text)
        # add the material to the group
        urlGroup = "http://localhost:5000/updatePortfolio?id=" + str(groupId) + "&type=group&resource=" + closeTradeMaterial + "&value=" + str(materialgroup + closeTradeMaterialSum)
        requests.get(urlGroup)


        # update the portfolio of the dealer
        urlDealer = "http://localhost:5000/updatePortfolio?id=" + str(closedTradeDealerId) + "&type=dealer&resource=" + closeTradeMaterial + "&value=" + str(getmaterial - closeTradeMaterialSum)
        requests.get(urlDealer)
        # get the info about the bling of the dealer
        blingdealer = int(requests.get("http://localhost:5000/getPortfolio?id=" + str(closedTradeDealerId) + "&type=dealer&resource=bling").text)
        # add the bling to the dealer
        urlDealer = "http://localhost:5000/updatePortfolio?id=" + str(closedTradeDealerId) + "&type=dealer&resource=bling&value=" + str(blingdealer + closeTradeBlingSum)
        requests.get(urlDealer)


    if closeTradeTransactionType == "sell":
        # check if the group has enough material
        urlGroup = "http://localhost:5000/getPortfolio?id=" + str(groupId) + "&type=group&resource=" + closeTradeMaterial
        getmaterial = int(requests.get(urlGroup).text)
        if getmaterial < closeTradeMaterialSum:
            return "Not enough material"
        # check if the dealer has enough bling
        urlDealer = "http://localhost:5000/getPortfolio?id=" + str(closedTradeDealerId) + "&type=dealer&resource=bling"
        getbling = int(requests.get(urlDealer).text)
        if getbling < closeTradeBlingSum:
            return "Not enough bling"
        
        # update the portfolio of the group
        urlGroup = "http://localhost:5000/updatePortfolio?id=" + str(groupId) + "&type=group&resource=" + closeTradeMaterial + "&value=" + str(getmaterial - closeTradeMaterialSum)
        requests.get(urlGroup)
        # get the info about the material of the group
        materialgroup = int(requests.get("http://localhost:5000/getPortfolio?id=" + str(groupId) + "&type=group&resource=bling").text)
        # add the material to the group
        urlGroup = "http://localhost:5000/updatePortfolio?id=" + str(groupId) + "&type=group&resource=bling&value=" + str(materialgroup + closeTradeBlingSum)
        requests.get(urlGroup)


        # update the portfolio of the dealer
        urlDealer = "http://localhost:5000/updatePortfolio?id=" + str(closedTradeDealerId) + "&type=dealer&resource=bling&value=" + str(getbling - closeTradeBlingSum)
        requests.get(urlDealer)
        # get the info about the resource of the dealer
        blingdealer = int(requests.get("http://localhost:5000/getPortfolio?id=" + str(closedTradeDealerId) + "&type=dealer&resource=" + closeTradeMaterial).text)
        # add the resource to the dealer
        urlDealer = "http://localhost:5000/updatePortfolio?id=" + str(closedTradeDealerId) + "&type=dealer&resource=" + closeTradeMaterial + "&value=" + str(blingdealer + closeTradeMaterialSum)
        requests.get(urlDealer)

    # delete the trade
    client.collection("OpenTrades").delete(closeTradeId)

    # add trade to the closed trades
    client.collection("closedTrades").create({
        "dealer": closedTradeDealerId,
        "group": groupId,
        "materialsum": closeTradeMaterialSum,
        "blingsum": closeTradeBlingSum,
        "transactiontype": closeTradeTransactionType,
        "material": closeTradeMaterial,
        "typeofclosing": "completed"
    })  
  

    return "Trade closed"



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
