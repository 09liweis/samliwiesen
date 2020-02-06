export class Blog {
	constructor(
		public _id: string,
		public title: string,
		public url: string,
		public content: string,
		public image: string,
		public category: string,
		public published: string
	) {}
}
