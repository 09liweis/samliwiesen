export class Experience {
    constructor(
        public _id: string,
        public title: string,
        public company: string,
        public start_date: string,
        public end_date: string,
        public duty: Array<string>,
    ) {}
}
