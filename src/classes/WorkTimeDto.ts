export class WorkTimeDto {
    constructor(){}
    date: Date;
    start: Date;
    end: Date;
    dayOverflow: boolean = false;
    comment: string = '';
}