/**
 * Base webpack config used across other specific configs
 */

import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import findRoot from 'find-root'
// import pathIsInside from 'path-is-inside'
import { dependencies as externals } from './app/package.json'

const ext = Object.keys(externals || {})

// TODO: automate this
// if we're using serialport we should put it here and in the
// app package.json too
// ext.push('serialport')

const PROPKEY = 'electricui-dev'

export function IsDevModule(filepath) {
  const pkgRoot = findRoot(filepath)
  const packageJsonPath = path.resolve(pkgRoot, 'package.json')
  const packageJsonText = fs.readFileSync(packageJsonPath, {
    encoding: 'utf-8'
  })

  const packageJson = JSON.parse(packageJsonText)

  return !!packageJson[PROPKEY]
}

export default {
  externals: ext,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: filepath => {
          if (IsDevModule(filepath)) {
            return true
          }

          return !/node_modules/.test(filepath)
        },
        // exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, 'app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    /*
      When enabled, symlinked resources are resolved to their real path,
      not their symlinked location. Note that this may cause module resolution
      to fail when using tools that symlink packages (like npm link).

      As a result, we disable this option.

      See: https://github.com/babel/babel-loader/issues/149
    */
    symlinks: false,
    modules: [
      path.join(__dirname, 'app'),
      'node_modules',
      path.join(__dirname, 'app', 'packages'),
      path.join(__dirname, 'app', 'electricui')
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    new webpack.NamedModulesPlugin()
  ]
}
