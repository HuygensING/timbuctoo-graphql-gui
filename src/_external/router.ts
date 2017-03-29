//   The router is used to jump to a specific place in the app, discarding all temp data (which might be returned on popState) so all pop-opens are closed etc
//   You must always be able to drop into a router position.
//   useful positions:
//     /:collection (collection overview, first item selected)
//     /:collection/:item (on every item select, keeps track of unsaved changes)

//   When you want to update the current state object you call replaceState (so you use this for storing the scroll position etc.)
//     - [ ] we can use this for unsaved changes

// so each pushState and onBeforeUnload calls replaceState first to save the redux store and then cleans the redux store and starts the app using the url arguments
// Router = {navigateTo(url: string), register(path:string, render: (arguments: object) => void, beforeOnloadmessage: () => string?)} //also registers onPopState and onBeforeUnload

// each router page is a separate mini-app with it's own redux store etc (of course they can re-use code and components)
// use Link objects that point to an external resource or to a router page object

// store full redux state when refreshing as well (should be handled by onBeforeUnload but test separately, also test with browsersync)
