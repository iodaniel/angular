//this module provode the structure of the data type for eash variable. 
export class Document{
    constructor(
        public id:string,
        public name:string,
        public description:string,
        public url:string,
        public childen?:Document[]
    ){}
}