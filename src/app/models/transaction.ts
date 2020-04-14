export class Project {
	constructor(
		public _id: string,
		public title: string,
		public price: number,
		public date: string,
		public category: string,
		public place: object,
	) {}
}
