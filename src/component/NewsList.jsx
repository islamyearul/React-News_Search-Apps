import React from 'react'

function getDate(dateTimestr) {
    return new Date(dateTimestr).toDateString();
}
const NewsItem = ({ item }) => (
    <div className='card my-2'>
        {item.urlToImage && (<img
            src={item.urlToImage}
            alt={item.title}
            className='card-img-top'
        />)}
        <div className='card-body'>
            <a
                href={item.url}
                target='_blank'
                rel='noopener noopener'
                style={{ color: '#424242' }}
            >
                <h5 className='card-title'>{item.title}</h5>
            </a>
            <a
                href={item.url}
                target='_blank'
                rel='noopener noopener'
                style={{ color: '#424242' }}
            >
                {item.content}

            </a>
            <div className='mt-2 d-flex justify-content-between'>
                <small>
                    <strong>
                        Publish at {getDate(item.publishedAt)}
                    </strong>
                </small>
                <div
                    style={{
                        padding: '0.25rem 0.50rem',
                        background: '#ededed',
                        color: '#424242',
                        borderRadius: '0.25rem',
                        display: 'inline-block'
                    }}
                    className='ml-auto'
                >
                    <small>{item.source.name}</small>
                </div>
            </div>
        </div>
    </div>
)
function NewsList(props) {
  

    return (
      
        <div>
            {/* {console.log( props.news)} */}
            { props.news &&  props.news.length === 0 && <h4>There is no News</h4>}
            { props.news &&  props.news.map(item => <NewsItem key={item.title} item={item} />)}
        
        </div>
    )
}
export default NewsList
