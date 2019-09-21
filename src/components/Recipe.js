import React, { Component } from "react";

export default class Recipe extends Component {
  state = {};
  render() {
    const {
      image_url,
      title,
      source_url,
      publisher,
      recipe_id
    } = this.props.recipe;
    const { handleDetails } = this.props;

    return (
      <React.Fragment>
        <div className="col-10 mx-auto col-md-6 col-lg-4 my-3">
          <div className="card">
            <img
              src={image_url}
              className="img-card-top"
              style={{ height: "14rem" }}
              alt=""
            />
            <div className="card-body text-capitalize"></div>
            <h6 className="mx-4">{title}</h6>
            <h6 className="mx-4  text-warning text-slanted">
              provided by {publisher}
            </h6>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-primary text-capitalize"
              type="button"
              onClick={handleDetails}
            >
              details
            </button>
            <a
              href={source_url}
              className="btn btn-success mx-2 text-capitaize"
              target="_blank"
              rel="noopener noreferrer"
            >
              recipe url
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
