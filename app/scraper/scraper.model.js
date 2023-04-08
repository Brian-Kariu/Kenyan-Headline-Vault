class Article {
  constructor(title, paragraph, imageUrl, imageCaption, topic, date, link) {
    this.title = title || null;
    this.paragraph = paragraph || null;
    this.imageUrl = imageUrl || null;
    this.imageCaption = imageCaption || null;
    this.topic = topic || null;
    this.date = date || null;
    this.link = link || null;
  }

  setTitle(title) {
    this.title = title;
  }

  setParagraph(paragraph) {
    this.paragraph = paragraph;
  }

  setLink(link) {
    this.link = link;
  }

  setImageUrl(imageUrl) {
    this.imageUrl = imageUrl;
  }

  setImageCaption(imageCaption) {
    this.imageCaption = imageCaption;
  }

  setTopic(topic) {
    this.topic = topic;
  }

  setDate(date) {
    this.date = date;
  }
}

module.exports = Article