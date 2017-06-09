import React from "react";

export function Resultslistheader(props) {
  return (
        <div className="basic-margin">
        <strong>Found 124 results</strong> in 2 datasets
        <div className="btn-group pull-right" >
          <button type="button" className="btn btn-blank dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Order by dataset <span className="caret"></span></button>
          <ul className="dropdown-menu">
            <li><a href="#">Onder by item</a></li>
            <li><a href="#">Order by dataset</a></li>
          </ul>
        </div>
      </div>
  )
}


export function FacetDatasetToggles(props) {
  return (
        <div className="row basic-margin hi-underline facet">
		  <div className="col-sm-4 col-md-3">
			<h2>Dataset</h2>
		  </div>
		  <div className="col-sm-8 col-md-9 text-right">
	  		<span className="btn toggleTag toggleTag--active">DBpedia <span className="glyphicon glyphicon-remove-sign hi-half-transp"></span></span>
     		<span className="btn toggleTag toggleTag--inactive">CKCC</span>
			<button type="button" className="btn btn-default btn-sm"  aria-haspopup="true" aria-expanded="false">Show all datasets</button>
		  </div>
		</div>
  )
}


export function ResultslistDatasets(props) {
  return (
  <div className="result-list big-margin"> 
       <div className="result-list-dataset-info clearfix">
       <span className="row pull-right "> <span className="col-md-12 small text-right no-lr-padding"><a href="Tim-faceted-search-detail.html">Go to CKCC dataset</a></span> </span>
		  </div>
        <ol className="clearfix begin">
          <li className="clearfix"> <a href="Tim-faceted-search-detail.html"> <span className="row pull-right clearfix"> <span className="col-md-6 ">Christiaan Huygens</span> <span className="col-md-6 hi-light-grey text-right small">CKCC</span> </span> <span className="row pull-right clearfix"> <span className="col-md-12 hi-light-grey small no-lr-padding">14 April 1629 – 8 July 1695</span> </span> </a> </li>
          <li className="clearfix"> <a href="Tim-faceted-search-detail.html"> <span className="row pull-right clearfix"> <span className="col-md-6 ">Constantijn Huygens</span> <span className="col-md-6 hi-light-grey text-right small">CKCC</span> </span> <span className="row pull-right clearfix"> <span className="col-md-12 hi-light-grey small no-lr-padding">14 April 1629 – 8 July 1695</span> </span> </a> </li>
        </ol>
      <div className="result-list-dataset-info clearfix">
       <span className="row pull-right"> <span className="col-md-12 small text-right no-lr-padding"><a href="Tim-faceted-search-detail.html">Go to DBpedia dataset</a></span> </span>
		  </div>        <ol className="clearfix continue">
          <li className="clearfix"> <a href="Tim-faceted-search-detail.html"> <span className="row pull-right clearfix"> <span className="col-md-6 ">Christiaan Huygens</span> <span className="col-md-6 hi-light-grey text-right small">DBpedia</span> </span> <span className="row pull-right clearfix"> <span className="col-md-12 hi-light-grey small no-lr-padding">14 April 1629 – 8 July 1695</span> </span> </a> </li>
          <li className="clearfix"> <a href="Tim-faceted-search-detail.html"> <span className="row pull-right clearfix"> <span className="col-md-6 ">Constantijn Huygens</span> <span className="col-md-6 hi-light-grey text-right small">DBpedia</span> </span> <span className="row pull-right clearfix"> <span className="col-md-12 hi-light-grey small no-lr-padding">14 April 1629 – 8 July 1695</span> </span> </a> </li>
        </ol>
      </div>
  )
}




export function ResultslistItems(props) {
  return (
	  <div className="result-list big-margin">
        <ol className="clearfix">
          <li className="clearfix">
          	<a href="Tim-faceted-search-detail.html">
				<span className="row pull-right clearfix">
					<span className="col-md-6 ">Christiaan Huygens</span>
					<span className="col-md-6 hi-light-grey text-right small">DBpedia</span>
				</span>
				<span className="row pull-right clearfix">
					<span className="col-md-12 hi-light-grey small no-lr-padding">14 April 1629 – 8 July 1695</span>
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
					<span className="col-md-12 hi-light-grey small no-lr-padding">14 April 1629 – 8 July 1695</span>
					
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
					<span className="col-md-12 hi-light-grey small no-lr-padding">14 April 1629 – 8 July 1695</span>
				</span>
        	</a>
          </li>

          
        </ol>
      </div>
  )
}










