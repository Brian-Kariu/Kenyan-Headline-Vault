/**
 * TODO: Placeholder comment for eslint JSDOC, replace later
 */
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

  /**
   * TODO: Placeholder comment for eslint JSDOC, replace later
   * @param {string}title Title
   */
  setTitle(title) {
    this.title = title;
  }

  /**
   * TODO: Placeholder comment for eslint JSDOC, replace later
   * @param {string}paragraph Title
   */
  setParagraph(paragraph) {
    this.paragraph = paragraph;
  }

  /**
   * TODO: Placeholder comment for eslint JSDOC, replace later
   * @param {string}link Title
   */
  setLink(link) {
    this.link = link;
  }

  /**
   * TODO: Placeholder comment for eslint JSDOC, replace later
   * @param {string}imageUrl Title
   */
  setImageUrl(imageUrl) {
    this.imageUrl = imageUrl;
  }

  /**
   * TODO: Placeholder comment for eslint JSDOC, replace later
   * @param {string}imageCaption Title
   */
  setImageCaption(imageCaption) {
    this.imageCaption = imageCaption;
  }

  /**
   * TODO: Placeholder comment for eslint JSDOC, replace later
   * @param {string}topic Title
   */
  setTopic(topic) {
    this.topic = topic;
  }

  /**
   * TODO: Placeholder comment for eslint JSDOC, replace later
   * @param {string}date Title
   */
  setDate(date) {
    this.date = date;
  }

  getArticle() {
    const article = {
      title: this.title,
      paragraph: this.paragraph,
      imageUrl: this.imageUrl,
      imageCaption: this.imageCaption,
      topic: this.topic,
      date: this.date,
      link: this.link,
    };
    return article;
  }
}

module.exports = Article;
