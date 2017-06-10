import * as React from "react";

function Page(props: {
  username?: string;
  userlocation?: string;
  children?: any;
}) {
  return (
    <div className="page container-fluid">
      <div className="hi-Green" style={{ marginLeft: -15, marginRight: -15 }}>
        <nav className="navbar ">
          <div className="container">
            <div className="navbar-header">
              {" "}
              <a className="navbar-brand" href="#">
                <img
                  src="images/page/logo-timbuctoo.svg"
                  className="logo"
                  alt="timbuctoo"
                />
              </a>{" "}
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                {props.username
                  ? <li>
                      <a href={props.userlocation || "#"}>
                        <span className="glyphicon glyphicon-user" />{" "}
                        {props.username}
                      </a>
                    </li>
                  : null}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      {props.children}
    </div>
  );
}

export default Page;
