Feature: Page includes H1
  
  As a tester
  I need to be confident a page has a h1
  So that users can understand the content of the page

  Scenario Outline: Pages without H1 are flagged 
    Given a Page
    And a "hasH1" is "<value>"
    When analysis is run
    Then the page "<result>" be flagged
  
  Examples:
    | value | result     |
    | true  | should not |
    | false | should     |
    
    
#  Scenario Outline: Products are flagged if many pages are missing a h1
#    Given a Product
#    And the "missingH1Count" is "<limit>"
#    When analysis is run
#    Then the product "<result>" be flagged
#    And the "Flag Level" should be "<level>"
#   
#    | value | result     | level  |
#    | 0     | should not | blank  |
#    | 1     | should     | yellow |
#    | 2     | should     | red    |