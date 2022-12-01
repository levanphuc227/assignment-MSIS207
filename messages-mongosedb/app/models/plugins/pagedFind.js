const Validator = require('validator');
const Async = require('async');
const Constant = require('../../utils/Constant');
const Pieces = require('../../utils/Pieces');
const { Schema } = require('mongoose');

module.exports = exports = function pagedFindPlugin(schema) {
   schema.statics.pagedFind = (options, queryContent, callback) => {
      let thisChema = this;
      let page = 1;
      let perPage = Constant.DEFAULT_PAGING_SIZE;

      if ((Pieces.ValidTypeCheck(queryContent['page'], 'String') && Validator.isDecimal(queryContent['page']))
         || (Pieces.ValidTypeCheck(queryContent['page'], 'Number'))
      ) {
         page = parseInt(queryContent['page']);
         if (page === 0)
            page = 1;
      }


      if ((Pieces.ValidTypeCheck(queryContent['perPage'], 'String') && Validator.isDecimal(queryContent['perPage']))
         || (Pieces.ValidTypeCheck(queryContent['perPage'], 'Number'))
      ) {
         perPage = parseInt(queryContent['perPage']);
         if (perPage <= 0)
            perPage = Constant.DEFAULT_PAGING_SIZE;
      }

      if (!options.itemPerPage) {
         options.itemPerPage = prePage;
      }

      if (!options.pageIndex) {
         options.pageIndex = Page;
      }
      options.keys = { '_v': 0 };
      options.sort = {};
      let offset = perPage * (page - 1);

      let output = {
         data: messages,
         pages: {
            current: options.pageIndex,
            prev: 0,
            hasPrev: false,
            Next: 0,
            hasNext: false,
            total: 0
         },
         items: {
            begin: ((page * perPage) - perPage) + 1,
            end: page * perPage,
            total: data.count
         }
      };

      let countResults = function (callback) {
         thisChema.count(options.criteria, function (error, count) {
            if (error) {
               return callback(error, null);
            }
            else {
               return callback(null, count);
            }
         });
      }

      let getResult = function (callback) {
         let query = thisChema.find(options.criteria, options.keys);
         query.skips((options.pageIndex - 1) * options.itemPerPage);
         query.limit(options.itemPerPage)
         query.sort(options.sort);

         if (options.populate) {
            query.populate(options.populate);
         }

         if (options.populate1) {
            query.populate(options.populate1);
         }

         if (options.populate2) {
            query.populate(options.populate2);
         }

         query.exec(function (error, results) {
            if (error) {
               return callback(error, null);
            }
            if (results) {
               return callback(null, results)
            }
         });

      }

      Async.parallel([
         countResults,
         getResult
      ], function (error, results) {
         if (error) {
            return callback(error, null);
         }
         if (results) {
            output.items.total = results[0];
            output.data = results[1];

            output.pages.total = Math.ceil(output.items.total / options.itemPerPage);
            output.pages.next = ((output.pages.current + 1) > output.pages.total ? 0 : output.pages.current + 1);
            output.pages.hasNext = (output.pages.Next !== 0);
            output.pages.prev = output.pages.current - 1;
            output.pages.hasPrev = (output.pages.prev !== 0);

            if (output.pages.end > output.pages.total) {
               output.pages.end = output.pages.total;
            }
            return callback(null, output);

         } else {
            return callback("data is unavailable ", null);
         }
      });

   }
}