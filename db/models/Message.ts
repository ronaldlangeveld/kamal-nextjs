import { DataTypes } from "sequelize";
import db from "../db";


const Message = db.define("Message", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Sync this model when it's imported
let syncPromise: Promise<any> | null = null;

export const ensureSync = () => {
  if (!syncPromise) {
    syncPromise = Message.sync({ alter: true });
  }
  return syncPromise;
};

export default Message;
