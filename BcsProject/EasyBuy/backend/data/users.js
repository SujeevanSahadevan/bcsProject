import bcrypt from "bcryptjs";

const users = [
	{
		name: "Admin",
		email: "admin@easybuy.com",
		password: bcrypt.hashSync("admin1234", 10),
		isAdmin: true,
	},
	{
		name: "Sujeevan",
		email: "sujeevan@easybuy.com",
		password: bcrypt.hashSync("sujeevan1234", 10),
	},
	{
		name: "Michael",
		email: "michael@easybuy.com",
		password: bcrypt.hashSync("michael1234", 10),
	},
];

export default users;
