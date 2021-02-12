'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacoesService = function () {
    function NegociacoesService() {
        _classCallCheck(this, NegociacoesService);

        this._http = new HttpService();
    }

    _createClass(NegociacoesService, [{
        key: 'obterNegociacoesSemana',
        value: function obterNegociacoesSemana() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this._http.get('negociacoes/semana').then(function (negociacoes) {
                    return resolve(negociacoes.map(function (item) {
                        return new Negociacao(new Date(item.data), item.quantidade, item.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possível obter as negociações');
                });
            });
        }
    }, {
        key: 'obterNegociacoesSemanaAnterior',
        value: function obterNegociacoesSemanaAnterior() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2._http.get('negociacoes/anterior').then(function (negociacoes) {
                    return resolve(negociacoes.map(function (item) {
                        return new Negociacao(new Date(item.data), item.quantidade, item.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possível obter as negociações');
                });
            });
        }
    }, {
        key: 'obterNegociacoesSemanaRetrasada',
        value: function obterNegociacoesSemanaRetrasada() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3._http.get('negociacoes/retrasada').then(function (negociacoes) {
                    return resolve(negociacoes.map(function (item) {
                        return new Negociacao(new Date(item.data), item.quantidade, item.valor);
                    }));
                }).catch(function (erro) {
                    console.log(erro);
                    reject('Não foi possível obter as negociações');
                });
            });
        }
    }, {
        key: 'obterNegociacoes',
        value: function obterNegociacoes() {
            return Promise.all([this.obterNegociacoesSemana(), this.obterNegociacoesSemanaAnterior(), this.obterNegociacoesSemanaRetrasada()]).then(function (periodos) {

                var negociacoes = periodos.reduce(function (dados, periodo) {
                    return dados.concat(periodo);
                }, []).map(function (dado) {
                    return new Negociacao(new Date(dado.data), dado.quantidade, dado.valor);
                });

                return negociacoes;
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: 'cadastra',
        value: function cadastra(negociacao) {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function () {
                return 'Negociação adicionada com sucesso';
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível adicionar a negociação');
            });
        }
    }, {
        key: 'lista',
        value: function lista() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.listaTodos();
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível buscar as negociações');
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.apagaTodos();
            }).then(function (mensagem) {
                'Negociações removidas com sucesso';
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Falha ao apagar as negociações');
            });
        }
    }, {
        key: 'importa',
        value: function importa(lista) {
            return this.obterNegociacoes().then(function (negociacoes) {
                return negociacoes.filter(function (item) {
                    return !lista.negociacoes.some(function (obj) {
                        return JSON.stringify(obj) == JSON.stringify(item);
                    });
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível buscar negociações para importar');
            });
        }
    }]);

    return NegociacoesService;
}();