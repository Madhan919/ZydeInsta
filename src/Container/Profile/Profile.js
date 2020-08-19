import React, { Fragment, useState, useEffect } from "react";
import { InstaProfile, Spinner } from "../../Components";
import axios from "axios";
const Profile = () => {
  const [postimage, setImage] = useState([]);
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    setSpinner(true);
    axios
      .get("http://localhost:9000/post")
      .then((response) => {
        setTimeout(() => {
          const feeds = response.data.data.sort(function (a, b) {
            return new Date(b.postedTime) - new Date(a.postedTime);
          });
          setImage(feeds);
          setSpinner(false);
        }, 1000);
      })
      .catch((errors) => {
        console.log(errors);
      });
  }, []);

  return (
    <Fragment>
      <div>
        <InstaProfile />
        <header className="profile">
          Ms Dhoni <br />
          <span>
            <label>{postimage.length} posts</label>
            <label>23.5k followers</label>
            <label>86 following</label>
          </span>
        </header>
      </div>
      <div className="container-1">
        {postimage.length > 0 ? (
          postimage.map((image) => (
            <div key={image.image} className="box-1">
              <div className="overlayDiv">
                <div className="overlay" />
              </div>
              <img
                className="myImagess"
                src={`http://localhost:9000/${image.image}`}
                alt="img"
              />
            </div>
          ))
        ) : (
          <Fragment>
            <span className="nodata">
              <Spinner />
            </span>
            {!spinner && (
              <h3 className="nodata">There is no post available..!</h3>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Profile;
