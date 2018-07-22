export default function (manifestFile) {
  return function m9buildManifest (files, metalsmith, done) {
    files[manifestFile] = {
      contents: JSON.stringify(buildManifest(), null, 2)
    }
    done()
  }
}

function buildManifest () {
  return {
    buildDate: new Date().toUTCString()
  }
}
