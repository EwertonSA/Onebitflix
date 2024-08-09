import { DataTypes, Model, ModelStatic, Optional } from 'sequelize';
import { database } from '../database';
import bcrypt from 'bcrypt';
import {EpisodeInstance} from '../models/Episode'
type CheckPasswordCallback = (err?: Error, isSame?: boolean) => void;

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  birth: Date;
  email: string;
  password: string;
  role: 'admin' | 'user';
}
interface UserInstanceMethods {
  checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  Episodes?:EpisodeInstance[]
  checkPassword(password: string, callbackfn: CheckPasswordCallback):void;
}

export const User = database.define<UserInstance>('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  firstName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  birth: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      isIn: [['admin', 'user']],
    },
  },
}, {
  hooks: {
    beforeSave: async (user) => {
      if (user.isNewRecord || user.changed('password')) {
        user.password = await bcrypt.hash(user.password.toString(), 10);
      }
    },
  },
}) as ModelStatic<UserInstance> & { prototype: UserInstance & UserInstanceMethods };

User.prototype.checkPassword = function (this: UserInstance, password: string, callbackfn: CheckPasswordCallback) {
  bcrypt.compare(password, this.password, (err, isSame) => {
    if (err) {
      callbackfn(err);
    } else {
      callbackfn(err, isSame);
    }
  });
};

