
function handler (args, options) {
  return {
    loader: 'jsx',
    contents: ''
  }
}

export default function (options) {
  function load (args) {
    return handler(args, options)
  }

  return {
    name: 'plugin-lint',
    setup (build) {
      build.onLoad({ filter: /\.(css|sass|scss|js|jsx|ts|tsx)$/ }, load)
    }
  }
}
