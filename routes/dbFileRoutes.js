const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const fs = require("fs");
const path = require("path");

const auth = new GoogleAuth({
	credentials: {
		client_email: process.env.CLIENT_EMAIL,
		private_key: process.env.PRIVATE_KEY,
	},
	scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({
	version: "v3",
	auth,
});

router.post("", (req, res) => {
	const fileMetadata = {
		name: "dev.db",
	};
	const media = {
		mimeType: "application/x-sqlite3",
		body: fs.createReadStream("../prisma/dev.db"),
	};
	drive.files.create(
		{
			resource: fileMetadata,
			media: media,
			fields: "id",
		},
		(err, file) => {
			if (err) {
				console.error(err);
				res.status(500).send(err);
			} else {
				res.status(200).send("File uploaded! ID is: " + file.data.id);
			}
		}
	);
});

router.get("/:id", (req, res) => {
	const fileId = req.params.id;
	const filePath = path.join(__dirname, "../prisma/dev.db");

	drive.files.get({ fileId: fileId, alt: "media" }, { responseType: "stream" }, (err, response) => {
		if (err) {
			console.error(err);
			res.status(500).send(err);
		} else {
			let headersSent = false;
			const fileStream = fs.createWriteStream(filePath);
			response.data
				.on("end", () => {
					if (!headersSent) {
						res.status(200).send("File downloaded");
					}
				})
				.on("error", (err) => {
					console.error("Error downloading file.");
					if (!headersSent) {
						res.status(500).send(err);
					}
				})
				.pipe(fileStream);
		}
	});
});

router.patch("/:id", async (req, res) => {
	const fileId = req.params.id;
	const media = {
		mimeType: "application/x-sqlite3",
		body: fs.createReadStream("prisma/dev.db"),
	};
	await drive.files.update({ fileId: fileId, media: media }, (err, file) => {
		if (err) {
			console.error(err);
			res.status(500).send(err.message);
		} else {
			res.status(200).send("File updated!");
		}
	});
});

const getDbFile = async () => {
	const fileId = process.env.dbID;
	const filePath = path.join(__dirname, "../prisma/dev.db");

	drive.files.get({ fileId: fileId, alt: "media" }, { responseType: "stream" }, (err, response) => {
		if (err) {
			console.error(err);
		} else {
			let headersSent = false;
			const fileStream = fs.createWriteStream(filePath);
			response.data
				.on("end", () => {
					if (!headersSent) {
						console.log("DB file downloaded.");
					}
				})
				.on("error", (err) => {
					console.error("Error downloading file.");
					if (!headersSent) {
						console.error(err);
					}
				})
				.pipe(fileStream);
		}
	});
};

const updateDbFile = async () => {
	const fileId = process.env.dbID;
	const media = {
		mimeType: "application/x-sqlite3",
		body: fs.createReadStream("prisma/dev.db"),
	};
	await drive.files.update({ fileId: fileId, media: media }, (err, file) => {
		if (err) {
			console.error(err);
		} else {
			console.log("DB file updated.");
		}
	});
};

module.exports = {
	router,
	getDbFile,
	updateDbFile,
};
