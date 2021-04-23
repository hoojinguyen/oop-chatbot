import { Card, Suggestion, Image } from "dialogflow-fulfillment"


String.prototype.replaceAll = function (search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};

exports.responseHandler = responseFromDb => {
	let responses = [];
	if (responseFromDb.lenght == 0 || !Array.isArray(responseFromDb))
		return false;
	for (let response of responseFromDb) {

		let responseObject = response.response;

		console.log(response)
		console.log(responseObject)

		if (responseObject.text != undefined) {
			const textObject = responseObject.text;
			let code = "";
			let title = "";
			let content = "";

			title = "*" + title + "*\n";
			if (textObject.title) {
				title = '*' + textObject.title.replaceAll("*lb", '\n') + '* \n';
			}

			if (textObject.content) {
				content = textObject.content.replaceAll("*lb", '\n');
			}

			if (!textObject.code) {
				responses.push(title + content)
			} else {
				code = "```\n" + textObject.code.replaceAll("*lb", '\n') + "```";
				responses.push(title)
				responses.push(code);
				responses.push(content);
			}
		}
		if (responseObject.image) {
			const image = new Image({ imageUrl: responseObject.image.imageUrl });
			responses.push(image);
		}
		if (responseObject.card) {
			const card = new Card(responseObject.card)
			responses.push(card);
		}
	}

	const responseObj = responseFromDb[responseFromDb.length - 1]

	console.log(responseObj)


	if (responseObj.intent == "iWhat") {

		const optionList = {
			define: ["Ví dụ", "Cách khai báo", "Đặc điểm"],
			example: ["Khái niệm", "Cách khai báo", "Đặc điểm"],
			declare: ["Ví dụ", "Khái niệm", "Đặc điểm"],
			specification: ["Ưu điểm", "Nhược điểm", "Ví dụ"],
			disadvantage: ["Ưu điểm", "Đặc điểm", "Ví dụ"],
			advantage: ["Nhược điểm", "Đặc điểm", "Ví dụ"],
		}

		let option = optionList[responseObj.parameters.eRequest];



		const suggestion = new Suggestion({
			title: "Bạn có muốn biết thêm về ... ",
			reply: option[0]
		})

		suggestion.addReply_(option[1])
		suggestion.addReply_(option[2])


		responses.push(suggestion);

	}
	return responses;

}