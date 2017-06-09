import React from "react";
import { storiesOf, action } from "@kadira/storybook";
import CollectionTable from "./collection-table";

const initialData = {
  rows: [[
    {value: "Boschker", ignored: false},
    {value: "1932", ignored: false, error: "test error"},
    {value: "Oosbaan", ignored: true},
  ], [
    {value: "Mahler", ignored: false},
    {value: "1922", ignored: false},
    {value: "Vlissingen", ignored: true},
  ]],
  headers: [
    {name: "achternaam", isConfirmed: false, isIgnored: false},
    {name: "geboortejaar", isConfirmed: true, isIgnored: false},
    {name: "hasBirthPlace", isConfirmed: false, isIgnored: true}
  ],
  nextUrl: "//next.url",

};


storiesOf('CollectionTable', module)
  .add('we enter with some data', () => (
    <CollectionTable {...initialData} onIgnoreColumnToggle={action('toggling ignore on column')} onLoadMoreClick={action("loads more data")} />
  ));

