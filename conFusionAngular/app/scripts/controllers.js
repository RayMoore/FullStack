'use strict';
angular.module('confusionApp').controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";
    $scope.dishes = menuFactory.getDishes().query(function (response) {
        $scope.dishes = response;
        $scope.showMenu = true;
    }, function (response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
    });
    $scope.select = function (setTab) {
        $scope.tab = setTab;
        if (setTab === 2) {
            $scope.filtText = "appetizer";
        } else if (setTab === 3) {
            $scope.filtText = "mains";
        } else if (setTab === 4) {
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";
        }
    };
    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };
    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };
        }]).controller('ContactController', ['$scope', function ($scope) {
    $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: "",
        id: ""
    };
    var channels = [{
        value: "tel",
        label: "Tel."
        }, {
        value: "Email",
        label: "Email"
        }];
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
        }]).controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {
    $scope.sendFeedback = function () {
        if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
            $scope.invalidChannelSelection = true;
        } else {
            $scope.invalidChannelSelection = false;
            var feedbacks = feedbackFactory.sendFeedback().query();
            var id_last = feedbacks.length;
            var id = id_last + 1;
            $scope.feedback.id = id;
            feedbackFactory.sendFeedback().save({}, $scope.feedback, function (response) {
                console.log("feedback received " + response.status);
            }, function (error) {
                console.log("Error: " + error.status + " " + error.statusText);
            });
            $scope.feedback = {
                mychannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: "",
                id: ""
            };
            $scope.feedback.mychannel = "";
            $scope.feedbackForm.$setPristine();
        }
    };
        }]).controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
    $scope.showDish = false;
    $scope.message = "Loading ...";
    $scope.dish = menuFactory.getDishes().get({
        id: parseInt($stateParams.id, 10)
    }).$promise.then(function (response) {
        $scope.dish = response;
        $scope.showDish = true;
    }, function (response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
        $scope.showDish = false;
    });
        }]).controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
    $scope.mycomment = {
        rating: 5,
        comment: "",
        author: "",
        date: ""
    };
    $scope.submitComment = function () {
        $scope.mycomment.date = new Date().toISOString();
        $scope.dish.comments.push($scope.mycomment);
        menuFactory.getDishes().update({
            id: $scope.dish.id
        }, $scope.dish);
        $scope.commentForm.$setPristine();
        $scope.mycomment = {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };
    };
        }]).controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {
    $scope.showDish = false;
    $scope.showPromotion = false;
    $scope.showExecutiveChef = false;
    $scope.message = "Loading ...";
    // Implementing the communication with server and the error handling using $resource.
    $scope.promotions = menuFactory.getPromotions().query(function (response) {
        $scope.promotions = response;
        $scope.showPromotion = true;
    }, function (response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
        $scope.showPromotion = false;
    });
    $scope.executiveChef = corporateFactory.getLeaders().query(function (response) {
        $scope.executiveChef = response;
        $scope.showExecutiveChef = true;
    }, function (response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
        $scope.showExecutiveChef = false;
    });
    $scope.hotDishes = menuFactory.getDishes().query(function (response) {
        $scope.hotDishes = response;
        $scope.showDish = true;
    }, function (response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
        $scope.showDish = false;
    });
    $scope.promotionsFilter = '';
    $scope.executiveChefFilter = 'Executive Chef';
    $scope.hotDishesFilter = 'Hot';
}]).controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
    $scope.showLeaders = false;
    $scope.message = "Loading ...";
    $scope.leaders = corporateFactory.getLeaders().query(function (response) {
        $scope.leaders = response;
        $scope.showLeaders = true;
    }, function (response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
        $scope.showLeaders = false;
    });
    }]);
