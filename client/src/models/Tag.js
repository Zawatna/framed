

export class Tag {
  constructor(data) {
    this.id = data.id || data._id;
    this.creatorId = data.creatorId;
    this.name = data.name;
  }
}