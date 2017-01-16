import path from "path"
import webpack from "webpack"
import extend from "extend"
import AssetsPlugin from "assets-webpack-plugin"

const DEBUG = !process.argv.includes("--release")
const VERBOSE = process.argv.includes("--verbose")

console.log("VERBOSE", VERBOSE, "DEBUG", DEBUG)

const isExternal = module => {
  const userRequest = module.userRequest

  if (typeof userRequest !== "string")
    return false

  return userRequest.indexOf("node_modules") >= 0
}

const GLOBALS = {
  "process.env.NODE_ENV": DEBUG ? "\"development\"" : "\"production\"",
  __DEV__: DEBUG,
}

// include: [path.resolve(__dirname, "../src")],

//
// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
  context: path.resolve(__dirname, "../src"),

  output: {
    path: path.resolve(__dirname, "../build/public/assets"),
    publicPath: "/assets/",
    sourcePrefix: "  ",
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: "babel-loader",
      exclude: /node_modules/,
      options: {
        cacheDirectory: DEBUG,
        babelrc: false,
        presets: [
          "react",
          ["es2015", {modules: false}],
          "stage-0",
        ],
        plugins: [
          "transform-runtime",
          "transform-decorators-legacy",
          "react-hot-loader/babel",
          ...DEBUG ? [] : [
            "transform-react-remove-prop-types",
            "transform-react-constant-elements",
            "transform-react-inline-elements",
          ],
        ],
      },
    }, {
      test: /\.scss$/,
      use: [
        "isomorphic-style-loader",
        {
          loader: "css-loader",
          options: {
            sourceMap: DEBUG,
            modules: true,
            importLoaders: 1,
            localIdentName: DEBUG ?
              "[name]_[local]_[hash:base64:3]" : "[hash:base64:4]",
            minimize: !DEBUG,
          }
        },
        "postcss-loader",
        "sass-loader"
      ]
    }, {
      test: /\.txt$/,
      use: "raw-loader",
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      use: [{
        loader: "url-loader",
        options: {
          name: DEBUG ? "[path][name].[ext]?[hash]" : "[hash].[ext]",
          limit: 10000,
        }
      }]
    }, {
      test: /\.(eot|ttf|wav|mp3)$/,
      use: [{
        loader: "file-loader",
        options: {
          name: DEBUG ? "[path][name].[ext]?[hash]" : "[hash].[ext]"
        }
      }]
    }]
  },

  resolve: {
    modules: [
      path.resolve(__dirname, "../src"),
      "node_modules"
    ],
    extensions: [".webpack.js", ".web.js", ".js", ".jsx", ".json"],
    alias: {
      // FUTURE: Use Preact
      // react: "preact-compat",
      // "react-dom": "preact-compat"
      // "react-addons-shallow-compare": "shallow-compare"
    }
  },

  plugins: [],

  cache: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  }
}

//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

const clientConfig = extend(true, {}, config, {
  entry: [
    "react-hot-loader/patch",
    "./client.js"
  ],

  output: {
    filename: DEBUG ? "[name].js?[chunkhash]" : "[name].[chunkhash].js",
    chunkFilename: DEBUG ? "[name].[id].js?[chunkhash]" : "[name].[id].[chunkhash].js",
  },

  target: "web",

  node: {
    fs: "empty"
  },

  plugins: [
    // Define free variables
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({...GLOBALS, "process.env.BROWSER": true}),
    new webpack.DefinePlugin({__DEV__: (process.env.NODE_ENV === "development")}),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),

    // Emit a file with assets paths
    // https://github.com/sporto/assets-webpack-plugin#options
    new AssetsPlugin({
      path: path.resolve(__dirname, "../build"),
      filename: "assets.js",
      processOutput: x => `module.exports = ${JSON.stringify(x)}`,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "vendors",
      minChunks: module => (isExternal(module))
    }),

    ...DEBUG ? [] : [

      // Search for equal or similar files and deduplicate them in the output
      // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      new webpack.optimize.DedupePlugin(),

      // Minimize all JavaScript output of chunks
      // https://github.com/mishoo/UglifyJS2#compressor-options
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          screw_ie8: true,
          warnings: VERBOSE
        },
      }),

      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),

      // A plugin for a more aggressive chunk merging strategy
      // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
      new webpack.optimize.AggressiveMergingPlugin(),
    ],
  ],

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG ? "cheap-module-eval-source-map" : false
})

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = extend(true, {}, config, {
  entry: "./server.js",

  output: {
    filename: "../../server.js",
    libraryTarget: "commonjs2",
  },

  target: "node",

  externals: [
    /^\.\/assets$/,
    (context, request, cb) => {
      cb(null, Boolean(request.match(/^[@a-z][a-z\/\.\-0-9]*$/i)))
    },
  ],

  plugins: [
    // Define free variables
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({...GLOBALS, "process.env.BROWSER": false}),
    new webpack.DefinePlugin({__DEV__: (process.env.NODE_ENV === "development")}),

    // Adds a banner to the top of each generated chunk
    // https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
    new webpack.BannerPlugin({
      banner: "require(\"source-map-support\").install()",
      options: {raw: true, entryOnly: false}
    }),
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  devtool: "source-map",
})

export default [clientConfig, serverConfig]
