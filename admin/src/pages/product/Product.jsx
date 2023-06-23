import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { privateRequest } from "../../axiosRequest";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const product = useSelector((state)=>(state.root.product.products.find((product)=>product._id===productId)));
    const [pStats,setPStats] = useState([]);

    const dispatch = useDispatch();
    const [updatedProduct,setUpdatedProduct] = useState({});
    const handleUpdate = (e)=>{
        setUpdatedProduct({...updatedProduct,[e.target.name]:e.target.value})
        // setUpdatedProduct((currentProduct)=>({...currentProduct,[e.target.name]:e.target.value}));
    }

    const handleUpdateClick=(e)=>{
        e.preventDefault();
        updateProduct(dispatch,productId,updatedProduct);
    }
    useEffect(()=>{
        const getPStats=async()=>{
            try{
                const res = await privateRequest.get("/order/income/?pid="+productId);
                console.log(res.data);
                setPStats(res.data);
            }catch(err){
                console.log(err);
            }
        };
         getPStats();
    },[productId]);


  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">active:</span>
                      <span className="productInfoValue">yes</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.inStock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" placeholder={product.title} name="title" onChange={handleUpdate}/>
                  <label>Product Description</label>
                  <input type="text" placeholder={product.desc} name="desc" onChange={handleUpdate}/>
                  <label>Price</label>
                  <input type="text" placeholder={product.price} name="price" onChange={handleUpdate}/>
                  <label>Size</label>
                  <input type="text" placeholder={product.price} name="price" onChange={handleUpdate}/>
                  <label>In Stock</label>
                  <select name="inStock" id="idStock" onChange={handleUpdate}>
                  <option value="yes" >Please Select</option>
                      <option value="yes" >Yes</option>
                      <option value="no">No</option>
                  </select>
                  <label>Active</label>
                  <select name="active" id="active">
                        
                      <option value="yes" >Yes</option>
                      <option value="no">No</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product.img} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton" onClick={handleUpdateClick}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
