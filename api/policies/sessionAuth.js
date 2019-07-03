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
    req.session = {Sesionesid:1,Userid:'u19724241',Dependid:1023,Lugarid:1023};
    return next();
  }

  var sessionId = (typeof req.cookies.SESION === 'string' && req.cookies.SESION.match(/^\d+$/) ? req.cookies.SESION : undefined);

  if (sessionId) {
    try {
      req.sesion = await wsPortal.getSession(sessionId);
    } catch (ignore) { }
  }

  if (!req.sesion) {
    if (req.wantsJSON) {
      return res.json({error:'SESSION TIMEDOUT'});
    } else {
      return res.redirect(sails.config.custom.portalUrl);
    }
  }
  return next();
};
