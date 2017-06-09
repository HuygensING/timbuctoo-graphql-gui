import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Header from './header';
import {FacetsTemp} from './hi-resultlist';
import {FacetDatasetToggles} from './hi-resultlist';
import {Resultslistheader} from './hi-resultlist';

storiesOf('HI-Resultlist', module)
	.add('aggregated dataset', () => (
<div>
  <Header projectId="timbuctoo" />
  <div className="container big-margin">
    <FacetDatasetToggles />
    <div className="row">
      <FacetsTemp />
      <div className=".hidden-sm col-md-1"></div>
      <div className="col-sm-8 col-md-8">
        <Resultslistheader />
        <div className="result-list big-margin">
          <ol className="clearfix">
            <li className="clearfix"> <a href="Tim-faceted-search-detail.html"> <span className="row pull-right clearfix"> <span className="col-md-6 ">Christiaan Huygens</span> <span className="col-md-6 hi-light-grey text-right small">CKCC</span> </span> <span className="row pull-right clearfix"> <span className="col-md-12 hi-light-grey small ">14 April 1629 – 8 July 1695</span> </span> </a> </li>
            <li className="clearfix"> <a href="Tim-faceted-search-detail.html"> <span className="row pull-right clearfix"> <span className="col-md-6 ">Constantijn Huygens</span> <span className="col-md-6 hi-light-grey text-right small">CKCC</span> </span> <span className="row pull-right clearfix"> <span className="col-md-12 hi-light-grey small ">14 April 1629 – 8 July 1695</span> </span> <span className="row pull-right clearfix"> <span className="col-md-12 small text-right">Go to CKCC dataset</span> </span> </a> </li>
            <li className="clearfix"> <a href="Tim-faceted-search-detail.html"> <span className="row pull-right clearfix"> <span className="col-md-6 ">Christiaan Huygens</span> <span className="col-md-6 hi-light-grey text-right small">DBpedia</span> </span> <span className="row pull-right clearfix"> <span className="col-md-12 hi-light-grey small ">14 April 1629 – 8 July 1695</span> </span> </a> </li>
            <li className="clearfix"> <a href="Tim-faceted-search-detail.html"> <span className="row pull-right clearfix"> <span className="col-md-6 ">Constantijn Huygens</span> <span className="col-md-6 hi-light-grey text-right small">DBpedia</span> </span> <span className="row pull-right clearfix"> <span className="col-md-12 hi-light-grey small ">14 April 1629 – 8 July 1695</span> </span> <span className="row pull-right clearfix"> <span className="col-md-12 small text-right">Go to BDpedia dataset</span> </span> </a> </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <footer className="footer">
    <div className="white-bar">
      <div className="container">
        <div className="row">
          <div className="col-sm-2 col-md-2">
            <button type="button" className="btn btn-default"  aria-haspopup="true" aria-expanded="false">New search</button>
          </div>
          <div className="col-sm-10 col-md-10 text-right"> <span className="btn btn-primary btn-sm">Author <span className="glyphicon glyphicon-remove-sign hi-half-transp"></span></span> <span className="btn btn-primary btn-sm">Ireland <span className="glyphicon glyphicon-remove-sign hi-half-transp"></span></span> <span className="btn btn-primary btn-sm">Female <span className="glyphicon glyphicon-remove-sign hi-half-transp"></span></span> </div>
        </div>
      </div>
    </div>
    <div className="white-bar">
      <div className="container">
        <div className="row">
          <div className="col-sm-1 col-md-1"><img src="images/logo-huygens-ing.svg" className="hi-logo" alt=""/></div>
          <div className="col-sm-10 col-md-10 text-center">
            <div className="btn-group dropup pull-right">
              <button type="button" className="btn btn-blank dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">[Mocks] <span className="caret"></span></button>
              <ul className="dropdown-menu">
                <li><a href="Tim-dashboard-start.html">Dashboard start</a></li>
                <li><a href="Tim-dashboard.html">Dashboard</a></li>
                <li><a href="Tim-upload1.html">Upload 1</a></li>
                <li><a href="Tim-upload2.html">Upload 2</a></li>
                <li><a href="Tim-edit.html">Edit</a></li>
                <li><a href="Tim-faceted-search.html">Faceted search</a></li>
                <li><a href="Tim-faceted-search-detail.html">Faceted search detail</a></li>
                <li><a href="Tim-aggregated-search-item.html">Aggregated Search Item</a></li>
                <li><a href="Tim-aggregated-search-dataset.html">Aggregated Search Dataset</a></li>
              </ul>
            </div>
            <nav aria-label="Page navigation">
              <ul  className="pagination pagination-sm">
                <li> <a href="#" aria-label="Previous"> <span aria-hidden="true">«</span> </a> </li>
                <li className="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li> <a href="#" aria-label="Next"> <span aria-hidden="true">»</span> </a> </li>
              </ul>
            </nav>
          </div>
          <div className="col-sm-1 col-md-1 text-right"><img src="images/logo-clariah.svg" className="logo" alt=""/></div>
        </div>
      </div>
    </div>
  </footer>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script> 
  <script src="js/bootstrap.js"></script> 
  <script src="js/basic.js"></script> 
</div>

	)).add('aggregated items', () => (
		<div>
	<Header projectId="timbuctoo" />
<div className="container big-margin">
  <FacetDatasetToggles />
  
   <div className="row">
    <FacetsTemp />
    <div className=".hidden-sm col-md-1"></div>
    
      <div className="col-sm-8 col-md-8">
        <Resultslistheader />
      <div className="result-list big-margin">
        <ol className="clearfix">
          <li className="clearfix">
          	<a href="Tim-faceted-search-detail.html">
				<span className="row pull-right clearfix">
					<span className="col-md-6 ">Christiaan Huygens</span>
					<span className="col-md-6 hi-light-grey text-right small">DBpedia</span>
				</span>
				<span className="row pull-right clearfix">
					<span className="col-md-12 hi-light-grey small ">14 April 1629 – 8 July 1695</span>
				</span>
        	</a>
          </li>
          <li className="clearfix">
          	<a href="Tim-faceted-search-detail.html">
				<span className="row pull-right clearfix">
					<span className="col-md-6 ">Constantijn Huygens</span>
					<span className="col-md-6 hi-light-grey text-right small">CKCC</span>
				</span>
				<span className="row pull-right clearfix">
					<span className="col-md-12 hi-light-grey small ">14 April 1629 – 8 July 1695</span>
					
				</span>
        	</a>
          </li>
          <li className="clearfix">
          	<a href="Tim-faceted-search-detail.html">
				<span className="row pull-right clearfix">
					<span className="col-md-6 ">Christiaan Huygens</span>
					<span className="col-md-6 hi-light-grey text-right small">DBpedia</span>
				</span>
				<span className="row pull-right clearfix">
					<span className="col-md-12 hi-light-grey small ">14 April 1629 – 8 July 1695</span>
				</span>
        	</a>
          </li>

          
        </ol>
      </div>
    </div>
  </div>
</div>
<footer className="footer">
	<div className="white-bar">
        <div className="container">
            <div className="row">
                <div className="col-sm-2 col-md-2"><button type="button" className="btn btn-default"  aria-haspopup="true" aria-expanded="false">New search</button></div>
                <div className="col-sm-10 col-md-10 text-right">
                    <span className="btn btn-primary btn-sm">Author <span className="glyphicon glyphicon-remove-sign hi-half-transp"></span></span>
                    <span className="btn btn-primary btn-sm">Ireland <span className="glyphicon glyphicon-remove-sign hi-half-transp"></span></span>
                    <span className="btn btn-primary btn-sm">Female <span className="glyphicon glyphicon-remove-sign hi-half-transp"></span></span>
                </div>
            </div>
        </div>
     </div>
     
     <div className="white-bar">
        <div className="container">
            <div className="row">
                <div className="col-sm-1 col-md-1"><img src="images/logo-huygens-ing.svg" className="hi-logo" alt=""/></div>
                <div className="col-sm-10 col-md-10 text-center">
                    
                    <div className="btn-group dropup pull-right">
                      <button type="button" className="btn btn-blank dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">[Mocks] <span className="caret"></span></button>
                      <ul className="dropdown-menu">
                        <li><a href="Tim-dashboard-start.html">Dashboard start</a></li>
                        <li><a href="Tim-dashboard.html">Dashboard</a></li>
                        <li><a href="Tim-upload1.html">Upload 1</a></li>
                        <li><a href="Tim-upload2.html">Upload 2</a></li>
                        <li><a href="Tim-edit.html">Edit</a></li>
                        <li><a href="Tim-faceted-search.html">Faceted search</a></li>
                        <li><a href="Tim-faceted-search-detail.html">Faceted search detail</a></li>
                        <li><a href="Tim-aggregated-search-item.html">Aggregated Search Item</a></li>
                        <li><a href="Tim-aggregated-search-dataset.html">Aggregated Search Dataset</a></li>
                      </ul>
                    </div>
                    
                    <nav aria-label="Page navigation">
                      <ul  className="pagination pagination-sm">
                        <li>
                          <a href="#" aria-label="Previous">
                            <span aria-hidden="true">«</span>
                          </a>
                        </li>
                        <li className="active"><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li>
                          <a href="#" aria-label="Next">
                            <span aria-hidden="true">»</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                </div>
                <div className="col-sm-1 col-md-1 text-right"><img src="images/logo-clariah.svg" className="logo" alt=""/></div>
            </div>
        </div>
     </div>
    


</footer>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script> 
<script src="js/bootstrap.js"></script> 
<script src="js/basic.js"></script>
	
	</div>
	))