import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props);
    // console.log("hello from news component")
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    }
  }

  async updateNews() {
    this.props.setProgress(10)
    
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews();
  }

   fetchMoreData = async () => {
   this.setState({page: this.state.page+1})
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
      // loading: false
    })
  }

  // handleNextClick = async () => {
  //   // //console.log("next")
  //   // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&ccategory=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
  //   // // let url = `https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
  //   // this.setState({loading:true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({
  //   //   page: this.state.page + 1,
  //   //   article: parsedData.articles,
  //   //   loading:false
  //   // })
  //   // }
  //   this.setState({ page: this.state.page + 1 })
  //   this.updateNews()

  // }

  // handlePrevClick = async () => {
  //   //console.log("prev")
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
  //   // // let url = `https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
  //   // this.setState({loading:true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   article: parsedData.articles,
  //   //   loading:false
  //   // })

  //   this.setState({ page: this.state.page - 1 })
  //   this.updateNews()
  // }

  render() {
    return (
      <div className='container my-3'>
        <h3 className='text-center'>Top Headlines</h3>
        {this.state.loading && <Spinner />}
        <InfiniteScroll 
        dataLength={this.state.articles.length} 
        next={this.fetchMoreData} 
        hasMore={this.state.articles.length !== this.state.totalResults} 
        loader={<Spinner />}>
          <div className="container">
          <div className="row">

            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} myDesc={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedDate={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }
}

export default News
