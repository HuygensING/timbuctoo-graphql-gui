import React from "react";
import Page from "../page.jsx";

import Paginate from "./entity-index/paginate";
import QuickSearch from "./entity-index/quicksearch";
import EntityList from "./entity-index/list";

import SaveFooter from "./entity-form/save-footer";
import EntityForm from "./entity-form/form";

import CollectionTabs from "./collection-tabs";
import Messages from "./messages/list";

class EditGui extends React.Component {

	render() {
		const { onSelect, onNew, onSave, onDelete, onSelectDomain, onDismissMessage, onChange } = this.props;
		const { onQuickSearchQueryChange, onQuickSearch, onPaginateLeft, onPaginateRight } = this.props;
		const { getAutocompleteValues } = this.props;
		const { quickSearch, entity, vre, messages } = this.props;
		const currentMode = entity.domain && entity.data._id ? "edit" : "new";

		return (
			<Page>
				<CollectionTabs collections={vre.collections} onNew={onNew} onSelectDomain={onSelectDomain}
					activeDomain={entity.domain} />
				<div className="container">
					<Messages
						types={["SUCCESS_MESSAGE", "ERROR_MESSAGE"]}
						messages={messages}
						onDismissMessage={onDismissMessage} />
					<div className="row">
						<div className="col-sm-6 col-md-4">
							<QuickSearch
								onQuickSearchQueryChange={onQuickSearchQueryChange}
								onQuickSearch={onQuickSearch}
								query={quickSearch.query} />
							<EntityList
								start={quickSearch.start}
								list={quickSearch.list}
								onSelect={onSelect}
								domain={entity.domain} />
						</div>
						{ entity.domain ? (
							<EntityForm currentMode={currentMode} getAutocompleteValues={getAutocompleteValues}
								entity={entity} onNew={onNew} onDelete={onDelete} onChange={onChange}
								properties={vre.collections[entity.domain].properties} 
								entityLabel={vre.collections[entity.domain].collectionLabel.replace(/s$/, "") } />
						) : null }
					</div>
				</div>

				<div type="footer-body">
					<div className="col-sm-6 col-md-4">
						<Paginate
							start={quickSearch.start}
							listLength={quickSearch.list.length}
							rows={50}
							onPaginateLeft={onPaginateLeft}
							onPaginateRight={onPaginateRight} />
					</div>
					<div className="col-sm-6 col-md-8">
						<SaveFooter onSave={onSave} onCancel={() => currentMode === "edit" ?
							onSelect({domain: entity.domain, id: entity.data._id}) : onNew(entity.domain)} />
					</div>
				</div>
				<div type="footer-body">
				</div>
			</Page>
		)
	}
}

export default EditGui;
