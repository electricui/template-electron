import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer'

const installDevTools = () => {
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS

  installExtension(REACT_DEVELOPER_TOOLS, forceDownload)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err))

  installExtension(REDUX_DEVTOOLS, forceDownload)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err))
}
export default installDevTools
