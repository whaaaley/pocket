// node_modules/superfine/index.js
var SSR_NODE = 1;
var TEXT_NODE = 3;
var EMPTY_OBJ = {};
var EMPTY_ARR = [];
var SVG_NS = "http://www.w3.org/2000/svg";
var listener = function(event) {
  this.events[event.type](event);
};
var getKey = (vdom) => vdom == null ? vdom : vdom.key;
var patchProperty = (node, key, oldValue, newValue, isSvg) => {
  if (key === "key") {
  } else if (key[0] === "o" && key[1] === "n") {
    if (!((node.events || (node.events = {}))[key = key.slice(2)] = newValue)) {
      node.removeEventListener(key, listener);
    } else if (!oldValue) {
      node.addEventListener(key, listener);
    }
  } else if (!isSvg && key !== "list" && key !== "form" && key in node) {
    node[key] = newValue == null ? "" : newValue;
  } else if (newValue == null || newValue === false) {
    node.removeAttribute(key);
  } else {
    node.setAttribute(key, newValue);
  }
};
var createNode = (vdom, isSvg) => {
  var props = vdom.props, node = vdom.type === TEXT_NODE ? document.createTextNode(vdom.tag) : (isSvg = isSvg || vdom.tag === "svg") ? document.createElementNS(SVG_NS, vdom.tag, { is: props.is }) : document.createElement(vdom.tag, { is: props.is });
  for (var k in props) {
    patchProperty(node, k, null, props[k], isSvg);
  }
  for (var i = 0; i < vdom.children.length; i++) {
    node.appendChild(createNode(vdom.children[i] = vdomify(vdom.children[i]), isSvg));
  }
  return vdom.node = node;
};
var patchNode = (parent, node, oldVNode, newVNode, isSvg) => {
  if (oldVNode === newVNode) {
  } else if (oldVNode != null && oldVNode.type === TEXT_NODE && newVNode.type === TEXT_NODE) {
    if (oldVNode.tag !== newVNode.tag)
      node.nodeValue = newVNode.tag;
  } else if (oldVNode == null || oldVNode.tag !== newVNode.tag) {
    node = parent.insertBefore(createNode(newVNode = vdomify(newVNode), isSvg), node);
    if (oldVNode != null) {
      parent.removeChild(oldVNode.node);
    }
  } else {
    var tmpVKid, oldVKid, oldKey, newKey, oldProps = oldVNode.props, newProps = newVNode.props, oldVKids = oldVNode.children, newVKids = newVNode.children, oldHead = 0, newHead = 0, oldTail = oldVKids.length - 1, newTail = newVKids.length - 1;
    isSvg = isSvg || newVNode.tag === "svg";
    for (var i in { ...oldProps, ...newProps }) {
      if ((i === "value" || i === "selected" || i === "checked" ? node[i] : oldProps[i]) !== newProps[i]) {
        patchProperty(node, i, oldProps[i], newProps[i], isSvg);
      }
    }
    while (newHead <= newTail && oldHead <= oldTail) {
      if ((oldKey = getKey(oldVKids[oldHead])) == null || oldKey !== getKey(newVKids[newHead])) {
        break;
      }
      patchNode(node, oldVKids[oldHead].node, oldVKids[oldHead++], newVKids[newHead] = vdomify(newVKids[newHead++]), isSvg);
    }
    while (newHead <= newTail && oldHead <= oldTail) {
      if ((oldKey = getKey(oldVKids[oldTail])) == null || oldKey !== getKey(newVKids[newTail])) {
        break;
      }
      patchNode(node, oldVKids[oldTail].node, oldVKids[oldTail--], newVKids[newTail] = vdomify(newVKids[newTail--]), isSvg);
    }
    if (oldHead > oldTail) {
      while (newHead <= newTail) {
        node.insertBefore(createNode(newVKids[newHead] = vdomify(newVKids[newHead++]), isSvg), (oldVKid = oldVKids[oldHead]) && oldVKid.node);
      }
    } else if (newHead > newTail) {
      while (oldHead <= oldTail) {
        node.removeChild(oldVKids[oldHead++].node);
      }
    } else {
      for (var keyed = {}, newKeyed = {}, i = oldHead; i <= oldTail; i++) {
        if ((oldKey = oldVKids[i].key) != null) {
          keyed[oldKey] = oldVKids[i];
        }
      }
      while (newHead <= newTail) {
        oldKey = getKey(oldVKid = oldVKids[oldHead]);
        newKey = getKey(newVKids[newHead] = vdomify(newVKids[newHead]));
        if (newKeyed[oldKey] || newKey != null && newKey === getKey(oldVKids[oldHead + 1])) {
          if (oldKey == null) {
            node.removeChild(oldVKid.node);
          }
          oldHead++;
          continue;
        }
        if (newKey == null || oldVNode.type === SSR_NODE) {
          if (oldKey == null) {
            patchNode(node, oldVKid && oldVKid.node, oldVKid, newVKids[newHead], isSvg);
            newHead++;
          }
          oldHead++;
        } else {
          if (oldKey === newKey) {
            patchNode(node, oldVKid.node, oldVKid, newVKids[newHead], isSvg);
            newKeyed[newKey] = true;
            oldHead++;
          } else {
            if ((tmpVKid = keyed[newKey]) != null) {
              patchNode(node, node.insertBefore(tmpVKid.node, oldVKid && oldVKid.node), tmpVKid, newVKids[newHead], isSvg);
              newKeyed[newKey] = true;
            } else {
              patchNode(node, oldVKid && oldVKid.node, null, newVKids[newHead], isSvg);
            }
          }
          newHead++;
        }
      }
      while (oldHead <= oldTail) {
        if (getKey(oldVKid = oldVKids[oldHead++]) == null) {
          node.removeChild(oldVKid.node);
        }
      }
      for (var i in keyed) {
        if (newKeyed[i] == null) {
          node.removeChild(keyed[i].node);
        }
      }
    }
  }
  return newVNode.node = node;
};
var vdomify = (newVNode) => newVNode !== true && newVNode !== false && newVNode ? newVNode : text("");
var recycleNode = (node) => node.nodeType === TEXT_NODE ? text(node.nodeValue, node) : createVNode(node.nodeName.toLowerCase(), EMPTY_OBJ, EMPTY_ARR.map.call(node.childNodes, recycleNode), SSR_NODE, node);
var createVNode = (tag, props, children, type, node) => ({
  tag,
  props,
  key: props.key,
  children,
  type,
  node
});
var text = (value, node) => createVNode(value, EMPTY_OBJ, EMPTY_ARR, TEXT_NODE, node);
var h = (tag, props, children = EMPTY_ARR) => createVNode(tag, props, Array.isArray(children) ? children : [children]);
var patch = (node, vdom) => ((node = patchNode(node.parentNode, node, node.vdom || recycleNode(node), vdom)).vdom = vdom, node);

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

