import React from "react";
import classnames from "classnames";


class CollectionTabs extends React.Component {

	onDomainSelect(domain) {
		this.props.onNew(domain);
		this.props.onSelectDomain(domain);
	}

	render() {
		const { collections, activeDomain } = this.props;
		const domains = Object.keys(collections || {});

		return (
			<div className="container basic-margin">
        <ul className="nav nav-tabs">
          {domains
            .filter(d => !(collections[d].unknown || collections[d].relationCollection))
            .map((domain) => (
              <li className={classnames({active: domain === activeDomain})} key={domain}>
                <a onClick={domain === activeDomain ? () => {} : () => this.onDomainSelect(domain)}>
                  {collections[domain].collectionLabel}
                </a>
              </li>
            ))}
        </ul>
			</div>
		);
	}
}

CollectionTabs.propTypes = {
	onNew: React.PropTypes.func,
	onSelectDomain: React.PropTypes.func,
	collections: React.PropTypes.object,
	activeDomain: React.PropTypes.string
};

export default CollectionTabs;
