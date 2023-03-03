var express = require('express');
var router = express.Router();

var ctrlOnboarding = require('../../controllers/employee/onBoarding.controller');

router
  .route('/onboarding')
  .get(ctrlOnboarding.getAllOnboarding)
  .post(ctrlOnboarding.onboardingAddOne)
  .put(ctrlOnboarding.updateonboardingByEmpCognitoID);
  
  router
  .route('/onboarding/EmpCognitoID=:EmpCognitoID')
  .get(ctrlOnboarding.getOneboardingByEmpCognitoID);

  router
    .route('/onboarding/id=:id')
    .delete(ctrlOnboarding.onBoardingDeleteOne);

module.exports = router;