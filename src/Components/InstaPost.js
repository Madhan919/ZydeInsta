import React from "react";

const InstaPost = (props) => {
  return (
    <div>
      <div className="image-root">
        <div className="title">
          <img className="logoAvatar" src={props.profileSrc} alt="img" />
          <label className="name">{props.profileName} </label>
          <span>
            <img alt="Dot icon" className="dotImg" src="Image/Icons/dot.jpg" />
          </span>
          <label className="timeCaption">{props.postedTime}</label>
        </div>
        <img className="postImage" src={props.imgSrc} alt="img" />
        <p className="desc">
          <b>{props.profileName}</b> {props.caption}
        </p>
      </div>
    </div>
  );
};

export default InstaPost;
