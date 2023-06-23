import { useEffect, useState } from "react";
import "./newProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/apiCalls";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import {useHistory} from "react-router-dom";

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const arrayInput = ["categories","color","size"];
  // const [file, setFile] = useState();
  // const [fileUrl,setFileUrl] = useState("");

  const dispatch = useDispatch();
  
  const handleInput = (e) => {
    let value;
    if (arrayInput.includes(e.target.name))
      value = e.target.value.split(",");
    else
      value = e.target.value;

    setProduct({ ...product, [e.target.name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    // const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setProduct({ ...product, img: downloadURL });
        });
      }
    );
  }

  const handleCreateClick = (e) => {
    e.preventDefault();
    addProduct(dispatch, product);
    window.location.reload();
  };

  const err = useSelector((state)=>state.root.product.error);

  console.log(product,err);
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" multiple onChange={handleFileUpload} />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" placeholder="Shirt" name="title" required onChange={handleInput} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="Oxford Slimfit Imformal" name="desc" required onChange={handleInput} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="number" placeholder="0" name="price" required onChange={handleInput} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="0" name="categories" required onChange={handleInput} />
        </div>
        <div className="addProductItem">
          <label>Image URL</label>
          <input type="text" placeholder="https://" name="img" required onChange={handleInput} />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input type="text" placeholder="white,black,..." name="color" required onChange={handleInput} />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input type="text" placeholder="S,M,..." name="size" required onChange={handleInput} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={(handleInput)}>
            <option>Select</option>
            <option >Yes</option>
            <option>No</option>
          </select>
        </div>

        <button type="submit" className="addProductButton" onClick={handleCreateClick}>Create</button>
      </form>
    </div>
  );
}
