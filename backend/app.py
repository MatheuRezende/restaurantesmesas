
from flask import Flask, jsonify, request

app = Flask(__name__)

# Dados simulados
mesas = [
    {"id": 1, "numero": 1, "status": "disponível"},
    {"id": 2, "numero": 2, "status": "ocupada"}
]

produtos = [
    {"id": 1, "nome": "Pizza Margherita", "preco": 30.0, "categoria": "comida"},
    {"id": 2, "nome": "Coca-Cola", "preco": 7.0, "categoria": "bebida"},
    {"id": 3, "nome": "Lasanha", "preco": 25.0, "categoria": "comida"}
]

usuarios = [
    {"usuario": "garcom", "senha": "1234"}
]

pedidos = []

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    for u in usuarios:
        if u["usuario"] == data["usuario"] and u["senha"] == data["senha"]:
            return jsonify({"status": "ok"})
    return jsonify({"status": "erro"}), 401

@app.route('/mesas')
def listar_mesas():
    return jsonify(mesas)

@app.route('/cardapio')
def listar_cardapio():
    return jsonify(produtos)

@app.route('/fechar-conta/<int:mesa_id>', methods=['POST'])
def fechar_conta(mesa_id):
    for mesa in mesas:
        if mesa["id"] == mesa_id:
            mesa["status"] = "disponível"
            return jsonify({"mensagem": f"Conta da mesa {mesa_id} foi fechada."})
    return jsonify({"mensagem": "Mesa não encontrada"}), 404

if __name__ == '__main__':
    app.run(debug=True)
