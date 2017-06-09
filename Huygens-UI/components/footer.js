import React from "react";

function Footer(props) {
  const hiLogo = (
    <div className="col-sm-1 col-md-1">
      <img className="hi-logo" src="images/logo-huygens-ing.svg" />
    </div>
  );

  const clariahLogo = (
    <div className="col-sm-1 col-md-1">
      <img className="logo" src="images/logo-clariah.svg" />
    </div>
  );

  const footerBody = React.Children.count(props.children) > 0 ?
    React.Children.map(props.children, (child, i) => (
      <div className="white-bar">
        <div className="container">
          {i === React.Children.count(props.children) - 1
            ? (<div className="row">{hiLogo}<div className="col-sm-10 col-md-10 text-center">{child}</div>{clariahLogo}</div>)
            : (<div className="row">{child}</div>)
          }
        </div>
      </div>
    )) : (
      <div className="white-bar">
        <div className="container">
          <div className="row">
            {hiLogo}
            <div className="col-sm-10 col-md-10 text-center">
            </div>
            {clariahLogo}
          </div>
        </div>
      </div>
    );


  return (
    <footer className="footer">
      {footerBody}
    </footer>
  )
}

export default Footer;