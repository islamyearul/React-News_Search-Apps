

import React from 'react';
import Header from './component/Header';
import News, { newsCategory } from './news';
import NewsList from './component/NewsList';
import Pagination from './component/Pagination';
import Loading from './component/Loading';
import Nav from './component/Nav';
import Footer from './component/Footer';

const news = new News(newsCategory.technology);


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      isLoading: true,
    }
  }
  componentDidMount() {
    news.getNews()
      .then(data => {
        this.setState({ data: data, isLoading: false })
      })
      .catch((e) => {
        console.log(e);
        alert("Something Was Wrong");
        this.setState({ isLoading: false })
      })

    // let news = new News(newsCategory.technology);
    // news.getNews().then(data =>{
    //   console.log(data);
    // })
    // const url = `${process.env.REACT_APP_NEWS_API_URL}?apikey=${process.env.REACT_APP_NEWS_API_KEY}&category=${this.state.category}&pageSize=5`;
    // axios.get(url)
    // .then(response => {  
    //   this.setState({ news: response.data.articles });
    //   console.log(this.state.news);
    // })
    // .catch(e => {
    //   console.log(e);
    // } 
    // );
  }

  next = () => {
    if (this.state.data.isNext) {
      this.setState({ isLoading: true });
    }
    news.nextPage().then(data => {
      this.setState({ data, isLoading: false })
    })
      .catch(e => {
        console.log(e);
        alert("Something Was Wrong in Next Page");
        this.setState({ isLoading: false })
      })

  }
  prev = () => {
    if (this.state.data.isPrev) {
      this.setState({ isLoading: true });
    }
    news.prevPage().then(data => {
      this.setState({ data, isLoading: false })
    })
      .catch(e => {
        console.log(e);
        alert("Something Was Wrong in Prev Page");
        this.setState({ isLoading: false })
      })
  }

  handlePageChanege = value => {
    this.setState({
      data: {
        ...this.state.data,
        currentPage: Number.parseInt(value),
      }
    })
  }
  goTOpage = () => {
    this.setState({ isLoading: true });
    news.setCurrentPage(this.state.data.currentPage).then(data => {
      this.setState({ data, isLoading: false });
      console.log(this.state.data.currentPage);
      console.log(data);
    })
      .catch(e => {
        console.log(e);
        alert("Something Was Wrong in Go tu page");
        this.setState({ isLoading: false });
      })
  }
  changeCategory = (category) => {
    this.setState({ isLoading: true });
    news.changeCategory(category).then(data => {
      this.setState({ data, isLoading: false })
    })
      .catch(e => {
        console.log(e);
        alert("Something Was Wrong in Change Category");
        this.setState({ isLoading: false })
      })
  }

  search = (search) => {
    this.setState({ isLoading: true });
    news.search(search).then(data => {
      this.setState({ data, isLoading: false })
    })
      .catch(e => {
        console.log(e);
        alert("Something Was Wrong in Search");
        this.setState({ isLoading: false })
      })
  }

  // componentDidUpdate(prevProps, prevState) {
  //   // if(prevState.category !== this.state.category){
  //   //   const url = `${process.env.REACT_APP_NEWS_API_URL}?apikey=${process.env.REACT_APP_NEWS_API_KEY}&category=${this.state.category}&pageSize=5`;
  //   //   axios.get(url)
  //   //   .then(response => {  
  //   //     this.setState({ news: response.data.articles });
  //   //     console.log(this.state.news);
  //   //   })
  //   //   .catch(e => {
  //   //     console.log(e);
  //   //   } 
  //   //   );
  //   // }
  // }
  render() {

    const {
      articles,
      totalPage,
      currentPage,
      category,
      totalResults,
      isNext,
      isPrev,
      isLoading
    } = this.state.data;

    return (

      <>
       <Nav search={this.search} ></Nav>
        <div className="container">

          <div className="row mt-3 mx-5 px-5">
            <div className="">
              <Header category={category} changeCategory={this.changeCategory} ></Header>
              <div className='d-flex justify-content-between'>
                <p className='text-black-50'>
                  About {totalResults} result found
                </p>
                <p className='text-black-50 ml-auto'>
                  {currentPage} page of {totalPage}
                </p>
              </div>
              {
                this.state.isLoading ? (
                  <Loading />
                ) : (

                  <div>
                    <NewsList news={articles} />
                    <Pagination
                      next={this.next}
                      prev={this.prev}
                      isNext={isNext}
                      isPrev={isPrev}
                      totalPage={totalPage}
                      currentPage={currentPage}
                      handlePageChanege={this.handlePageChanege}
                      goTOpage={this.goTOpage}
                    />
                  </div>

                )
              }

            </div>
          </div>
        </div>
        <Footer></Footer>
      </>

    )
  }

}

export default App;
