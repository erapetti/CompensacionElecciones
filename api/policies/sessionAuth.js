/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async function(req, res, next) {

  if (sails.config.environment === "development") {
    if (typeof req.session === 'undefined') {
       req.session = {};
    }
    req.session.Sesionesid=1;
    req.session.Userid='u42538215';
    req.session.Dependid=4300;
    req.session.Lugarid=4300;
    return next();
  }

  var sessionId = (typeof req.cookies.SESION === 'string' && req.cookies.SESION.match(/^\d+$/) ? req.cookies.SESION : undefined);

  if (sessionId) {
    try {
      let url = req.url.substr(1); // saco la / inicial
      url = url.replace(/\?.*/, '');

      req.session = await wsPortal.getSession(sessionId,url);
    } catch (ignore) { }
  }

  if (!req.session) {
    if (req.wantsJSON) {
      return res.json({error:'SESSION TIMEDOUT'});
    } else {
      return res.forbidden(new Error("Debe iniciar sesión en el portal de servicios"));
    }
  }
  return next();
};
