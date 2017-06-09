import React from "react";

function Header(props) {
debugger;

	const project=props.projectId
	var branding = ''
	
	if(project=="timbuctoo"){
		branding=<img src="images/logo-timbuctoo.svg" className="logo" alt=""/>;
	}else{
		branding=project;
	}
		


  return (
    <div>
	  <div className="hi-Green top-green container-fluid" > </div>
		<div className="basic-margin hi-dark-grey container-fluid">
		  <nav className="navbar">
			<div className="container">
			  <div className="navbar-header"> <a className="navbar-brand" href="#">{branding}</a> </div>
			  <div id="navbar" className="navbar-collapse collapse">
				<ul className="nav navbar-nav navbar-right">
				  <li><a href="#"><span className="glyphicon glyphicon-user"></span> Bas Doppen</a></li>
				  <li><a href="#"><span className="glyphicon glyphicon-menu-hamburger"></span></a></li>
				</ul>
			  </div>
			</div>
		  </nav>
		</div>
	  </div>
  )
}

export default Header;
