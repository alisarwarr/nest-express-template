import { INestApplicationContext } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../schemas/user.schema';

export async function updateUserScript(app: INestApplicationContext) {
    const usersModel = app.get<Model<Users>>(getModelToken(Users.name));

    try {
        const result = await usersModel.updateMany({}, { $set: { role: 'ADMIN' } });
        console.log(`Updated ${result.modifiedCount} users.`);
    }
    catch (error) {
        console.error('Error updating users:', error);
    }
}