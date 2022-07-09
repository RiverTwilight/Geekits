import prisma from "../../utils/prisma";

export default function handler(req, res) {
	// TODO 判断是否为管理员
	// const users = prisma.user.findMany();
	res.status(200).json([]);
}
