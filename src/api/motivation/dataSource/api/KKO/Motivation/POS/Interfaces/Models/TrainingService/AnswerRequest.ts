

export default class AnswerRequest  {
	QuestionID: number = 0;
	SelectedOptionID: number = 0;
	constructor(obj?: Partial<AnswerRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
