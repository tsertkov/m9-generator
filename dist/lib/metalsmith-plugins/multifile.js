"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _matterInterpolate = _interopRequireDefault(require("../matter-interpolate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const META_KEY = 'multifile';

function _default() {
  return function multifilePlugin(files, metalsmith, done) {
    Object.keys(files).forEach(file => {
      const fileMeta = files[file];
      const pluginMeta = fileMeta[META_KEY];
      if (!pluginMeta) return;
      const {
        collection: collectionName,
        path
      } = pluginMeta;
      const metadata = metalsmith.metadata();
      const {
        [collectionName]: collection
      } = metadata;
      collection.forEach((entity, i) => {
        let newFileMeta = { ...fileMeta
        };
        delete newFileMeta[META_KEY]; // transfer plugin extra props to root scope in frontmatter
        // interpolate values passing current entity as 'this' context

        Object.keys(pluginMeta).forEach(key => {
          if (['collection'].includes(key)) return;
          newFileMeta[key] = (0, _matterInterpolate.default)(pluginMeta[key], { ...metadata,
            'this': entity
          });
        }); // assume that file path will be processed by other plugins

        files[`multifile.${path}.${i}`] = newFileMeta;
      }); // unpublish meta template file

      delete files[file];
    });
    done();
  };
}