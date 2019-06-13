import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer'

const installDevTools = () => {
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS

  installExtension(REACT_DEVELOPER_TOOLS, forceDownload).catch(err =>
    console.log('An error occurred: ', err),
  )

  installExtension(REDUX_DEVTOOLS, forceDownload).catch(err =>
    console.log('An error occurred: ', err),
  )
}
export default installDevTools
