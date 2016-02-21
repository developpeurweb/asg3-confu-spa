'use strict';
// ONLY CONTROLLERS IN THIS FILE

		//$scope is an Angular module called "app" could be any name
        angular.module('confusionApp')

        //$scope is a controller for the "app" should be the name of variable declared beforehand
        //later we include the menuFactory dependecy injection to use it later below
        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {


        	//$scope to activate the tabs
        	$scope.tab = 1;
        	//Initially filtText should not filter out any item from the menu, hence is set to the empty string.
            $scope.filtText = '';
            $scope.showDetails = false;

            //we remove the whole data and paste a factory here, this calls the factory from services.js file
            $scope.dishes= menuFactory.getDishes();


           //$scope function will set the tab variable to the selected tab index.
        	$scope.select = function(setTab) {
                $scope.tab = setTab;

                //Whenever a tab is selected, the filtText value should be updated
                //to reflect the selected tab and the corresponding filter value to be applied.
                if (setTab === 2)
                    $scope.filtText = "appetizer";
                else if (setTab === 3)
                    $scope.filtText = "mains";
                else if (setTab === 4)
                    $scope.filtText = "dessert";
                else
                    $scope.filtText = "";
            }

            //$scope function will return true if the current tab is the same as the tab specified in the function parameter.
            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            }

            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };


        }]) // MenuController ends

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

            $scope.channels = channels;
            $scope.invalidChannelSelection = false;

        }]) // ContactController ends

        .controller('FeedbackController', ['$scope', function($scope) {

            $scope.sendFeedback = function() {

                console.log($scope.feedback);

                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }]) // FeedbackController ends



         .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
                var dish= menuFactory.getDish(parseInt($stateParams.id,10));
                $scope.dish = dish;
            }]) // DishDetailController ends


        .controller('DishCommentController', ['$scope', function($scope) {

            //Step 1: Create a JavaScript object to hold the comment from the form
             $scope.newComment = {rating:5, comment:"", author:"", date:""}; //this js object

            $scope.submitComment = function () {

                //Step 2: This is how you record the date
                $scope.newComment.date = new Date().toISOString();
                console.log($scope.newComment);
                // Step 3: Push your comment into the dish's comment array
                $scope.dish.comments.push($scope.newComment);

                //Step 4: reset your form to pristine
                $scope.commentForm.$setPristine();

                //Step 5: reset your JavaScript object that holds your comment
               $scope.newComment = {rating:5, comment:"", author:"", date:""};
            }
        }]) // DishCommentController ends



;






