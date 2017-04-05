import * as React from "react";

interface Data {
   [key: string]: DataItem;
}

export interface DataItem  {
    [key: string]: DataItem | string | number | boolean | null | undefined | DataItem[] | string[] | number[];
    __typename: string;
}

export interface Metadata {
    __schema: {
        types: MetadataType[];
    }
}

interface MetadataType {
    name: string;
    kind: string;
    enumValues: EnumValue[] | null;
    fields: MetadataField[] | null;
}

interface EnumValue {
    name: string;
}

interface MetadataField {
    name: string;
    type: GraphQlType;
}

// type GraphQlType = NamedType | ContainerType

// interface NamedType {
//   name: string
//   kind: string
// }

// interface ContainerType {
//   ofType: GraphQlType
//   kind: string
// }

// TODO refactor to above schema
interface GraphQlType {
    name?: string | null;
    kind: string;
    ofType?: GraphQlType | null;
}

// tslint:disable-next-line:interface-name
interface ComponentMappings {
    [key: string]: (props: {propName: string, value: any}) => React.ReactElement<any>;
}

export default function Entity(props: {data: Data, metadata: Metadata, componentMappings: ComponentMappings}) {
    const entities: JSX.Element[] = [];

    for(const key in props.data) {
        if (props.data[key] != null) {
            entities.push(renderDataItem(props.data[key], props.metadata, props.componentMappings));
        }
    }
    return (
       <div>{entities}</div>
    );
}

function isDataItem(value: any): value is DataItem {    
    return value != null && 
    !(value instanceof Array) && 
    (typeof value === "object") && 
    value.__typename !== undefined;
}

function renderDataItem(datatItem: DataItem, metadata: Metadata, componentMappings: ComponentMappings): JSX.Element {
    const properties: JSX.Element[] = [];
    const typeName: string = datatItem.__typename;
    const matchingMetadata = metadata.__schema.types.filter((mdt) => mdt.name === typeName);

    if(matchingMetadata.length > 0) { 
        const metaDataType: MetadataType = matchingMetadata[0];
        for (const propKey in datatItem) {
            if (propKey === "__typename") {
                continue;
            }
            const value = datatItem[propKey];
            // TODO render subitems by using the metadata to discover the type
            if (isDataItem(value)) {
                if (componentMappings[typeName]) {
                    const renderFunction = componentMappings[typeName];
                    properties.push(renderFunction({propName: propKey, value}));
                } else {
                    properties.push(renderDataItem(value, metadata, componentMappings));
                }
            } else if (value instanceof Array) {
                const arrayItems: JSX.Element[] = [];
                for (const item of value) {
                    if (isDataItem(item)) {                        
                        if (componentMappings[item.__typename]) {
                            const renderFunction = componentMappings[item.__typename];
                            arrayItems.push(renderFunction({propName: propKey, value: item}));
                        } else {
                            arrayItems.push(renderDataItem(item, metadata, componentMappings));
                        }
                    }
                }
                properties.push((
                    <span>
                        {propKey} : {arrayItems}
                        <br/>
                    </span>
                ));
            } else {
                const type = getTypeOfField(propKey, metaDataType);
                const renderFunction = getRenderFunction(type, componentMappings);
            
                properties.push(renderFunction({propName: propKey, value}));
            }
        }
    } else {
        console.error("No metdata found for: " + typeName);
    }

    return (
        <div style={{paddingLeft: "20px"}}>{properties}</div>
    );
}

function getTypeOfField(fieldName: string, metadataType: MetadataType) : GraphQlType {
    if(metadataType.fields != null) {
        const matchingFields = metadataType.fields.filter((field) => field.name === fieldName);
        if (matchingFields.length > 0) {
            return matchingFields[0].type;
        } else {
            console.error("Entity has unknown property: " + fieldName);
        }
    } else {
        console.error("No metadata found for fields entity: " + metadataType.name);
    }
    return {kind: ""};
}

function getRenderFunction(fieldType: GraphQlType, componentMappings: ComponentMappings):
    (props: {propName: string, value: any}) => React.ReactElement<any>  {
    if (fieldType.name != null && componentMappings[fieldType.name] != null) {
        return componentMappings[fieldType.name];
    }    else if(fieldType.ofType != null) {
        return getRenderFunction(fieldType.ofType, componentMappings);
    } else {
        return (props: {propName: string, value: any}) => (
            <span>
                {props.propName}: {props.value}
                <br/>
            </span>
        );
    }
}

/*
    - [x] rendert een leaf field als tekst
    - [x] rendert een leaf field als de componentMapping if provided, anders als tekst
    - [x] rendert een non-leaf field recursief
    - [x] rendert een non-leaf field als de componentMapping if provided, anders recursief
    - [ ] voeg  defaultLeaffield en defaultNonLeaffield properties toe
*/
