// src/modules/pocket/src/pocket.js
var FF_DEV = production === "development";
var FF_QUIET = true != null;
function core(init, render) {
  const state = init.state;
  const actions = init.actions;
  let lock = true;
  const view = init.setup(state, dispatch);
  update();
  function update() {
    render(view());
    lock = false;
  }
  function schedule() {
    if (!lock) {
      lock = true;
      requestAnimationFrame(update);
    }
  }
  function dispatch(name, data, options) {
    FF_QUIET && console.log("Dispatch >>", name);
    const scope = options && options.scope;
    const result = actions[name](scope ? state[scope] : state, data);
    if (result) {
      if (FF_DEV && typeof result !== "function") {
        console.warn("Dispatch >> Invalid return type >>", name);
      }
      const effect = result(dispatch);
      if (effect && effect.then) {
        return effect.then(schedule);
      }
    } else {
      schedule();
    }
  }
  return {
    dispatch,
    getState() {
      return state;
    }
  };
}
function pocket_default(init, render) {
  const stores = init.stores;
  const state = {};
  const actions = {};
  const map = {};
  for (const scope in stores) {
    const store = stores[scope];
    state[scope] = store.state;
    const storeActions = store.actions;
    for (const key in storeActions) {
      const name = scope + "/" + key;
      actions[name] = storeActions[key];
      map[name] = scope;
    }
  }
  function setup(state2, dispatch) {
    return init.setup(state2, function(name, data) {
      return dispatch(name, data, { scope: map[name] });
    });
  }
  return core({ state, actions, setup }, render);
}

// src/modules/pocket/src/lib.js
var queryDelimeters = /[&=]/g;
function decode(data) {
  const query = data.slice(1).split(queryDelimeters);
  const result = {};
  for (let i = 0; i < query.length; i += 2) {
    result[query[i]] = query[i + 1];
  }
  return result;
}
function encode(data) {
  let result = "?";
  for (const key in data) {
    if (data[key] != null) {
      result += key + "=" + data[key] + "&";
    }
  }
  return result.slice(0, -1);
}

// src/modules/pocket/src/router.js
var search = location.search;
var pathname = location.pathname;
var pushstate = new CustomEvent("pocket-pushstate");
function sync(state, rewrites) {
  state.query = search[0] === "?" ? decode(search) : null;
  if (rewrites != null) {
    for (let i = 0; i < rewrites.length; i++) {
      const rewrite = rewrites[i];
      const source = rewrite.source;
      if (typeof source === "function") {
        const result2 = rewrite.source();
        if (result2 === false || result2 == null) {
          continue;
        }
        state.id = result2;
        state.to = rewrite.destination;
        return;
      }
      const result = pathname.match(rewrite.source);
      if (result !== null) {
        state.id = result[0];
        state.to = rewrite.destination;
        return;
      }
    }
  }
  state.id = null;
  state.to = pathname;
}
function link(to, query) {
  to = to == null ? pathname : to;
  query = query == null ? to : to + encode(query);
  const state = history.state ?? {};
  if (state.to === to && state.query === query) {
    return;
  }
  history.pushState({ to, query }, null, query);
  dispatchEvent(pushstate);
}
function router(init, app) {
  const pages = init.pages;
  init.stores.router = {
    state: {
      id: null,
      query: null,
      to: "/"
    },
    actions: {
      sync
    }
  };
  return app({
    stores: init.stores,
    setup(state, dispatch) {
      let destroy = null;
      let view = null;
      function main() {
        dispatch("router/sync", init.rewrites);
        if (destroy != null) {
          destroy(state, dispatch);
        }
        let route = pages[state.router.to];
        route = route == null ? pages["/missing"] : route;
        const setup = route.setup;
        view = setup != null && setup(state, dispatch);
        destroy = route.destroy;
      }
      main();
      addEventListener("pocket-pushstate", main);
      addEventListener("popstate", main);
      return function() {
        return view();
      };
    }
  });
}

// src/modules/pocket/src/shadow.js
var nodeMap = /* @__PURE__ */ new WeakMap();
var shadowInit = { mode: "open" };
function Component(props, view) {
  const host = props.host;
  const patch = props.patch;
  let node;
  Object.defineProperty(host, "node", {
    get() {
      return node;
    },
    set(value) {
      const data = nodeMap.get(node = value) ?? {};
      let root = data.root;
      data.props = props.props;
      data.view = view;
      if (root) {
        patch(root, data.render());
      } else {
        const init = props.init;
        const setup = init.setup;
        init.setup = function(state, dispatch) {
          const render = setup(state, dispatch);
          return data.render = function() {
            return render(data.props, data.view);
          };
        };
        root = node.attachShadow(shadowInit);
        root = root.appendChild(data.root = document.createElement("div"));
        core(init, function(view2) {
          return patch(root, view2);
        });
      }
      nodeMap.set(node, data);
    }
  });
  return host;
}
function IFrameRoot(props, view) {
  const host = props.host;
  let node;
  Object.defineProperty(host, "node", {
    get() {
      return node;
    },
    set(value) {
      let root = nodeMap.get(node = value);
      requestAnimationFrame(function() {
        if (!root) {
          nodeMap.set(node, root = document.createElement("div"));
          node.contentDocument.documentElement.replaceWith(root);
        }
        props.patch(root, view);
      });
    }
  });
  return host;
}
function ShadowRoot(props, view) {
  const host = props.host;
  let node;
  Object.defineProperty(host, "node", {
    get() {
      return node;
    },
    set(value) {
      let root = nodeMap.get(node = value);
      if (!root) {
        nodeMap.set(node, root = document.createElement("div"));
        node.attachShadow(shadowInit).appendChild(root);
      }
      props.patch(root, view);
    }
  });
  return host;
}
export {
  Component,
  IFrameRoot,
  ShadowRoot,
  core,
  link,
  pocket_default as pocket,
  router
};
