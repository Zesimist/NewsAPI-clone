import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps={
    country:'us',
    pageSize: 6,
    category:'general',
  }
  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor() {
    super();
    // console.log("hello from news component")
    this.state = {
      article: [],
      loading: false,
      page:1
    }
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8fbd9d05fa2b40c2a5a9ca4e2c7b6ae6&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ article: parsedData.articles, 
      totalResults:parsedData.totalResults,
    loading:false })
  }
  
  async componentDidMount() {
  this.updateNews();
  }

  handleNextClick = async () => {
    // //console.log("next")
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&ccategory=${this.props.category}&apiKey=8fbd9d05fa2b40c2a5a9ca4e2c7b6ae6&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
    // // let url = `https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=8fbd9d05fa2b40c2a5a9ca4e2c7b6ae6&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   page: this.state.page + 1,
    //   article: parsedData.articles,
    //   loading:false
    // })
    // }
    this.setState({page: this.state.page +1})
    this.updateNews()

}

  handlePrevClick = async () => {
    //console.log("prev")
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8fbd9d05fa2b40c2a5a9ca4e2c7b6ae6&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
    // // let url = `https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=8fbd9d05fa2b40c2a5a9ca4e2c7b6ae6&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   article: parsedData.articles,
    //   loading:false
    // })

    this.setState({page: this.state.page -1})
    this.updateNews()
  }

  render() {
    return (
      <div className='container my-3'>
        <h3 className='text-center'>Top Headlines</h3>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.article.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} myDesc={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedDate={element.publishedAt} source={element.source.name} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button  disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
