var passport = require('passport');
var passportJWT = require("passport-jwt");
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {
	//jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
	secretOrKey: 'minhaChaveSecreta'    
};

module.exports = {
	get auth(){
		var User = mongoose.models.Usuario; 
		var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next){
			User.findById(jwt_payload._id).exec().then(user => {
				if(user){
					next(null, user);
				}else{
					next(null, false);
				}
			})
		})

		passport.use(strategy);

		return {
			initialize: function(){
				return passport.initialize();
			},
			get authenticate(){
				return passport.authenticate('jwt', {session: false});
			}
		}
	},
	login: function(name, password, callback){
		var User = mongoose.models.Usuario; 

		User.findOne({name, password}).exec().then(user => {
			if(user){
				var payload = {_id: user._id};
				var token = jwt.sign(payload, jwtOptions.secretOrKey);

				callback({'message': 'ok', token});
			}else{
				callback(false);
			}
		})
	}
}