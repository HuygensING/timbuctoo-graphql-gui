import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import StringField from "./string-field";
import SelectField from "./select";
import MultiSelect from "./multi-select";
import RelationField from "./relation";
import StringListField from "./list-of-strings";
import LinksField from "./links";
import NamesField from "./names";

const onChange = (path, value) =>
  action("changing entity")(JSON.stringify(path), JSON.stringify(value));

const mockAutoComplete = (p, f, cb) => cb([
  {key: "a", value: "abc"},
  {key: "b", value: "def"},
  {key: "c", value: "ghi"},
  {key: "d", value: "jkl"},
  {key: "ac", value: "abc"},
  {key: "bc", value: "def"},
  {key: "cc", value: "ghi"},
  {key: "dc", value: "jkl"},
  {key: "aa", value: "abc"},
  {key: "ba", value: "def"},
  {key: "ca", value: "ghi"},
  {key: "da", value: "jkl"}
].filter((v) => v.value.indexOf(f) > -1));

const namesData = {data: {"names":[{"components":[{"type":"FORENAME","value":"Sara"},{"type":"SURNAME","value":"Lomannus"}]},{"components":[{"type":"FORENAME","value":"Sara"},{"type":"SURNAME","value":"Lomanus"}]}]}};

storiesOf('Edit fields', module)
  .add('StringField', () => (<div>
      <StringField entity={{data: {fieldName: "value"}}} name="fieldName" onChange={onChange} />
      <StringField entity={{data: {}}} name="fieldName2" onChange={onChange} />
    </div>))
  .add('SelectField', () => (<div>
    <SelectField entity={{data: {fieldName: "value"}}}
      options={["value", "value 1", "value 2"]}
      name="fieldName" onChange={onChange} />
    <SelectField entity={{data: {}}}
      options={["value", "value 1", "value 2"]}
      name="fieldName2" onChange={onChange} />
  </div>))
  .add('MultiSelect', () => (<div>
    <MultiSelect entity={{data: {fieldName: ["value", "value 1"]}}}
      options={["value", "value 1", "value 2"]}
      name="fieldName" onChange={onChange} />
    <MultiSelect entity={{data: {}}}
      options={["value", "value 1", "value 2"]}
      name="fieldName2" onChange={onChange} />
  </div>))
  .add('StringListField', () => (<div>
    <StringListField entity={{data: {fieldName: ["value", "value 1"]}}}
      name="fieldName" onChange={onChange} />
    <StringListField entity={{data: {}}}
      name="fieldName2" onChange={onChange} />
  </div>))
  .add('LinksField', () => (<div>
    <LinksField entity={{data: {fieldName: [
        {url: "http://example.com", label: "example 1"},
        {url: "http://nu.nl", label: "example 2"}
      ]}}}
      name="fieldName" onChange={onChange} />
    <LinksField entity={{data: {}}}
      name="fieldName2" onChange={onChange} />
  </div>))
  .add('NamesField', () => (<div>
    <NamesField entity={namesData} name="names" onChange={onChange}
      options={["FORENAME", "SURNAME", "NAME_LINK", "ROLE_NAME", "GEN_NAME"]}/>
  </div>))
  .add('Relation', () => (
    <RelationField entity={{data: {
        "@relations": {
          "isRelatedTo": [
            {displayName: "related thing", id: "asd", accepted: true},
            {displayName: "another related thing", id: "asds", accepted: true}
          ]
        }
      }}} getAutocompleteValues={mockAutoComplete}
      name="isRelatedTo" onChange={onChange} />

  ));
