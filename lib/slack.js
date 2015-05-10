
/**
 * Module dependencies.
 */

var post = require('./request').post;
var fmt = require('./fmt');

/**
 * Post to slack!
 */

module.exports = function *(body) {
  var uri = 'https://hooks.slack.com/services/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';
  for (var i = 0; i < body.length; i++) {
    yield post(uri, fmtSlack(body[i]));
  }
};

/**
 * Helper function to format activity to how slack wants it.
 */

function fmtSlack(event) {
  return JSON.stringify({
    username: event.actor.login || 'GitHub Party Bot',
    text: fmt('%s, %s, %s', event.payload.action, event.type, friendly(event.repo.url)),
    icon_url: event.actor.avatar_url
  });
}

/**
 * Make API link user-friendly.
 *
 * https://api.github.com/repos/alphagov/whitehall
 *
 * to
 *
 * https://github.com/alphagov/whitehall
 */

function friendly(uri) {
  return uri.replace('api.', '').replace('/repos', '');
}