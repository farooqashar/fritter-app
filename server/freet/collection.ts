import type {HydratedDocument, Types} from 'mongoose';
import type {Freet} from './model';
import FreetModel from './model';
import UserCollection from '../user/collection';

/**
 * This files contains a class that has the functionality to explore freets
 * stored in MongoDB, including adding, finding, updating, and deleting freets.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Freet> is the output of the FreetModel() constructor,
 * and contains all the information in Freet. https://mongoosejs.com/docs/typescript.html
 */
class FreetCollection {
  /**
   * Add a freet to the collection
   *
   * @param {string} authorId - The id of the author of the freet
   * @param {Record<string, unknown>} objectInfo - object with the info for freet
   * @return {Promise<HydratedDocument<Freet>>} - The newly created freet
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async addOne(authorId: Types.ObjectId | string, objectInfo: any): Promise<HydratedDocument<Freet>> {
    const date = new Date();
    if (objectInfo.source) {
      const freet = new FreetModel({
        authorId,
        dateCreated: date,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        content: objectInfo.content,
        dateModified: date,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        source: objectInfo.source
      });
      await freet.save(); // Saves freet to MongoDB
      return freet.populate('authorId');
    }

    const freet = new FreetModel({
      authorId,
      dateCreated: date,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      content: objectInfo.content,
      dateModified: date});
    await freet.save(); // Saves freet to MongoDB
    return freet.populate('authorId');
  }

  /**
   * Find a freet by freetId
   *
   * @param {string} freetId - The id of the freet to find
   * @return {Promise<HydratedDocument<Freet>> | Promise<null> } - The freet with the given freetId, if any
   */
  static async findOne(freetId: Types.ObjectId | string): Promise<HydratedDocument<Freet>> {
    return FreetModel.findOne({_id: freetId}).populate('authorId');
  }

  /**
   * Get all the freets in the database
   *
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
   */
  static async findAll(): Promise<Array<HydratedDocument<Freet>>> {
    // Retrieves freets and sorts them from most to least recent
    return FreetModel.find({}).sort({dateModified: -1}).populate('authorId');
  }

  /**
   * Get all the freets in by given author
   *
   * @param {string} username - The username of author of the freets
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
   */
  static async findAllByUsername(username: string): Promise<Array<HydratedDocument<Freet>>> {
    const author = await UserCollection.findOneByUsername(username);
    return FreetModel.find({authorId: author._id}).sort({dateModified: -1}).populate('authorId');
  }

  /**
   * Get all the freets in by given author
   *
   * @param {string} username - The username of author of the freets
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
   */
  static async findAllByUserId(userID: string): Promise<Array<HydratedDocument<Freet>>> {
    return FreetModel.find({authorId: userID}).sort({dateModified: -1}).populate('authorId');
  }

  /**
   * Update a freet with the any new information
   *
   * @param {string} freetId - The id of the freet to be updated
   * @param {Record<string, unknown>} updateObj - object with some updated information
   * @return {Promise<HydratedDocument<Freet>>} - The newly updated freet
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async updateOne(freetId: Types.ObjectId | string, updateObj: any): Promise<HydratedDocument<Freet>> {
    const freet = await FreetModel.findOne({_id: freetId});
    if (updateObj.content) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      freet.content = updateObj.content;
      freet.dateModified = new Date();
      freet.edited = true;
    }

    if (updateObj.likes) {
      if (freet.likes) {
        freet.likes = Number(freet.likes) + 1;
      } else {
        freet.likes = 1;
      }
    }

    if (updateObj.laughs) {
      if (freet.laughs) {
        freet.laughs = Number(freet.laughs) + 1;
      } else {
        freet.laughs = 1;
      }
    }

    if (updateObj.loves) {
      if (freet.loves) {
        freet.loves = Number(freet.loves) + 1;
      } else {
        freet.loves = 1;
      }
    }

    if (updateObj.angries) {
      if (freet.angries) {
        freet.angries = Number(freet.angries) + 1;
      } else {
        freet.angries = 1;
      }
    }

    if (updateObj.sadness) {
      if (freet.sadness) {
        freet.sadness = Number(freet.sadness) + 1;
      } else {
        freet.sadness = 1;
      }
    }

    if (updateObj.reports) {
      if (freet.reports) {
        freet.reports = Number(freet.reports) + 1;
      } else {
        freet.reports = 1;
      }
    }

    if (updateObj.source) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      freet.source = updateObj.source;
    }

    await freet.save();
    return freet.populate('authorId');
  }

  /**
   * Delete a freet with given freetId.
   *
   * @param {string} freetId - The freetId of freet to delete
   * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
   */
  static async deleteOne(freetId: Types.ObjectId | string): Promise<boolean> {
    const freet = await FreetModel.deleteOne({_id: freetId});
    return freet !== null;
  }

  /**
   * Delete all the freets by the given author
   *
   * @param {string} authorId - The id of author of freets
   */
  static async deleteMany(authorId: Types.ObjectId | string): Promise<void> {
    await FreetModel.deleteMany({authorId});
  }
}

export default FreetCollection;
