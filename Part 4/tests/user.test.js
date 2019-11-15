const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);
const User = require("../model/user");

describe("adding users to db", () => {
	test("valid users are addded", async () => {
		const allUsersStart = await User.find({});

		const user = new User({
			name: "Valid name",
			username: "uniqueusername1",
			password: "validpassword"
		});

		api
			.post("/api/users")
			.send(user)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const savedUser = await user.save();
		const modifiedUser = savedUser.toJSON();

		const allUsersEnd = await User.find({});
		const allUsersNames = allUsersEnd.map(user => user.username);

		expect(modifiedUser.password).not.toBeDefined();
		expect(allUsersNames).toContain(user.username);
		expect(allUsersEnd.length).toEqual(allUsersStart.length + 1);
	});

	test("invalid users are not added", async () => {
		const allUsersStart = await User.find({});

		const user = new User({
			name: "Valid name",
			username: "", //missing
			password: "va" //not long enough
		});

		api
			.post("/api/users")
			.send(user)
			.expect(400);

		const allUsersEnd = await User.find({});

		expect(allUsersStart.length).toEqual(allUsersEnd.length);
	});
});