export function FacetsTemp(props) {
	return (
	
	<div className="col-sm-4 col-md-3">
    
      <div className="facet-group">
        <div className="facet">
        <div className="input-group">
     		 <input type="text" className="form-control" placeholder="Type a name"/>
      		<span className="input-group-btn">
        <button className="btn btn-default" type="button"><span className="glyphicon glyphicon-search"></span></button>
      </span>
    </div>
        </div>
        
        <div className="facet basic-facet"> <span className="glyphicon glyphicon-collapse-up facet-extra pull-right hi-light-grey"></span>
          <h2>Archytype</h2>
          <div className="facet-items-box">
              <div className="facet-item"><img src="images/facet-ckeck.svg" className="facet-check-box" alt=""/>Person <span className="facet-item-count hi-light-grey pull-right">123</span></div>
              <div className="facet-item"><img src="images/facet-ckeck.svg" className="facet-check-box" alt=""/>Document <span className="facet-item-count hi-light-grey pull-right">100</span></div>
              <div className="facet-item"><img src="images/facet-ckeck.svg" className="facet-check-box" alt=""/>Location <span className="facet-item-count hi-light-grey pull-right">73</span></div>
              <div className="facet-item"><img src="images/facet-ckeck.svg" className="facet-check-box" alt=""/>Lexicon <span className="facet-item-count hi-light-grey pull-right">10</span></div>
          </div>
          
          <div className="facet-extra-space"> 
              <div className="facet-extra"> 
                <span className="glyphicon glyphicon-remove-sign pull-right hi-light-grey"></span>
                <input placeholder="Filter in gender" type="text" value="" className="input-xs"/>
                <span className="btn-group" >
                <button className="btn btn-default btn-xs">a-z</button>
                <button className="btn btn-default btn-xs active">0-9</button>
                </span> </div>
            </div>
        </div>
        <div className="facet basic-facet"> <span className="glyphicon glyphicon-collapse-up facet-extra pull-right hi-light-grey"></span>
          <h2>Gender</h2>
          <div className="facet-items-box">
              <div className="facet-item"><img src="images/facet-ckeck.svg" className="facet-check-box" alt=""/>Author <span className="facet-item-count hi-light-grey pull-right">123</span></div>
              <div className="facet-item"><img src="images/facet-ckeck.svg" className="facet-check-box" alt=""/>Archetype <span className="facet-item-count hi-light-grey pull-right">100</span></div>
              <div className="facet-item"><img src="images/facet-ckeck.svg" className="facet-check-box" alt=""/>Pseudonym <span className="facet-item-count hi-light-grey pull-right">73</span></div>
              <div className="facet-item"><img src="images/facet-ckeck.svg" className="facet-check-box" alt=""/>Reader <span className="facet-item-count hi-light-grey pull-right">10</span></div>
              <div className="facet-item"><img src="images/facet-ckeck.svg" className="facet-check-box" alt=""/>Author <span className="facet-item-count hi-light-grey pull-right">2</span></div>
              <div className="facet-item"><a href="#">Show all 56 items</a></div>
          </div>
          <div className="facet-extra-space"> 
              <div className="facet-extra"> 
                <span className="glyphicon glyphicon-remove-sign pull-right hi-light-grey"></span>
                <input placeholder="Filter in gender" type="text" value="" className="input-xs"/>
                <span className="btn-group" >
                <button className="btn btn-default btn-xs">a-z</button>
                <button className="btn btn-default btn-xs active">0-9</button>
                </span> </div>
            </div>
        </div>
       
        <div className="facet basic-facet"> <span className="glyphicon glyphicon-collapse-up facet-extra pull-right hi-light-grey"></span>
          <h2>Language</h2>
          <div className="facet-items-box">
              <div className="facet-item"><img src="images/facet-ckeck.svg" className="facet-check-box" alt=""/>Author <span className="facet-item-count hi-light-grey pull-right">123</span></div>
              <div className="facet-item"><img src="images/facet-ckeck.svg" className="facet-check-box" alt=""/>Archetype <span className="facet-item-count hi-light-grey pull-right">100</span></div>
              <div className="facet-item"><img src="images/facet-ckeck.svg" className="facet-check-box" alt=""/>Pseudonym <span className="facet-item-count hi-light-grey pull-right">73</span></div>
              <div className="facet-item"><img src="images/facet-ckeck.svg" className="facet-check-box" alt=""/>Reader <span className="facet-item-count hi-light-grey pull-right">10</span></div>
              <div className="facet-item"><img src="images/facet-ckeck.svg" className="facet-check-box" alt=""/>Author <span className="facet-item-count hi-light-grey pull-right">2</span></div>
              <div className="facet-item"><a href="#">Show all 56 items</a></div>
          </div>
          <div className="facet-extra-space"> 
              <div className="facet-extra"> 
                <span className="glyphicon glyphicon-remove-sign pull-right hi-light-grey"></span>
                <input placeholder="Filter in gender" type="text" value="" className="input-xs"/>
                <span className="btn-group" >
                <button className="btn btn-default btn-xs">a-z</button>
                <button className="btn btn-default btn-xs active">0-9</button>
                </span> </div>
            </div>
        </div>
      </div>
    </div>
		)
}

