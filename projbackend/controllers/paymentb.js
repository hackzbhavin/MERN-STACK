const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment:  braintree.Environment.Sandbox,
    merchantId:   '658mzrhsh5k5fgwb',
    publicKey:    '59v7c6k9mdzp9fc9',
    privateKey:   '89e74789dd121f660a830c3612042181'
});



exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function(err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  };
  
  exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
  
    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale(
      {
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
  
        options: {
          submitForSettlement: true
        }
      },
      function(err, result) {
        if (err) {
          res.status(500).json(error);
        } else {
          res.json(result);
        }
      }
    );
  };
  