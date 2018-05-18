export default function getDependencyProps(DependentComponent, props) {
  // Note that is generated during build with `babel-plugin-transform-react-handled-props`
  const { handledProps = [] } = DependentComponent

  return Object.keys(props).reduce((acc, prop) => {
    if (prop === 'childKey') {
      return acc
    }

    // if we can find the prop in the Component props, pass it down
    if (handledProps.indexOf(prop) !== -1) {
      acc[prop] = props[prop]
    }

    return acc
  }, {})
}
