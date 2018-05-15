export class Project {
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public link: string,
        public features: Array<string>,
    ) {}
}
