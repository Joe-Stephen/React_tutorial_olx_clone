import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../store/Context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
  const {firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const date = new Date();
  const history = useHistory();

const handleSubmit = ()=>{
  firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
    ref.getDownloadURL().then((url)=>{
      firebase.firestore().collection('products').add({
        name,
        category,
        url,
        price,
        userId:user.uid,
        createdAt:date.toDateString()
      });
      history.push('/');
    });
  }).catch((error) => {
    setError(error.message);
  });
};

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="fname"
              name="Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              name="category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input"
             type="number"
             value={price}
             onChange={(e)=>setPrice(e.target.value)}
              id="price"
               name="Price" />
            <br />
          <br />
          <img alt="Posts"
           width="200px"
            height="200px"
             src={image?URL.createObjectURL(image):''}></img>
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            {error && <p className="error">{error}</p>}
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
