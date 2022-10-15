import QuestionOption from '../../../../../KKO/Motivation/Entities/Entities/Question/QuestionOption';

export default class Question  {
	ID: number = 0;
	Text?: string = '';
	QuestionOptions: Array<QuestionOption> = null;
	constructor(obj?: Partial<Question>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
