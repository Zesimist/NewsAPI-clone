// import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, myDesc, imageUrl, newsUrl, author, publishedDate, source } = this.props;
    return (
      <div className='container my-3'>
        {/* style={{ width: "18rem" }} */}
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:1, left:'90%'}}>{source}</span>
          <img src={!imageUrl ? "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/456a4d59ada6303f047094ad60c91f62.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{myDesc}...</p>
            <p className="card-text"><small className="text-muted">Updated by {!author?"Unknown":author} on {new Date(publishedDate).toGMTString()} ago</small></p>
            <a href={newsUrl} target="blank" className="btn btn-dark">Read More...</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem