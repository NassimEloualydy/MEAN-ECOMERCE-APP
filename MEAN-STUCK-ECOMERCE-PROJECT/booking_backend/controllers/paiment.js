const braintree = require("braintree");
const Razorpay=require("razorpay");
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "4t7xcq8ym86htr9v",
  publicKey: "jkppc6p8bdzrtgzc",
  privateKey: "124cb34ec19af1f22d68bce8eeee29e5"
});
exports.createPaimentOrder= async (req,res)=>{
  var instance=new Razorpay({
    key_id:"rzp_test_J1Kjhd22vD33IA",
    key_secret:"KriUXAFOh82Ruy7Tuk88avQb"
  })
  var options = {
    amount: amount, // amount in the smallest currency unit here paise
    currency: "INR",
    receipt: "order_rcptid_11",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  };
  instance.orders.create(options, function (err, order) {
    if (err) {
      res.status(500);
      let response = { status: 500, data: err };
      res.send(response);
    } else if (order) {
      res.status(200);
      let response = { status: 200, data: order };
      res.send(response);
    }
  });
  
}
exports.getToken= async (req,res) => {
 

    gateway.clientToken.generate({
        
    }, (err, response) => {
        // pass clientToken to your front-end
        const clientToken = response.clientToken
    });
} 
//   app.get("/client_token", (req, res) => {
//     gateway.clientToken.generate({}, (err, response) => {
//       res.send(response.clientToken);
//     });
//   });

//   app.post("/checkout", (req, res) => {
//     const nonceFromTheClient = req.body.payment_method_nonce;
//     // Use payment method nonce here
//   });

//   gateway.transaction.sale({
//     amount: "10.00",
//     paymentMethodNonce: nonceFromTheClient,
//     deviceData: deviceDataFromTheClient,
//     options: {
//       submitForSettlement: true
//     }
//   }, (err, result) => {
//   }
//   );