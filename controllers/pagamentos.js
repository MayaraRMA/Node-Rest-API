let adquirentes = [
    {
        "Adquirente": "Adquirente A",
        "Taxas": [
            {
                "Bandeira": "Visa",
                "Credito": 2.25,
                "Debito": 2.00
            },
            {
                "Bandeira": "Master",
                "Credito": 2.35,
                "Debito": 1.98
            }
        ]
    },
    {
        "Adquirente": "Adquirente B",
        "Taxas": [
            {
                "Bandeira": "Visa",
                "Credito": 2.50,
                "Debito": 2.08
            },
            {
                "Bandeira": "Master",
                "Credito": 2.65,
                "Debito": 1.75
            }
        ]
    },
    {
        "Adquirente": "Adquirente C",
        "Taxas": [
            {
                "Bandeira": "Visa",
                "Credito": 2.75,
                "Debito": 2.16
            },
            {
                "Bandeira": "Master",
                "Credito": 3.10,
                "Debito": 1.58
            }
        ]
    }
]


module.exports = function(app) {
    app.get('/', (req, res) => {
        res.status(200).json('Welcome to my Rest API')
    })

    app.get('/mdr', (req, res) => {
        console.log('recebida requisão na porta 3000')
        
        res.status(200).json(adquirentes)
    })

    app.post('/transaction', function(req, res) {
        let pagamento = req.body
        let pagamentoAdquirente = pagamento.Adquirente.toUpperCase()
        let pagamentoBandeira = pagamento.Bandeira.toLowerCase()
        let pagamentoTipo = pagamento.Tipo.toLowerCase()

        req.assert("Adquirente",
         "Aquirente é obrigatório").notEmpty()
        
         if(pagamentoAdquirente !="A" && pagamentoAdquirente !="B" && pagamentoAdquirente !="C" ) {
            req.assert("Adquirente", "Deve ser informado um Adquirente Cadastrado").equals("A")
         }

        req.assert("Valor",
         "Valor é obrigatorio e deve ser um decimal").notEmpty().isFloat()
        
        req.assert("Bandeira", 
        "Bandeira é obrigatória").notEmpty()

        if(pagamentoBandeira !="visa" && pagamentoBandeira !="master"  ) {
            req.assert("Bandeira", "Escolha entre as bandeiras visa ou master").equals("visa")
         }


        req.assert("Tipo",
        "Tipo é obrigatorio").notEmpty()

        if(pagamentoTipo !="credito" && pagamentoTipo !="debito"  ) {
            req.assert("Tipo", "Escolha entre os tipos credito ou debito").equals("credito")
         }

        let erros = req.validationErrors()        
        if(erros) {
            console.log('Erros de validacao encontrados')
            res.status(400).send(erros)
            return
        }
        
        
        console.log('processando uma requisicao de um novo pagamento')
        let taxa = 0
        if(pagamento.Adquirente == "A") {
            if(pagamento.Bandeira == 'visa'){
                if (pagamento.Tipo == 'credito'){
                    taxa = adquirentes[0].Taxas[0].Credito
                } else {
                    taxa = adquirentes[0].Taxas[0].Debito
                }
            } else {
                if (pagamento.Tipo == 'credito'){
                    taxa = adquirentes[0].Taxas[1].Credito
                } else {
                    taxa = adquirentes[0].Taxas[1].Debito
                }
            }
        }

        if(pagamento.Adquirente == "B") {
            if(pagamento.Bandeira == 'visa'){
                if (pagamento.Tipo == 'credito'){
                    taxa = adquirentes[1].Taxas[0].Credito
                } else {
                    taxa = adquirentes[1].Taxas[0].Debito
                }
            } else {
                if (pagamento.Tipo == 'credito'){
                    taxa = adquirentes[1].Taxas[1].Credito
                } else {
                    taxa = adquirentes[1].Taxas[1].Debito
                }
            }
        }

        if(pagamento.Adquirente == "C") {
            if(pagamento.Bandeira == 'visa'){
                if (pagamento.Tipo == 'credito'){
                    taxa = adquirentes[2].Taxas[0].Credito
                } else {
                    taxa = adquirentes[2].Taxas[0].Debito
                }
            } else {
                if (pagamento.Tipo = 'credito'){
                    taxa = adquirentes[2].Taxas[1].Credito
                } else {
                    taxa = adquirentes[2].Taxas[1].Debito
                }
            }
        }
        let valorLiquido = (pagamento.Valor * (1 - taxa/100)).toFixed(2)

        let response = {
            "ValorLiquido": valorLiquido,
        }
        res.status(201).json(response)
    })
}