// src/modules/pocket/src/router.js
var search = location.search;
var pathname = location.pathname;
var pushstate = new CustomEvent("pocket-pushstate");

// src/modules/pocket/src/shadow.js
var nodeMap = /* @__PURE__ */ new WeakMap();
var shadowInit = { mode: "open" };
function Component(props, view) {
  const host = props.host;
  const patch2 = props.patch;
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
        patch2(root, data.render());
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
          return patch2(root, view2);
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

// src/modules/pocket-superfine/index.js
function Component2({ id, style, props, init }, children) {
  const setup = init.setup;
  init.setup = function(state, dispatch) {
    const render = setup(state, dispatch);
    return function(props2, children2) {
      let view = render(props2, children2);
      view = Array.isArray(view) ? view : [view];
      if (style) {
        view.push(h("style", {}, text(style)));
      }
      return h("div", { id }, view);
    };
  };
  return Component({ init, patch, host: h("div", {}), props }, children);
}
function IFrameRoot2({ id, style }, children) {
  const host = h("iframe", {});
  if (style) {
    children.push(h("style", {}, text(style)));
  }
  return IFrameRoot({ host, patch }, h("div", { id }, children));
}
function ShadowRoot2({ id, style }, children) {
  const host = h("div", {});
  if (style) {
    children.push(h("style", {}, text(style)));
  }
  return ShadowRoot({ host, patch }, h("div", { id }, children));
}
export {
  Component2 as Component,
  IFrameRoot2 as IFrameRoot,
  ShadowRoot2 as ShadowRoot
};
