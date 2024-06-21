Feature: validating the api request of test application 

  Scenario: As a user I should open the test app and validate the api request
    Given the user opens the EA test application
    When the user validates the api request status
    And the user gets the request data from the api
    Then the data from API should be shown in the front end

  