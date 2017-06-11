import * as React from "react";
import { DropdownButton, Form, FormControl, InputGroup, MenuItem, Nav, NavItem } from "react-bootstrap";
import { Actions } from "../actions";
import {
  Mapping,
  MappingProps,
  PlaceHolderPredicateMap,
  PredicateMap,
  PredicateMapTypes,
  RawDataCollection,
} from "./map.types";

function assertNever(action: never): void {
  console.error("Unhandled case", action);
}

const types: { [key: string]: string[] } = {
  Person: ["http://timbuctoo.com/name", "http://timbuctoo.com/birthPlace"],
  Place: ["http://timbuctoo.com/name"],
};

function AddPredicateButton(props: {
  actions: Actions;
  rawDataCollection: RawDataCollection;
  predicateMap: PredicateMap | PlaceHolderPredicateMap;
  newPropertyPrefix: string;
  caption?: string;
  bsStyle?: string;
}) {
  function addMap(type: PredicateMapTypes) {
    const predicateMap = props.predicateMap;
    if (type === "expression") {
      props.actions.mapping.setPredicateMap({
        type,
        key: predicateMap.key,
        predicate: predicateMap.predicate || "",
        expression: (predicateMap as any).expression || "",
        dataType: predicateMap.dataType,
      });
    }
    if (type === "template") {
      props.actions.mapping.setPredicateMap({
        type,
        key: predicateMap.key,
        predicate: predicateMap.predicate || "",
        template: (predicateMap as any).template || "",
        dataType: predicateMap.dataType,
      });
    }
  }
  function addPropMap(propertyName: string) {
    const predicateMap = props.predicateMap;
    let prefix = props.newPropertyPrefix;
    if (prefix.length > 0 && prefix.substr(-1) !== "/" && prefix.substr(-1) !== "#") {
      prefix += "#";
    }
    props.actions.mapping.setPredicateMap({
      type: "property",
      key: predicateMap.key,
      predicate: predicateMap.predicate || prefix + encodeURIComponent(propertyName),
      propertyName,
      dataType: predicateMap.dataType,
    });
  }
  return (
    <DropdownButton bsStyle={props.bsStyle} id="input-dropdown-addon" title={props.caption || "Select..."}>
      <MenuItem key="template" onClick={() => addMap("template")}>
        template
      </MenuItem>
      <MenuItem key="expression" onClick={() => addMap("expression")}>
        expression
      </MenuItem>
      <MenuItem divider />
      {props.rawDataCollection.properties.map(
        prop =>
          prop.inUse
            ? <MenuItem className="bg-success" key={prop.name} onClick={() => addPropMap(prop.name)}>
                {prop.name}{" "}
                <span className="glyphicon glyphicon-ok pull-right" />
              </MenuItem>
            : <MenuItem key={prop.name} onClick={() => addPropMap(prop.name)}>
                {prop.name}
              </MenuItem>,
      )}
    </DropdownButton>
  );
}

function renderPred(
  newPropertyPrefix: string,
  rawDataCollection: RawDataCollection,
  implementation: PredicateMap | PlaceHolderPredicateMap,
  actions: Actions,
  disableNameChange: boolean = false,
) {
  let typeSpecificPart;
  switch (implementation.type) {
    case "template":
      typeSpecificPart = (
        <FormControl
          type="text"
          value={implementation.template}
          placeholder="You can type anyting you want. To insert a column, place it's name between {}."
          onChange={e => actions.mapping.setPredicateValue(implementation, "template", (e.target as any).value)}
        />
      );
      break;
    case "expression":
      typeSpecificPart = (
        <FormControl
          type="text"
          value={implementation.expression}
          placeholder="You can type a jexl expression here"
          onChange={e => actions.mapping.setPredicateValue(implementation, "expression", (e.target as any).value)}
        />
      );
      break;
    case "join":
      typeSpecificPart = null;
      break;
    case "property":
      typeSpecificPart = <span />;
      break;
    case undefined:
      typeSpecificPart = null;
      break;
    default:
      assertNever(implementation);
      typeSpecificPart = <div />;
      break;
  }
  return (
    <div className="row" style={{ paddingTop: 15 }}>
      <div className="col-sm-2 col-xs-8">
        {disableNameChange
          ? <b>{implementation.predicate}</b>
          : <FormControl
              type="text"
              value={implementation.predicate}
              onChange={e => actions.mapping.setPredicateValue(implementation, "predicate", (e.target as any).value)}
            />}
      </div>
      <div className="col-sm-1 col-xs-3">
        <AddPredicateButton
          newPropertyPrefix={newPropertyPrefix}
          actions={actions}
          predicateMap={implementation}
          rawDataCollection={rawDataCollection}
          caption={implementation.type === "property" ? implementation.propertyName : implementation.type}
        />
      </div>
      <div className="col-sm-6 col-xs-9">
        {typeSpecificPart}
      </div>
      {typeSpecificPart
        ? <div className="col-sm-3 col-xs-3">
            <DropdownButton
              componentClass={InputGroup.Button}
              id="input-dropdown-addon"
              title={implementation.dataType}
            >
              <MenuItem
                key="number"
                onClick={e => actions.mapping.setPredicateValue(implementation, "dataType", "number")}
              >
                number
              </MenuItem>
              <MenuItem
                key="string"
                onClick={e => actions.mapping.setPredicateValue(implementation, "dataType", "string")}
              >
                string
              </MenuItem>
            </DropdownButton>
          </div>
        : null}
    </div>
  );
}

