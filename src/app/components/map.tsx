import * as React from "react";
import { Button, DropdownButton, Form, FormControl, InputGroup, MenuItem, Nav, NavItem } from "react-bootstrap";
import { Mention, MentionsInput } from "react-mentions";
import { Actions } from "../actions";
import { assertNever } from "../support/assertNever";
import {
  Mapping,
  MappingProps,
  PlaceHolderPredicateMap,
  PredicateMap,
  PredicateMapTypes,
  RawDataCollection,
} from "./map.types";

const captions: { [key: string]: string } = {
  template: "Combine fields",
  expression: "Programming code",
  constant: "Constant value",
};

const types: { [key: string]: Array<{ uri: string; dataType: string }> } = {
  Person: [
    { uri: "http://schema.org/givenName", dataType: "http://www.w3.org/2001/XMLSchema#string" },
    { uri: "http://schema.org/familyName", dataType: "http://www.w3.org/2001/XMLSchema#string" },
    { uri: "http://schema.org/birthDate", dataType: "http://www.w3.org/2001/XMLSchema#date" },
    { uri: "http://schema.org/birthPlace", dataType: "http://timbuctoo.huygens.knaw.nu/v5/vocabulary#uri" },
    { uri: "http://schema.org/deathDate", dataType: "http://www.w3.org/2001/XMLSchema#date" },
    { uri: "http://schema.org/deathPlace", dataType: "http://timbuctoo.huygens.knaw.nu/v5/vocabulary#uri" },
    { uri: "http://www.w3.org/2002/07/owl#sameAs", dataType: "http://timbuctoo.huygens.knaw.nu/v5/vocabulary#uri" },
  ],
  Place: [
    { uri: "http://schema.org/name", dataType: "http://www.w3.org/2001/XMLSchema#string" },
    { uri: "http://schema.org/latitude", dataType: "http://www.w3.org/2001/XMLSchema#decimal" },
    { uri: "http://schema.org/longitude", dataType: "http://www.w3.org/2001/XMLSchema#decimal" },
    { uri: "http://www.w3.org/2002/07/owl#sameAs", dataType: "http://timbuctoo.huygens.knaw.nu/v5/vocabulary#uri" },
  ],
};

