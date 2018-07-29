"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _slug = _interopRequireDefault(require("slug"));

var _matterInterpolate = _interopRequireDefault(require("../matter-interpolate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const META_KEY = 'meta_to_files';
const INDEX_FILE = 'index.html';

function _default({
  slug
}) {
  let slugFn;

  if (typeof slug === 'function') {
    slugFn = slug;
  } else if (slug) {
    slugFn = function slugFn(v) {
      return (0, _slug.default)(v, slug);
    };
  } else {
    slugFn = _slug.default;
  }

  return function metaToFilesPlugin(files, metalsmith, done) {
    Object.keys(files).forEach(file => {
      const fileMeta = files[file];
      const pluginMeta = fileMeta[META_KEY];
      if (!pluginMeta) return;
      const {
        model_name: modelName,
        filename_pattern: filenamePattern
      } = pluginMeta;
      const {
        [modelName]: entities
      } = metalsmith.metadata();
      entities.forEach(entity => {
        let newFileMeta = { ...fileMeta
        };
        delete newFileMeta[META_KEY];
        const data = { ...metalsmith.metadata(),
          [modelName]: entity // transfer plugin extra props to root scope in frontmatter

        };
        Object.keys(pluginMeta).forEach(key => {
          if (['model_name', 'filename_pattern'].includes(key)) return;
          newFileMeta[key] = (0, _matterInterpolate.default)(pluginMeta[key], data);
        });
        const filename = buildFilename(filenamePattern, data, file, slugFn);
        files[filename] = newFileMeta;
      }); // unpublish meta template file

      delete files[file];
    });
    done();
  };
}

function buildFilename(filenamePattern, data, tplFilename, slugFn) {
  let filename = (0, _matterInterpolate.default)(filenamePattern, data, slugFn);

  if (isPermalink(filename)) {
    const extension = fileExtension(tplFilename, 1);
    filename += `/${INDEX_FILE}.${extension}`;
  } else {
    const extension = fileExtension(tplFilename, 2);
    filename += `.${extension}`;
  }

  return filename;
}

function isPermalink(filename) {
  return filename.substr(-1) === '/';
}

function fileExtension(filename, extensionsCount) {
  return filename.split('.', 3).splice(-1 * extensionsCount).join('.');
}