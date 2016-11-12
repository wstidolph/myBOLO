"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var AuthData = (function () {
    function AuthData(af) {
        var _this = this;
        this.af = af;
        af.auth.subscribe(function (user) {
            if (user) {
                _this.fireAuth = user.auth;
            }
        });
    }
    AuthData.prototype.getUser = function () {
        return this.fireAuth;
    };
    AuthData.prototype.loginUser = function (newEmail, newPassword) {
        return this.af.auth.login({ email: newEmail, password: newPassword });
    };
    AuthData.prototype.anonymousLogin = function () {
        return this.af.auth.login({
            provider: angularfire2_1.AuthProviders.Anonymous,
            method: angularfire2_1.AuthMethods.Anonymous,
        });
    };
    AuthData.prototype.linkAccount = function (email, password) {
        var credential = firebase.auth.EmailAuthProvider.credential(email, password);
        var userProfile = firebase.database().ref('/userProfile');
        return this.fireAuth.link(credential).then(function (user) {
            userProfile.child(user.uid).update({
                email: email,
            });
        }, function (error) {
            console.log("Account linking error", error);
        });
    };
    AuthData.prototype.resetPassword = function (email) {
        console.log('auth() is ', firebase.auth());
        return firebase.auth().sendPasswordResetEmail(email);
    };
    AuthData.prototype.logoutUser = function () {
        return firebase.auth().signOut();
    };
    AuthData = __decorate([
        core_1.Injectable()
    ], AuthData);
    return AuthData;
}());
exports.AuthData = AuthData;
