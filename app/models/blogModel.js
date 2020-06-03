exports.BlogModel = function(obj){
    this.title;
    this.author;
    this.content;
    this.tags;
    this.draft;
    this.published;
    this.publishedOn;
    this.createdAt;
    this.modifiedAt;
    for (var prop in obj) this[prop] = obj[prop];
};