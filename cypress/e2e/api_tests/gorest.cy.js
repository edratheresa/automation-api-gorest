describe('API Testing on reqres.in with simplified requests', () => {
    let userId, email;

    //Test Case 1: GET
    it('should get user details successfully', () => {
        cy.apiRequest('GET', '/public/v2/users').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });
        
    
    // Test Case 2: POST - Create a new user
    it('should create a new user successfully', () => {
        email = `eve.ryan${Date.now()}@mail.com`;

        cy.apiRequest('POST', 'public/v2/users', {
            body: {
                name: 'Eve Ryan',
                email: email,
                gender: "female",
                status: "active"
            },
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('name', 'Eve Ryan');
                expect(response.body).to.have.property('email', email); 
                expect(response.body).to.have.property('gender', 'female');
                expect(response.body).to.have.property('status', 'active');

                userId = response.body.id;
        });
    });  

    // Test Case 3: PUT - Update User
    it('should update user info successfully', () => {
        const newEmail = `updated.ryanupdated${Date.now()}@mail.com`;
        cy.apiRequest('PUT', `/public/v2/users/${userId}`, {
            body: {
                name: 'Eve Ryan Updated',
                email: newEmail,
                status: 'inactive',
              },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('email', newEmail); 
                expect(response.body).to.have.property('name', 'Eve Ryan Updated');
                expect(response.body).to.have.property('status', 'inactive');
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('gender');

                email = newEmail;
        });
    });

    //Test Case 4: DELETE 
    it('It should delete a user successfully', () => {
        cy.apiRequest('DELETE', `/public/v2/users/${userId}`).then((response) => {
            expect(response.status).to.eq(204);
        });
    });


});
