
function selectGroupMenuIcon(groupName){
  cy.contains('a', groupName).then( menu =>{
      cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr =>{
        if(attr.includes('left')){
          cy.wrap(menu).click()
        }
      })
    })
}


export class NavigationPage{

  formLayoutsPage(){
    selectGroupMenuIcon('Form')
    cy.contains('Form Layouts').click()
  }

  datepickerPage(){
    selectGroupMenuIcon('Form')
    cy.contains('Datepicker').click()
  }


  toastrPage(){
    selectGroupMenuIcon('Modal & Overlays')
    cy.contains('Toastr').click()
  }

  smartTablePage(){
    selectGroupMenuIcon('Tables & Data')
    cy.contains('Smart Table').click()
  }

  tooltipPage(){
    selectGroupMenuIcon('Modal & Overlay')
    cy.contains('Tooltip').click()
  }


}

export const navigateTo = new NavigationPage()


