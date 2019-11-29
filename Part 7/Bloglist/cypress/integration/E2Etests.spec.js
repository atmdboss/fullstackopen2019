describe("Initialize database", function() {
	it("init database", function() {
		cy.request("POST", "http://localhost:3003/api/testing/reset");
		const user = {
			name: "First Person",
			password: "first",
			username: "first"
		};
		cy.request("POST", "http://localhost:3003/api/users", user);
	});
});
describe("Logged in", function() {
	it("can log in", function() {
		cy.visit("http://localhost:3000");
		cy.contains("Log-in to your account");
		cy.get("[data-cy=username]").type("first");
		cy.get("[data-cy=password]").type("first");
		cy.contains("Login").click();
		cy.contains("Welcome First Person");
	});

	it("should create new blog", function() {
		cy.get("[data-cy=create-btn]").click();
		cy.get("[data-cy=title]").type("Testing testing 123");
		cy.get("[data-cy=author]").type("Some wise guy");
		cy.get("[data-cy=url]").type("http://testing.com");
		cy.contains("Create blog").click();
		cy.contains("Testing testing 123");
	});
});
describe("single blog", function() {
	it("can comment", function() {
		cy.contains("Testing testing 123").click();
		cy.get("[data-cy=comment]").type("This is a test comment");
		cy.contains("Add Comment").click();
		cy.contains("This is a test comment");
	});
});
