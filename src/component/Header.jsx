import React, { Component } from 'react';
import { newsCategory } from '../news';

class Header extends Component {


// state = { 
//         SearchTeam: ''
//      }
// handleChange = (event) => {
//     this.setState({SearchTeam: event.target.value});
// }

// handleKeyPress = (event) => {
//     if(event.key === 'Enter') {
//         this.props.search(this.state.SearchTeam);
//     }
// }

    render() {
        const { category, changeCategory } = this.props;
        return (
            <div className='my-5'>
                <h1 className='mb-4 mt-5 text-center' style={{fontWeight: '300'}}>
                Block Bluster Headline
                </h1>
                {/* <input
                 type='search' 
                 className='form-control' 
                 placeholder='Type Anything & Press Enter To Search' 
                 value={this.state.SearchTeam} 
                 onChange= {this.handleChange} 
                 onKeyPress={this.handleKeyPress}
                 />   */}
                <div className='my-4'>
                    {newsCategory && Object.keys(newsCategory).map(item => {
                        if(category === newsCategory[item]) {
                           return(
                               <button onClick={() => changeCategory(newsCategory[item])} className='btn btn-sm btn-warning mb-2 mx-2'>
                                   {`#${newsCategory[item]}`}
                               </button>
                           )
                        } else {
                            return(
                                <button onClick={() => changeCategory(newsCategory[item])} className='btn btn-sm btn-light mb-2 mx-2'>
                                    {`#${newsCategory[item]}`}
                                </button>
                            )
                        }
                    })}
                </div> 
            </div>
        );
    }
}

export default Header;