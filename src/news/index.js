
import axios from '../utilis/axios';

export const newsCategory = {
    technology : 'technology',
    business : 'business',
    entertainment : 'entertainment',
    health : 'health',
    science : 'science',
    sports : 'sports',
    general : 'general',

}

const MAX_ITEM_PER_PAGE = 5;

export default class News {

    constructor(category){
        this._category = category;
        this._searchItem = '';
        this._pageSize = MAX_ITEM_PER_PAGE;
        this._currentPage = 1;
        this._totalPage = 1; 
        this._isPrev = this._isPrev;
        this._isNext = this._isNext;
      }

   async getNews(){
        try{
            const {data} = await axios.get(this._geturl());
            this._totalPage = Math.ceil(data.totalResults/MAX_ITEM_PER_PAGE); //total page
            //console.log(this._totalPage, this._pageSize);
            return{
                articles: data.articles,
                totalPage: this._totalPage,
                currentPage: this._currentPage,
                category: this._category,
                totalResults: data.totalResults,
                isNext: this._isNext(),
                isPrev: this._isPrev(),

            }

        }catch(e){
           throw new Error(e);
        }
      
    }

    nextPage(){
        if(this._isNext()){
            this._currentPage++;
            return this.getNews();
        }
        return false;
    }

    prevPage(){
        if (this._isPrev()){
            this._currentPage--;
            return this.getNews();
        }
        return false;        
    } 

    setCurrentPage(pageNumber){
        if(pageNumber < 1 && pageNumber > this._totalPage){
            throw new Error('Page number is out of range');
        }
        this._currentPage = pageNumber;
        return this.getNews();
    }

    changeCategory(category){
        this._category = category;
        this._currentPage = 1;
        return this.getNews();
    }
    search(Term){
        this._searchItem = Term;
        this._currentPage = 1;
        return this.getNews();
    }

    _geturl(){
        let url = '/?';
        if(this._category) url += `category=${this._category}`; 
        if(this._searchItem) url += `&q=${this._searchItem}`; 
        if(this._pageSize) url += `&pageSize=${this._pageSize}`; 
        if(this._currentPage) url += `&page=${this._currentPage}`; 

        return url;

    }

    _isNext(){
        return this._currentPage < this._totalPage;
    }

   _isPrev (){
        return this._currentPage > 1;
    }

}