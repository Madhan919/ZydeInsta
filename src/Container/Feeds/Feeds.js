import React, { Fragment, useEffect, useState } from "react";
import { InstaPost, Spinner } from "../../Components";
import axios from "axios";

const Feeds = (props) => {
  const [postimage, setImage] = useState([]);
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    console.log(props);
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
  function getPostedTime(postedTime) {
    return Math.round((new Date() - new Date(postedTime)) / 1000 / 60);
  }
  return (
    <Fragment>
      {postimage.length > 0 ? (
        postimage.map((image) => (
          <InstaPost
            profileSrc={`http://localhost:9000/${image.image}`}
            profileName={"Dhoni World"}
            postedTime={
              getPostedTime(image.postedTime) < 3
                ? "just now"
                : getPostedTime(image.postedTime) > 59 &&
                  getPostedTime(image.postedTime) < 120
                ? Math.round(getPostedTime(image.postedTime) / 60) + " hour ago"
                : getPostedTime(image.postedTime) < 120
                ? getPostedTime(image.postedTime) + " minutes ago"
                : getPostedTime(image.postedTime) > 1139
                ? "one day ago"
                : getPostedTime(image.postedTime) > 119 &&
                  getPostedTime(image.postedTime) < 1140
                ? Math.round(getPostedTime(image.postedTime) / 60) +
                  " hours ago"
                : image.postedTime
            }
            imgSrc={`http://localhost:9000/${image.image}`}
            caption={image.caption}
            key={image.image}
          />
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
    </Fragment>
  );
};
export default Feeds;
