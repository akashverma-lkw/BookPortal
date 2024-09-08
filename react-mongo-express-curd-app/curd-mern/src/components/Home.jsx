import React from 'react'
import '../components/Home.css';
import '../App.css';

const Home = () => {
  return (
    <div>
      <div className="row">
        <div className="col-sm-12 p-0">
          <div className="bg">
            <div className="content">
              <h1> <span className="text-danger">B</span>ook<span  className="text-danger">P</span>ortal<br />Store your book record !</h1>
              <p>This is a BookPortal platform where you can store the book's Data <br/>
              and filled the details related to book information. </p>
              <form action="">
                <input type="text" name="" id="" placeholder="Welcome to BookPortal" /> <br/>
                <button type="submit" className="btn btn-primary">Explore</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
