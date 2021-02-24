import{ navigateTo }from "../support/page_objects/navigationPage.js"
import{ onFormLayoutPage }from "../support/page_objects/formLayoutPage.js"
import{ onDatepickerPage }from "../support/page_objects/datepickerPage.js"
import{ onSmartTablePage }from "../support/page_objects/smartTablePage.js"


describe('test with Page Objects', () =>{

  beforeEach('Open Application', ()=>{
    cy.openHomePage()
  })

  it('verify navigation across the pages', ()=>{
    navigateTo.formLayoutsPage()
    navigateTo.datepickerPage()
    navigateTo.smartTablePage()
    navigateTo.toastrPage()
    navigateTo.tooltipPage()
  })

  it.only('should submit Inline and Basic form and select tomorrow date in teh calendar', ()=>{
     // navigateTo.formLayoutsPage()
     // onFormLayoutPage.submitInlineFormWithNameAndEmail('Santiago', 'email@myemail.com')
     // onFormLayoutPage.submitBasicForm('theamil@myeamil.com', 'mypass')
     // navigateTo.datepickerPage()
     // onDatepickerPage.selectDatePickerFromToday(1)
     // onDatepickerPage.selectDateRangeFromToday(1, 20)
     navigateTo.smartTablePage()
     onSmartTablePage.updateAgeByFirstName('Larry', '45')
     onSmartTablePage.addNewRecordWithFistAndLastName('Santiago', 'Tristan')
     onSmartTablePage.deleteRowByIndex(1)

  })

})
