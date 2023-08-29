import React from 'react'

function Category() {
  return (
    <>
        <div className="d-flex overflow-hidden overflow-x-scroll">
            <div className="category active">All</div>
            <div className="category">Music</div>
            <div className="category">Gaming</div>
            <div className="category">Movies</div>
            <div className="category">News</div>
            <div className="category">Live</div>
            <div className="category">Fashion & Beauty</div>
            <div className="category">Learning</div>
            <div className="category">Sports</div>
            <div className="category">360° Video</div>
            <div className="category">Browse Channels</div>
        </div>
    </>
  )
}

export default Category;