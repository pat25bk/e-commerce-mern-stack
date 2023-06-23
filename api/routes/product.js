const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const product = await newProduct.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    console.log(req.params.id);
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted succesfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT INFO
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const { password, ...others } = product._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCT
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qOrder = req.query.product_order;
  const qCategory = req.query.category;
  const qKeywords = (req.query.keywords);
  console.log(qKeywords);
  let qPageNum = req.query.p;
  const numProductPerPage = 8;
  if (!(qPageNum)) qPageNum = 1;
  console.log(qPageNum);
  try {
    let resData = {};
    if (qKeywords) {
      const totalNumProduct = await Product.countDocuments({ $text: { $search: qKeywords } });
      resData.totalNum = totalNumProduct;
      resData.maxPageNum = Math.ceil(totalNumProduct / numProductPerPage);
      switch (qOrder) {
        case "price_desc":
          resData.products = await Product.find({ $text: { $search: qKeywords } })
            .sort({ price: -1 })
            .skip((qPageNum - 1) * numProductPerPage)
            .limit(numProductPerPage);;
          break;
        case "price_asc":
          resData.products = await Product.find({ $text: { $search: qKeywords } })
            .sort({ price: 1 })
            .skip((qPageNum - 1) * numProductPerPage)
            .limit(numProductPerPage);;
          break;
        default: //"newest"
          resData.products = await Product.find({ $text: { $search: qKeywords } })
            .sort({ createdAt: -1 })
            .skip((qPageNum - 1) * numProductPerPage)
            .limit(numProductPerPage);
      }
    }
    else if (qCategory) {
      console.log("cat:", qCategory.toLowerCase());
      const totalNumProduct = await Product.countDocuments({ categories: { $in: [qCategory.toLowerCase()] } });
      resData.totalNum = totalNumProduct;
      resData.maxPageNum = Math.ceil(totalNumProduct / numProductPerPage);
      switch (qOrder) {
        case "price_desc":
          resData.products = await Product.find({ categories: { $in: [qCategory.toLowerCase()] } })
            .sort({ price: -1 })
            .skip((qPageNum - 1) * numProductPerPage)
            .limit(numProductPerPage);;
          break;
        case "price_asc":
          resData.products = await Product.find({ categories: { $in: [qCategory.toLowerCase()] } })
            .sort({ price: 1 })
            .skip((qPageNum - 1) * numProductPerPage)
            .limit(numProductPerPage);;
          break;
        default: //"newest"
          resData.products = await Product.find({ categories: { $in: [qCategory.toLowerCase()] } })
            .sort({ createdAt: -1 })
            .skip((qPageNum - 1) * numProductPerPage)
            .limit(numProductPerPage);
      }
    }
    else {
      const totalNumProduct = await Product.countDocuments();
      resData.totalNum = totalNumProduct;
      resData.maxPageNum = Math.ceil(totalNumProduct / numProductPerPage);
      switch (qOrder) {
        case "price_desc":
          resData.products = await Product.find()
            .sort({ price: -1 })
            .skip((qPageNum - 1) * numProductPerPage)
            .limit(numProductPerPage);;
          break;
        case "price_asc":
          resData.products = await Product.find()
            .sort({ price: 1 })
            .skip((qPageNum - 1) * numProductPerPage)
            .limit(numProductPerPage);;
          break;
        default: //"newest"
          resData.products = await Product.find()
            .sort({ createdAt: -1 })
            .skip((qPageNum - 1) * numProductPerPage)
            .limit(numProductPerPage);
      }
    }
    // console.log(resData);
    res.status(200).json(resData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

