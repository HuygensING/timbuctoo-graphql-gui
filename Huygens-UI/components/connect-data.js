import React from "react";
import CollectionTable from "./collection-table";
import CollectionForm from "./collection-form";
import CollectionIndex from "./collection-index";

class ConnectData extends React.Component {

  render() {
    const {
      activeCollection,
      uploadedFileName,
      collectionTabs,
      rows,
      headers,
      archetypeFields,
      availableArchetypes,
      propertyMappings,
      customPropertyMappings,
      availableCollectionColumnsPerArchetype,
      nextUrl
    } = this.props;

    const {
      onIgnoreColumnToggle,
      onSelectCollection,
      onSetFieldMapping,
      onRemoveCustomProperty,
      onConfirmFieldMappings,
      onUnconfirmFieldMappings,
      onAddCustomProperty,
      onClearFieldMapping,
      onLoadMoreClick,
      onPublishData
    } = this.props;

    const allMappingsAreComplete = collectionTabs.filter((tab) => tab.complete).length === collectionTabs.length;

    return (
      <div>
        <CollectionIndex collectionTabs={collectionTabs} onSelectCollection={onSelectCollection} />

        <CollectionForm columns={headers}
                        collectionName={activeCollection}
                        archetypeFields={archetypeFields}
                        availableArchetypes={availableArchetypes}
                        availableCollectionColumnsPerArchetype={availableCollectionColumnsPerArchetype}
                        propertyMappings={propertyMappings}
                        customPropertyMappings={customPropertyMappings}
                        onSetFieldMapping={onSetFieldMapping}
                        onClearFieldMapping={onClearFieldMapping}
                        onRemoveCustomProperty={onRemoveCustomProperty}
                        onConfirmFieldMappings={onConfirmFieldMappings}
                        onUnconfirmFieldMappings={onUnconfirmFieldMappings}
                        onAddCustomProperty={onAddCustomProperty} />

        <div className="container big-margin">
          <button onClick={onPublishData} className="btn btn-warning btn-lg pull-right" type="button" disabled={!allMappingsAreComplete}>
            Publish dataset
          </button>
        </div>

        <div className="container big-margin">
          <p className="from-excel">
            <img src="images/icon-excel.svg" alt=""/>{" "}
            <em>{activeCollection}</em> from {uploadedFileName}
          </p>

          <CollectionTable
            rows={rows}
            headers={headers}
            nextUrl={nextUrl}
            onIgnoreColumnToggle={(header) => onIgnoreColumnToggle(activeCollection, header)}
            onLoadMoreClick={(url) => onLoadMoreClick(url, activeCollection)} />
          </div>
      </div>
    );
  }
}

export default ConnectData;