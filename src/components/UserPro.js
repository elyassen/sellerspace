import React, { useEffect, useState } from "react";
import "./userpro.css";
import { useSelector } from "react-redux";
function UserPro() {
  const user = useSelector((State) => State.user);
  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    price: null,
    quantity: null,
  });
  const [images, setImages] = useState([]);
  const [imgurl, setImgUrl] = useState("");
  const [productList, setProductList] = useState(null);

  const seller = user._id;

  const [category, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newvalue =
      name == "price" || name == "quantity" ? parseInt(value) : value;
    setProductDetails({ ...productDetails, [name]: newvalue });
  };

  const handleImgUrl = (e) => {
    setImgUrl(e.target.value);
  };

  const handleimages = () => {
    setImages([...images, imgurl]);
    setImgUrl("");
  };

  const { title, description, price, quantity } = productDetails;
  const datatoBackend = {
    title,
    description,
    price,
    quantity,
    category,
    images,
    seller,
  };
  const submitProducts = async () => {
    try {
      const req = await fetch("http://localhost:3001/product", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(datatoBackend),
      });
      if (req.status == 200) {
        const res = await req.json();
        console.log(res);
        clearData();
      }
      if (req.status == 400) {
        const res = await req.json();
        console.log(res);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const clearData = () => {
    setProductDetails({
      title: "",
      description: "",
      price: "",
      quantity: "",
    });
    setSelectedCategory(null);
    setImages([]);
    setImgUrl("");
  };

  async function getProducts() {
    try {
      const req = await fetch("http://localhost:3001/sellerlist", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id: user._id }),
      });
      if (req.ok) {
        const res = await req.json();
        setProductList(res);
        console.log("products fetched");
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getProducts();
  }, [user._id]);
  console.log(productList);
  return (
    <div className="userpro">
      <div className="product_display user_pro_div">
        <h4 className="userpro-heading">Yours products</h4>
        <div className="product-list">
          {productList &&
            productList.map((product) => (
              <div>
                <h1>{product.title}</h1>
                <h4>{product.quantity}</h4>
              </div>
            ))}
        </div>
      </div>
      <div className="add_product user_pro_div">
        <h4 className="userpro-heading">Add new Product</h4>
        <div className="newproduct">
          <div className="product-item">
            <h4>Name</h4>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={productDetails.title}
            />
          </div>
          <div className="product-item">
            <h4>Product description</h4>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={productDetails.description}
            />
          </div>
          <div className="product-item">
            <h4>price</h4>
            <input
              type="number"
              name="price"
              onChange={handleChange}
              value={productDetails.price}
              min="0"
              max="1000000"
            />
          </div>
          <div className="product-item">
            <h4>Quantity</h4>
            <input
              type="number"
              name="quantity"
              min="0"
              onChange={handleChange}
              value={productDetails.quantity}
            />
          </div>
          <div className="product-item">
            <h4>Category</h4>

            <select value={category} onChange={handleCategoryChange}>
              <option value="clothing">Clothing and Accessories</option>
              <option value="electronics">Electronics</option>
              <option value="home-furniture">Home and Furniture</option>
              <option value="beauty-care">Beauty and Personal Care</option>
              <option value="sports-outdoors">Sports and Outdoors</option>
              <option value="toys-games">Toys and Games</option>
              <option value="books-media">Books and Media</option>
              <option value="health-wellness">Health and Wellness</option>
              <option value="automotive">Automotive</option>
              <option value="pet-supplies">Pet Supplies</option>
            </select>
          </div>

          <div className="product-item">
            <h4>Image url</h4>
            <div className="image-input">
              <input
                type="text"
                name="imageurl"
                value={imgurl}
                onChange={handleImgUrl}
              />
              <button onClick={handleimages}>Add</button>
            </div>
            <p>{images.length}</p>
          </div>
        </div>
        <button onClick={submitProducts} className="submit-product">
          Submit
        </button>
      </div>
      <div className="user_info user_pro_div">
        <div className="user-info-div">
          <h4 className="userpro-heading">Seller's info</h4>
          <h6 className="seller-info-list s-name">{user.s_name}</h6>
          <h6 className="seller-info-list">{user?.email}</h6>

          <h6 className="seller-info-list">{user?.s_phone}</h6>
          <h6 className="seller-info-list">{user?.s_dob}</h6>
          <h6 className="seller-info-list">{user?.s_address}</h6>
        </div>
      </div>
    </div>
  );
}

export default UserPro;
