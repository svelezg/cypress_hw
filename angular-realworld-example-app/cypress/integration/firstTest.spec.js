
describe('Test description', () =>{
  beforeEach('login to the application', () =>{
    cy.server()
    //cy.route('GET', '**/tags', 'fixture:tags')
    //cy.intercept('GET', '**/tags', {fixture:'tags.json'})
    cy.intercept({method:'Get', path:'tags'}, {fixture:'tags.json'})

    cy.loginInToApplication()
  })

  it('it should log', () =>{
    cy.log('We are in!')
  })


  it('verify correct request and response', ()=>{

    //cy.server()
    //cy.route('POST', '**/articles').as('postArticles')
    cy.intercept('POST', '**/articles').as('postArticles')

    cy.contains('New Article').click()
    cy.get('[formcontrolname="title"]').type('this is a title')
    cy.get('[formcontrolname="description"]').type('this is a description')
    cy.get('[formcontrolname="body"]').type('this is an article body')
    cy.contains('Publish Article').click()

    cy.wait('@postArticles')
    cy.get('@postArticles').then(xhr => {
      console.log(xhr)
      //cy.wrap(xhr.status).should('contain', '200')
      expect(xhr.response.statusCode).to.equal(200)
      expect(xhr.request.body.article.body).to.equal('this is an article body')
      expect(xhr.response.body.article.description).to.equal('this is a description')
    })

  })

  it('intercepting and modifying request and response', ()=>{

    //cy.server()
    //cy.route('POST', '**/articles').as('postArticles')
    // cy.intercept('POST', '**/articles', (req)=>{
    //   req.body.article.description = 'this is a description 2'
    // }).as('postArticles')

    cy.intercept('POST', '**/articles', (req)=>{
      req.reply(res =>{{
        expect(res.body.article.description).to.equal('this is a description')
        res.body.article.description = 'this is a description 2'
      }})
    }).as('postArticles')


    cy.contains('New Article').click()
    cy.get('[formcontrolname="title"]').type('this is a title')
    cy.get('[formcontrolname="description"]').type('this is a description')
    cy.get('[formcontrolname="body"]').type('this is an article body')
    cy.contains('Publish Article').click()

    cy.wait('@postArticles')
    cy.get('@postArticles').then(xhr => {
      console.log(xhr)
      //cy.wrap(xhr.status).should('contain', '200')
      expect(xhr.response.statusCode).to.equal(200)
      expect(xhr.request.body.article.body).to.equal('this is an article body')
       expect(xhr.response.body.article.description).to.equal('this is a description 2')
    })

  })


  it('should gave tags with routing objects', () =>{
    cy.get('.tag-list')
    cy.should('contain', 'Hola')
    cy.should('contain', 'test')
  })


  it('verify global feed like count', () =>{
    //cy.route('GET', '**/articles/feed*', '{"articles":[],"articlesCount":0}')
    cy.intercept('GET', '**/articles/feed*', {"articles":[],"articlesCount":0})
    //cy.route('GET', '**/articles*', 'fixture:articles.json')
    cy.intercept('GET', '**/articles*', {fixture:'articles.json'})


    cy.contains('Global Feed').click()


    cy.get('app-article-list button').then(listOfButtons =>{
      expect(listOfButtons[0]).to.contain('3')
      expect(listOfButtons[1]).to.contain('10')

    })

    cy.fixture('articles').then(file =>{
      const articleLink = file.articles[1].slug
      //cy.route('POST', '**/articles/' + articleLink+ '/favorite', file)
      cy.intercept('POST', '**/articles/' + articleLink+ '/favorite', file)

    })

    cy.get('app-article-list button')
      .eq(1)
      .click()
      .should('contain', '11')

  })

  it('delete and article in the global feed', () =>{

    // const userCredentials = {
    //   "user": {
    //     "email": "myemail45@gmail.com",
    //     "password": "45mypassword"
    //   }
    // }

    const bodyRequest = {
    "article": {
        "tagList": [],
        "title": "This is an API request",
        "description": "Was not that difficult",
        "body": "in an Angular App"
    }
}

    cy.get('@token').then(token =>{
      cy.request({
        url: Cypress.env("apiUrl")+'/api/articles/',
        headers: {'Authorization': 'Token '+ token},
        method: 'POST',
        body: bodyRequest
      }).then (response =>{
        expect(response.status).to.equal(200)
      }cy.contains('Global Feed').click()
    cy.get('.article-preview').first().click()
    cy.get('.article-actions').contains('Delete Article').click()

    cy.request({
      url: Cypress.env("apiUrl")+'/api/articles?limit=10&offset=0',
      headers: {'Authorization': 'Token '+ token},
      method: 'GET'
    }).then (response =>{
      //console.log(body)
      expect(response.body.articles[0].title).not.to.equal('This is an API request')

      })
    })
  })
})
