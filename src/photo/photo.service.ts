import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photos } from './../schemas/photo.schema';

@Injectable()
export class PhotoService {
    constructor(
        @InjectModel(Photos.name) private readonly photosModel: Model<Photos>
    ) { }

    async checkPhotoDuplicate(filename: string) {
        const findPhoto = await this.photosModel.findOne({ filename });

        if (findPhoto) {
            throw new BadRequestException("Photo already exist.");
        }

        return findPhoto;
    }

    async checkPhotoExist(id: string) {
        const findPhoto = await this.photosModel.findById(id);

        if (!findPhoto) {
            throw new BadRequestException("Photo not exist.");
        }

        return findPhoto;
    }

    async createPhoto(file) {
        const data = {
            filename: file.originalname,
            contentType: file.mimetype,
            file: file.buffer
        }

        const newPhoto = await new this.photosModel(data).save();

        return newPhoto;
    }
}