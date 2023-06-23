const router = require("express").Router();
const stripe = require("stripe")('sk_test_51MnIMcEDnPfxhLq1ggHS1vTvG0s4Ofaze1kW6zcCsg3e0Ikpp3xpgCDfjn9RSpIMgCCMHfndx5SPdj2ZbqtZgi1J00vxjjey8t');

router.post("/payment", (req, res) => {
  console.log("Rx post-req"+req.body.tokenId+" "+req.body.amount);
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;