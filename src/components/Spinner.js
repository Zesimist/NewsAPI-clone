import React, { Component } from 'react'
import loading from 'F:/30_Days_of_React/newsapp/newsapp/src/loading.gif'

export default class Spinner extends Component {
  

  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="loading" />
      </div>
    )
  }
}
