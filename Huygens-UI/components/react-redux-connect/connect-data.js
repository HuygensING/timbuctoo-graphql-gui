// Helper function for react-redux connect
function getConfirmedCols(props, variables) {
  const { mappings, importData: { activeCollection } } = props;

  return variables
    .map((value, i) => ({value: value, index: i}))
    .filter((colSpec) => mappings.collections[activeCollection].mappings
      .filter((m) => m.confirmed)
      .map((m) => m.variable.map((v) => v.variableName))
      .reduce((a, b) => a.concat(b), [])
      .indexOf(colSpec.value) > -1
    ).map((colSpec) => colSpec.index);
}

// Helper function for react-redux connect
function mappingsAreComplete(props, sheet) {
  const { mappings } = props;

  const confirmedColCount = mappings.collections[sheet.collection].mappings
    .filter((m) => m.confirmed)
    .map((m) => m.variable.map((v) => v.variableName))
    .reduce((a, b) => a.concat(b), [])
    .filter((x, idx, self) => self.indexOf(x) === idx)
    .length;

  return confirmedColCount + mappings.collections[sheet.collection].ignoredColumns.length === sheet.variables.length;
}

// Moves to react-redux connect
function transformProps(props) {

  const { importData: { sheets, activeCollection, uploadedFileName }, mappings, archetype } = props;
  const collectionData = sheets.find((sheet) => sheet.collection === activeCollection);
  const { rows, variables } = collectionData;

  const confirmedCols = getConfirmedCols(props, variables);
  const { ignoredColumns } = mappings.collections[activeCollection];

  const availableArchetypes = Object.keys(mappings.collections).map((key) => mappings.collections[key].archetypeName);

  return {
    sheets: sheets,
    activeCollection: activeCollection,
    uploadedFileName: uploadedFileName,
    collectionTabs: sheets.map((sheet) => ({
      collectionName: sheet.collection,
      archetypeName: mappings.collections[sheet.collection].archetypeName,
      active: activeCollection === sheet.collection,
      complete: mappingsAreComplete(props, sheet)
    })),
    rows: rows.map((row) => row.map((cell, i) => ({
      value: cell.value,
      error: cell.error || null,
      ignored: ignoredColumns.indexOf(variables[i]) > -1
    }))),
    headers: variables.map((variable, i) => ({
      name: variable,
      isConfirmed: ignoredColumns.indexOf(i) < 0 && confirmedCols.indexOf(i) > -1,
      isIgnored: ignoredColumns.indexOf(variable) > -1
    })),
    nextUrl: sheets.find((sheet) => sheet.collection === activeCollection).nextUrl,
    archetypeFields: archetype[mappings.collections[activeCollection].archetypeName],
    propertyMappings: mappings.collections[activeCollection].mappings,
    customPropertyMappings: mappings.collections[activeCollection].customProperties,
    availableArchetypes: availableArchetypes,
    availableCollectionColumnsPerArchetype: availableArchetypes.map((archetypeName) => ({
      key: archetypeName,
      values: Object.keys(mappings.collections)
        .filter((collectionName) => mappings.collections[collectionName].archetypeName === archetypeName)
        .map((collectionName) => ({
          collectionName: collectionName,
          columns: sheets.find((sheet) => sheet.collection === collectionName).variables
        }))
    })).reduce((archetypeToCollectionColumnMapping, currentArchetypeAndCols) => {
      archetypeToCollectionColumnMapping[currentArchetypeAndCols.key] = currentArchetypeAndCols.values;
      return archetypeToCollectionColumnMapping;
    }, {})
  };
}

export default transformProps;