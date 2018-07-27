export default function ({ manifestFile }) {
  return function buildManifestPlugin (files, metalsmith, done) {
    files[manifestFile] = {
      contents: JSON.stringify(getBuildManifest(files), null, 2)
    }
    done()
  }
}

function getBuildManifest (files) {
  return {
    buildDate: new Date().toUTCString(),
    totalFiles: Object.keys(files).length
  }
}
