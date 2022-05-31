import React, { Component } from 'react'

 class Pagination extends Component {
     state ={
         isEditable: false,
     }
  render() {
    const {    
        next,
        prev,
        totalPage,
        currentPage,
        isNext,
        isPrev,
        handlePageChanege,
        goTOpage,
      } = this.props;
    return (
      <div className='d-flex my-5 align-items-center'>
          <button className='btn btn-warning' disabled={!isPrev} onClick={() => prev()}>Previous</button>
          <div className='flex-grow-1 text-center'>
              {this.state.isEditable ? (
            <input 
              type='number' 
              value={currentPage} 
              onChange={(e) => handlePageChanege(e.target.value)}
              onKeyPress={(e) => {
                if(e.key === 'Enter'){
                    goTOpage()
                    this.setState({isEditable: false})
                }
              }}        
            />
              ):(
                  <p style={{ usetSelect: 'none', lineHeight: '1.1'}} 
                  title='Double Tap to Jump Page'
                  onDoubleClick={() =>{
                      this.setState({isEditable: !this.state.isEditable})
                  }}>
                      {currentPage} of {totalPage}
                      <br/>
                      <small>Double Click to Edit</small>
                  </p>
              )} 
          </div>
          <button className='btn btn-warning'
           disabled={!isNext}
              onClick={() => next()}
           >Next</button>
        
      </div>
    )
  }
}

export default Pagination