function DefaultProp(
  newPropertyPrefix: string,
  rawDataCollection: RawDataCollection,
  predicate: string,
  actions: Actions,
  mappedPredicates: PredicateMap[],
) {
  const implementations = mappedPredicates.filter(mp => mp.predicate === predicate);
  if (implementations.length > 0) {
    return implementations.map(function(implementation) {
      return renderPred(newPropertyPrefix, rawDataCollection, implementation, actions, true);
    });
  } else {
    return [
      renderPred(
        newPropertyPrefix,
        rawDataCollection,
        { predicate, type: undefined, key: null, dataType: "string" },
        actions,
        true,
      ),
    ];
  }
}

export function Map(props: { actions: Actions; state: MappingProps }) {
  function onChange(name: string) {
    return (e: any) => actions.mapping.setValue(name, e.target.value);
  }
  function onChangeV(name: string, value: string) {
    return (e: any) => actions.mapping.setValue(name, value);
  }
  const actions = props.actions;
  const { mappings, currentTab, rawDataCollections } = props.state;
  const curMap: Mapping = mappings[currentTab || ""]
    ? mappings[currentTab || ""]
    : {
        mainCollection: {},
        predicateMaps: [],
      };
  const rawDataCollection: RawDataCollection = curMap.mainCollection.sourceCollection
    ? rawDataCollections[curMap.mainCollection.sourceCollection]
    : { properties: [] };
  const mainCollection = curMap.mainCollection;
  const curType = curMap.type;
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <Nav bsStyle="tabs" activeKey={currentTab || "add"}>
            {Object.keys(mappings).map(type =>
              <NavItem eventKey={type} onClick={() => actions.mapping.gotoTab(type)}>
                {type}
              </NavItem>,
            )}
            <NavItem eventKey="add" onClick={() => actions.mapping.gotoTab(undefined)}>
              Add...
            </NavItem>
          </Nav>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h4>We'll name this collection:</h4>
          <FormControl value={currentTab} onChange={onChange("collectionName")} />
          <h4>We'll give the items the following (unique) identifier:</h4>
          <FormControl
            placeholder="A template for the entity URI"
            onChange={onChange("subjectTemplate")}
            value={curMap.mainCollection.subjectTemplate}
          />
        </div>
        <div className="col-md-6">
          <h4>The data that we're going to turn into rdf is located at...</h4>
          <DropdownButton
            bsStyle="default"
            title={mainCollection.sourceCollection || "collection..."}
            id="dropdown-no-s"
          >
            {Object.keys(rawDataCollections).map(rawCollection =>
              <MenuItem eventKey={rawCollection} onClick={onChangeV("sourceCollection", rawCollection)}>
                {rawCollection}
              </MenuItem>,
            )}
          </DropdownButton>{" "}
          <h4>And the items look a bit like a</h4>
          <DropdownButton bsStyle="default" title={curMap.type} id="dropdown-no-s">
            {Object.keys(types).map(type =>
              <MenuItem eventKey={type} onClick={onChangeV("targetType", type)}>
                {type}
              </MenuItem>,
            )}
          </DropdownButton>{" "}
        </div>
      </div>
      {curType == null
        ? null
        : <div className="row" style={{ marginTop: "2em" }}>
            <div className="col-md-12">
              <h4>{curMap.type}s usually have a...</h4>
              {types[curType]
                .map(predicate =>
                  DefaultProp(currentTab || "", rawDataCollection, predicate, actions, curMap.predicateMaps),
                )
                .reduce((prev, cur) => prev.concat(cur), [])}
              <h4>And we also define...</h4>
              {curMap.predicateMaps
                .filter(pm => types[curType].indexOf(pm.predicate) === -1)
                .map(pm => renderPred(currentTab || "", rawDataCollection, pm, actions))}
            </div>
          </div>}
      {curType == null
        ? null
        : <div className="row" style={{ marginTop: "2em" }}>
            <div className="col-md-12">
              <AddPredicateButton
                newPropertyPrefix={currentTab || ""}
                rawDataCollection={rawDataCollection}
                actions={actions}
                predicateMap={{
                  key: null,
                  type: undefined,
                  dataType: "string",
                }}
                caption="Add even more things!"
                bsStyle="primary"
              />
            </div>
          </div>}
    </div>
  );
}
