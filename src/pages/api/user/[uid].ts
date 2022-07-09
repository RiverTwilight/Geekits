import prisma from "../../../utils/prisma";

export default async function userHandler(req, res) {
	const {
		query: { id, name, email },
		method,
	} = req;

	switch (method) {
		case "GET":
			const userInfo = await prisma.user.findMany({
				where: {
					id,
				},
			});
			console.log(userInfo);
			res.status(200).json({ id, name: `User ${id}` });
			break;
		case "PUT":
			const newUser = await prisma.user.create({
				data: {
					id,
					name,
					email,
				},
			});
			console.log(newUser);
			res.status(200).json({ id, name: name || `User ${id}` });
			break;
		case "DELETE":
			const deletedUser = await prisma.user.delete({
				where: {
					id,
				},
			});
			res.status(200).json({ message: `Account deleted` });
			break;
		default:
			res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