const dataTypes = [
  { label: "uncertain date-time (EDTF)", uri: "https://www.loc.gov/standards/datetime/pre-submission.html" },
  { label: "date", uri: "http://www.w3.org/2001/XMLSchema#date" },
  { label: "time", uri: "http://www.w3.org/2001/XMLSchema#time" },
  { label: "date & time", uri: "http://www.w3.org/2001/XMLSchema#dateTime" },
  { label: "number (no decimal places)", uri: "http://www.w3.org/2001/XMLSchema#integer" },
  { label: "number with decimals behind a .", uri: "http://www.w3.org/2001/XMLSchema#decimal" },
  { label: "text", uri: "http://www.w3.org/2001/XMLSchema#string" },
];
const dataTypesLookup: { [key: string]: string } = {
  "http://timbuctoo.huygens.knaw.nu/v5/vocabulary#uri": "a link (a URI)",
};
dataTypes.forEach(type => (dataTypesLookup[type.uri] = type.label));

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
    if (type === "constant") {
      props.actions.mapping.setPredicateMap({
        type,
        key: predicateMap.key,
        predicate: predicateMap.predicate || "",
        constant: (predicateMap as any).template || "",
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
        {captions.template}
      </MenuItem>
      <MenuItem key="expression" onClick={() => addMap("expression")}>
        {captions.expression}
      </MenuItem>
      <MenuItem key="constant" onClick={() => addMap("constant")}>
        {captions.constant}
      </MenuItem>
      <MenuItem divider />
      <MenuItem header>Fields from your data:</MenuItem>
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

function TemplateInput(props: {
  value: string | undefined;
  placeholder: string;
  rawDataCollection: RawDataCollection;
  onChange: (newValue: string) => void;
}) {
  const data = props.rawDataCollection.properties
    .map(p => p.name)
    .sort()
    .map(function(p) {
      return { id: p };
    })
    .concat([{ id: "tim_id" }]);
  return (
    <MentionsInput
      style={{
        input: {
          display: "block",
          width: "100%",
          height: "36px",
          padding: "6px 12px",
          "font-size": "16px",
          "line-height": "1.42857143",
          color: "#555555",
          "background-color": "#ffffff",
          "background-image": "none",
          border: "1px solid #e6e6e6",
          "border-radius": "2px",
          "-webkit-box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
          "box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
          "-webkit-transition": "border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s",
          "-o-transition": "border-color ease-in-out .15s, box-shadow ease-in-out .15s",
          transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s",
        },
        suggestions: {
          list: {
            backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.15)",
            fontSize: 10,
          },
          item: {
            padding: "5px 15px",
            borderBottom: "1px solid rgba(0,0,0,0.15)",

            "&focused": {
              backgroundColor: "#cee4e5",
            },
          },
        },
      }}
      markup="{__id__}"
      singleLine={true}
      displayTransform={(id: any, display: any, type: any) => "{" + id + "}"}
      value={props.value}
      placeholder={props.placeholder}
      onChange={(e: any) => {
        props.onChange((e.target as any).value);
      }}
    >
      <Mention trigger="{" allowSpaceInQuery={true} style={{ backgroundColor: "#cee4e5" }} data={data} />
    </MentionsInput>
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
        <TemplateInput
          placeholder="To add a datafield enclose it's name in { and }."
          value={implementation.template}
          onChange={value => actions.mapping.setPredicateValue(implementation, "template", value)}
          rawDataCollection={rawDataCollection}
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
    case "constant":
      typeSpecificPart = (
        <FormControl
          type="text"
          value={implementation.constant}
          placeholder="Type something here"
          onChange={e => actions.mapping.setPredicateValue(implementation, "constant", (e.target as any).value)}
        />
      );
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
      <div className="col-sm-2 col-xs-7">
        {disableNameChange
          ? <b>{implementation.predicate}</b>
          : <FormControl
              type="text"
              value={implementation.predicate}
              onChange={e => actions.mapping.setPredicateValue(implementation, "predicate", (e.target as any).value)}
            />}
      </div>
      <div className="col-sm-2 col-xs-4">
        <AddPredicateButton
          newPropertyPrefix={newPropertyPrefix}
          actions={actions}
          predicateMap={implementation}
          rawDataCollection={rawDataCollection}
          caption={
            implementation.type === "property"
              ? implementation.propertyName
              : implementation.type ? captions[implementation.type] : ""
          }
        />
      </div>
      <div className="col-sm-6 col-xs-9">
        {typeSpecificPart}
      </div>
      {typeSpecificPart
        ? <div className="col-sm-2 col-xs-3">
            <DropdownButton
              componentClass={InputGroup.Button}
              id="input-dropdown-addon"
              title={dataTypesLookup[implementation.dataType] || implementation.dataType}
            >
              <MenuItem
                key="http://timbuctoo.huygens.knaw.nu/v5/vocabulary#uri"
                onClick={e =>
                  actions.mapping.setPredicateValue(
                    implementation,
                    "dataType",
                    "http://timbuctoo.huygens.knaw.nu/v5/vocabulary#uri",
                  )}
              >
                {dataTypesLookup["http://timbuctoo.huygens.knaw.nu/v5/vocabulary#uri"]}
              </MenuItem>
              <MenuItem divider />
              {dataTypes.map(type =>
                <MenuItem
                  key={type.uri}
                  onClick={e => actions.mapping.setPredicateValue(implementation, "dataType", type.uri)}
                >
                  {type.label}
                </MenuItem>,
              )}
            </DropdownButton>
          </div>
        : null}
    </div>
  );
}

function DefaultProp(
  newPropertyPrefix: string,
  rawDataCollection: RawDataCollection,
  predicate: { uri: string; dataType: string },
  actions: Actions,
  mappedPredicates: PredicateMap[],
) {
  const implementations = mappedPredicates.filter(mp => mp.predicate === predicate.uri);
  if (implementations.length > 0) {
    return implementations.map(function(implementation) {
      return renderPred(newPropertyPrefix, rawDataCollection, implementation, actions, true);
    });
  } else {
    return [
      renderPred(
        newPropertyPrefix,
        rawDataCollection,
        { predicate: predicate.uri, type: undefined, key: null, dataType: predicate.dataType },
        actions,
        true,
      ),
    ];
  }
}

function getRawDataCollection(rawDataCollections: { [key: string]: RawDataCollection }, sourceCollection?: string) {
  return sourceCollection && rawDataCollections[sourceCollection] ? rawDataCollections[sourceCollection] : undefined;
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
        collectionType: undefined,
      };
  const rawDataCollection: RawDataCollection = getRawDataCollection(
    rawDataCollections,
    curMap.mainCollection.sourceCollection,
  ) || { label: "", properties: [] };
  const mainCollection = curMap.mainCollection;
  const curType = curMap.type;
  const newPropertyPrefix = curMap.collectionType || "http://example.org/";
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <Nav bsStyle="tabs" activeKey={currentTab || "add"}>
            {Object.keys(mappings).map((key, i) => {
              const mapping = mappings[key];
              const rdc = getRawDataCollection(rawDataCollections, mapping.mainCollection.sourceCollection);
              return (
                <NavItem eventKey={key} onClick={() => actions.mapping.gotoTab(key)}>
                  {rdc ? rdc.label : "(mapping " + i + ")"}
                </NavItem>
              );
            })}
            <NavItem eventKey="add" onClick={() => actions.mapping.gotoTab(undefined)}>
              Add...
            </NavItem>
          </Nav>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h4>1. We're going to convert data from...</h4>
          <DropdownButton
            bsStyle="default"
            title={
              mainCollection.sourceCollection
                ? rawDataCollections[mainCollection.sourceCollection]
                  ? rawDataCollections[mainCollection.sourceCollection].label
                  : "Collection is not available"
                : "collection..."
            }
            id="dropdown-no-s"
          >
            {Object.keys(rawDataCollections).map(rawCollection =>
              <MenuItem eventKey={rawCollection} onClick={onChangeV("sourceCollection", rawCollection)}>
                {rawDataCollections[rawCollection].label}
              </MenuItem>,
            )}
          </DropdownButton>{" "}
          <h4>2. And the items look a bit like a</h4>
          <DropdownButton bsStyle="default" title={curMap.type} id="dropdown-no-s">
            {Object.keys(types).map(type =>
              <MenuItem eventKey={type} onClick={onChangeV("targetType", type)}>
                {type}
              </MenuItem>,
            )}
          </DropdownButton>{" "}
        </div>
        <div className="col-md-6">
          <h4><small>(oh, and we'll name this collection):</small></h4>
          <FormControl value={curMap.collectionType} onChange={onChange("collectionType")} />
          <h4><small>(and all items will get a nice unique identifier):</small></h4>
          <TemplateInput
            placeholder="A template for the entity URI"
            value={curMap.mainCollection.subjectTemplate}
            onChange={value => actions.mapping.setValue("subjectTemplate", value)}
            rawDataCollection={rawDataCollection}
          />
        </div>
      </div>
      <div className="row" style={{ marginTop: "2em" }}>
        <div className="col-md-12">
          {curType == null || types[curType] == null ? null : <h4>{curMap.type}s usually have a...</h4>}
          {curType == null || types[curType] == null
            ? null
            : types[curType]
                .map(predicate =>
                  DefaultProp(newPropertyPrefix, rawDataCollection, predicate, actions, curMap.predicateMaps),
                )
                .reduce((prev, cur) => prev.concat(cur), [])}
          <h4>And we {curType != null && types[curType] != null ? "also " : ""}define...</h4>
          {curMap.predicateMaps
            .filter(pm => curType == null || !types[curType] || !types[curType].some(type => type.uri === pm.predicate))
            .map(pm => renderPred(newPropertyPrefix, rawDataCollection, pm, actions))}
        </div>
      </div>
      <div className="row" style={{ marginTop: "2em" }}>
        <div className="col-md-12">
          <AddPredicateButton
            newPropertyPrefix={newPropertyPrefix}
            rawDataCollection={rawDataCollection}
            actions={actions}
            predicateMap={{
              key: null,
              type: undefined,
              dataType: "string",
            }}
            caption="Add something!"
            bsStyle="primary"
          />
        </div>
      </div>
      <Button onClick={actions.mapping.execute} bsStyle="primary">execute</Button>
      <Button onClick={actions.gotoGraphiql}>next</Button>
      <Button
        onClick={() =>
          prompt(
            "Kopieer de tekst uit het vakje hieronder naar een tekst bestandje",
            JSON.stringify(props.state.mappings),
          )}
      >
        save
      </Button>
      <Button
        onClick={() => {
          const input = prompt("plak de tekst die je hebt opgeslagen hieronder");
          if (input && input.length > 0) {
            props.actions.mapping.loadMappings(input);
          }
        }}
      >
        load
      </Button>
    </div>
  );
}
