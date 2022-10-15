import Question from '../../../../../KKO/Motivation/Entities/Entities/Question/Question';

export default class QuestionOption  {
	ID: number = 0;
	Text?: string = '';
	IsRight: boolean = false;
	QuestionID: number = 0;
	Question: Question = null;
	constructor(obj?: Partial<QuestionOption>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
