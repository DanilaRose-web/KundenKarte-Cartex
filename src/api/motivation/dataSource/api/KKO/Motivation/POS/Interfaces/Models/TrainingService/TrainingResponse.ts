import Question from '../../../../../../KKO/Motivation/Entities/Entities/Question/Question';

export default class TrainingResponse  {
	VideoUrl?: string = '';
	Questions: Array<Question> = null;
	constructor(obj?: Partial<TrainingResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
