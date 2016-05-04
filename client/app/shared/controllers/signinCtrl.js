/**
 *
 * Sign in functionality for:
 * - Local
 * - Google+
 * TBD:
 * - Facebook
 * - Instagram
 *
 */
module.exports = angular.module("slideZapp")
    .controller("signinCtrl", function($scope, callout, auth, $state, nameService, $auth) {
        $scope.submit = function() {

            $auth.login({
                email: $scope.email,
                password: $scope.password
            }).then(function(res) {
                nameService.name = res.data.user.email;
                callout("success", "Good to see you!", "Welcome back " + res.data.user.email);
                checkState();
            }).catch(handleError)

        };

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider).then(function(res) {

                console.log(res);

                callout("success", "Good to see you!", "Welcome " + res.data.user.displayName);
                checkState();

            }, handleError);
        };

        //TODO: Rewrite as service
        function handleError(err) {
            console.log(err);
            callout("warning", "Oops!", err.data.message);
            if ($state.current.url !== "signin") {
                $state.go("signin");
            }
        }

        //TODO: Rewrite as service
        function checkState() {

            if ($state.current.url === "/signup" || $state.current.url === "/signin") {
                $state.go("home");
            }

        }

    });
